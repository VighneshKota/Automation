import { createClient } from '@supabase/supabase-js'

// Use environment variables with fallback to the provided credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yjnltbrknjjiptppegqp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqbmx0YnJrbmpqaXB0cHBlZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTg4OTksImV4cCI6MjA2NTU3NDg5OX0.porgzfxK5pPyKvWa7Pf9YO6KV4Sno3BYEf2j4jlrFqc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test function to check database connection
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...')
    
    // Test 1: Check if we can access the onboarding table
    const { data: onboardingTest, error: onboardingError } = await supabase
      .from('onboarding')
      .select('*')
      .limit(1)
    
    console.log('Onboarding table test:', { data: onboardingTest, error: onboardingError })
    
    // Test 2: Check if we can access the profiles table
    const { data: profilesTest, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
    
    console.log('Profiles table test:', { data: profilesTest, error: profilesError })
    
    return { onboardingTest, profilesTest, onboardingError, profilesError }
  } catch (error) {
    console.error('Database connection test failed:', error)
    return { error }
  }
}

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export type OnboardingData = {
  id: string
  user_id: string
  question1: string
  question2: string
  question3: string
  question4: string
  question5: string
  completed: boolean
  created_at: string
  updated_at: string
} 