-- Add Multi-Location Delivery Support
-- This allows orders to be delivered to self, Mahabubabad, or other friends & family locations

-- Step 1: Add delivery_type column to orders table
DO $$ 
BEGIN
    -- Add delivery_type column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'delivery_type'
    ) THEN
        ALTER TABLE orders ADD COLUMN delivery_type VARCHAR(20) DEFAULT 'self' CHECK (delivery_type IN ('self', 'mahabubabad', 'friends_family'));
        RAISE NOTICE 'Added delivery_type column to orders table';
    ELSE
        RAISE NOTICE 'delivery_type column already exists in orders table';
    END IF;
END $$;

-- Step 2: Add recipient information columns
DO $$ 
BEGIN
    -- Add recipient_name column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'recipient_name'
    ) THEN
        ALTER TABLE orders ADD COLUMN recipient_name VARCHAR(255);
        RAISE NOTICE 'Added recipient_name column to orders table';
    END IF;

    -- Add recipient_phone column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'recipient_phone'
    ) THEN
        ALTER TABLE orders ADD COLUMN recipient_phone VARCHAR(20);
        RAISE NOTICE 'Added recipient_phone column to orders table';
    END IF;

    -- Add recipient_location column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'recipient_location'
    ) THEN
        ALTER TABLE orders ADD COLUMN recipient_location VARCHAR(100);
        RAISE NOTICE 'Added recipient_location column to orders table';
    END IF;
END $$;

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_delivery_type ON orders(delivery_type);
CREATE INDEX IF NOT EXISTS idx_orders_recipient_location ON orders(recipient_location);

-- Step 4: Update existing orders to have default delivery_type
UPDATE orders SET delivery_type = 'self' WHERE delivery_type IS NULL;

-- Step 5: Create view for Mahabubabad orders
CREATE OR REPLACE VIEW mahabubabad_orders AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  recipient_name,
  recipient_phone,
  recipient_location,
  items,
  total,
  status,
  delivery_address,
  created_at,
  updated_at
FROM orders
WHERE delivery_type = 'mahabubabad'
ORDER BY created_at DESC;

-- Step 6: Create view for friends & family orders
CREATE OR REPLACE VIEW friends_family_orders AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  recipient_name,
  recipient_phone,
  recipient_location,
  items,
  total,
  status,
  delivery_address,
  created_at,
  updated_at
FROM orders
WHERE delivery_type = 'friends_family'
ORDER BY created_at DESC;

-- Step 7: Create function to get orders by delivery type
CREATE OR REPLACE FUNCTION get_orders_by_delivery_type(
  p_delivery_type VARCHAR(20) DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  recipient_name VARCHAR(255),
  recipient_phone VARCHAR(20),
  recipient_location VARCHAR(100),
  delivery_type VARCHAR(20),
  total DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_delivery_type IS NULL THEN
    RETURN QUERY
    SELECT 
      o.id,
      o.customer_name,
      o.customer_phone,
      o.recipient_name,
      o.recipient_phone,
      o.recipient_location,
      o.delivery_type,
      o.total,
      o.status,
      o.created_at
    FROM orders o
    ORDER BY o.created_at DESC
    LIMIT p_limit;
  ELSE
    RETURN QUERY
    SELECT 
      o.id,
      o.customer_name,
      o.customer_phone,
      o.recipient_name,
      o.recipient_phone,
      o.recipient_location,
      o.delivery_type,
      o.total,
      o.status,
      o.created_at
    FROM orders o
    WHERE o.delivery_type = p_delivery_type
    ORDER BY o.created_at DESC
    LIMIT p_limit;
  END IF;
END;
$$;

-- Step 8: Create function to get delivery statistics by type
CREATE OR REPLACE FUNCTION get_delivery_type_statistics()
RETURNS TABLE (
  delivery_type VARCHAR(20),
  order_count BIGINT,
  total_revenue DECIMAL(10,2),
  avg_order_value DECIMAL(10,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.delivery_type,
    COUNT(*)::BIGINT as order_count,
    SUM(o.total) as total_revenue,
    AVG(o.total) as avg_order_value
  FROM orders o
  WHERE o.delivery_type IS NOT NULL
  GROUP BY o.delivery_type
  ORDER BY order_count DESC;
END;
$$;

-- Step 9: Add comments for documentation
COMMENT ON COLUMN orders.delivery_type IS 'Type of delivery: self (within 3km), mahabubabad (special zone), or friends_family (other locations)';
COMMENT ON COLUMN orders.recipient_name IS 'Name of recipient for gift orders (when delivery_type is mahabubabad or friends_family)';
COMMENT ON COLUMN orders.recipient_phone IS 'Phone number of recipient for gift orders';
COMMENT ON COLUMN orders.recipient_location IS 'Location name where order should be delivered (e.g., Mahabubabad, Mumbai, etc.)';

COMMENT ON VIEW mahabubabad_orders IS 'View showing all orders to be delivered in Mahabubabad';
COMMENT ON VIEW friends_family_orders IS 'View showing all friends & family gift orders';

COMMENT ON FUNCTION get_orders_by_delivery_type IS 'Function to get orders filtered by delivery type with recent orders first';
COMMENT ON FUNCTION get_delivery_type_statistics IS 'Function to get statistics of orders by delivery type';

-- Step 10: Test queries
-- Test 1: Check new columns
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'orders' 
  AND column_name IN ('delivery_type', 'recipient_name', 'recipient_phone', 'recipient_location')
ORDER BY column_name;

-- Test 2: Get delivery type statistics
SELECT * FROM get_delivery_type_statistics();

-- Test 3: Sample query to see order distribution
SELECT 
  delivery_type,
  COUNT(*) as count
FROM orders
GROUP BY delivery_type
ORDER BY count DESC;

-- Success message
SELECT '✅ Multi-location delivery support added successfully!' as status;


