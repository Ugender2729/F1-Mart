# Coupon System Setup Instructions

## Method 1: Supabase Dashboard (Recommended)

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your F1 Mart project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Coupon System SQL**
   - Copy the entire content from `database/coupon_system.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

4. **Verify Setup**
   - Check that the following tables were created:
     - `coupons`
     - `coupon_usage`
   - Check that the following columns were added to `orders`:
     - `coupon_id`
     - `coupon_code` 
     - `coupon_discount`

## Method 2: Using Supabase CLI (If linked)

If you have your project linked with Supabase CLI:

```bash
# Link your project (if not already linked)
npx supabase link --project-ref YOUR_PROJECT_REF

# Run the SQL migration
npx supabase db push --file database/coupon_system.sql
```

## Method 3: Manual Table Creation

If you prefer to create tables manually, here are the key steps:

1. **Create coupons table**
2. **Create coupon_usage table** 
3. **Add coupon columns to orders table**
4. **Create the functions**
5. **Create the triggers**
6. **Add indexes**

## Verification

After running the SQL, you can verify the setup by:

1. **Check tables exist**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('coupons', 'coupon_usage');
   ```

2. **Test first order coupon**:
   ```sql
   SELECT * FROM get_first_order_coupon(1000, 'test@example.com', '1234567890');
   ```

3. **Test coupon application**:
   ```sql
   SELECT * FROM apply_coupon('WELCOME10', 1000, 'test@example.com', '1234567890');
   ```

## Default Coupon Created

The system automatically creates a default first-order coupon:
- **Code**: WELCOME10
- **Type**: 10% discount
- **Minimum Amount**: ₹500
- **Maximum Discount**: ₹200
- **Valid For**: First-time customers only
- **Validity**: 1 year from creation

## Next Steps

After running the SQL:

1. Update your frontend to use the coupon functions
2. Test the coupon application flow
3. Add more coupons as needed through the admin panel
4. Monitor coupon usage through the `coupon_usage` table




