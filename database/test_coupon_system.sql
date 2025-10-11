-- Test script for First Order Coupon System
-- This script tests the automatic first order coupon functionality

-- Test 1: Check if coupon system tables exist
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name IN ('coupons', 'coupon_usage')
ORDER BY table_name, column_name;

-- Test 2: Check default first order coupon
SELECT 
  code,
  name,
  description,
  type,
  value,
  minimum_amount,
  maximum_discount,
  is_first_order_only,
  is_active,
  valid_from,
  valid_until
FROM coupons 
WHERE is_first_order_only = true;

-- Test 3: Test first-time customer detection
SELECT 
  'First-time customer check' as test_type,
  is_first_time_customer('new.customer@gmail.com', '9876543210') as is_first_time;

-- Test 4: Test existing customer detection
SELECT 
  'Existing customer check' as test_type,
  is_first_time_customer('test.customer@gmail.com', '9876543210') as is_first_time;

-- Test 5: Test getting first order coupon for new customer
SELECT * FROM get_first_order_coupon(
  600.00, -- Amount above minimum
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 6: Test getting first order coupon for existing customer
SELECT * FROM get_first_order_coupon(
  600.00, -- Amount above minimum
  'test.customer@gmail.com',
  '9876543210'
);

-- Test 7: Test getting first order coupon for amount below minimum
SELECT * FROM get_first_order_coupon(
  300.00, -- Amount below minimum (500)
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 8: Test applying first order coupon
SELECT * FROM apply_coupon(
  'WELCOME10',
  600.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 9: Test applying first order coupon to existing customer (should fail)
SELECT * FROM apply_coupon(
  'WELCOME10',
  600.00,
  'test.customer@gmail.com',
  '9876543210'
);

-- Test 10: Test applying first order coupon below minimum amount (should fail)
SELECT * FROM apply_coupon(
  'WELCOME10',
  300.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 11: Test getting applicable coupons for new customer
SELECT * FROM get_applicable_coupons(
  600.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 12: Test getting applicable coupons for existing customer
SELECT * FROM get_applicable_coupons(
  600.00,
  'test.customer@gmail.com',
  '9876543210'
);

-- Test 13: Insert a test order with first order coupon
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
  'New Customer',
  'new.customer@gmail.com',
  '9876543210',
  '[{"product": {"id": "1", "name": "Test Product", "price": 600}, "quantity": 1}]',
  600.00,
  0.00,
  0.00,
  54.00,
  654.00,
  'confirmed',
  'cod',
  (SELECT id FROM coupons WHERE code = 'WELCOME10'),
  'WELCOME10',
  60.00, -- 10% of 600
  '{"address": "123 Test St", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "customer": {"firstName": "New", "lastName": "Customer", "email": "new.customer@gmail.com", "phone": "9876543210"}}'
);

-- Test 14: Check if coupon usage was tracked
SELECT 
  cu.id,
  cu.coupon_id,
  c.code as coupon_code,
  cu.customer_email,
  cu.discount_amount,
  cu.used_at
FROM coupon_usage cu
JOIN coupons c ON cu.coupon_id = c.id
WHERE cu.customer_email = 'new.customer@gmail.com';

-- Test 15: Check if coupon usage count was updated
SELECT 
  code,
  name,
  used_count,
  usage_limit
FROM coupons 
WHERE code = 'WELCOME10';

-- Test 16: Test that same customer can't use first order coupon again
SELECT * FROM get_first_order_coupon(
  600.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 17: Test applying first order coupon to same customer again (should fail)
SELECT * FROM apply_coupon(
  'WELCOME10',
  600.00,
  'new.customer@gmail.com',
  '9876543210'
);

-- Test 18: Show all orders with coupon information
SELECT 
  id,
  customer_name,
  customer_email,
  coupon_code,
  coupon_discount,
  total,
  created_at
FROM orders 
WHERE coupon_code IS NOT NULL
ORDER BY created_at DESC;

-- Test 19: Show coupon usage summary
SELECT 
  c.code,
  c.name,
  c.used_count,
  c.usage_limit,
  COUNT(cu.id) as actual_usage_count
FROM coupons c
LEFT JOIN coupon_usage cu ON c.id = cu.coupon_id
GROUP BY c.id, c.code, c.name, c.used_count, c.usage_limit
ORDER BY c.code;

-- Clean up test data (uncomment to run)
-- DELETE FROM orders WHERE customer_email = 'new.customer@gmail.com';
-- DELETE FROM coupon_usage WHERE customer_email = 'new.customer@gmail.com';



