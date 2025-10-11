const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runCouponSystem() {
  try {
    console.log('🚀 Starting coupon system setup...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'database', 'coupon_system.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        
        const { data, error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        });
        
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message);
          // Continue with other statements
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      }
    }
    
    console.log('🎉 Coupon system setup completed!');
    
    // Test the system
    console.log('🧪 Testing coupon system...');
    
    // Test getting applicable coupons
    const { data: coupons, error: couponError } = await supabase
      .rpc('get_applicable_coupons', {
        p_amount: 1000,
        p_email: 'test@example.com',
        p_phone: '1234567890'
      });
    
    if (couponError) {
      console.error('❌ Error testing coupons:', couponError.message);
    } else {
      console.log('✅ Coupon system test successful!');
      console.log('📊 Available coupons:', coupons);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

runCouponSystem();


