# Order Verification Guide

## 🔍 How to Check Orders in Supabase & Admin Dashboard

### 1. **Test Database Connection**

Visit the test page to verify your database connection:
```
http://localhost:3000/test-order
```

**What this page does:**
- Tests database connection
- Creates a test order
- Fetches the test order
- Deletes the test order
- Shows recent orders from database

### 2. **Check Supabase Table Editor**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "Table Editor" in the left sidebar
4. Select the "orders" table
5. You should see all orders with these columns:
   - `id`: UUID (Primary Key)
   - `user_id`: UUID (nullable for guest orders)
   - `customer_name`: VARCHAR
   - `customer_email`: VARCHAR  
   - `customer_phone`: VARCHAR
   - `items`: JSONB
   - `subtotal`: NUMERIC
   - `discount`: NUMERIC
   - `delivery_fee`: NUMERIC
   - `tax`: NUMERIC
   - `total`: NUMERIC
   - `status`: VARCHAR
   - `payment_method`: VARCHAR
   - `delivery_address`: JSONB
   - `created_at`: TIMESTAMP
   - `updated_at`: TIMESTAMP

### 3. **Check Admin Dashboard**

1. Go to: http://localhost:3000/admin
2. Sign in with admin credentials
3. Check the "Orders" tab
4. You should see all orders with customer information

### 4. **Troubleshooting Orders Not Showing**

If orders are not appearing in Supabase or Admin:

#### A. **Check RLS Policies**

Run this SQL in Supabase SQL Editor:

```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'orders';

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;

-- Create new policies for guest orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL OR
    current_setting('role') = 'authenticated'
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR
    (user_id IS NULL AND customer_name IS NOT NULL AND customer_email IS NOT NULL)
  );

CREATE POLICY "Authenticated users can view all orders" ON orders
  FOR SELECT USING (current_setting('role') = 'authenticated');

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

#### B. **Verify Table Schema**

Run the migration script:
```bash
# In Supabase SQL Editor, run:
# D:\F1 mart\database\fix_guest_orders.sql
```

#### C. **Check Browser Console**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Place a test order
4. Look for:
   - "Order placed successfully" message
   - Any error messages
   - Database connection errors

#### D. **Verify Environment Variables**

Check `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. **Manual Order Creation Test**

Run this in Supabase SQL Editor:

```sql
-- Insert a test order
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
  delivery_address
) VALUES (
  NULL, -- Guest order
  'Test Customer',
  'test@example.com',
  '1234567890',
  '[{"product":{"id":"1","name":"Test Product","price":100},"quantity":1}]'::jsonb,
  100,
  0,
  50,
  18,
  168,
  'confirmed',
  'cod',
  '{"street":"Test St","city":"Test City","state":"Test State","postalCode":"123456"}'::jsonb
);

-- Check if it was inserted
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
```

### 6. **Order Flow Verification**

**Complete order placement flow:**

1. **Add items to cart** → Check cart state
2. **Go to checkout** → Verify customer info form
3. **Fill customer details** → Check validation
4. **Select payment method** → Verify selection
5. **Place order** → Check browser console for:
   ```
   Order placed successfully: {order_data}
   ```
6. **Check Supabase** → Verify order in table
7. **Check Admin** → Verify order appears in admin dashboard

### 7. **Expected Behavior**

✅ **Guest Orders:**
- `user_id` = NULL
- `customer_name`, `customer_email`, `customer_phone` populated
- Orders save to both database AND localStorage as backup

✅ **Authenticated Orders:**
- `user_id` = current user's UUID
- Customer info also stored for easy access
- Orders save to database first, then localStorage

✅ **Fallback Mechanism:**
- If database fails, order saves to localStorage only
- Toast shows: "Order placed successfully! (Saved locally)"
- Indicated by `fallback: true` flag

### 8. **Admin Dashboard Features**

The admin can:
- View all orders (guest + authenticated)
- See customer name, email, phone
- Update order status
- Delete orders
- See order details (items, totals, etc.)

### 9. **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Orders not in Supabase | Check RLS policies, run migration |
| Orders not in Admin | Verify admin is logged in, check useAllOrders hook |
| "Database save failed" | Check Supabase credentials in .env.local |
| Guest orders fail | Ensure `user_id` can be NULL in schema |
| Phone validation error | Customer phone must be provided |

### 10. **Support Links**

- **Test Page**: http://localhost:3000/test-order
- **Admin**: http://localhost:3000/admin
- **Checkout**: http://localhost:3000/checkout
- **Supabase Dashboard**: https://supabase.com/dashboard

## 🚀 Quick Start Testing

1. **Run the dev server:**
   ```bash
   npm run dev
   ```

2. **Test order creation:**
   - Visit: http://localhost:3000
   - Add items to cart
   - Go to checkout
   - Fill details and place order

3. **Verify in Supabase:**
   - Open Supabase Table Editor
   - Check "orders" table
   - Should see your order

4. **Verify in Admin:**
   - Go to http://localhost:3000/admin
   - Sign in
   - Check Orders tab

5. **Use test page for diagnostics:**
   - Visit: http://localhost:3000/test-order
   - Click "Run Database Connection Test"
   - Check results

---

**Need Help?** Check browser console for detailed error messages!

