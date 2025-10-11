-- Complete Flow Test: Cart -> Coupon -> Checkout -> Order History
-- This script tests the entire customer journey

-- Step 1: Clean up any existing test data
DELETE FROM orders WHERE customer_email LIKE '%test%' OR customer_phone LIKE '%999%';
DELETE FROM coupon_usage WHERE customer_email LIKE '%test%' OR customer_phone LIKE '%999%';

-- Step 2: Test customer information
SELECT '=== TESTING COMPLETE FLOW ===' as test_phase;

-- Step 3: Test first-time customer detection
SELECT 
  'Step 1: First-time Customer Check' as step,
  is_first_time_customer('test.customer@gmail.com', '9999999999') as is_first_time,
  'Should be TRUE for new customer' as expected;

-- Step 4: Test first order coupon availability
SELECT 
  'Step 2: First Order Coupon Check' as step,
  coupon_code,
  discount_amount,
  message
FROM get_first_order_coupon(
  600.00, -- Cart total above minimum (500)
  'test.customer@gmail.com',
  '9999999999'
);

-- Step 5: Test coupon application
SELECT 
  'Step 3: Coupon Application Test' as step,
  success,
  message,
  discount_amount,
  coupon_id
FROM apply_coupon(
  'WELCOME10',
  600.00,
  'test.customer@gmail.com',
  '9999999999'
);

-- Step 6: Create a test order (simulating checkout completion)
INSERT INTO orders (
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  items,
  subtotal,
  discount,
  delivery_fee,
  tax,
  total,
  status,
  payment_method,
  coupon_id,
  coupon_code,
  coupon_discount,
  delivery_address
) VALUES (
  NULL, -- Guest user
  'Test Customer',
  'test.customer@gmail.com',
  '9999999999',
  '[{"product": {"id": "1", "name": "Test Product", "price": 600}, "quantity": 1}]',
  600.00,
  0.00,
  0.00,
  54.00, -- Tax on discounted amount (600-60)*0.08
  654.00, -- Total with coupon discount
  'confirmed',
  'cod',
  (SELECT id FROM coupons WHERE code = 'WELCOME10'),
  'WELCOME10',
  60.00, -- 10% of 600
  '{"address": "123 Test Street", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "customer": {"firstName": "Test", "lastName": "Customer", "email": "test.customer@gmail.com", "phone": "9999999999"}}'
);

-- Step 7: Verify order was created with coupon information
SELECT 
  'Step 4: Order Creation Verification' as step,
  id,
  customer_name,
  customer_email,
  customer_phone,
  coupon_code,
  coupon_discount,
  total,
  status
FROM orders 
WHERE customer_email = 'test.customer@gmail.com'
ORDER BY created_at DESC
LIMIT 1;

-- Step 8: Verify coupon usage was tracked
SELECT 
  'Step 5: Coupon Usage Tracking' as step,
  cu.id,
  c.code as coupon_code,
  cu.customer_email,
  cu.discount_amount,
  cu.used_at
FROM coupon_usage cu
JOIN coupons c ON cu.coupon_id = c.id
WHERE cu.customer_email = 'test.customer@gmail.com';

-- Step 9: Test order history search by email
SELECT 
  'Step 6: Order History Search by Email' as step,
  id,
  customer_name,
  customer_email,
  customer_phone,
  coupon_code,
  coupon_discount,
  total,
  created_at
FROM orders 
WHERE customer_email = 'test.customer@gmail.com'
ORDER BY created_at DESC;

-- Step 10: Test order history search by phone
SELECT 
  'Step 7: Order History Search by Phone' as step,
  id,
  customer_name,
  customer_email,
  customer_phone,
  coupon_code,
  coupon_discount,
  total,
  created_at
FROM orders 
WHERE customer_phone = '9999999999'
ORDER BY created_at DESC;

-- Step 11: Test that same customer cannot use first order coupon again
SELECT 
  'Step 8: Second Order Coupon Test' as step,
  coupon_code,
  discount_amount,
  message
FROM get_first_order_coupon(
  800.00, -- New cart total
  'test.customer@gmail.com',
  '9999999999'
);

-- Step 12: Test applying first order coupon to existing customer (should fail)
SELECT 
  'Step 9: Second Coupon Application Test' as step,
  success,
  message,
  discount_amount
FROM apply_coupon(
  'WELCOME10',
  800.00,
  'test.customer@gmail.com',
  '9999999999'
);

-- Step 13: Create second order without coupon (simulating returning customer)
INSERT INTO orders (
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  items,
  subtotal,
  discount,
  delivery_fee,
  tax,
  total,
  status,
  payment_method,
  delivery_address
) VALUES (
  NULL, -- Guest user
  'Test Customer',
  'test.customer@gmail.com',
  '9999999999',
  '[{"product": {"id": "2", "name": "Another Product", "price": 800}, "quantity": 1}]',
  800.00,
  0.00,
  0.00,
  64.00, -- Tax on full amount
  864.00, -- Total without coupon
  'confirmed',
  'cod',
  '{"address": "123 Test Street", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "customer": {"firstName": "Test", "lastName": "Customer", "email": "test.customer@gmail.com", "phone": "9999999999"}}'
);

-- Step 14: Final order history verification
SELECT 
  'Step 10: Complete Order History' as step,
  id,
  customer_name,
  customer_email,
  customer_phone,
  coupon_code,
  coupon_discount,
  total,
  created_at,
  CASE 
    WHEN coupon_code IS NOT NULL THEN 'First Order (with coupon)'
    ELSE 'Returning Customer (no coupon)'
  END as order_type
FROM orders 
WHERE customer_email = 'test.customer@gmail.com'
ORDER BY created_at DESC;

-- Step 15: Show coupon usage summary
SELECT 
  'Step 11: Coupon Usage Summary' as step,
  c.code,
  c.name,
  c.used_count,
  COUNT(cu.id) as actual_usage_count
FROM coupons c
LEFT JOIN coupon_usage cu ON c.id = cu.coupon_id
WHERE c.code = 'WELCOME10'
GROUP BY c.id, c.code, c.name, c.used_count;

-- Step 16: Test with different customer (should get first order coupon)
SELECT 
  'Step 12: Different Customer Test' as step,
  coupon_code,
  discount_amount,
  message
FROM get_first_order_coupon(
  600.00,
  'another.customer@gmail.com',
  '8888888888'
);

-- Final summary
SELECT '=== FLOW TEST COMPLETED ===' as test_phase,
       'Check results above to verify each step worked correctly' as instructions;



