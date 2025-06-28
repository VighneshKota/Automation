import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        // Redirect to auth page with error
        return NextResponse.redirect(new URL('/auth?error=verification_failed', request.url))
      }

      if (data.user) {
        // Check if user has completed onboarding
        const { data: onboarding } = await supabase
          .from('onboarding')
          .select('completed')
          .eq('user_id', data.user.id)
          .single()

        if (onboarding?.completed) {
          // User has completed onboarding, go to dashboard
          return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
          // User needs to complete onboarding, go to onboarding
          return NextResponse.redirect(new URL('/onboarding', request.url))
        }
      }
    } catch (error) {
      console.error('Auth callback exception:', error)
      return NextResponse.redirect(new URL('/auth?error=verification_failed', request.url))
    }
  }

  // Fallback redirect to auth page
  return NextResponse.redirect(new URL('/auth', request.url))
} 