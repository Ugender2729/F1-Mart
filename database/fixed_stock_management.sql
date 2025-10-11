-- Fixed Stock Management System with Automatic Low Stock Warnings
-- This script handles existing constraints and avoids conflicts

-- Step 1: Add stock management columns to products table
DO $$ 
BEGIN
    -- Add low_stock_threshold column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'low_stock_threshold'
    ) THEN
        ALTER TABLE products ADD COLUMN low_stock_threshold INTEGER DEFAULT 10;
        RAISE NOTICE 'Added low_stock_threshold column';
    ELSE
        RAISE NOTICE 'low_stock_threshold column already exists';
    END IF;

    -- Add stock_status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'stock_status'
    ) THEN
        ALTER TABLE products ADD COLUMN stock_status VARCHAR(20) DEFAULT 'in_stock';
        RAISE NOTICE 'Added stock_status column';
    ELSE
        RAISE NOTICE 'stock_status column already exists';
    END IF;

    -- Add last_stock_update column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'last_stock_update'
    ) THEN
        ALTER TABLE products ADD COLUMN last_stock_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added last_stock_update column';
    ELSE
        RAISE NOTICE 'last_stock_update column already exists';
    END IF;

    -- Add stock_warning_sent column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'stock_warning_sent'
    ) THEN
        ALTER TABLE products ADD COLUMN stock_warning_sent BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added stock_warning_sent column';
    ELSE
        RAISE NOTICE 'stock_warning_sent column already exists';
    END IF;
END $$;

-- Step 2: Create or replace function to check if product is low stock
CREATE OR REPLACE FUNCTION is_low_stock(product_row products)
RETURNS BOOLEAN AS $$
BEGIN
  -- For powder products (check if category contains 'powder' or unit is 'kg')
  IF LOWER(product_row.category) LIKE '%powder%' OR LOWER(product_row.unit) = 'kg' THEN
    -- For powder products, check if stock is less than 10kg
    RETURN product_row.stock < 10;
  ELSE
    -- For other products, check if stock is less than 10 items
    RETURN product_row.stock < 10;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create or replace function to get stock status
CREATE OR REPLACE FUNCTION get_stock_status(product_row products)
RETURNS VARCHAR(20) AS $$
BEGIN
  IF product_row.stock <= 0 THEN
    RETURN 'out_of_stock';
  ELSIF is_low_stock(product_row) THEN
    RETURN 'low_stock';
  ELSE
    RETURN 'in_stock';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create or replace function to update stock status automatically
CREATE OR REPLACE FUNCTION update_stock_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stock status based on current stock level
  NEW.stock_status = get_stock_status(NEW);
  
  -- Update last_stock_update timestamp
  NEW.last_stock_update = NOW();
  
  -- Reset stock_warning_sent if stock is back to normal
  IF NEW.stock_status = 'in_stock' THEN
    NEW.stock_warning_sent = false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_product_stock_status ON products;
CREATE TRIGGER update_product_stock_status
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_stock_status();

-- Step 6: Update existing products with current stock status
UPDATE products 
SET 
  stock_status = get_stock_status(products.*),
  last_stock_update = NOW()
WHERE stock_status IS NULL OR last_stock_update IS NULL;

-- Step 7: Create or replace function to get low stock products
CREATE OR REPLACE FUNCTION get_low_stock_products()
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  category VARCHAR(100),
  stock INTEGER,
  unit VARCHAR(50),
  stock_status VARCHAR(20),
  low_stock_threshold INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.category,
    p.stock,
    p.unit,
    p.stock_status,
    p.low_stock_threshold
  FROM products p
  WHERE p.stock_status IN ('low_stock', 'out_of_stock')
  ORDER BY p.stock ASC, p.name ASC;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create or replace function to get stock summary
CREATE OR REPLACE FUNCTION get_stock_summary()
RETURNS TABLE (
  total_products INTEGER,
  in_stock_count INTEGER,
  low_stock_count INTEGER,
  out_of_stock_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_products,
    COUNT(CASE WHEN stock_status = 'in_stock' THEN 1 END)::INTEGER as in_stock_count,
    COUNT(CASE WHEN stock_status = 'low_stock' THEN 1 END)::INTEGER as low_stock_count,
    COUNT(CASE WHEN stock_status = 'out_of_stock' THEN 1 END)::INTEGER as out_of_stock_count
  FROM products;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create indexes for better performance (ignore errors if they exist)
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON products(stock_status);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_low_stock ON products(stock_status, stock) WHERE stock_status IN ('low_stock', 'out_of_stock');

-- Step 10: Drop existing constraints if they exist and add new ones
DO $$
BEGIN
    -- Drop existing constraints if they exist
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'check_stock_status' AND table_name = 'products'
    ) THEN
        ALTER TABLE products DROP CONSTRAINT check_stock_status;
        RAISE NOTICE 'Dropped existing check_stock_status constraint';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'check_low_stock_threshold' AND table_name = 'products'
    ) THEN
        ALTER TABLE products DROP CONSTRAINT check_low_stock_threshold;
        RAISE NOTICE 'Dropped existing check_low_stock_threshold constraint';
    END IF;

    -- Add new constraints
    ALTER TABLE products ADD CONSTRAINT check_stock_status 
    CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock'));
    
    ALTER TABLE products ADD CONSTRAINT check_low_stock_threshold 
    CHECK (low_stock_threshold >= 0);
    
    RAISE NOTICE 'Added new constraints successfully';
END $$;

-- Step 11: Add comments for documentation (ignore errors if they exist)
DO $$
BEGIN
    COMMENT ON COLUMN products.low_stock_threshold IS 'Minimum stock level before low stock warning (default: 10)';
    COMMENT ON COLUMN products.stock_status IS 'Current stock status: in_stock, low_stock, or out_of_stock';
    COMMENT ON COLUMN products.last_stock_update IS 'Timestamp of last stock update';
    COMMENT ON COLUMN products.stock_warning_sent IS 'Whether low stock warning has been sent to admin';
    RAISE NOTICE 'Added column comments';
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Comments may already exist or could not be added: %', SQLERRM;
END $$;

-- Step 12: Test the functions
SELECT 'Stock management system setup completed successfully!' as status;

-- Step 13: Show current stock summary
SELECT * FROM get_stock_summary();

-- Step 14: Show low stock products (if any)
SELECT * FROM get_low_stock_products();



