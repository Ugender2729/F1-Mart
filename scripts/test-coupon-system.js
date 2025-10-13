const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCouponSystem() {
  console.log('🧪 Testing Coupon System...\n');
  
  try {
    // Test 1: Check if tables exist
    console.log('1️⃣ Checking if tables exist...');
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['coupons', 'coupon_usage']);
    
    if (tableError) {
      console.log('❌ Error checking tables:', tableError.message);
    } else {
      console.log('✅ Tables found:', tables.map(t => t.table_name));
    }
    
    // Test 2: Check if default coupon exists
    console.log('\n2️⃣ Checking default coupon...');
    const { data: coupons, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', 'WELCOME10');
    
    if (couponError) {
      console.log('❌ Error checking coupons:', couponError.message);
    } else if (coupons.length > 0) {
      console.log('✅ Default coupon found:', coupons[0].name);
    } else {
      console.log('⚠️  Default coupon not found');
    }
    
    // Test 3: Test first order coupon function
    console.log('\n3️⃣ Testing first order coupon function...');
    const { data: firstOrderCoupon, error: firstOrderError } = await supabase
      .rpc('get_first_order_coupon', {
        p_amount: 1000,
        p_email: 'test@example.com',
        p_phone: '1234567890'
      });
    
    if (firstOrderError) {
      console.log('❌ Error testing first order coupon:', firstOrderError.message);
    } else {
      console.log('✅ First order coupon test result:', firstOrderCoupon);
    }
    
    // Test 4: Test coupon application function
    console.log('\n4️⃣ Testing coupon application...');
    const { data: applyResult, error: applyError } = await supabase
      .rpc('apply_coupon', {
        p_coupon_code: 'WELCOME10',
        p_amount: 1000,
        p_email: 'test@example.com',
        p_phone: '1234567890'
      });
    
    if (applyError) {
      console.log('❌ Error testing coupon application:', applyError.message);
    } else {
      console.log('✅ Coupon application test result:', applyResult);
    }
    
    // Test 5: Test applicable coupons function
    console.log('\n5️⃣ Testing applicable coupons...');
    const { data: applicableCoupons, error: applicableError } = await supabase
      .rpc('get_applicable_coupons', {
        p_amount: 1000,
        p_email: 'test@example.com',
        p_phone: '1234567890'
      });
    
    if (applicableError) {
      console.log('❌ Error testing applicable coupons:', applicableError.message);
    } else {
      console.log('✅ Applicable coupons found:', applicableCoupons.length);
      applicableCoupons.forEach(coupon => {
        console.log(`   - ${coupon.code}: ${coupon.name} (${coupon.discount_amount} discount)`);
      });
    }
    
    console.log('\n🎉 Coupon system test completed!');
    
  } catch (error) {
    console.error('❌ Fatal error during testing:', error.message);
  }
}

testCouponSystem();




