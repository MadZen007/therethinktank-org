require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// User agents for rotation
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0'
];

// Validation functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.includes('example') && !email.includes('test');
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const isValidDomain = (domain) => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain.replace(/^https?:\/\//, ''));
};

const extractEmailFromText = (text) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex);
  return emails ? emails[0] : null;
};

const extractNameFromTitle = (title) => {
  // Remove common suffixes and prefixes
  const cleanTitle = title
    .replace(/^(Home|Welcome|About|Contact)\s*[-|]\s*/i, '')
    .replace(/\s*[-|]\s*(Home|Welcome|About|Contact)$/i, '')
    .trim();
  
  return cleanTitle.length > 2 ? cleanTitle : null;
};

// Smart parsing function
const parseWebsiteData = (html, url) => {
  const $ = cheerio.load(html);
  
  // Try multiple selectors for contact info
  const email = $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '') ||
                $('.email, .contact-email, [class*="email"], [id*="email"]').text().trim() ||
                extractEmailFromText($.text());
                
  const phone = $('a[href^="tel:"]').first().attr('href')?.replace('tel:', '') ||
                $('.phone, .contact-phone, [class*="phone"], [id*="phone"]').text().trim();
                
  const name = $('h1, .name, .contact-name, .title').first().text().trim() ||
               extractNameFromTitle($('title').text());
               
  const company = $('.company, .organization, [class*="company"], [class*="org"]').first().text().trim() ||
                  extractCompanyFromUrl(url);
                  
  const location = $('.location, .address, [class*="location"], [class*="address"]').first().text().trim();
  
  return { email, phone, name, company, location, url };
};

const extractCompanyFromUrl = (url) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0].replace(/[^a-zA-Z]/g, ' ');
  } catch {
    return null;
  }
};

// Lead validation and scoring
const validateLead = (lead) => {
  let score = 0;
  
  // Email validation (30 points)
  if (lead.email && isValidEmail(lead.email)) score += 30;
  
  // Phone validation (20 points)
  if (lead.phone && isValidPhone(lead.phone)) score += 20;
  
  // Company website validation (25 points)
  if (lead.company && isValidDomain(lead.company)) score += 25;
  
  // Name validation (15 points)
  if (lead.name && lead.name.length > 2) score += 15;
  
  // Location validation (10 points)
  if (lead.location) score += 10;
  
  return {
    ...lead,
    quality_score: score,
    is_valid: score >= 50
  };
};

// Rate limiting and rotation
const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const randomDelay = (min = 3000, max = 7000) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Google search scraping
async function scrapeGoogleSearch(searchQuery, maxResults = 10) {
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for production
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set random user agent
    await page.setUserAgent(getRandomUserAgent());
    
    // Additional stealth measures
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
      Object.defineProperty(navigator, 'permissions', {
        get: () => ({
          query: () => Promise.resolve({ state: 'granted' })
        }),
      });
    });
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to Google search
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    console.log('Searching Google for:', searchQuery);
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for results to load
    await randomDelay(5000, 8000);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'google-debug.png', fullPage: true });
    console.log('Screenshot saved as google-debug.png');
    
    // Check if we got a captcha or blocked page
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    
    if (pageTitle.includes('captcha') || pageTitle.includes('blocked') || pageTitle.includes('unusual')) {
      console.log('❌ Google detected automation - got blocked page');
      return [];
    }
    
    // Extract search results with more comprehensive selectors
    const searchResults = await page.evaluate(() => {
      const results = [];
      
      // Try multiple selectors for search results
      const selectors = [
        'a[href^="http"]',
        '.g a[href^="http"]',
        '.rc a[href^="http"]',
        '[data-ved] a[href^="http"]',
        'div[data-ved] a[href^="http"]'
      ];
      
      for (const selector of selectors) {
        const links = document.querySelectorAll(selector);
        console.log(`Found ${links.length} links with selector: ${selector}`);
        
        links.forEach(link => {
          const href = link.href;
          const text = link.textContent.trim();
          
          // Filter for business websites (exclude Google, social media, etc.)
          if (href && 
              !href.includes('google.com') && 
              !href.includes('facebook.com') && 
              !href.includes('linkedin.com') && 
              !href.includes('twitter.com') && 
              !href.includes('youtube.com') &&
              !href.includes('instagram.com') &&
              !href.includes('tiktok.com') &&
              text.length > 5) {
            
            // Check if we already have this URL
            const exists = results.find(r => r.url === href);
            if (!exists) {
              results.push({
                url: href,
                title: text,
                domain: new URL(href).hostname
              });
            }
          }
        });
        
        if (results.length > 0) break; // Use first working selector
      }
      
      return results.slice(0, 20); // Get first 20 results
    });
    
    console.log(`Found ${searchResults.length} potential websites`);
    
    if (searchResults.length === 0) {
      console.log('❌ No search results found - Google may have blocked us');
      return [];
    }
    
    // Scrape each website for contact info
    const leads = [];
    for (let i = 0; i < Math.min(searchResults.length, maxResults); i++) {
      const result = searchResults[i];
      console.log(`Scraping ${i + 1}/${Math.min(searchResults.length, maxResults)}: ${result.domain}`);
      
      try {
        const contactInfo = await scrapeWebsiteContact(result.url, page);
        if (contactInfo.email || contactInfo.phone) {
          const validatedLead = validateLead({
            ...contactInfo,
            search_query: searchQuery,
            scraped_at: new Date().toISOString()
          });
          
          if (validatedLead.is_valid) {
            leads.push(validatedLead);
            console.log(`✅ Valid lead found: ${validatedLead.name || 'Unknown'} - ${validatedLead.email || 'No email'}`);
          }
        }
      } catch (error) {
        console.log(`❌ Failed to scrape ${result.domain}: ${error.message}`);
      }
      
      // Rate limiting between requests
      await randomDelay(4000, 8000);
    }
    
    console.log(`Successfully scraped ${leads.length} valid leads`);
    return leads;
    
  } catch (error) {
    console.error('Google search scraping error:', error);
    return [];
  } finally {
    await browser.close();
  }
}

// Scrape individual website for contact info
async function scrapeWebsiteContact(url, page) {
  try {
    // Navigate to the website
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await randomDelay(3000, 5000);
    
    // Get page content
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // Try main page first
    let contactInfo = parseWebsiteData(html, url);
    
    // If no contact info found, try contact page
    if (!contactInfo.email && !contactInfo.phone) {
      const contactUrl = `${new URL(url).origin}/contact`;
      try {
        await page.goto(contactUrl, { waitUntil: 'networkidle2', timeout: 10000 });
        await randomDelay(3000, 5000);
        const contactHtml = await page.content();
        contactInfo = parseWebsiteData(contactHtml, contactUrl);
      } catch (error) {
        console.log(`Contact page not found for ${url}`);
      }
    }
    
    // If still no contact info, try about page
    if (!contactInfo.email && !contactInfo.phone) {
      const aboutUrl = `${new URL(url).origin}/about`;
      try {
        await page.goto(aboutUrl, { waitUntil: 'networkidle2', timeout: 10000 });
        await randomDelay(3000, 5000);
        const aboutHtml = await page.content();
        contactInfo = parseWebsiteData(aboutHtml, aboutUrl);
      } catch (error) {
        console.log(`About page not found for ${url}`);
      }
    }
    
    return contactInfo;
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {};
  }
}

// Store leads in Supabase
async function storeLeadsInSupabase(leads) {
  try {
    const { data, error } = await supabase.from('leads').insert(leads);
    if (error) {
      console.error('Supabase insert error:', error);
      return false;
    }
    console.log(`Stored ${leads.length} leads in Supabase`);
    return true;
  } catch (err) {
    console.error('Supabase error:', err);
    return false;
  }
}

// Main function to generate leads
async function generateLeads(searchQuery, maxResults = 10) {
  console.log(`Starting lead generation for: "${searchQuery}"`);
  
  const leads = await scrapeGoogleSearch(searchQuery, maxResults);
  
  if (leads.length > 0) {
    const stored = await storeLeadsInSupabase(leads);
    return {
      success: stored,
      leads_count: leads.length,
      leads: leads,
      average_quality_score: Math.round(leads.reduce((sum, lead) => sum + lead.quality_score, 0) / leads.length)
    };
  } else {
    return {
      success: false,
      leads_count: 0,
      leads: [],
      average_quality_score: 0
    };
  }
}

// Test function
async function testGoogleScraping() {
  const result = await generateLeads('Marketing Director', 5);
  console.log('Test result:', result);
}

// Export for use in other files
module.exports = {
  generateLeads,
  scrapeGoogleSearch,
  storeLeadsInSupabase,
  validateLead
};

// Run test if this file is executed directly
if (require.main === module) {
  testGoogleScraping();
}