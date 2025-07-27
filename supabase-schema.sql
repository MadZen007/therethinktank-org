-- Create leads table for LinkedIn scraped data
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(500),
    company VARCHAR(500),
    location VARCHAR(255),
    linkedin_url TEXT,
    search_query VARCHAR(500),
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email VARCHAR(255),
    phone VARCHAR(50),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_search_query ON leads(search_query);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Add some sample data for testing (optional)
-- INSERT INTO leads (name, title, company, location, search_query) VALUES 
-- ('John Doe', 'Marketing Director', 'Tech Corp', 'San Francisco, CA', 'Marketing Director'),
-- ('Jane Smith', 'VP of Marketing', 'Startup Inc', 'New York, NY', 'Marketing Director'); 