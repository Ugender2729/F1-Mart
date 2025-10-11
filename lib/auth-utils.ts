import { supabase } from './supabase'

// Token expiration handling utilities
export const authUtils = {
  // Clear expired tokens
  clearExpiredTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase.auth.token')
      sessionStorage.clear()
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      return !error && session !== null
    } catch (error) {
      console.error('Auth check failed:', error)
      return false
    }
  },

  // Handle token refresh errors
  handleTokenError: (error: any) => {
    console.error('Token error:', error)
    
    // If it's a token-related error, clear storage
    if (error?.message?.includes('token') || error?.status === 422) {
      authUtils.clearExpiredTokens()
      // Redirect to login or show login modal
      if (typeof window !== 'undefined') {
        window.location.href = '/auth'
      }
    }
  },

  // Force logout
  logout: async () => {
    try {
      await supabase.auth.signOut()
      authUtils.clearExpiredTokens()
    } catch (error) {
      console.error('Logout error:', error)
      // Force clear even if signOut fails
      authUtils.clearExpiredTokens()
    }
  },

  // Get current user safely
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        authUtils.handleTokenError(error)
        return null
      }
      return user
    } catch (error) {
      authUtils.handleTokenError(error)
      return null
    }
  }
}

// Listen for auth state changes
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session ? 'User logged in' : 'User logged out')
    
    if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
      // Handle token refresh or logout
      if (event === 'TOKEN_REFRESHED' && !session) {
        // Token refresh failed, clear everything
        authUtils.clearExpiredTokens()
      }
    }
    
    // Handle token refresh errors specifically
    if (event === 'TOKEN_REFRESHED' && session) {
      console.log('Token refreshed successfully, new expiry:', new Date(session.expires_at! * 1000))
    }
  })
  
  // Proactive token refresh every 50 minutes
  setInterval(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Refresh token proactively
        await supabase.auth.refreshSession()
        console.log('Proactive token refresh completed')
      }
    } catch (error) {
      console.error('Proactive token refresh failed:', error)
      authUtils.handleTokenError(error)
    }
  }, 50 * 60 * 1000) // Every 50 minutes
}
