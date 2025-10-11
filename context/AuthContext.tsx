'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// Feature flag: explicitly enable email-based auth only when set to 'true'
const EMAIL_AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_EMAIL_AUTH === 'true'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  updateProfile: (updates: any) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Create user profile on sign up
      if (event === 'SIGNED_IN' && session?.user) {
        await createUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const createUserProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
        })

      if (error && error.code !== '23505') { // Ignore duplicate key error
        console.error('Error creating user profile:', error)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    if (!EMAIL_AUTH_ENABLED) {
      // Short-circuit when email/provider auth is disabled
      return { error: { message: 'Email logins are disabled' } as AuthError }
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
          // Removed emailRedirectTo and captchaToken - these were causing 400/422 errors
        }
      })
      
      // If there's an error about email confirmation, try to sign in anyway
      if (error && error.message.includes('email not confirmed')) {
        console.log('Email confirmation error detected, attempting direct sign in...')
        
        // Try to sign in directly
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (signInData.user && !signInError) {
          console.log('Direct sign in successful')
          return { error: null }
        }
        
        return { error: signInError }
      }
      
      // If signup is successful, automatically sign in the user
      if (data.user && !error) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        return { error: signInError }
      }
      
      return { error }
    } catch (err) {
      console.error('SignUp error:', err)
      return { error: err as AuthError }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!EMAIL_AUTH_ENABLED) {
      // Short-circuit when email/provider auth is disabled
      return { error: { message: 'Email logins are disabled' } as AuthError }
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      // If user doesn't exist, create them automatically for mobile authentication
      if (error && (error.message.includes('Invalid login credentials') || 
                   error.message.includes('Email logins are disabled'))) {
        // Check if this is a mobile user (email ends with @mobile.user)
        if (email.endsWith('@mobile.user')) {
          const mobileNumber = email.replace('@mobile.user', '');
          
          // Create user with mobile number
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: `User${mobileNumber.slice(-4)}`, // Use last 4 digits as name
                last_name: 'Mobile',
                mobile_number: mobileNumber
              },
              emailRedirectTo: undefined,
              captchaToken: undefined
            }
          })
          
          if (signUpData.user && !signUpError) {
            // Auto sign in after creating account
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password
            })
            return { error: signInError }
          }
          
          return { error: signUpError }
        }
      }
      
      return { error }
    } catch (err) {
      console.error('SignIn error:', err)
      return { error: err as AuthError }
    }
  }

  const signOut = async () => {
    try {
      // Clear local storage first for immediate UI update
      localStorage.removeItem('admin');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      
      // Clear user state immediately
      setUser(null);
      setLoading(false);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Supabase signOut error:', error);
        return { error }
      }
      
      // Use router.push for faster navigation without full page reload
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      
      return { error: null }
    } catch (err) {
      console.error('SignOut error:', err);
      return { error: err as AuthError }
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user) return { error: { message: 'No user logged in' } as AuthError }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    return { error: error as AuthError | null }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

