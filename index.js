require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// LinkedIn scraping function
async function scrapeLinkedInLeads(searchQuery, maxResults = 10) {
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for production
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to LinkedIn search
    const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(searchQuery)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    
    // Wait for results to load
    await page.waitForSelector('.entity-result__item', { timeout: 10000 });
    
    // Extract lead data
    const leads = await page.evaluate(() => {
      const leadElements = document.querySelectorAll('.entity-result__item');
      const extractedLeads = [];
      
      leadElements.forEach((element, index) => {
        if (index >= 10) return; // Limit to first 10 results
        
        try {
          const nameElement = element.querySelector('.entity-result__title-text');
          const titleElement = element.querySelector('.entity-result__primary-subtitle');
          const companyElement = element.querySelector('.entity-result__secondary-subtitle');
          const locationElement = element.querySelector('.entity-result__tertiary-subtitle');
          
          if (nameElement) {
            extractedLeads.push({
              name: nameElement.textContent.trim(),
              title: titleElement ? titleElement.textContent.trim() : '',
              company: companyElement ? companyElement.textContent.trim() : '',
              location: locationElement ? locationElement.textContent.trim() : '',
              linkedin_url: nameElement.href || '',
              search_query: searchQuery,
              scraped_at: new Date().toISOString()
            });
          }
        } catch (error) {
          console.log('Error extracting lead:', error);
        }
      });
      
      return extractedLeads;
    });
    
    console.log(`Scraped ${leads.length} leads from LinkedIn`);
    return leads;
    
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return [];
  } finally {
    await browser.close();
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

// Main function to scrape and store leads
async function generateLeads(searchQuery, maxResults = 10) {
  console.log(`Starting lead generation for: "${searchQuery}"`);
  
  // Add delay to be respectful to LinkedIn
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const leads = await scrapeLinkedInLeads(searchQuery, maxResults);
  
  if (leads.length > 0) {
    const stored = await storeLeadsInSupabase(leads);
    return {
      success: stored,
      leads_count: leads.length,
      leads: leads
    };
  } else {
    return {
      success: false,
      leads_count: 0,
      leads: []
    };
  }
}

// Test function
async function testLinkedInScraping() {
  const result = await generateLeads('Marketing Director', 5);
  console.log('Test result:', result);
}

// Export for use in other files
module.exports = {
  generateLeads,
  scrapeLinkedInLeads,
  storeLeadsInSupabase
};

// Run test if this file is executed directly
if (require.main === module) {
  testLinkedInScraping();
} 
// TODO: Expose an HTTP endpoint for the frontend to trigger lead generation 