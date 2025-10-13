-- Simple Stock Management Test
-- This script tests the basic stock functionality without complex functions

-- Test 1: Check if stock management columns exist
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
  AND column_name IN ('stock_status', 'low_stock_threshold', 'last_stock_update', 'stock_warning_sent')
ORDER BY column_name;

-- Test 2: Check current products and their stock
SELECT 
  id,
  name,
  category,
  stock,
  unit,
  stock_status,
  low_stock_threshold,
  last_stock_update
FROM products 
ORDER BY stock ASC
LIMIT 10;

-- Test 3: Count products by stock status
SELECT 
  COALESCE(stock_status, 'not_set') as status,
  COUNT(*) as count
FROM products 
GROUP BY stock_status
ORDER BY count DESC;

-- Test 4: Find products that should be low stock (manual check)
SELECT 
  name,
  category,
  stock,
  unit,
  CASE 
    WHEN LOWER(category) LIKE '%powder%' OR LOWER(unit) = 'kg' THEN
      CASE 
        WHEN stock < 10 THEN 'Should be low stock (powder)'
        WHEN stock = 0 THEN 'Should be out of stock'
        ELSE 'Should be in stock (powder)'
      END
    ELSE
      CASE 
        WHEN stock < 10 THEN 'Should be low stock (regular)'
        WHEN stock = 0 THEN 'Should be out of stock'
        ELSE 'Should be in stock (regular)'
      END
  END as expected_status
FROM products 
WHERE stock < 15 OR stock_status IS NULL
ORDER BY stock ASC;

-- Test 5: Check for products with missing stock status
SELECT 
  COUNT(*) as products_without_status
FROM products 
WHERE stock_status IS NULL;

-- Test 6: Update stock status for products that don't have it
UPDATE products 
SET 
  stock_status = CASE 
    WHEN stock <= 0 THEN 'out_of_stock'
    WHEN (LOWER(category) LIKE '%powder%' OR LOWER(unit) = 'kg') AND stock < 10 THEN 'low_stock'
    WHEN stock < 10 THEN 'low_stock'
    ELSE 'in_stock'
  END,
  last_stock_update = NOW()
WHERE stock_status IS NULL;

-- Test 7: Show updated results
SELECT 
  'Updated products with stock status' as message,
  COUNT(*) as updated_count
FROM products 
WHERE last_stock_update > NOW() - INTERVAL '1 minute';

-- Test 8: Final stock summary
SELECT 
  stock_status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM products 
GROUP BY stock_status
ORDER BY count DESC;





