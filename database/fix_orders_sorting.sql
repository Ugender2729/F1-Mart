-- Simple fix to ensure orders are sorted with most recent first
-- This script ensures the orders table has proper indexing for sorting

-- Step 1: Create or recreate index for sorting by created_at (most recent first)
DROP INDEX IF EXISTS idx_orders_created_at;
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Step 2: Create index for user_id and created_at combination for better performance
DROP INDEX IF EXISTS idx_orders_user_created;
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Step 3: Test the sorting - this should show most recent orders first
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  total,
  status,
  created_at,
  ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_number
FROM orders
ORDER BY created_at DESC
LIMIT 10;

-- Step 4: Verify the sorting is working correctly
SELECT 
  'Most Recent Order' as description,
  id,
  created_at,
  total
FROM orders
ORDER BY created_at DESC
LIMIT 1;

SELECT 
  'Oldest Order' as description,
  id,
  created_at,
  total
FROM orders
ORDER BY created_at ASC
LIMIT 1;

-- Step 5: Create a simple function to always get recent orders first
CREATE OR REPLACE FUNCTION get_recent_orders(
  p_user_id UUID DEFAULT NULL,
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
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_user_id IS NULL THEN
    -- Get all orders, most recent first
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
      o.created_at,
      o.updated_at
    FROM orders o
    ORDER BY o.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
  ELSE
    -- Get user's orders, most recent first
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
      o.created_at,
      o.updated_at
    FROM orders o
    WHERE o.user_id = p_user_id
    ORDER BY o.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
  END IF;
END;
$$;

-- Success message
SELECT '✅ Orders sorting fixed! Recent orders will now appear first.' as status;


