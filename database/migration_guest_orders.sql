-- Migration to allow guest orders
-- This script modifies the orders table to support guest orders
-- Safe version that handles existing columns

-- First, make user_id nullable to allow guest orders (if not already nullable)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' 
        AND column_name = 'user_id' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;
        RAISE NOTICE 'Made user_id nullable';
    ELSE
        RAISE NOTICE 'user_id is already nullable';
    END IF;
END $$;

-- Add customer information columns for guest orders (if they don't exist)
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

-- Add constraint to ensure either user_id or customer_email is provided (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'orders' AND constraint_name = 'check_user_or_customer'
    ) THEN
        ALTER TABLE orders ADD CONSTRAINT check_user_or_customer 
        CHECK (user_id IS NOT NULL OR customer_email IS NOT NULL);
        RAISE NOTICE 'Added check_user_or_customer constraint';
    ELSE
        RAISE NOTICE 'check_user_or_customer constraint already exists';
    END IF;
END $$;

-- Update indexes to handle nullable user_id (if needed)
DO $$ 
BEGIN
    -- Drop existing index if it exists
    IF EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'orders' AND indexname = 'idx_orders_user_id'
    ) THEN
        DROP INDEX idx_orders_user_id;
        RAISE NOTICE 'Dropped existing idx_orders_user_id index';
    END IF;

    -- Create new index for user_id (only for non-null values)
    CREATE INDEX idx_orders_user_id ON orders(user_id) WHERE user_id IS NOT NULL;
    RAISE NOTICE 'Created new idx_orders_user_id index';

    -- Create index for customer_email (only for non-null values)
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'orders' AND indexname = 'idx_orders_customer_email'
    ) THEN
        CREATE INDEX idx_orders_customer_email ON orders(customer_email) WHERE customer_email IS NOT NULL;
        RAISE NOTICE 'Created idx_orders_customer_email index';
    ELSE
        RAISE NOTICE 'idx_orders_customer_email index already exists';
    END IF;
END $$;

-- Add comments to document the changes
COMMENT ON COLUMN orders.user_id IS 'User ID for registered users, NULL for guest orders';
COMMENT ON COLUMN orders.customer_name IS 'Customer name for guest orders';
COMMENT ON COLUMN orders.customer_email IS 'Customer email for guest orders';
COMMENT ON COLUMN orders.customer_phone IS 'Customer phone for guest orders';

-- Final success message
SELECT 'Guest order support migration completed successfully!' as status;

