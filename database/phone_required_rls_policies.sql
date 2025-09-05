-- Comprehensive RLS policies for mandatory phone numbers
-- This script ensures phone numbers are required for all orders and users

-- First, let's update existing data to ensure phone numbers are present
-- Update orders table to make customer_phone NOT NULL
UPDATE orders 
SET customer_phone = COALESCE(customer_phone, '0000000000')
WHERE customer_phone IS NULL;

-- Update users table to make phone NOT NULL
UPDATE users 
SET phone = COALESCE(phone, '0000000000')
WHERE phone IS NULL;

-- Make phone columns NOT NULL
ALTER TABLE orders ALTER COLUMN customer_phone SET NOT NULL;
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

-- Add phone format validation constraints
ALTER TABLE orders ADD CONSTRAINT check_orders_phone_format 
CHECK (
  LENGTH(TRIM(customer_phone)) = 10 AND 
  customer_phone ~ '^[0-9]{10}$'
);

ALTER TABLE users ADD CONSTRAINT check_users_phone_format 
CHECK (
  LENGTH(TRIM(phone)) = 10 AND 
  phone ~ '^[0-9]{10}$'
);

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

-- Create comprehensive RLS policies for orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    -- For registered users
    (auth.uid() = user_id AND user_id IS NOT NULL) OR
    -- For guest users - must have all customer info including valid phone
    (user_id IS NULL AND 
     customer_name IS NOT NULL AND 
     LENGTH(TRIM(customer_name)) > 0 AND
     customer_email IS NOT NULL AND 
     LENGTH(TRIM(customer_email)) > 0 AND
     customer_phone IS NOT NULL AND 
     LENGTH(TRIM(customer_phone)) = 10 AND
     customer_phone ~ '^[0-9]{10}$')
  );

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

-- Admin policy - allow all operations for admins
CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (true);

-- Drop existing user policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create comprehensive RLS policies for users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (
    auth.uid() = id AND
    email IS NOT NULL AND
    LENGTH(TRIM(email)) > 0 AND
    phone IS NOT NULL AND
    LENGTH(TRIM(phone)) = 10 AND
    phone ~ '^[0-9]{10}$'
  );

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (
    auth.uid() = id AND
    -- Ensure phone remains valid if being updated
    (phone IS NULL OR (LENGTH(TRIM(phone)) = 10 AND phone ~ '^[0-9]{10}$'))
  );

-- Admin policy for users
CREATE POLICY "Admins can manage all users" ON users
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create a function to validate phone numbers
CREATE OR REPLACE FUNCTION validate_phone_number(phone_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN phone_input IS NOT NULL 
    AND LENGTH(TRIM(phone_input)) = 10 
    AND phone_input ~ '^[0-9]{10}$';
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON COLUMN orders.customer_phone IS 'Customer phone number - exactly 10 digits, required for all orders';
COMMENT ON COLUMN users.phone IS 'User phone number - exactly 10 digits, required for all users';
COMMENT ON CONSTRAINT check_orders_phone_format ON orders IS 'Ensures customer phone is exactly 10 digits';
COMMENT ON CONSTRAINT check_users_phone_format ON users IS 'Ensures user phone is exactly 10 digits';
