require('dotenv').config();
const express = require('express');
const path = require('path');
const generateLeadsHandler = require('./api/generate-leads');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for generating leads
app.post('/api/generate-leads', generateLeadsHandler);

// Start server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});