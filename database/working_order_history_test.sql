-- Working Order History Test (without the problematic function)
-- This script tests the basic order history functionality

-- Test 1: Check current orders and their customer information
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  total,
  status,
  created_at,
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 'Guest User'
    ELSE 'Missing Customer Info'
  END as order_type
FROM orders 
ORDER BY created_at DESC
LIMIT 10;

-- Test 2: Search orders by email (this should work)
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

-- Test 3: Search orders by phone number (this should work)
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

-- Test 4: Check for orders missing customer information
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

-- Test 5: Count orders by type
SELECT 
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 'Guest User'
    ELSE 'Missing Customer Info'
  END as order_type,
  COUNT(*) as count
FROM orders 
GROUP BY 
  CASE 
    WHEN user_id IS NOT NULL THEN 'Authenticated User'
    WHEN customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL THEN 'Guest User'
    ELSE 'Missing Customer Info'
  END;



