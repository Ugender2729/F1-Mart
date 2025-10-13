-- Fix the get_customer_info function issue
-- Run this script if you're getting the "function get_customer_info does not exist" error

-- First, let's make sure the customer information columns exist
DO $$ 
BEGIN
    -- Add customer_name column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'customer_name'
    ) THEN
        ALTER TABLE orders ADD COLUMN customer_name VARCHAR(255);
        RAISE NOTICE 'Added customer_name column';
    ELSE
        RAISE NOTICE 'customer_name column already exists';
    END IF;

    -- Add customer_email column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'customer_email'
    ) THEN
        ALTER TABLE orders ADD COLUMN customer_email VARCHAR(255);
        RAISE NOTICE 'Added customer_email column';
    ELSE
        RAISE NOTICE 'customer_email column already exists';
    END IF;

    -- Add customer_phone column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'customer_phone'
    ) THEN
        ALTER TABLE orders ADD COLUMN customer_phone VARCHAR(20);
        RAISE NOTICE 'Added customer_phone column';
    ELSE
        RAISE NOTICE 'customer_phone column already exists';
    END IF;
END $$;

-- Make user_id nullable for guest orders
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Create the get_customer_info function
CREATE OR REPLACE FUNCTION get_customer_info(order_row orders)
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'name', COALESCE(order_row.customer_name, 
      CASE 
        WHEN order_row.delivery_address->>'customer' IS NOT NULL THEN
          CONCAT(
            COALESCE(order_row.delivery_address->'customer'->>'firstName', ''),
            ' ',
            COALESCE(order_row.delivery_address->'customer'->>'lastName', '')
          )
        ELSE NULL
      END
    ),
    'email', COALESCE(order_row.customer_email, order_row.delivery_address->'customer'->>'email'),
    'phone', COALESCE(order_row.customer_phone, order_row.delivery_address->'customer'->>'phone')
  );
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email) WHERE customer_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone) WHERE customer_phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name) WHERE customer_name IS NOT NULL;

-- Update RLS policies to allow guest orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;

-- Create new policies that allow guest orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND 
     customer_name IS NOT NULL AND 
     customer_email IS NOT NULL AND 
     customer_phone IS NOT NULL)
  );

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

-- Allow public access for order history lookup (for guest users)
CREATE POLICY "Public can search orders by customer info" ON orders
  FOR SELECT USING (
    user_id IS NULL AND 
    customer_email IS NOT NULL AND 
    customer_phone IS NOT NULL
  );

-- Grant necessary permissions
GRANT SELECT ON orders TO anon;
GRANT SELECT ON orders TO authenticated;

-- Test the function
SELECT 'Function created successfully!' as status;





