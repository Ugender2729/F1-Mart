-- Test script for stock management system
-- This script tests the automatic stock warning functionality

-- Test 1: Insert test products with different stock levels
INSERT INTO products (
  name,
  description,
  price,
  image,
  category,
  brand,
  stock,
  unit,
  weight,
  featured,
  on_sale
) VALUES 
-- Regular product with low stock
(
  'Test Product - Low Stock',
  'A test product with low stock',
  100.00,
  'https://example.com/image1.jpg',
  'Groceries',
  'Test Brand',
  5, -- Low stock (less than 10)
  'pieces',
  '500g',
  false,
  false
),
-- Powder product with low stock
(
  'Test Powder - Low Stock',
  'A test powder product with low stock',
  200.00,
  'https://example.com/image2.jpg',
  'Protein Powder',
  'Test Brand',
  8, -- Low stock (less than 10kg)
  'kg',
  '1kg',
  false,
  false
),
-- Product out of stock
(
  'Test Product - Out of Stock',
  'A test product that is out of stock',
  150.00,
  'https://example.com/image3.jpg',
  'Groceries',
  'Test Brand',
  0, -- Out of stock
  'pieces',
  '1kg',
  false,
  false
),
-- Product with normal stock
(
  'Test Product - Normal Stock',
  'A test product with normal stock',
  75.00,
  'https://example.com/image4.jpg',
  'Groceries',
  'Test Brand',
  25, -- Normal stock
  'pieces',
  '500g',
  false,
  false
);

-- Test 2: Check stock status function
SELECT 
  name,
  stock,
  unit,
  category,
  get_stock_status(products.*) as stock_status,
  is_low_stock(products.*) as is_low_stock
FROM products 
WHERE name LIKE 'Test%'
ORDER BY stock ASC;

-- Test 3: Get stock summary
SELECT * FROM get_stock_summary();

-- Test 4: Get low stock products
SELECT * FROM get_low_stock_products();

-- Test 5: Update stock and test automatic status update
UPDATE products 
SET stock = 3 
WHERE name = 'Test Product - Normal Stock';

-- Check if status was updated automatically
SELECT 
  name,
  stock,
  stock_status,
  last_stock_update
FROM products 
WHERE name = 'Test Product - Normal Stock';

-- Test 6: Test powder product threshold
UPDATE products 
SET stock = 12 
WHERE name = 'Test Powder - Low Stock';

-- Check if status was updated
SELECT 
  name,
  stock,
  unit,
  stock_status,
  is_low_stock(products.*) as is_low_stock
FROM products 
WHERE name = 'Test Powder - Low Stock';

-- Test 7: Test regular product threshold
UPDATE products 
SET stock = 12 
WHERE name = 'Test Product - Low Stock';

-- Check if status was updated
SELECT 
  name,
  stock,
  unit,
  stock_status,
  is_low_stock(products.*) as is_low_stock
FROM products 
WHERE name = 'Test Product - Low Stock';

-- Test 8: Show all test products with their status
SELECT 
  name,
  category,
  stock,
  unit,
  stock_status,
  is_low_stock(products.*) as is_low_stock,
  last_stock_update
FROM products 
WHERE name LIKE 'Test%'
ORDER BY stock ASC;

-- Test 9: Test the stock warning rules
SELECT 
  'Regular Product Rules' as test_type,
  name,
  stock,
  unit,
  CASE 
    WHEN stock < 10 THEN 'Should show low stock warning'
    WHEN stock = 0 THEN 'Should show out of stock warning'
    ELSE 'Should show in stock'
  END as expected_warning
FROM products 
WHERE name LIKE 'Test%' AND unit = 'pieces'

UNION ALL

SELECT 
  'Powder Product Rules' as test_type,
  name,
  stock,
  unit,
  CASE 
    WHEN stock < 10 THEN 'Should show low stock warning'
    WHEN stock = 0 THEN 'Should show out of stock warning'
    ELSE 'Should show in stock'
  END as expected_warning
FROM products 
WHERE name LIKE 'Test%' AND unit = 'kg';

-- Clean up test data (uncomment to run)
-- DELETE FROM products WHERE name LIKE 'Test%';





