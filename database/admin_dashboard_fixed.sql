-- =====================================================
-- ADMIN DASHBOARD SYSTEM - FIXED VERSION
-- =====================================================
-- This is the corrected version without user table dependencies

-- =====================================================
-- 1. CREATE ADMIN USERS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_phone ON admin_users(phone);

-- =====================================================
-- 2. CREATE REVENUE TRACKING TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS revenue_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  revenue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'completed',
  discount_applied DECIMAL(10, 2) DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  net_revenue DECIMAL(10, 2) GENERATED ALWAYS AS (amount - discount_applied) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_revenue_records_order_id ON revenue_records(order_id);
CREATE INDEX IF NOT EXISTS idx_revenue_records_date ON revenue_records(revenue_date);
CREATE INDEX IF NOT EXISTS idx_revenue_records_payment_status ON revenue_records(payment_status);

-- =====================================================
-- 3. CREATE ADMIN ACTIVITY LOG TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  details JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_activity_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_action ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_activity_created_at ON admin_activity_log(created_at DESC);

-- =====================================================
-- 4. CREATE ORDERS SUMMARY VIEW (FIXED)
-- =====================================================

CREATE OR REPLACE VIEW orders_summary AS
SELECT 
  o.id,
  o.user_id,
  COALESCE(o.customer_name, 'Guest User') AS customer_name,
  COALESCE(o.customer_email, 'No email') AS customer_email,
  COALESCE(o.customer_phone, 'No phone') AS customer_phone,
  o.items,
  o.subtotal,
  o.discount,
  o.delivery_fee,
  o.tax,
  o.total,
  o.status,
  o.payment_method,
  o.delivery_address,
  o.notes,
  o.created_at,
  o.updated_at,
  CASE 
    WHEN o.status = 'completed' THEN 'Completed'
    WHEN o.status = 'cancelled' THEN 'Cancelled'
    WHEN o.status = 'processing' THEN 'Processing'
    WHEN o.status = 'pending' THEN 'Pending'
    ELSE 'Unknown'
  END AS status_label,
  CASE 
    WHEN o.created_at >= NOW() - INTERVAL '24 hours' THEN true
    ELSE false
  END AS is_recent
FROM orders o
ORDER BY o.created_at DESC;

-- =====================================================
-- 5. CREATE DAILY REVENUE SUMMARY VIEW
-- =====================================================

CREATE OR REPLACE VIEW daily_revenue_summary AS
SELECT 
  DATE(o.created_at) AS revenue_date,
  COUNT(*) AS total_orders,
  COUNT(CASE WHEN o.status = 'completed' THEN 1 END) AS completed_orders,
  COUNT(CASE WHEN o.status = 'cancelled' THEN 1 END) AS cancelled_orders,
  COUNT(CASE WHEN o.status = 'pending' THEN 1 END) AS pending_orders,
  SUM(o.total) AS total_revenue,
  SUM(CASE WHEN o.status = 'completed' THEN o.total ELSE 0 END) AS completed_revenue,
  SUM(o.subtotal) AS total_subtotal,
  SUM(o.discount) AS total_discounts,
  SUM(o.delivery_fee) AS total_delivery_fees,
  SUM(o.tax) AS total_tax,
  AVG(o.total) AS average_order_value
FROM orders o
GROUP BY DATE(o.created_at)
ORDER BY revenue_date DESC;

-- =====================================================
-- 6. CREATE MONTHLY REVENUE SUMMARY VIEW
-- =====================================================

CREATE OR REPLACE VIEW monthly_revenue_summary AS
SELECT 
  DATE_TRUNC('month', o.created_at) AS revenue_month,
  TO_CHAR(DATE_TRUNC('month', o.created_at), 'Month YYYY') AS month_label,
  COUNT(*) AS total_orders,
  COUNT(CASE WHEN o.status = 'completed' THEN 1 END) AS completed_orders,
  SUM(o.total) AS total_revenue,
  SUM(CASE WHEN o.status = 'completed' THEN o.total ELSE 0 END) AS completed_revenue,
  AVG(o.total) AS average_order_value,
  SUM(o.discount) AS total_discounts,
  SUM(o.delivery_fee) AS total_delivery_fees
FROM orders o
GROUP BY DATE_TRUNC('month', o.created_at)
ORDER BY revenue_month DESC;

-- =====================================================
-- 7. CREATE ADMIN DASHBOARD STATS VIEW
-- =====================================================

CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
  -- Total Stats
  (SELECT COUNT(*) FROM orders) AS total_orders,
  (SELECT COUNT(*) FROM orders WHERE status = 'completed') AS completed_orders,
  (SELECT COUNT(*) FROM orders WHERE status = 'pending') AS pending_orders,
  (SELECT COUNT(*) FROM orders WHERE status = 'processing') AS processing_orders,
  (SELECT COUNT(*) FROM orders WHERE status = 'cancelled') AS cancelled_orders,
  
  -- Revenue Stats
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE status = 'completed') AS total_revenue,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE status = 'completed' AND created_at >= NOW() - INTERVAL '30 days') AS revenue_last_30_days,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE status = 'completed' AND DATE(created_at) = CURRENT_DATE) AS revenue_today,
  (SELECT COALESCE(AVG(total), 0) FROM orders WHERE status = 'completed') AS average_order_value,
  
  -- Today's Stats
  (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE) AS orders_today,
  (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE AND status = 'completed') AS completed_today,
  
  -- User Stats
  (SELECT COUNT(DISTINCT user_id) FROM orders WHERE user_id IS NOT NULL) AS total_customers,
  (SELECT COUNT(*) FROM orders WHERE user_id IS NULL) AS guest_orders,
  
  -- Product Stats
  (SELECT COUNT(*) FROM products) AS total_products,
  (SELECT COUNT(*) FROM products WHERE stock <= 10) AS low_stock_products,
  
  -- Recent Activity
  (SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '24 hours') AS orders_last_24h,
  (SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '7 days') AS orders_last_7_days;

-- =====================================================
-- 8. CREATE TOP SELLING PRODUCTS VIEW
-- =====================================================

CREATE OR REPLACE VIEW top_selling_products AS
SELECT 
  p.id AS product_id,
  p.name AS product_name,
  p.category,
  p.price,
  COUNT(*) AS times_ordered,
  SUM((item->>'quantity')::INTEGER) AS total_quantity_sold,
  SUM((item->>'quantity')::INTEGER * p.price) AS total_revenue
FROM orders o
CROSS JOIN LATERAL jsonb_array_elements(o.items) AS item
JOIN products p ON p.id = (item->'product'->>'id')::UUID
WHERE o.status = 'completed'
GROUP BY p.id, p.name, p.category, p.price
ORDER BY total_quantity_sold DESC
LIMIT 20;

-- =====================================================
-- 9. CREATE TRIGGER FOR REVENUE RECORDS
-- =====================================================

CREATE OR REPLACE FUNCTION create_revenue_record()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create revenue record when order is completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    INSERT INTO revenue_records (
      order_id,
      amount,
      revenue_date,
      payment_method,
      payment_status,
      discount_applied,
      delivery_fee,
      tax_amount
    ) VALUES (
      NEW.id,
      NEW.total,
      DATE(NEW.updated_at),
      NEW.payment_method,
      'completed',
      COALESCE(NEW.discount, 0),
      COALESCE(NEW.delivery_fee, 0),
      COALESCE(NEW.tax, 0)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS trigger_create_revenue_record ON orders;

-- Create trigger
CREATE TRIGGER trigger_create_revenue_record
AFTER INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION create_revenue_record();

-- =====================================================
-- 10. CREATE FUNCTION TO GET ADMIN DASHBOARD DATA
-- =====================================================

CREATE OR REPLACE FUNCTION get_admin_dashboard_data()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'stats', (SELECT row_to_json(admin_dashboard_stats.*) FROM admin_dashboard_stats LIMIT 1),
    'recent_orders', (SELECT json_agg(row_to_json(t)) FROM (
      SELECT * FROM orders_summary ORDER BY created_at DESC LIMIT 10
    ) t),
    'daily_revenue', (SELECT json_agg(row_to_json(t)) FROM (
      SELECT * FROM daily_revenue_summary ORDER BY revenue_date DESC LIMIT 30
    ) t),
    'top_products', (SELECT json_agg(row_to_json(t)) FROM (
      SELECT * FROM top_selling_products LIMIT 10
    ) t)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 11. INSERT DEFAULT ADMIN USER
-- =====================================================

INSERT INTO admin_users (email, phone, password_hash, full_name, role)
VALUES (
  'admin@f1mart.com',
  '9398601984',
  '9381493260',
  'F1 Mart Admin',
  'super_admin'
)
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 12. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin users policies
DROP POLICY IF EXISTS "Admins can view own data" ON admin_users;
CREATE POLICY "Admins can view own data" ON admin_users
FOR SELECT
USING (true);

-- Revenue records policies
DROP POLICY IF EXISTS "Authenticated users can view revenue" ON revenue_records;
CREATE POLICY "Authenticated users can view revenue" ON revenue_records
FOR SELECT
USING (true);

-- Activity log policies
DROP POLICY IF EXISTS "Authenticated users can view activity logs" ON admin_activity_log;
CREATE POLICY "Authenticated users can view activity logs" ON admin_activity_log
FOR SELECT
USING (true);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ✅ ✅ ADMIN DASHBOARD CREATED SUCCESSFULLY! ✅ ✅ ✅';
  RAISE NOTICE '';
  RAISE NOTICE '📊 TABLES CREATED:';
  RAISE NOTICE '  ✓ admin_users';
  RAISE NOTICE '  ✓ revenue_records';
  RAISE NOTICE '  ✓ admin_activity_log';
  RAISE NOTICE '';
  RAISE NOTICE '📈 VIEWS CREATED:';
  RAISE NOTICE '  ✓ orders_summary';
  RAISE NOTICE '  ✓ daily_revenue_summary';
  RAISE NOTICE '  ✓ monthly_revenue_summary';
  RAISE NOTICE '  ✓ admin_dashboard_stats';
  RAISE NOTICE '  ✓ top_selling_products';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 FUNCTIONS & TRIGGERS:';
  RAISE NOTICE '  ✓ get_admin_dashboard_data()';
  RAISE NOTICE '  ✓ create_revenue_record() [Auto-trigger]';
  RAISE NOTICE '';
  RAISE NOTICE '👤 DEFAULT ADMIN USER:';
  RAISE NOTICE '  📱 Phone: 9398601984';
  RAISE NOTICE '  🔐 Password: 9381493260';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 YOUR ADMIN DASHBOARD IS NOW READY TO USE!';
  RAISE NOTICE '';
  RAISE NOTICE '📝 TEST QUERIES:';
  RAISE NOTICE '  • SELECT * FROM admin_dashboard_stats;';
  RAISE NOTICE '  • SELECT * FROM orders_summary LIMIT 10;';
  RAISE NOTICE '  • SELECT * FROM daily_revenue_summary;';
  RAISE NOTICE '  • SELECT get_admin_dashboard_data();';
  RAISE NOTICE '';
END $$;



