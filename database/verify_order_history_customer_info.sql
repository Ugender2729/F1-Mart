-- Verify Order History Customer Information Storage
-- This script confirms that customer information (mobile & Gmail) is being saved properly

-- Test 1: Check if customer information columns exist in orders table
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
  AND column_name IN ('customer_name', 'customer_email', 'customer_phone', 'user_id')
ORDER BY column_name;

-- Test 2: Check current orders and their customer information
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  status,
  total,
  created_at,
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 'Guest User'
    ELSE 'Missing Customer Info'
  END as order_type
FROM orders 
ORDER BY created_at DESC
LIMIT 10;

-- Test 3: Test inserting a guest order with customer information
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
  '9876543210',
  '[{"product": {"id": "1", "name": "Test Product", "price": 100}, "quantity": 1}]',
  100.00,
  0.00,
  50.00,
  27.00,
  177.00,
  'confirmed',
  'cod',
  '{"address": "123 Test St", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "customer": {"firstName": "Test", "lastName": "Customer", "email": "test.customer@gmail.com", "phone": "9876543210"}}'
);

-- Test 4: Search orders by Gmail address
SELECT 
  id,
  customer_name,
  customer_email,
  customer_phone,
  total,
  status,
  created_at
FROM orders 
WHERE customer_email = 'test.customer@gmail.com'
ORDER BY created_at DESC;

-- Test 5: Search orders by mobile number
SELECT 
  id,
  customer_name,
  customer_email,
  customer_phone,
  total,
  status,
  created_at
FROM orders 
WHERE customer_phone = '9876543210'
ORDER BY created_at DESC;

-- Test 6: Test inserting an authenticated user order
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
  (SELECT id FROM users LIMIT 1), -- Use existing user
  'Authenticated User',
  'user@gmail.com',
  '8765432109',
  '[{"product": {"id": "2", "name": "Another Product", "price": 150}, "quantity": 1}]',
  150.00,
  0.00,
  0.00,
  27.00,
  177.00,
  'confirmed',
  'card',
  '{"address": "456 User St", "city": "Delhi", "state": "Delhi", "zipCode": "110001", "customer": {"firstName": "Authenticated", "lastName": "User", "email": "user@gmail.com", "phone": "8765432109"}}'
);

-- Test 7: Verify both order types are saved with customer info
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    ELSE 'Guest User'
  END as order_type,
  created_at
FROM orders 
WHERE customer_email IN ('test.customer@gmail.com', 'user@gmail.com')
ORDER BY created_at DESC;

-- Test 8: Check order history search functionality
-- Search by Gmail
SELECT 
  'Search by Gmail' as search_type,
  COUNT(*) as found_orders
FROM orders 
WHERE customer_email = 'test.customer@gmail.com';

-- Search by mobile
SELECT 
  'Search by Mobile' as search_type,
  COUNT(*) as found_orders
FROM orders 
WHERE customer_phone = '9876543210';

-- Test 9: Verify customer information is complete
SELECT 
  'Customer Info Completeness Check' as check_type,
  COUNT(*) as total_orders,
  COUNT(CASE WHEN customer_name IS NOT NULL THEN 1 END) as has_name,
  COUNT(CASE WHEN customer_email IS NOT NULL THEN 1 END) as has_email,
  COUNT(CASE WHEN customer_phone IS NOT NULL THEN 1 END) as has_phone,
  COUNT(CASE WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 1 END) as complete_info
FROM orders;

-- Test 10: Check for Gmail addresses specifically
SELECT 
  'Gmail Address Check' as check_type,
  COUNT(*) as total_orders,
  COUNT(CASE WHEN customer_email LIKE '%@gmail.com' THEN 1 END) as gmail_orders,
  COUNT(CASE WHEN customer_email NOT LIKE '%@gmail.com' AND customer_email IS NOT NULL THEN 1 END) as non_gmail_orders
FROM orders;

-- Clean up test data (uncomment to run)
-- DELETE FROM orders WHERE customer_email IN ('test.customer@gmail.com', 'user@gmail.com');





