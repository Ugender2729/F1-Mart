-- Add order_type field to distinguish between regular orders and food delivery orders
-- This will help in fetching and sorting orders by type

-- Step 1: Add order_type column to orders table
DO $$ 
BEGIN
    -- Add order_type column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'order_type'
    ) THEN
        ALTER TABLE orders ADD COLUMN order_type VARCHAR(20) DEFAULT 'regular' CHECK (order_type IN ('regular', 'food_delivery'));
        RAISE NOTICE 'Added order_type column to orders table';
    ELSE
        RAISE NOTICE 'order_type column already exists in orders table';
    END IF;
END $$;

-- Step 2: Create index for better performance when filtering by order_type
CREATE INDEX IF NOT EXISTS idx_orders_order_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_orders_order_type_created_at ON orders(order_type, created_at DESC);

-- Step 3: Update existing orders to have default order_type
UPDATE orders SET order_type = 'regular' WHERE order_type IS NULL;

-- Step 4: Create a view for recent orders (most recent first)
CREATE OR REPLACE VIEW recent_orders AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  items,
  subtotal,
  discount,
  delivery_fee,
  tax,
  total,
  status,
  payment_method,
  delivery_address,
  order_type,
  created_at,
  updated_at,
  -- Add row number for pagination
  ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num
FROM orders
ORDER BY created_at DESC;

-- Step 5: Create a view for food delivery orders (most recent first)
CREATE OR REPLACE VIEW food_delivery_orders AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  items,
  subtotal,
  discount,
  delivery_fee,
  tax,
  total,
  status,
  payment_method,
  delivery_address,
  order_type,
  created_at,
  updated_at,
  -- Add row number for pagination
  ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num
FROM orders
WHERE order_type = 'food_delivery'
ORDER BY created_at DESC;

-- Step 6: Create a view for regular orders (most recent first)
CREATE OR REPLACE VIEW regular_orders AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  items,
  subtotal,
  discount,
  delivery_fee,
  tax,
  total,
  status,
  payment_method,
  delivery_address,
  order_type,
  created_at,
  updated_at,
  -- Add row number for pagination
  ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num
FROM orders
WHERE order_type = 'regular'
ORDER BY created_at DESC;

-- Step 7: Create function to get recent orders by type
CREATE OR REPLACE FUNCTION get_recent_orders_by_type(
  p_order_type VARCHAR(20) DEFAULT NULL,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSONB,
  subtotal DECIMAL(10,2),
  discount DECIMAL(10,2),
  delivery_fee DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  delivery_address JSONB,
  order_type VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.user_id,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.items,
    o.subtotal,
    o.discount,
    o.delivery_fee,
    o.tax,
    o.total,
    o.status,
    o.payment_method,
    o.delivery_address,
    o.order_type,
    o.created_at,
    o.updated_at
  FROM orders o
  WHERE (p_order_type IS NULL OR o.order_type = p_order_type)
  ORDER BY o.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- Step 8: Create function to get user orders by type (most recent first)
CREATE OR REPLACE FUNCTION get_user_orders_by_type(
  p_user_id UUID,
  p_order_type VARCHAR(20) DEFAULT NULL,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  items JSONB,
  subtotal DECIMAL(10,2),
  discount DECIMAL(10,2),
  delivery_fee DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  delivery_address JSONB,
  order_type VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.user_id,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.items,
    o.subtotal,
    o.discount,
    o.delivery_fee,
    o.tax,
    o.total,
    o.status,
    o.payment_method,
    o.delivery_address,
    o.order_type,
    o.created_at,
    o.updated_at
  FROM orders o
  WHERE o.user_id = p_user_id
    AND (p_order_type IS NULL OR o.order_type = p_order_type)
  ORDER BY o.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- Step 9: Add comments for documentation
COMMENT ON COLUMN orders.order_type IS 'Type of order: regular (grocery/retail) or food_delivery';
COMMENT ON INDEX idx_orders_order_type IS 'Index for filtering orders by type';
COMMENT ON INDEX idx_orders_order_type_created_at IS 'Composite index for filtering by type and sorting by creation date';
COMMENT ON VIEW recent_orders IS 'View showing all orders sorted by creation date (most recent first)';
COMMENT ON VIEW food_delivery_orders IS 'View showing food delivery orders sorted by creation date (most recent first)';
COMMENT ON VIEW regular_orders IS 'View showing regular orders sorted by creation date (most recent first)';
COMMENT ON FUNCTION get_recent_orders_by_type IS 'Function to get recent orders by type with pagination';
COMMENT ON FUNCTION get_user_orders_by_type IS 'Function to get user orders by type with pagination';

-- Step 10: Test the implementation
SELECT 'Order type field added successfully!' as status;
SELECT COUNT(*) as total_orders FROM orders;
SELECT order_type, COUNT(*) as count FROM orders GROUP BY order_type;


