-- Fix Orders Table for Mobile Number and Email Storage
-- This script will add the missing customer information columns

-- First, make user_id nullable to allow guest orders
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

-- Add customer information columns for guest orders
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

-- Add constraint to ensure either user_id or customer_email is provided
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

-- Create indexes for better performance
DO $$ 
BEGIN
    -- Create index for customer_email
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'orders' AND indexname = 'idx_orders_customer_email'
    ) THEN
        CREATE INDEX idx_orders_customer_email ON orders(customer_email) WHERE customer_email IS NOT NULL;
        RAISE NOTICE 'Created idx_orders_customer_email index';
    ELSE
        RAISE NOTICE 'idx_orders_customer_email index already exists';
    END IF;

    -- Create index for customer_phone
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'orders' AND indexname = 'idx_orders_customer_phone'
    ) THEN
        CREATE INDEX idx_orders_customer_phone ON orders(customer_phone) WHERE customer_phone IS NOT NULL;
        RAISE NOTICE 'Created idx_orders_customer_phone index';
    ELSE
        RAISE NOTICE 'idx_orders_customer_phone index already exists';
    END IF;
END $$;

-- Add comments to document the changes
COMMENT ON COLUMN orders.user_id IS 'User ID for registered users, NULL for guest orders';
COMMENT ON COLUMN orders.customer_name IS 'Customer name for guest orders';
COMMENT ON COLUMN orders.customer_email IS 'Customer email for guest orders';
COMMENT ON COLUMN orders.customer_phone IS 'Customer phone for guest orders';

-- Final success message
SELECT 'Orders table fixed for mobile number and email storage!' as status;
