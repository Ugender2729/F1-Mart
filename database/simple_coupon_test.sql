-- Simple First Order Coupon Test
-- Run this AFTER the complete_coupon_system.sql script

-- Test 1: Check if tables exist
SELECT 
  'Tables Check' as test_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'coupons') 
    THEN 'PASS - coupons table exists'
    ELSE 'FAIL - coupons table missing'
  END as result;

-- Test 2: Check if functions exist
SELECT 
  'Functions Check' as test_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'is_first_time_customer') 
    THEN 'PASS - is_first_time_customer function exists'
    ELSE 'FAIL - is_first_time_customer function missing'
  END as result;

-- Test 3: Check default coupon
SELECT 
  'Default Coupon Check' as test_type,
  code,
  name,
  is_first_order_only,
  is_active
FROM coupons 
WHERE code = 'WELCOME10';

-- Test 4: Test first-time customer detection (should return true for new customer)
SELECT 
  'First-time Customer Test' as test_type,
  is_first_time_customer('new.customer@gmail.com', '9876543210') as is_first_time;

-- Test 5: Test first order coupon for new customer
SELECT 
  'First Order Coupon Test' as test_type,
  coupon_code,
  discount_amount,
  message
FROM get_first_order_coupon(
  600.00, -- Amount above minimum (500)
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 6: Test applying first order coupon
SELECT 
  'Apply Coupon Test' as test_type,
  success,
  message,
  discount_amount
FROM apply_coupon(
  'WELCOME10',
  600.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 7: Show all available coupons
SELECT 
  'Available Coupons' as test_type,
  code,
  name,
  type,
  value,
  minimum_amount,
  is_first_order_only
FROM coupons 
WHERE is_active = true
ORDER BY is_first_order_only DESC, value DESC;



