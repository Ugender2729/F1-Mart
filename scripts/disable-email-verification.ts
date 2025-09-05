import { createClient } from '@supabase/supabase-js'

// This script disables email verification for your Supabase project
// You need to run this with your service role key (not the anon key)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY // You need to add this to your .env.local

if (!serviceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment variables')
  console.log('Please add your service role key to .env.local:')
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function disableEmailVerification() {
  try {
    console.log('🔧 Disabling email verification...')
    
    // Update the auth settings to disable email confirmation
    const { data, error } = await supabase
      .from('auth.config')
      .update({ 
        email_confirm: false,
        email_confirm_url: null
      })
      .eq('id', 'default')

    if (error) {
      console.error('❌ Error updating auth config:', error)
      return
    }

    console.log('✅ Email verification disabled successfully!')
    console.log('📧 Users can now sign up without email confirmation')
    
  } catch (err) {
    console.error('❌ Error:', err)
  }
}

// Run the function
disableEmailVerification()
