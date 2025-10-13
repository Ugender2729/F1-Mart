-- Complete First Order Coupon System Setup
-- This script creates everything needed for the coupon system

-- Step 1: Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed', 'free_delivery')),
  value DECIMAL(10,2) NOT NULL,
  minimum_amount DECIMAL(10,2) DEFAULT 0,
  maximum_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_first_order_only BOOLEAN DEFAULT false,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create coupon_usage table
CREATE TABLE IF NOT EXISTS coupon_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  discount_amount DECIMAL(10,2) NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(coupon_id, order_id)
);

-- Step 3: Add coupon columns to orders table
DO $$ 
BEGIN
    -- Add coupon_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_id'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_id UUID REFERENCES coupons(id);
        RAISE NOTICE 'Added coupon_id column to orders table';
    ELSE
        RAISE NOTICE 'coupon_id column already exists in orders table';
    END IF;

    -- Add coupon_code column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_code'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(50);
        RAISE NOTICE 'Added coupon_code column to orders table';
    ELSE
        RAISE NOTICE 'coupon_code column already exists in orders table';
    END IF;

    -- Add coupon_discount column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'coupon_discount'
    ) THEN
        ALTER TABLE orders ADD COLUMN coupon_discount DECIMAL(10,2) DEFAULT 0;
        RAISE NOTICE 'Added coupon_discount column to orders table';
    ELSE
        RAISE NOTICE 'coupon_discount column already exists in orders table';
    END IF;
END $$;

-- Step 4: Create function to check if customer is first-time
CREATE OR REPLACE FUNCTION is_first_time_customer(
  p_email VARCHAR(255),
  p_phone VARCHAR(20)
)
RETURNS BOOLEAN AS $$
DECLARE
  order_count INTEGER;
BEGIN
  -- Check if customer has any previous orders
  SELECT COUNT(*) INTO order_count
  FROM orders 
  WHERE (customer_email = p_email OR customer_phone = p_phone)
    AND status != 'cancelled';
  
  RETURN order_count = 0;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create function to get first order coupon
CREATE OR REPLACE FUNCTION get_first_order_coupon(
  p_amount DECIMAL(10,2),
  p_email VARCHAR(255),
  p_phone VARCHAR(20)
)
RETURNS TABLE (
  coupon_code VARCHAR(50),
  discount_amount DECIMAL(10,2),
  message TEXT
) AS $$
DECLARE
  is_first_time BOOLEAN;
  coupon_record coupons%ROWTYPE;
  calculated_discount DECIMAL(10,2);
BEGIN
  -- Check if customer is first-time
  is_first_time := is_first_time_customer(p_email, p_phone);
  
  IF NOT is_first_time THEN
    RETURN QUERY SELECT NULL::VARCHAR(50), 0.00, 'Not a first-time customer';
    RETURN;
  END IF;
  
  -- Get first order coupon
  SELECT * INTO coupon_record
  FROM coupons 
  WHERE is_first_order_only = true 
    AND is_active = true
    AND valid_from <= NOW()
    AND (valid_until IS NULL OR valid_until >= NOW())
    AND minimum_amount <= p_amount
  ORDER BY value DESC
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::VARCHAR(50), 0.00, 'No first order coupon available';
    RETURN;
  END IF;
  
  -- Calculate discount
  calculated_discount := CASE 
    WHEN coupon_record.type = 'percentage' THEN 
      LEAST(p_amount * coupon_record.value / 100, COALESCE(coupon_record.maximum_discount, p_amount))
    WHEN coupon_record.type = 'fixed' THEN 
      LEAST(coupon_record.value, p_amount)
    ELSE 0
  END;
  
  RETURN QUERY SELECT coupon_record.code, calculated_discount, 
    'Welcome! ' || coupon_record.description;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create function to apply coupon
CREATE OR REPLACE FUNCTION apply_coupon(
  p_coupon_code VARCHAR(50),
  p_amount DECIMAL(10,2),
  p_email VARCHAR(255),
  p_phone VARCHAR(20)
)
RETURNS TABLE (
  success BOOLEAN,
  message TEXT,
  discount_amount DECIMAL(10,2),
  coupon_id UUID
) AS $$
DECLARE
  coupon_record coupons%ROWTYPE;
  calculated_discount DECIMAL(10,2);
  is_first_time BOOLEAN;
BEGIN
  -- Get coupon details
  SELECT * INTO coupon_record
  FROM coupons 
  WHERE code = p_coupon_code 
    AND is_active = true
    AND valid_from <= NOW()
    AND (valid_until IS NULL OR valid_until >= NOW());
  
  -- Check if coupon exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Invalid or expired coupon', 0.00, NULL::UUID;
    RETURN;
  END IF;
  
  -- Check minimum amount
  IF p_amount < coupon_record.minimum_amount THEN
    RETURN QUERY SELECT false, 
      'Minimum order amount is ₹' || coupon_record.minimum_amount, 
      0.00, 
      NULL::UUID;
    RETURN;
  END IF;
  
  -- Check usage limit
  IF coupon_record.usage_limit IS NOT NULL AND coupon_record.used_count >= coupon_record.usage_limit THEN
    RETURN QUERY SELECT false, 'Coupon usage limit reached', 0.00, NULL::UUID;
    RETURN;
  END IF;
  
  -- Check if first order only
  IF coupon_record.is_first_order_only THEN
    is_first_time := is_first_time_customer(p_email, p_phone);
    IF NOT is_first_time THEN
      RETURN QUERY SELECT false, 'This coupon is only for first-time customers', 0.00, NULL::UUID;
      RETURN;
    END IF;
  END IF;
  
  -- Calculate discount
  calculated_discount := CASE 
    WHEN coupon_record.type = 'percentage' THEN 
      LEAST(p_amount * coupon_record.value / 100, COALESCE(coupon_record.maximum_discount, p_amount))
    WHEN coupon_record.type = 'fixed' THEN 
      LEAST(coupon_record.value, p_amount)
    WHEN coupon_record.type = 'free_delivery' THEN 
      0
    ELSE 0
  END;
  
  RETURN QUERY SELECT true, 'Coupon applied successfully', calculated_discount, coupon_record.id;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create function to get applicable coupons
CREATE OR REPLACE FUNCTION get_applicable_coupons(
  p_amount DECIMAL(10,2),
  p_email VARCHAR(255),
  p_phone VARCHAR(20)
)
RETURNS TABLE (
  id UUID,
  code VARCHAR(50),
  name VARCHAR(255),
  description TEXT,
  type VARCHAR(20),
  value DECIMAL(10,2),
  minimum_amount DECIMAL(10,2),
  maximum_discount DECIMAL(10,2),
  discount_amount DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.code,
    c.name,
    c.description,
    c.type,
    c.value,
    c.minimum_amount,
    c.maximum_discount,
    CASE 
      WHEN c.type = 'percentage' THEN LEAST(p_amount * c.value / 100, COALESCE(c.maximum_discount, p_amount))
      WHEN c.type = 'fixed' THEN LEAST(c.value, p_amount)
      WHEN c.type = 'free_delivery' THEN 0
      ELSE 0
    END as discount_amount
  FROM coupons c
  WHERE c.is_active = true
    AND c.valid_from <= NOW()
    AND (c.valid_until IS NULL OR c.valid_until >= NOW())
    AND c.minimum_amount <= p_amount
    AND (c.usage_limit IS NULL OR c.used_count < c.usage_limit)
    AND (
      c.is_first_order_only = false 
      OR (c.is_first_order_only = true AND is_first_time_customer(p_email, p_phone))
    )
  ORDER BY 
    CASE 
      WHEN c.is_first_order_only = true THEN 1
      ELSE 2
    END,
    c.value DESC;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create trigger function to update coupon usage count
CREATE OR REPLACE FUNCTION update_coupon_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.coupon_id IS NOT NULL THEN
    -- Update used count
    UPDATE coupons 
    SET used_count = used_count + 1,
        updated_at = NOW()
    WHERE id = NEW.coupon_id;
    
    -- Record coupon usage
    INSERT INTO coupon_usage (
      coupon_id,
      order_id,
      user_id,
      customer_email,
      customer_phone,
      discount_amount
    ) VALUES (
      NEW.coupon_id,
      NEW.id,
      NEW.user_id,
      NEW.customer_email,
      NEW.customer_phone,
      NEW.coupon_discount
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create trigger for coupon usage tracking
DROP TRIGGER IF EXISTS track_coupon_usage ON orders;
CREATE TRIGGER track_coupon_usage
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_coupon_usage_count();

-- Step 10: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active, valid_from, valid_until);
CREATE INDEX IF NOT EXISTS idx_coupons_first_order ON coupons(is_first_order_only, is_active);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_customer ON coupon_usage(customer_email, customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_coupon ON orders(coupon_id, coupon_code);

-- Step 11: Insert default first order coupon
INSERT INTO coupons (
  code,
  name,
  description,
  type,
  value,
  minimum_amount,
  maximum_discount,
  usage_limit,
  is_active,
  is_first_order_only,
  valid_until
) VALUES (
  'WELCOME10',
  'Welcome Discount',
  '10% off on your first order',
  'percentage',
  10.00,
  500.00,
  200.00,
  NULL,
  true,
  true,
  NOW() + INTERVAL '1 year'
) ON CONFLICT (code) DO NOTHING;

-- Step 12: Test the system
SELECT 'Coupon system setup completed successfully!' as status;

-- Step 13: Show default first order coupon
SELECT 
  code,
  name,
  description,
  type,
  value,
  minimum_amount,
  is_first_order_only
FROM coupons 
WHERE is_first_order_only = true;





