const fs = require('fs');
const path = require('path');

// Read the auth.js file
const authJsPath = path.join(__dirname, 'auth.js');
let authJsContent = fs.readFileSync(authJsPath, 'utf8');

// Replace placeholders with environment variables
authJsContent = authJsContent.replace('%%SUPABASE_URL%%', process.env.SUPABASE_URL || '');
authJsContent = authJsContent.replace('%%SUPABASE_ANON_KEY%%', process.env.SUPABASE_ANON_KEY || '');

// Write the updated file
fs.writeFileSync(authJsPath, authJsContent);

console.log('Environment variables injected into auth.js'); 