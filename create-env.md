# Create .env.local File

Please create a `.env.local` file in your project root directory with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yjnltbrknjjiptppegqp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqbmx0YnJrbmpqaXB0cHBlZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTg4OTksImV4cCI6MjA2NTU3NDg5OX0.porgzfxK5pPyKvWa7Pf9YO6KV4Sno3BYEf2j4jlrFqc

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication Configuration
# Set to 'true' to require email confirmation (recommended for production)
# Set to 'false' to disable email confirmation (for development only)
NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false
```

## Steps:

1. Create a new file called `.env.local` in your project root
2. Copy and paste the content above
3. Save the file
4. Restart your development server

## After creating the file:

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` or `pnpm dev` again
3. Test the onboarding flow

The onboarding questions should now save properly to the database! 