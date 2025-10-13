-- Add customer_location field to orders table
-- This will store the customer's GPS location when they place an order

-- Step 1: Add customer_location column to orders table
DO $$ 
BEGIN
    -- Add customer_location column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'customer_location'
    ) THEN
        ALTER TABLE orders ADD COLUMN customer_location JSONB;
        RAISE NOTICE 'Added customer_location column to orders table';
    ELSE
        RAISE NOTICE 'customer_location column already exists in orders table';
    END IF;
END $$;

-- Step 2: Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_orders_customer_location ON orders USING GIN (customer_location);

-- Step 3: Add comment for documentation
COMMENT ON COLUMN orders.customer_location IS 'Customer GPS location: {latitude, longitude, accuracy, distance, isWithinRange, timestamp, address}';

-- Step 4: Create a view to show orders with location data
CREATE OR REPLACE VIEW orders_with_location AS
SELECT 
  id,
  user_id,
  customer_name,
  customer_email,
  customer_phone,
  total,
  status,
  customer_location,
  -- Extract location data for easier querying
  (customer_location->>'latitude')::DECIMAL as latitude,
  (customer_location->>'longitude')::DECIMAL as longitude,
  (customer_location->>'distance')::DECIMAL as distance_from_store,
  (customer_location->>'isWithinRange')::BOOLEAN as within_delivery_range,
  created_at,
  updated_at
FROM orders
WHERE customer_location IS NOT NULL
ORDER BY created_at DESC;

-- Step 5: Create function to get orders near a location
CREATE OR REPLACE FUNCTION get_orders_near_location(
  p_latitude DECIMAL,
  p_longitude DECIMAL,
  p_radius_km DECIMAL DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  latitude DECIMAL,
  longitude DECIMAL,
  distance_from_point DECIMAL,
  total DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.customer_name,
    o.customer_phone,
    (o.customer_location->>'latitude')::DECIMAL as latitude,
    (o.customer_location->>'longitude')::DECIMAL as longitude,
    (o.customer_location->>'distance')::DECIMAL as distance_from_point,
    o.total,
    o.status,
    o.created_at
  FROM orders o
  WHERE o.customer_location IS NOT NULL
    AND (o.customer_location->>'distance')::DECIMAL <= p_radius_km
  ORDER BY o.created_at DESC;
END;
$$;

-- Step 6: Create function to get delivery statistics by area
CREATE OR REPLACE FUNCTION get_delivery_statistics()
RETURNS TABLE (
  total_orders_with_location BIGINT,
  within_range_count BIGINT,
  outside_range_count BIGINT,
  average_distance DECIMAL,
  min_distance DECIMAL,
  max_distance DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_orders_with_location,
    COUNT(*) FILTER (WHERE (customer_location->>'isWithinRange')::BOOLEAN = true)::BIGINT as within_range_count,
    COUNT(*) FILTER (WHERE (customer_location->>'isWithinRange')::BOOLEAN = false)::BIGINT as outside_range_count,
    AVG((customer_location->>'distance')::DECIMAL) as average_distance,
    MIN((customer_location->>'distance')::DECIMAL) as min_distance,
    MAX((customer_location->>'distance')::DECIMAL) as max_distance
  FROM orders
  WHERE customer_location IS NOT NULL;
END;
$$;

-- Step 7: Test queries
-- Test 1: Check if column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders' AND column_name = 'customer_location';

-- Test 2: Sample insert to verify structure
-- (This is just for testing - remove this after verification)
/*
INSERT INTO orders (
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
  customer_location
) VALUES (
  NULL,
  'Test Customer',
  'test@example.com',
  '9876543210',
  '[{"name": "Test Product", "price": 100, "quantity": 1}]',
  100.00,
  0.00,
  50.00,
  27.00,
  177.00,
  'pending',
  'cod',
  '{"address": "Test Street", "city": "Test City"}',
  'regular',
  '{"latitude": 17.390000, "longitude": 78.490000, "accuracy": 50, "distance": 1.5, "isWithinRange": true, "timestamp": "2025-10-12T07:00:00.000Z", "address": "17.390000°N, 78.490000°E"}'
);
*/

-- Step 8: Success message
SELECT '✅ Customer location field added successfully! Orders will now capture GPS location.' as status;


