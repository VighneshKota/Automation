#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Setting up Authentication Environment Variables\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local already exists. Please check the following variables:\n');
} else {
  console.log('📝 Creating .env.local file...\n');
}

const envContent = `# Supabase Configuration
# Replace with your actual Supabase project URL and anon key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication Configuration
# Set to 'true' to require email confirmation (recommended for production)
# Set to 'false' to disable email confirmation (for development only)
NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false
`;

if (!envExists) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully!\n');
}

console.log('📋 Required Environment Variables:\n');
console.log('1. NEXT_PUBLIC_SUPABASE_URL - Your Supabase project URL');
console.log('2. NEXT_PUBLIC_SUPABASE_ANON_KEY - Your Supabase anon key');
console.log('3. NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION - Set to "false" for development\n');

console.log('🔧 Next Steps:\n');
console.log('1. Get your Supabase credentials from your Supabase dashboard');
console.log('2. Update the .env.local file with your actual values');
console.log('3. For development, set NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false');
console.log('4. Restart your development server\n');

console.log('📚 For more information, see AUTHENTICATION.md\n');

if (envExists) {
  console.log('💡 Tip: If you\'re having email confirmation issues, make sure NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false is set for development.');
} 