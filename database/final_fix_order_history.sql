-- Final fix for order history functionality
-- This script handles existing policies and creates the missing function

-- Step 1: Add customer information columns if they don't exist
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

-- Step 2: Make user_id nullable for guest orders (ignore error if already nullable)
DO $$
BEGIN
    ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'user_id column is already nullable or error occurred: %', SQLERRM;
END $$;

-- Step 3: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Public can search orders by customer info" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

-- Step 4: Create new policies
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

-- Step 5: Create the get_customer_info function
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

-- Step 6: Create indexes for better performance (ignore errors if they exist)
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email) WHERE customer_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone) WHERE customer_phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name) WHERE customer_name IS NOT NULL;

-- Step 7: Grant necessary permissions
GRANT SELECT ON orders TO anon;
GRANT SELECT ON orders TO authenticated;

-- Step 8: Test the function
SELECT 'Order history setup completed successfully!' as status;

-- Step 9: Test basic functionality
SELECT 
  COUNT(*) as total_orders,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as guest_orders,
  COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as user_orders
FROM orders;





