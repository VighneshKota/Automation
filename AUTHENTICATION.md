# Authentication Setup Guide

This guide explains how to set up and use the authentication system in your social media automation app.

## Features

- **Email/Password Authentication**: Users can sign up and sign in with email and password
- **Google OAuth**: Users can sign in with their Google account
- **User Profiles**: Automatic profile creation and management
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent sessions with automatic refresh

## Setup Instructions

### 1. Supabase Configuration

Make sure your Supabase project has the following settings enabled:

1. **Authentication Settings**:
   - Go to Authentication > Settings in your Supabase dashboard
   - Enable "Email confirmations" if you want email verification
   - Enable "Google" provider for OAuth (configure Google OAuth credentials)

2. **Database Schema**:
   The required tables are already created in `supabase/migrations/20240320_initial_schema.sql`:
   - `profiles` table for user profile data
   - `onboarding` table for user onboarding progress
   - Row Level Security (RLS) policies for data protection

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication Configuration
# Set to 'true' to require email confirmation (recommended for production)
# Set to 'false' to disable email confirmation (for development only)
NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false
```

### 3. Running the Application

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Usage

### Authentication Flow

1. **Landing Page** (`/`): Users can click "Get Started" to go to the auth page
2. **Auth Page** (`/auth`): Users can:
   - Sign in with email/password
   - Sign up with email/password
   - Sign in with Google OAuth
3. **Onboarding** (`/onboarding`): New users complete onboarding questions
4. **Dashboard** (`/app/dashboard`): Authenticated users access the main app

### User Management

- **Profile Updates**: Users can update their profile in Settings (`/app/settings`)
- **Logout**: Users can logout from the dropdown menu in the header
- **Session Persistence**: Sessions are automatically maintained across browser sessions

### Protected Routes

The following routes require authentication:
- `/app/*` - All app pages
- `/onboarding` - Onboarding page
- `/app/settings` - Settings page

Unauthenticated users are automatically redirected to `/auth`.

## Components

### AuthProvider (`lib/auth-context.tsx`)
Provides authentication context throughout the app:
- `user`: Current user object
- `userProfile`: User profile data
- `isLoading`: Loading state
- `signOut()`: Logout function
- `refreshProfile()`: Refresh user profile

### AuthPage (`app/auth/page.tsx`)
Handles user authentication with:
- Email/password sign in and sign up
- Google OAuth integration
- Form validation and error handling
- Success/error messaging
- Email verification handling

### DashboardHeader (`components/dashboard-header.tsx`)
Displays user information and navigation:
- User avatar with initials
- User name and email
- Logout functionality
- Navigation menu

## Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);
```

### Onboarding Table
```sql
CREATE TABLE onboarding (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    question1 TEXT,
    question2 TEXT,
    question3 TEXT,
    question4 TEXT,
    question5 TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

## Security Features

- **Row Level Security (RLS)**: Database policies ensure users can only access their own data
- **Password Validation**: Minimum 6 characters required
- **Email Verification**: Optional email confirmation for new accounts
- **Session Management**: Secure session handling with automatic refresh
- **Protected Routes**: Automatic redirection for unauthenticated users

## Troubleshooting

### Common Issues

#### 1. Email Confirmation Issues

**Problem**: Users can sign up but can't sign in, getting "Email not confirmed" error.

**Solution**: 
1. **For Development**: Set `NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false` in your `.env.local` file
2. **For Production**: 
   - Check your email settings in Supabase dashboard
   - Verify email templates are configured
   - Check spam folders for verification emails

**Alternative Solutions**:
- Use the "Resend verification email" button on the sign-in form
- Check Supabase logs for email delivery issues
- Configure a custom SMTP provider in Supabase

#### 2. Authentication not working
- Check Supabase credentials and enable authentication providers
- Verify environment variables are correctly set
- Check browser console for errors

#### 3. Profile not loading
- Verify RLS policies are correctly configured
- Check database connection
- Ensure user profile was created during signup

#### 4. Redirect loops
- Ensure protected routes are properly configured
- Check authentication state management
- Verify redirect URLs are correct

#### 5. Google OAuth errors
- Verify Google OAuth credentials and redirect URLs
- Check Supabase OAuth configuration
- Ensure redirect URLs match exactly

### Email Confirmation Configuration

#### Disable Email Confirmation (Development)
Add to your `.env.local`:
```env
NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=false
```

#### Enable Email Confirmation (Production)
Add to your `.env.local`:
```env
NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION=true
```

#### Supabase Dashboard Configuration
1. Go to Authentication > Settings
2. Configure "Email confirmations" settings
3. Set up email templates
4. Configure SMTP settings if needed

### Debug Mode

Enable debug logging by adding to your environment:
```env
NEXT_PUBLIC_DEBUG=true
```

This will log authentication events to the console for debugging purposes.

## Customization

### Adding New Authentication Providers

To add additional OAuth providers (GitHub, Twitter, etc.):

1. Configure the provider in your Supabase dashboard
2. Add the provider button to the auth page
3. Handle the OAuth flow similar to Google OAuth

### Custom User Fields

To add custom fields to user profiles:

1. Add columns to the `profiles` table
2. Update the `handle_new_user()` function to include new fields
3. Update the TypeScript types in `lib/auth-context.tsx`
4. Add form fields to the settings page

### Styling

The authentication components use Tailwind CSS and shadcn/ui components. You can customize the styling by:

1. Modifying the component classes
2. Updating the theme in `components/theme-provider.tsx`
3. Customizing the color scheme in `tailwind.config.js` 