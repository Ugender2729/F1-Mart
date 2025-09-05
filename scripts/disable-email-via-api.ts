// This script uses Supabase Management API to disable email verification
// You need to get your access token from Supabase dashboard

import fetch from 'node-fetch';

const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN; // Get this from Supabase dashboard
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF; // Your project reference

async function disableEmailVerification() {
  if (!SUPABASE_ACCESS_TOKEN || !PROJECT_REF) {
    console.error('❌ Missing environment variables:');
    console.log('SUPABASE_ACCESS_TOKEN=your_access_token');
    console.log('SUPABASE_PROJECT_REF=your_project_ref');
    console.log('');
    console.log('Get these from: https://supabase.com/dashboard -> Your Project -> Settings -> API');
    return;
  }

  try {
    console.log('🔧 Disabling email verification via Management API...');
    
    const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_confirm: false,
        email_confirm_url: null,
        email_confirm_redirect_url: null
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error:', error);
      return;
    }

    const result = await response.json();
    console.log('✅ Email verification disabled successfully!');
    console.log('📧 Users can now sign up without email confirmation');
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

// Run the function
disableEmailVerification();
