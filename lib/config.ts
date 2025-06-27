// Authentication configuration
export const authConfig = {
  // Set to false to disable email confirmation (for development only)
  // In production, this should always be true
  requireEmailConfirmation: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === 'true',
  
  // Redirect URL after email confirmation
  emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    : typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:3000/auth/callback',
}

// Supabase configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
} 