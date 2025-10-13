# Admin Dashboard System Setup Guide

## 🎯 Overview

This guide will help you set up a complete admin dashboard system in Supabase with orders and revenue tracking.

## 📋 Prerequisites

- Supabase account and project
- Access to Supabase SQL Editor
- F1 Mart application running

## 🚀 Step-by-Step Setup

### Step 1: Run the SQL Script in Supabase

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your F1 Mart project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Execute the Script**
   - Open the file: `database/admin_dashboard_system.sql`
   - Copy the entire content
   - Paste it into the SQL Editor
   - Click "Run" button (or press Ctrl+Enter)

4. **Verify Successful Execution**
   - You should see success messages in the console
   - Check for the completion message at the end

### Step 2: Verify Tables Created

Go to "Table Editor" and verify these tables exist:

- ✅ `admin_users`
- ✅ `revenue_records`
- ✅ `admin_activity_log`

### Step 3: Verify Views Created

In SQL Editor, run this query to check views:

```sql
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
```

You should see:
- ✅ `orders_summary`
- ✅ `daily_revenue_summary`
- ✅ `monthly_revenue_summary`
- ✅ `admin_dashboard_stats`
- ✅ `top_selling_products`

## 📊 What Was Created

### 1. **Tables**

#### `admin_users`
Stores admin user credentials and information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | Admin email (unique) |
| phone | VARCHAR(20) | Admin phone (unique) |
| password_hash | VARCHAR(255) | Password |
| full_name | VARCHAR(255) | Admin name |
| role | VARCHAR(50) | Admin role |
| is_active | BOOLEAN | Active status |
| last_login | TIMESTAMP | Last login time |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

**Default Admin:**
- Phone: `9398601984`
- Password: `9381493260`

#### `revenue_records`
Tracks revenue from completed orders.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_id | UUID | References orders |
| amount | DECIMAL | Order total |
| revenue_date | DATE | Date of revenue |
| payment_method | VARCHAR | Payment method |
| payment_status | VARCHAR | Status |
| discount_applied | DECIMAL | Discount amount |
| delivery_fee | DECIMAL | Delivery fee |
| tax_amount | DECIMAL | Tax amount |
| net_revenue | DECIMAL | Calculated net |

#### `admin_activity_log`
Logs admin actions for auditing.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| admin_id | UUID | Admin user ID |
| action | VARCHAR | Action performed |
| target_type | VARCHAR | Type of target |
| target_id | UUID | Target entity ID |
| details | JSONB | Additional details |
| ip_address | VARCHAR | IP address |
| user_agent | TEXT | Browser info |

### 2. **Views**

#### `orders_summary`
Complete order information with customer details.

```sql
SELECT * FROM orders_summary LIMIT 10;
```

#### `daily_revenue_summary`
Daily revenue breakdown with order counts and totals.

```sql
SELECT * FROM daily_revenue_summary 
WHERE revenue_date >= CURRENT_DATE - INTERVAL '7 days';
```

#### `monthly_revenue_summary`
Monthly revenue aggregations.

```sql
SELECT * FROM monthly_revenue_summary 
WHERE revenue_month >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '6 months');
```

#### `admin_dashboard_stats`
Real-time dashboard statistics.

```sql
SELECT * FROM admin_dashboard_stats;
```

**Returns:**
- Total orders (all time)
- Completed orders
- Pending orders
- Total revenue
- Revenue last 30 days
- Revenue today
- Average order value
- Total customers
- Low stock products
- And more...

#### `top_selling_products`
Top 20 best-selling products.

```sql
SELECT * FROM top_selling_products;
```

### 3. **Functions**

#### `get_admin_dashboard_data()`
Returns complete dashboard data in JSON format.

```sql
SELECT get_admin_dashboard_data();
```

**Returns:**
- Dashboard statistics
- 10 recent orders
- 30 days of daily revenue
- Top 10 selling products

### 4. **Triggers**

#### `trigger_create_revenue_record`
Automatically creates revenue records when orders are completed.

- Fires on: Order status change to 'completed'
- Creates record in: `revenue_records` table

## 🔍 Example Queries

### Get Today's Orders
```sql
SELECT * FROM orders_summary 
WHERE DATE(created_at) = CURRENT_DATE 
ORDER BY created_at DESC;
```

### Get This Month's Revenue
```sql
SELECT 
  month_label,
  total_orders,
  completed_orders,
  completed_revenue,
  average_order_value
FROM monthly_revenue_summary 
WHERE revenue_month = DATE_TRUNC('month', CURRENT_DATE);
```

### Get Pending Orders
```sql
SELECT 
  id,
  customer_name,
  customer_phone,
  total,
  created_at
FROM orders_summary 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Get Low Stock Products
```sql
SELECT 
  name,
  category,
  stock,
  price
FROM products 
WHERE stock <= 10 
ORDER BY stock ASC;
```

### Get Revenue Trend (Last 7 Days)
```sql
SELECT 
  revenue_date,
  total_orders,
  completed_revenue,
  average_order_value
FROM daily_revenue_summary 
WHERE revenue_date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY revenue_date DESC;
```

### Get Top 5 Customers by Order Value
```sql
SELECT 
  customer_name,
  customer_email,
  customer_phone,
  COUNT(*) AS total_orders,
  SUM(total) AS total_spent,
  AVG(total) AS average_order_value
FROM orders_summary 
WHERE status = 'completed'
GROUP BY customer_name, customer_email, customer_phone
ORDER BY total_spent DESC
LIMIT 5;
```

## 📱 Using in Your Application

### Fetch Dashboard Stats

```typescript
// In your React component or API route
import { supabase } from '@/lib/supabase';

// Get dashboard statistics
const { data: stats } = await supabase
  .from('admin_dashboard_stats')
  .select('*')
  .single();

console.log('Total Revenue:', stats.total_revenue);
console.log('Orders Today:', stats.orders_today);
console.log('Revenue Today:', stats.revenue_today);
```

### Fetch Recent Orders

```typescript
const { data: recentOrders } = await supabase
  .from('orders_summary')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);
```

### Fetch Daily Revenue

```typescript
const { data: dailyRevenue } = await supabase
  .from('daily_revenue_summary')
  .select('*')
  .gte('revenue_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
  .order('revenue_date', { ascending: false });
```

### Get Complete Dashboard Data

```typescript
const { data: dashboardData } = await supabase
  .rpc('get_admin_dashboard_data');

// Returns:
// {
//   stats: { ... },
//   recent_orders: [ ... ],
//   daily_revenue: [ ... ],
//   top_products: [ ... ]
// }
```

## 🔒 Security Considerations

1. **Row Level Security (RLS)** is enabled on all admin tables
2. **Password Hashing**: In production, implement proper bcrypt hashing
3. **Admin Authentication**: Use JWT tokens for admin sessions
4. **API Rate Limiting**: Implement rate limiting on admin endpoints
5. **Audit Logging**: All admin actions should be logged to `admin_activity_log`

## 🎨 Dashboard Features

Your admin dashboard now supports:

✅ Real-time order tracking  
✅ Revenue analytics (daily, monthly)  
✅ Customer management  
✅ Product inventory tracking  
✅ Top-selling products analysis  
✅ Order status updates  
✅ Revenue forecasting  
✅ Admin activity logging  
✅ Low stock alerts  
✅ Guest order support  

## 🐛 Troubleshooting

### Issue: Tables not created
**Solution:** Make sure you have the required permissions in Supabase. Run the script again.

### Issue: Views not showing data
**Solution:** Ensure you have orders in the `orders` table. Create some test orders first.

### Issue: Revenue records not created automatically
**Solution:** Check if the trigger is active:
```sql
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'trigger_create_revenue_record';
```

### Issue: Permission denied
**Solution:** Check RLS policies:
```sql
-- Temporarily disable RLS for testing
ALTER TABLE orders_summary DISABLE ROW LEVEL SECURITY;
-- Re-enable after testing
ALTER TABLE orders_summary ENABLE ROW LEVEL SECURITY;
```

## 📈 Next Steps

1. **Test the Dashboard**: Place some orders and verify they appear in the views
2. **Customize Views**: Modify views to match your specific requirements
3. **Add Charts**: Integrate charting library (e.g., Chart.js, Recharts) in your React components
4. **Export Reports**: Create functions to export data as CSV/Excel
5. **Set Up Alerts**: Configure email/SMS alerts for important events
6. **Implement Caching**: Use Redis or similar for frequently accessed data

## 🎯 Admin Access

**Admin Login Credentials:**
- **Phone**: `9398601984`
- **Password**: `9381493260`

Access your admin dashboard at: `http://localhost:3000/admin`

## 📞 Support

If you encounter any issues:
1. Check the Supabase logs in Dashboard > Logs
2. Verify all tables and views were created successfully
3. Test queries individually in SQL Editor
4. Check browser console for any JavaScript errors

---

**Happy Administrating! 🎉**



