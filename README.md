# Lead Generation Spoke

This is a standalone spoke for the Rethink Tank hub, providing **free lead generation** using LinkedIn scraping and Supabase storage.

## Features
- ✅ **LinkedIn Scraping** - Extract leads from LinkedIn search results
- ✅ **Supabase Storage** - Store leads in your database
- ✅ **Rate Limiting** - Respectful scraping with delays
- ✅ **Simple Interface** - Easy-to-use frontend (coming soon)

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Get your project URL and anon key from **Settings > API**

### 3. Configure Environment Variables
Create a `.env` file with:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Test the Scraper
```bash
node index.js
```

## Usage

### Command Line
```javascript
const { generateLeads } = require('./index.js');

// Generate leads for "Marketing Director"
const result = await generateLeads('Marketing Director', 10);
console.log(`Found ${result.leads_count} leads`);
```

### Web Interface (Coming Soon)
- Simple form to input search criteria
- Real-time scraping progress
- Download results as CSV

## Important Notes
- **Respectful Scraping**: Built-in delays to avoid overwhelming LinkedIn
- **Free Forever**: No API costs or monthly fees
- **Data Quality**: Extracts name, title, company, location, and LinkedIn URL
- **Legal Compliance**: Use responsibly and in accordance with LinkedIn's terms

## Next Steps
- [ ] Add web interface
- [ ] Email finding integration
- [ ] Export functionality
- [ ] Lead management dashboard 