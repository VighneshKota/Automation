-- Fix RLS policies for profiles table
-- Add missing INSERT policy for profiles
CREATE POLICY "Users can insert their own profile" 
    ON profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Fix RLS policies for onboarding table
-- Make sure all policies are properly set
DROP POLICY IF EXISTS "Users can view their own onboarding data" ON onboarding;
DROP POLICY IF EXISTS "Users can update their own onboarding data" ON onboarding;
DROP POLICY IF EXISTS "Users can insert their own onboarding data" ON onboarding;

CREATE POLICY "Users can view their own onboarding data" 
    ON onboarding FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data" 
    ON onboarding FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding data" 
    ON onboarding FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Make sure the tables exist and have correct structure
-- This will help if there are any missing columns or constraints
ALTER TABLE profiles ALTER COLUMN id SET NOT NULL;
ALTER TABLE onboarding ALTER COLUMN user_id SET NOT NULL; 