const { generateLeads } = require('../index.js');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { searchQuery, maxResults = 10, businessInfo } = req.body;

    // Validate input
    if (!searchQuery || typeof searchQuery !== 'string') {
      return res.status(400).json({ error: 'Search query is required and must be a string' });
    }

    if (maxResults && (maxResults < 1 || maxResults > 50)) {
      return res.status(400).json({ error: 'Max results must be between 1 and 50' });
    }

    console.log(`API: Generating leads for "${searchQuery}" (max: ${maxResults})`);

    // Generate leads
    const result = await generateLeads(searchQuery, maxResults);

    console.log(`API: Generated ${result.leads_count} leads with average score ${result.average_quality_score}`);

    // Return results with business info for email generation
    res.status(200).json({
      ...result,
      businessInfo: businessInfo || null
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}; 