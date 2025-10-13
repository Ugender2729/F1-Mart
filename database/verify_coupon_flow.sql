-- Quick Verification of Coupon Flow
-- Run this to check if everything is working

-- Check 1: Verify tables exist
SELECT 
  'Tables Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'coupons') 
    THEN '✅ coupons table exists'
    ELSE '❌ coupons table missing'
  END as result
UNION ALL
SELECT 
  'Tables Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'coupon_usage') 
    THEN '✅ coupon_usage table exists'
    ELSE '❌ coupon_usage table missing'
  END as result
UNION ALL
SELECT 
  'Tables Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'coupon_id') 
    THEN '✅ orders table has coupon columns'
    ELSE '❌ orders table missing coupon columns'
  END as result;

-- Check 2: Verify functions exist
SELECT 
  'Functions Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'is_first_time_customer') 
    THEN '✅ is_first_time_customer function exists'
    ELSE '❌ is_first_time_customer function missing'
  END as result
UNION ALL
SELECT 
  'Functions Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'get_first_order_coupon') 
    THEN '✅ get_first_order_coupon function exists'
    ELSE '❌ get_first_order_coupon function missing'
  END as result
UNION ALL
SELECT 
  'Functions Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'apply_coupon') 
    THEN '✅ apply_coupon function exists'
    ELSE '❌ apply_coupon function missing'
  END as result;

-- Check 3: Verify default coupon exists
SELECT 
  'Coupon Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM coupons WHERE code = 'WELCOME10') 
    THEN '✅ WELCOME10 coupon exists'
    ELSE '❌ WELCOME10 coupon missing'
  END as result;

-- Check 4: Show default coupon details
SELECT 
  'Coupon Details' as check_type,
  code,
  name,
  type,
  value,
  minimum_amount,
  maximum_discount,
  is_first_order_only,
  is_active
FROM coupons 
WHERE code = 'WELCOME10';

-- Check 5: Test first-time customer detection
SELECT 
  'Function Test' as check_type,
  'First-time customer detection' as test_name,
  is_first_time_customer('test.new@gmail.com', '7777777777') as result,
  'Should return TRUE' as expected;

-- Check 6: Test first order coupon
SELECT 
  'Function Test' as check_type,
  'First order coupon' as test_name,
  coupon_code as result,
  'Should return WELCOME10' as expected
FROM get_first_order_coupon(
  600.00,
  'test.new@gmail.com',
  '7777777777'
);

-- Check 7: Test coupon application
SELECT 
  'Function Test' as check_type,
  'Coupon application' as test_name,
  success as result,
  'Should return TRUE' as expected
FROM apply_coupon(
  'WELCOME10',
  600.00,
  'test.new@gmail.com',
  '7777777777'
);

-- Summary
SELECT 
  'SUMMARY' as check_type,
  'If all checks show ✅, your coupon system is ready!' as result;





