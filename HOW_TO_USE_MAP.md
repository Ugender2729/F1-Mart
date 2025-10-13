# 🗺️ How to Use Your Custom Map (No Google API!)

## 🎯 **What You Have Now**

A complete delivery radius checking system with:
- ✅ **3km delivery radius** (configurable)
- ✅ **NO Google Maps API required** (100% FREE!)
- ✅ **Real-time location verification**
- ✅ **Visual map representation**
- ✅ **Works on all devices**

---

## 📍 **Step-by-Step Setup Guide**

### **STEP 1: Find Your Store's GPS Coordinates**

#### **Easy Method (Using Google Maps):**

1. Open https://www.google.com/maps
2. Search for your store address or drop a pin on your location
3. **Right-click** on the location
4. You'll see coordinates like: `17.385044, 78.486671`
5. **Click on the coordinates** - they will be copied automatically!

#### **Example:**
```
If your store is at:
"F1 Mart, Hitech City, Hyderabad"

You might get:
Latitude: 17.385044
Longitude: 78.486671
```

---

### **STEP 2: Update Store Configuration**

1. Open the file: `lib/config/store.ts`
2. Find this section:

```typescript
export const STORE_CONFIG = {
  location: {
    lat: 17.385044,  // ← CHANGE THIS
    lng: 78.486671,  // ← CHANGE THIS
    name: 'F1 Mart',
    address: 'Your Store Address Here',  // ← UPDATE
    city: 'Hyderabad',  // ← UPDATE
    state: 'Telangana',  // ← UPDATE
  },
```

3. **Replace** the coordinates with your store's coordinates
4. **Update** the address, city, and state
5. **Save** the file

---

### **STEP 3: Test the Map**

1. Make sure your app is running: `npm run dev`
2. Visit: `http://localhost:3000/delivery-check`
3. Click **"Get My Current Location"**
4. Allow location access when prompted
5. You should see:
   - ✅ Your distance from the store
   - ✅ Whether you're within 3km
   - ✅ Visual map with your location

---

## 🎨 **What You'll See**

### **When Within Range (0-3km):**
```
╔════════════════════════════════════╗
║  ✓ Delivery Available!            ║
║                                    ║
║  Distance: 2.35 km                 ║
║  ✓ Within 3km delivery range       ║
║  ✓ Delivery fee: ₹50               ║
║  ✓ Est. delivery: 30-40 minutes    ║
╚════════════════════════════════════╝
```

### **When Outside Range (>3km):**
```
╔════════════════════════════════════╗
║  ✗ Outside Delivery Area           ║
║                                    ║
║  Distance: 4.75 km                 ║
║  We deliver only within 3km        ║
║  Distance exceeds by: 1.75 km      ║
╚════════════════════════════════════╝
```

---

## 🚀 **Where to Use the Map**

### **1. Delivery Check Page** (`/delivery-check`)
- Standalone page for users to check delivery availability
- Full visual map with store info
- Contact details and timings

### **2. Checkout Page** (Integration)
```typescript
// Add to your checkout page
import DeliveryRadiusChecker from '@/components/map/DeliveryRadiusChecker';

// In your component:
<DeliveryRadiusChecker 
  onLocationVerified={(isValid, distance) => {
    if (!isValid) {
      alert('Sorry, we don\'t deliver to your location');
      // Disable checkout button
    }
  }}
/>
```

### **3. Food Delivery Page**
```typescript
// Show delivery radius on restaurant pages
import DeliveryRadiusChecker from '@/components/map/DeliveryRadiusChecker';

<DeliveryRadiusChecker showMap={true} />
```

---

## ⚙️ **Configuration Options**

### **Change Delivery Radius**

Open `lib/config/store.ts`:

```typescript
delivery: {
  radius: 5,  // Change from 3km to 5km
  fee: 50,
  freeDeliveryThreshold: 500,
},
```

### **Change Delivery Fee**

```typescript
delivery: {
  radius: 3,
  fee: 30,  // Change from ₹50 to ₹30
  freeDeliveryThreshold: 500,
},
```

### **Change Free Delivery Threshold**

```typescript
delivery: {
  radius: 3,
  fee: 50,
  freeDeliveryThreshold: 300,  // Free delivery above ₹300
},
```

---

## 💡 **Important Notes**

### **HTTPS Required for Production**
- The browser's Geolocation API only works on:
  - ✅ HTTPS websites (https://)
  - ✅ Localhost (http://localhost)
  - ❌ HTTP websites (will not work)

### **User Permission Required**
- Users must click "Allow" when the browser asks for location access
- If denied, show instructions on how to enable it

### **GPS Accuracy**
- **Mobile devices**: Usually 10-50 meters accurate
- **Desktop with WiFi**: 100-500 meters accurate
- **Best practice**: Encourage users to use mobile for checkout

---

## 🔧 **Troubleshooting**

### **Problem: "Location access denied"**
**Solution:**
1. Check browser settings
2. Ensure HTTPS is enabled (or using localhost)
3. Clear browser cache and try again
4. Show user how to enable location in settings

### **Problem: "Inaccurate location"**
**Solution:**
1. Try on mobile device (better GPS)
2. Wait a few seconds for GPS to stabilize
3. Go outside if indoors (better GPS signal)

### **Problem: "Map not showing"**
**Solution:**
1. Check console for errors
2. Verify imports are correct
3. Make sure components are in correct folders

---

## 📞 **Support**

If you need help:
1. Check the demo page: `/delivery-check`
2. Read the full guide: `CUSTOM_MAP_GUIDE.md`
3. Test with different locations
4. Check browser console for errors

---

## 🎉 **You're All Set!**

Your custom map is ready to use with:
- ✅ No API costs
- ✅ 3km delivery radius
- ✅ Real-time verification
- ✅ Beautiful visual design

**Start using it at:** `http://localhost:3000/delivery-check`

Enjoy your FREE map solution! 🎈



