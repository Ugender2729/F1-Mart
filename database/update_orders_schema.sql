-- Update orders table to support guest orders
-- This script modifies the existing orders table to allow guest orders

-- First, make user_id nullable for guest orders
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Add customer information fields for guest orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone VARCHAR(20);

-- Add constraint to ensure either user_id or customer information is provided
ALTER TABLE orders ADD CONSTRAINT check_user_or_guest 
CHECK (
  (user_id IS NOT NULL) OR 
  (customer_name IS NOT NULL AND customer_email IS NOT NULL)
);

-- Update RLS policies to allow guest orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;

-- Create new policies that allow guest orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND customer_name IS NOT NULL AND customer_email IS NOT NULL)
  );

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow admins to view all orders (you may need to adjust this based on your admin setup)
CREATE POLICY "Admins can view all orders" ON orders
  FOR ALL USING (true);

-- Create index for better performance on guest orders
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
