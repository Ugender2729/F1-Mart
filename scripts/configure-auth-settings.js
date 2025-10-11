// Configure Supabase Auth Settings via Management API
// You need to get your service role key from Supabase Dashboard

const { createClient } = require('@supabase/supabase-js');

// You need to get these from your Supabase Dashboard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Get this from Dashboard

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials');
  console.log('Get your service role key from: Dashboard → Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function configureAuthSettings() {
  try {
    console.log('🔧 Configuring Supabase Auth Settings...');
    
    // Note: Supabase Management API doesn't directly support auth config
    // You need to use the Dashboard or contact Supabase support
    
    console.log('❌ Auth configuration via API is not directly supported');
    console.log('📝 Please configure manually in Supabase Dashboard:');
    console.log('');
    console.log('1. Go to Authentication → Settings');
    console.log('2. Set JWT expiry: 3600 seconds');
    console.log('3. Set Refresh token expiry: 2592000 seconds (30 days)');
    console.log('4. Disable email confirmations');
    console.log('5. Enable signup');
    
    // Check current auth settings
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else {
      console.log('✅ Auth connection working');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

configureAuthSettings();


