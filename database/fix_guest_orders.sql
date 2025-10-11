-- Fix orders table to support guest orders
-- This script updates the orders table to allow guest orders

-- Step 1: Make user_id nullable for guest orders
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Step 2: Add customer information fields for guest orders (if they don't exist)
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

    -- Add coupon fields if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_id'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_id UUID;
        RAISE NOTICE 'Added coupon_id column';
    ELSE
        RAISE NOTICE 'coupon_id column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_code'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(50);
        RAISE NOTICE 'Added coupon_code column';
    ELSE
        RAISE NOTICE 'coupon_code column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_discount'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_discount DECIMAL(10,2) DEFAULT 0.0;
        RAISE NOTICE 'Added coupon_discount column';
    ELSE
        RAISE NOTICE 'coupon_discount column already exists';
    END IF;
END $$;

-- Step 3: Add constraint to ensure either user_id or customer information is provided
DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'orders' AND constraint_name = 'check_user_or_guest'
    ) THEN
        ALTER TABLE orders DROP CONSTRAINT check_user_or_guest;
        RAISE NOTICE 'Dropped existing check_user_or_guest constraint';
    END IF;

    -- Add new constraint
    ALTER TABLE orders ADD CONSTRAINT check_user_or_guest 
    CHECK (
      (user_id IS NOT NULL) OR 
      (customer_name IS NOT NULL AND customer_email IS NOT NULL)
    );
    RAISE NOTICE 'Added check_user_or_guest constraint';
END $$;

-- Step 4: Update RLS policies to allow guest orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

-- Create new policies that allow guest orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND customer_name IS NOT NULL AND customer_email IS NOT NULL)
  );

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

-- Allow public access for guest orders (you may want to restrict this further)
CREATE POLICY "Public can insert guest orders" ON orders
  FOR INSERT WITH CHECK (
    user_id IS NULL AND customer_name IS NOT NULL AND customer_email IS NOT NULL
  );

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_coupon_code ON orders(coupon_code);

-- Step 6: Enable RLS if not already enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Success message
SELECT 'Orders table updated successfully to support guest orders!' as status;
