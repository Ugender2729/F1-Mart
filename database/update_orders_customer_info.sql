-- Update orders table to support customer information for both authenticated and guest users
-- This script ensures proper customer information storage for order history

-- First, make user_id nullable for guest orders
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Add customer information fields for guest orders (if they don't exist)
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

-- Update existing orders to populate customer information from delivery_address if available
UPDATE orders 
SET 
    customer_name = COALESCE(
        customer_name,
        CASE 
            WHEN delivery_address->>'customer' IS NOT NULL THEN
                CONCAT(
                    COALESCE(delivery_address->'customer'->>'firstName', ''),
                    ' ',
                    COALESCE(delivery_address->'customer'->>'lastName', '')
                )
            ELSE NULL
        END
    ),
    customer_email = COALESCE(
        customer_email,
        delivery_address->'customer'->>'email'
    ),
    customer_phone = COALESCE(
        customer_phone,
        delivery_address->'customer'->>'phone'
    )
WHERE customer_name IS NULL OR customer_email IS NULL OR customer_phone IS NULL;

-- For authenticated users, try to get customer info from users table
UPDATE orders 
SET 
    customer_name = COALESCE(
        customer_name,
        CONCAT(u.first_name, ' ', u.last_name)
    ),
    customer_email = COALESCE(
        customer_email,
        u.email
    ),
    customer_phone = COALESCE(
        customer_phone,
        u.phone
    )
FROM users u
WHERE orders.user_id = u.id 
  AND (orders.customer_name IS NULL OR orders.customer_email IS NULL OR orders.customer_phone IS NULL);

-- Add constraint to ensure either user_id or customer information is provided
ALTER TABLE orders DROP CONSTRAINT IF EXISTS check_user_or_guest;

ALTER TABLE orders ADD CONSTRAINT check_user_or_guest 
CHECK (
  (user_id IS NOT NULL) OR 
  (customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL)
);

-- Update RLS policies to allow guest orders and proper customer data access
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;

-- Create new policies that allow guest orders and customer information access
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
     customer_phone IS NOT NULL AND
     LENGTH(TRIM(customer_phone)) >= 10)
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

-- Create indexes for better performance on customer information searches
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email) WHERE customer_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone) WHERE customer_phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name) WHERE customer_name IS NOT NULL;

-- Add validation constraints for customer information
ALTER TABLE orders ADD CONSTRAINT check_customer_email_format 
CHECK (
  customer_email IS NULL OR 
  customer_email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
);

ALTER TABLE orders ADD CONSTRAINT check_customer_phone_format 
CHECK (
  customer_phone IS NULL OR 
  (LENGTH(TRIM(customer_phone)) >= 10 AND customer_phone ~ '^[0-9+\-\s()]+$')
);

-- Add comments for documentation
COMMENT ON COLUMN orders.customer_name IS 'Customer full name for guest orders or backup for authenticated users';
COMMENT ON COLUMN orders.customer_email IS 'Customer email address for guest orders or backup for authenticated users';
COMMENT ON COLUMN orders.customer_phone IS 'Customer phone number for guest orders or backup for authenticated users';

-- Create a function to get customer information (prioritizes direct fields over delivery_address)
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

-- Grant necessary permissions
GRANT SELECT ON orders TO anon;
GRANT SELECT ON orders TO authenticated;

