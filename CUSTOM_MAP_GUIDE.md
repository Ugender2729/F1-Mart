# Custom Map Implementation Guide (No Google API Required!)

## 🎯 **Overview**

This guide explains how to use the custom map implementation that **doesn't require any paid APIs**. It uses:
- ✅ **Browser's Geolocation API** (Free & Built-in)
- ✅ **Haversine Formula** for distance calculation
- ✅ **3km delivery radius** as specified
- ✅ **No external API costs!**

---

## 📁 **Files Created**

### 1. **`components/map/SimpleMap.tsx`**
- Custom map component with visual radius indicator
- Real-time distance calculation
- Within/outside delivery range detection
- No API keys needed!

### 2. **`lib/config/store.ts`**
- Store configuration file
- Easy to update store location
- Delivery settings (radius, fee, timing)
- Helper functions for distance calculation

### 3. **`app/delivery-check/page.tsx`**
- Demo page showing the map in action
- Store information display
- Contact details and timings

---

## 🚀 **Quick Setup**

### **Step 1: Update Your Store Location**

Open `lib/config/store.ts` and update these coordinates:

```typescript
location: {
  lat: 17.385044,  // ← CHANGE THIS to your store's latitude
  lng: 78.486671,  // ← CHANGE THIS to your store's longitude
  name: 'F1 Mart',
  address: 'Your Store Address Here',  // ← Update this
  city: 'Hyderabad',  // ← Update this
  // ... more settings
}
```

### **Step 2: How to Find Your Store Coordinates**

#### **Method 1: Using Google Maps (Easiest)**
1. Go to https://www.google.com/maps
2. Search for your store address
3. Right-click on your store location
4. Click on the coordinates (e.g., "17.385044, 78.486671")
5. They will be automatically copied!
6. Paste them in `lib/config/store.ts`

#### **Method 2: Using Your Phone**
1. Open Google Maps on your phone
2. Long-press on your store location
3. The coordinates will appear at the top
4. Copy and paste them

---

## 📱 **Using the Map Component**

### **Basic Usage**

```typescript
import SimpleMap from '@/components/map/SimpleMap';
import { STORE_CONFIG } from '@/lib/config/store';

function MyPage() {
  return (
    <SimpleMap
      deliveryRadius={STORE_CONFIG.delivery.radius}
      storeLat={STORE_CONFIG.location.lat}
      storeLng={STORE_CONFIG.location.lng}
      onLocationSelect={(location) => {
        console.log('User location:', location);
        console.log('Within range:', location.isWithinRadius);
        console.log('Distance:', location.distance, 'km');
      }}
    />
  );
}
```

### **With Checkout Integration**

```typescript
'use client';

import { useState } from 'react';
import SimpleMap from '@/components/map/SimpleMap';
import { checkDeliveryRange, getDeliveryFee } from '@/lib/config/store';

function CheckoutPage() {
  const [canDeliver, setCanDeliver] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleLocationSelect = (location) => {
    setCanDeliver(location.isWithinRadius);
    
    // Calculate delivery fee based on distance and order amount
    const orderAmount = 1000; // Your cart total
    const fee = getDeliveryFee(location.distance, orderAmount);
    setDeliveryFee(fee);
  };

  return (
    <div>
      <SimpleMap onLocationSelect={handleLocationSelect} />
      
      {canDeliver ? (
        <p>✓ Delivery available! Fee: ₹{deliveryFee}</p>
      ) : (
        <p>✗ Sorry, we don't deliver to your location</p>
      )}
    </div>
  );
}
```

---

## 🎨 **Features**

### **1. Visual Delivery Radius**
- Shows a dashed circle representing the 3km radius
- Store location marked in the center (orange pin)
- User location shown with a green (within range) or red (outside) pin

### **2. Real-Time Distance Calculation**
- Uses Haversine formula for accurate distance
- Displays distance in kilometers with 2 decimal precision
- Example: "2.35 km from store"

### **3. Delivery Range Check**
- Automatically checks if user is within 3km radius
- Clear visual feedback (green = good, red = outside range)
- Shows helpful messages to users

### **4. No API Costs**
- Uses browser's built-in Geolocation API (FREE!)
- No Google Maps API required
- No external service costs
- Works offline for distance calculations

---

## ⚙️ **Configuration Options**

### **Store Settings** (`lib/config/store.ts`)

```typescript
export const STORE_CONFIG = {
  // Location
  location: {
    lat: 17.385044,        // Store latitude
    lng: 78.486671,        // Store longitude
    name: 'F1 Mart',
    address: 'Your address',
  },

  // Delivery
  delivery: {
    radius: 3,             // 3km delivery radius
    fee: 50,               // ₹50 delivery fee
    freeDeliveryThreshold: 500,  // Free above ₹500
    estimatedTime: '30-45 minutes',
  },

  // Timings
  timings: {
    openTime: '08:00',
    closeTime: '22:00',
    daysOpen: ['Monday', ..., 'Sunday'],
  },

  // Contact
  contact: {
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    email: 'contact@f1mart.com',
  },
};
```

---

## 🔧 **Helper Functions**

### **1. Check Delivery Range**

```typescript
import { checkDeliveryRange } from '@/lib/config/store';

const userLat = 17.390000;
const userLng = 78.490000;

const { isWithinRange, distance } = checkDeliveryRange(userLat, userLng);

console.log(`Distance: ${distance}km`);
console.log(`Can deliver: ${isWithinRange}`);
```

### **2. Calculate Delivery Fee**

```typescript
import { getDeliveryFee } from '@/lib/config/store';

const distance = 2.5;  // km
const orderAmount = 600;  // ₹

const fee = getDeliveryFee(distance, orderAmount);
// Returns: 0 (free delivery because amount > 500)
```

### **3. Get Estimated Delivery Time**

```typescript
import { getEstimatedDeliveryTime } from '@/lib/config/store';

const time = getEstimatedDeliveryTime(2.5); // km
console.log(time); // "30-40 minutes"
```

---

## 📍 **How It Works**

### **Distance Calculation (Haversine Formula)**

The map uses the Haversine formula to calculate the distance between two coordinates:

```
distance = 2 × R × arcsin(√(sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)))

Where:
- R = Earth's radius (6371 km)
- Δlat = difference in latitudes
- Δlon = difference in longitudes
```

This formula gives accurate results for distances up to several hundred kilometers!

### **Accuracy**

- **Accuracy**: ±10-50 meters (depends on device GPS)
- **Works offline**: Distance calculation doesn't need internet
- **Fast**: Instant calculations, no API delays
- **Reliable**: Uses proven mathematical formula

---

## 🎯 **Usage Examples**

### **1. Delivery Area Check Page**

Visit: `/delivery-check`

- Shows the map with 3km radius
- Displays store information
- Shows delivery fees and timings
- Real-time location detection

### **2. Checkout Page Integration**

```typescript
// In your checkout page
import SimpleMap from '@/components/map/SimpleMap';
import { STORE_CONFIG } from '@/lib/config/store';

const [deliveryLocation, setDeliveryLocation] = useState(null);

<SimpleMap
  onLocationSelect={(location) => {
    if (location.isWithinRadius) {
      setDeliveryLocation(location);
      // Proceed with checkout
    } else {
      alert('Sorry, we don\'t deliver to your location');
    }
  }}
/>
```

### **3. Restaurant/Food Delivery**

```typescript
// For food delivery orders
import SimpleMap from '@/components/map/SimpleMap';

<SimpleMap
  deliveryRadius={3}  // 3km for food
  onLocationSelect={(location) => {
    if (location.isWithinRadius) {
      // Show restaurant menu
      // Calculate delivery time
    }
  }}
/>
```

---

## 🌐 **Browser Compatibility**

The Geolocation API works on:
- ✅ Chrome, Firefox, Safari, Edge (all modern browsers)
- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari)
- ✅ **Requires HTTPS** (or localhost for testing)

### **Important Notes:**

1. **HTTPS Required**: The browser's Geolocation API only works on HTTPS websites (or localhost)
2. **User Permission**: Users must allow location access in their browser
3. **Accuracy**: GPS accuracy depends on the device (mobile phones are usually more accurate)

---

## 📊 **Testing**

### **Test Locations**

Use these test coordinates to verify your setup:

1. **Within Range (2km from default store)**
   - Lat: 17.400000
   - Lng: 78.480000
   - Should show: ✓ Within range

2. **Outside Range (5km from default store)**
   - Lat: 17.420000
   - Lng: 78.510000
   - Should show: ✗ Outside range

3. **At Store Location**
   - Lat: 17.385044
   - Lng: 78.486671
   - Distance: 0.00 km

---

## 🎉 **Benefits**

✅ **No API Costs** - Completely free, no billing worries  
✅ **Fast** - Instant calculations, no API delays  
✅ **Privacy-Friendly** - No data sent to external servers  
✅ **Reliable** - Works even when external APIs are down  
✅ **Accurate** - Haversine formula is industry-standard  
✅ **Easy to Customize** - All settings in one config file  
✅ **No Quotas** - Unlimited usage, no rate limits  

---

## 🔗 **Quick Links**

- **Demo Page**: `/delivery-check`
- **Map Component**: `components/map/SimpleMap.tsx`
- **Configuration**: `lib/config/store.ts`
- **Helper Functions**: Available in `lib/config/store.ts`

---

## 💡 **Tips**

1. **Update coordinates** in `lib/config/store.ts` before deploying
2. **Test on mobile** for the best GPS accuracy
3. **Use HTTPS** in production for geolocation to work
4. **Adjust radius** as needed (currently 3km)
5. **Customize styling** in the SimpleMap component

---

## 🆘 **Troubleshooting**

### **"Location access denied"**
- User needs to allow location permissions in browser settings
- Check if site is running on HTTPS (required for geolocation)

### **"Inaccurate location"**
- Try on a mobile device (better GPS)
- Make sure device location services are enabled
- Wait a few seconds for GPS to stabilize

### **"Not working on deployed site"**
- Ensure your site uses HTTPS
- Check browser console for errors
- Verify coordinates are correct in config

---

## 🎈 **That's It!**

You now have a fully functional delivery radius checker with **NO API COSTS**! 🎉

Questions? Check the code comments in the files or test on the `/delivery-check` page.



