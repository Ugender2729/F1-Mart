-- Simple Order History Test (without the function)
-- This script tests the basic order history functionality

-- Test 1: Insert a guest order with customer information
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
  'John Doe',
  'john.doe@gmail.com',
  '9876543210',
  '[{"product": {"id": "1", "name": "Test Product", "price": 100}, "quantity": 2}]',
  200.00,
  0.00,
  50.00,
  45.00,
  295.00,
  'confirmed',
  'cod',
  '{"address": "123 Test St", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "customer": {"firstName": "John", "lastName": "Doe", "email": "john.doe@gmail.com", "phone": "9876543210"}}'
);

-- Test 2: Search orders by email
SELECT 
  id,
  customer_name,
  customer_email,
  customer_phone,
  total,
  status,
  created_at
FROM orders 
WHERE customer_email = 'john.doe@gmail.com'
ORDER BY created_at DESC;

-- Test 3: Search orders by phone number
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

-- Test 4: Verify all orders have customer information
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 'Guest User'
    ELSE 'Missing Customer Info'
  END as order_type
FROM orders 
ORDER BY created_at DESC;

-- Test 5: Check for any orders missing customer information
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  created_at
FROM orders 
WHERE (user_id IS NULL AND (customer_name IS NULL OR customer_email IS NULL OR customer_phone IS NULL))
   OR (user_id IS NOT NULL AND customer_name IS NULL AND customer_email IS NULL AND customer_phone IS NULL);

-- Clean up test data (uncomment to run)
-- DELETE FROM orders WHERE customer_email = 'john.doe@gmail.com';





