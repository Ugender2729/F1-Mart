-- Update orders table to make customer phone number compulsory
-- This script ensures mobile numbers are required for all orders

-- First, update existing orders that have NULL customer_phone
-- For registered users, we'll try to get phone from users table
UPDATE orders 
SET customer_phone = u.phone
FROM users u
WHERE orders.user_id = u.id 
  AND orders.customer_phone IS NULL 
  AND u.phone IS NOT NULL;

-- For orders that still have NULL customer_phone, set a default value
-- This ensures data integrity while we implement the requirement
UPDATE orders 
SET customer_phone = 'Not Provided'
WHERE customer_phone IS NULL;

-- Make customer_phone NOT NULL
ALTER TABLE orders ALTER COLUMN customer_phone SET NOT NULL;

-- Update the constraint to require customer information including phone
ALTER TABLE orders DROP CONSTRAINT IF EXISTS check_user_or_guest;

ALTER TABLE orders ADD CONSTRAINT check_user_or_guest 
CHECK (
  (user_id IS NOT NULL) OR 
  (customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL)
);

-- Update RLS policies to ensure phone number is provided
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND 
     customer_name IS NOT NULL AND 
     customer_email IS NOT NULL AND 
     customer_phone IS NOT NULL AND
     LENGTH(TRIM(customer_phone)) >= 10) -- Ensure phone has at least 10 digits
  );

-- Add validation for phone number format
ALTER TABLE orders ADD CONSTRAINT check_phone_format 
CHECK (
  customer_phone IS NULL OR 
  (LENGTH(TRIM(customer_phone)) >= 10 AND customer_phone ~ '^[0-9+\-\s()]+$')
);

-- Create index for phone number searches
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone_search ON orders(customer_phone);

-- Update the users table to ensure phone is also required there
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

-- Add phone format validation for users table
ALTER TABLE users ADD CONSTRAINT check_user_phone_format 
CHECK (
  LENGTH(TRIM(phone)) >= 10 AND phone ~ '^[0-9+\-\s()]+$'
);

-- Create index for user phone searches
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
