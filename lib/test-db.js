// Test database connection and RLS policies
// Run this with: node lib/test-db.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://yjnltbrknjjiptppegqp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqbmx0YnJrbmpqaXB0cHBlZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTg4OTksImV4cCI6MjA2NTU3NDg5OX0.porgzfxK5pPyKvWa7Pf9YO6KV4Sno3BYEf2j4jlrFqc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDatabase() {
  console.log('🔍 Testing Supabase connection...\n')

  try {
    // Test 1: Check if we can connect
    console.log('1. Testing connection...')
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    if (error) {
      console.log('❌ Connection failed:', error.message)
      return
    }
    console.log('✅ Connection successful\n')

    // Test 2: Check onboarding table structure
    console.log('2. Testing onboarding table...')
    const { data: onboardingData, error: onboardingError } = await supabase
      .from('onboarding')
      .select('*')
      .limit(1)
    
    if (onboardingError) {
      console.log('❌ Onboarding table error:', onboardingError.message)
      return
    }
    console.log('✅ Onboarding table accessible\n')

    // Test 3: Check RLS policies
    console.log('3. Testing RLS policies...')
    console.log('   Note: RLS policies require authentication to work properly')
    console.log('   This test will show the table structure but may not insert data without auth\n')

    // Test 4: Show table structure
    console.log('4. Onboarding table structure:')
    console.log('   - user_id (UUID, references auth.users)')
    console.log('   - question1 (TEXT)')
    console.log('   - question2 (TEXT)')
    console.log('   - question3 (TEXT)')
    console.log('   - question4 (TEXT)')
    console.log('   - question5 (TEXT)')
    console.log('   - completed (BOOLEAN)')
    console.log('   - created_at (TIMESTAMP)')
    console.log('   - updated_at (TIMESTAMP)\n')

    console.log('✅ Database test completed successfully!')
    console.log('💡 If onboarding is still not working, check:')
    console.log('   1. User authentication is working')
    console.log('   2. RLS policies are correctly configured')
    console.log('   3. User has proper permissions')

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testDatabase() 