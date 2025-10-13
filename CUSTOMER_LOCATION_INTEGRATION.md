# Customer Location Integration Guide

## 🎯 **Overview**

Automatic customer location capture during checkout that displays in the admin dashboard with:
- ✅ GPS coordinates (latitude, longitude)
- ✅ Distance from store (in km)
- ✅ Delivery range validation (within 3km)
- ✅ Location accuracy
- ✅ Direct link to Google Maps
- ✅ Real-time capture

---

## 🚀 **Setup (3 Steps)**

### **Step 1: Run Database Script**

1. Open Supabase SQL Editor
2. Copy and paste from `database/add_customer_location.sql`
3. Click Run
4. This adds `customer_location` JSONB column to orders table

### **Step 2: Update Checkout Page**

Add the `CustomerLocationCapture` component to your checkout page:

```typescript
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';
import { useState } from 'react';

function CheckoutPage() {
  const [customerLocation, setCustomerLocation] = useState(null);

  const handleLocationCaptured = (location) => {
    setCustomerLocation(location);
    console.log('Customer location:', location);
    
    // Check if within delivery range
    if (!location.isWithinRange) {
      alert('Sorry, we cannot deliver to your location (outside 3km range)');
    }
  };

  return (
    <div>
      {/* Add this in the delivery information section */}
      <CustomerLocationCapture 
        onLocationCaptured={handleLocationCaptured}
        autoCapture={true}  // Automatically captures on load
      />
      
      {/* Rest of your checkout form */}
    </div>
  );
}
```

### **Step 3: Save Location with Order**

When creating the order, include the customer location:

```typescript
const orderData = {
  // ... other order fields ...
  customer_location: customerLocation,  // Add this!
};

await createOrder(orderData);
```

---

## 📋 **Database Schema**

### **customer_location Column Structure:**

```json
{
  "latitude": 17.390000,
  "longitude": 78.490000,
  "accuracy": 50,
  "distance": 1.5,
  "isWithinRange": true,
  "timestamp": "2025-10-12T07:00:00.000Z",
  "address": "17.390000°N, 78.490000°E"
}
```

### **Fields:**
- `latitude`: Customer's GPS latitude
- `longitude`: Customer's GPS longitude  
- `accuracy`: GPS accuracy in meters
- `distance`: Distance from store in km
- `isWithinRange`: Boolean - within 3km radius
- `timestamp`: When location was captured
- `address`: Human-readable coordinates

---

## 🎨 **Admin Dashboard Display**

### **What Admins See:**

```
┌─────────────────────────────────────┐
│ 📍 GPS Location          1.50km ✓  │
├─────────────────────────────────────┤
│ Lat: 17.390000°                     │
│ Lng: 78.490000°                     │
│ Accuracy: ±50m                      │
│ 🗺️ Open in Google Maps              │
└─────────────────────────────────────┘
```

### **Features:**
- ✅ Distance badge (green if within range, red if outside)
- ✅ Exact coordinates
- ✅ GPS accuracy indicator
- ✅ Direct link to Google Maps
- ✅ Visual color coding

---

## 💻 **Component Usage**

### **Basic Usage (Auto-capture):**

```typescript
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';

<CustomerLocationCapture 
  onLocationCaptured={(location) => {
    console.log('Location captured:', location);
  }}
  autoCapture={true}
/>
```

### **Manual Capture:**

```typescript
<CustomerLocationCapture 
  onLocationCaptured={(location) => {
    setCustomerLocation(location);
  }}
  autoCapture={false}  // User must click button
/>
```

### **With Validation:**

```typescript
<CustomerLocationCapture 
  onLocationCaptured={(location) => {
    if (location.isWithinRange) {
      // Proceed with order
      setCanCheckout(true);
    } else {
      // Show error
      setError('Outside delivery range');
      setCanCheckout(false);
    }
  }}
/>
```

---

## 🔍 **Querying Location Data**

### **Get Orders with Location:**

```sql
SELECT 
  id,
  customer_name,
  customer_location,
  (customer_location->>'latitude')::DECIMAL as lat,
  (customer_location->>'longitude')::DECIMAL as lng,
  (customer_location->>'distance')::DECIMAL as distance
FROM orders
WHERE customer_location IS NOT NULL
ORDER BY created_at DESC;
```

### **Find Orders Within Range:**

```sql
SELECT * FROM orders
WHERE (customer_location->>'isWithinRange')::BOOLEAN = true
ORDER BY created_at DESC;
```

### **Get Delivery Statistics:**

```sql
SELECT * FROM get_delivery_statistics();
```

This returns:
- Total orders with location
- Within range count
- Outside range count
- Average distance
- Min/Max distance

---

## 📊 **Integration Points**

### **1. Checkout Page**
- Automatically captures location when user enters delivery info
- Validates if within 3km radius
- Prevents checkout if outside range

### **2. Food Delivery Page**
- Captures location when browsing restaurants
- Shows only restaurants within delivery range
- Calculates accurate delivery time

### **3. Admin Dashboard**
- Shows customer location on order cards
- Distance from store
- Link to view on Google Maps
- Helps drivers find customers easily

### **4. Order Details Page**
- Full location information
- Distance calculation
- Delivery route planning

---

## 🎯 **Benefits**

### **For Customers:**
- ✅ Automatic location detection
- ✅ Know if delivery is available before checkout
- ✅ More accurate delivery estimates
- ✅ No manual address entry errors

### **For Admin/Delivery:**
- ✅ Exact customer GPS coordinates
- ✅ Direct Google Maps link
- ✅ Distance at a glance
- ✅ Route optimization
- ✅ Delivery verification

### **For Business:**
- ✅ Delivery range analytics
- ✅ Understand customer distribution
- ✅ Optimize delivery routes
- ✅ Plan expansion areas

---

## 🔒 **Privacy & Security**

- ✅ Location stored only with explicit user permission
- ✅ Used only for delivery purposes
- ✅ Shown only to admin users
- ✅ Secure JSONB storage
- ✅ HTTPS required for geolocation

---

## 📱 **Mobile Optimization**

- ✅ Better GPS accuracy on mobile devices
- ✅ Auto-detects on page load
- ✅ Touch-friendly interface
- ✅ Works offline (calculation only)
- ✅ Optimized for Android [[memory:8705654]]

---

## 🧪 **Testing**

### **Test the Component:**

1. Visit checkout page
2. Component auto-captures location
3. Check console for location data
4. Verify distance calculation
5. Check admin dashboard shows location

### **Test Database Storage:**

```sql
-- Check recent orders with location
SELECT 
  customer_name,
  customer_location->'distance' as distance,
  customer_location->'isWithinRange' as within_range,
  created_at
FROM orders
WHERE customer_location IS NOT NULL
ORDER BY created_at DESC
LIMIT 5;
```

---

## ⚙️ **Configuration**

### **Change Delivery Radius:**

Edit `lib/config/store.ts`:
```typescript
delivery: {
  radius: 5,  // Change from 3km to 5km
}
```

### **Disable Auto-Capture:**

```typescript
<CustomerLocationCapture 
  autoCapture={false}  // User must click button
/>
```

### **Custom Styling:**

Edit `components/checkout/CustomerLocationCapture.tsx` to change colors, sizes, and layout.

---

## 🗺️ **Google Maps Integration**

### **View Customer Location:**

In admin dashboard, click "Open in Google Maps" to:
- See exact customer location
- Get driving directions
- Plan delivery route
- Verify address

### **URL Format:**
```
https://www.google.com/maps?q=17.390000,78.490000
```

---

## 📊 **Analytics Queries**

### **1. Average Delivery Distance:**

```sql
SELECT AVG((customer_location->>'distance')::DECIMAL) as avg_distance
FROM orders
WHERE customer_location IS NOT NULL;
```

### **2. Orders by Distance Range:**

```sql
SELECT 
  CASE 
    WHEN (customer_location->>'distance')::DECIMAL <= 1 THEN '0-1km'
    WHEN (customer_location->>'distance')::DECIMAL <= 2 THEN '1-2km'
    WHEN (customer_location->>'distance')::DECIMAL <= 3 THEN '2-3km'
    ELSE '>3km'
  END as distance_range,
  COUNT(*) as order_count
FROM orders
WHERE customer_location IS NOT NULL
GROUP BY distance_range
ORDER BY distance_range;
```

### **3. Customers Outside Range:**

```sql
SELECT 
  customer_name,
  customer_phone,
  (customer_location->>'distance')::DECIMAL as distance,
  created_at
FROM orders
WHERE (customer_location->>'isWithinRange')::BOOLEAN = false
ORDER BY created_at DESC;
```

---

## ✅ **Implementation Checklist**

- [ ] Run `database/add_customer_location.sql` in Supabase
- [ ] Add `CustomerLocationCapture` component to checkout
- [ ] Update order creation to include `customer_location`
- [ ] Test location capture in checkout
- [ ] Verify location shows in admin dashboard
- [ ] Test Google Maps link
- [ ] Check location data in Supabase

---

## 🆘 **Troubleshooting**

### **Location Not Capturing:**
- Check if HTTPS is enabled (or localhost)
- Verify user allowed location permission
- Check browser console for errors
- Try on mobile device (better GPS)

### **Location Not in Database:**
- Verify SQL script was run successfully
- Check order creation includes `customer_location`
- Look for errors in console
- Check Supabase table structure

### **Location Not Showing in Admin:**
- Check if order has `customer_location` field
- Verify admin dashboard updated
- Clear browser cache
- Check console for errors

---

## 🎉 **Success!**

You now have automatic customer location capture that:
- ✅ Auto-detects on checkout
- ✅ Validates delivery range
- ✅ Stores in database
- ✅ Shows in admin dashboard
- ✅ Links to Google Maps

**Next Steps:**
1. Run the database script
2. Integrate into checkout page
3. Test the functionality
4. Check admin dashboard

Happy delivering! 🚚



