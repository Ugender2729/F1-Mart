# 🎁 Mahabubabad Delivery Setup Guide

## 🎯 **Feature Overview**

Allow customers to:
1. ✅ **Deliver to themselves** (within 3km - standard)
2. ✅ **Deliver to Mahabubabad** (special zone for friends & family)
3. ✅ **Deliver to other locations** (friends & family anywhere)

---

## 🚀 **Setup Instructions**

### **STEP 1: Run Database Script**

1. Open Supabase Dashboard: https://app.supabase.com
2. Go to SQL Editor
3. Copy content from `database/add_multi_location_delivery.sql`
4. Paste and click "Run"
5. You should see: ✅ Multi-location delivery support added successfully!

This adds:
- `delivery_type` column ('self', 'mahabubabad', 'friends_family')
- `recipient_name` column (for gift orders)
- `recipient_phone` column (recipient contact)
- `recipient_location` column (delivery city/area)

---

### **STEP 2: Integrate Multi-Location Component**

**File:** `app/checkout/page.tsx`

#### **2a. Add Import** (after line 18):
```typescript
import MultiLocationDelivery from '@/components/checkout/MultiLocationDelivery';
```

#### **2b. Add State** (after line 68):
```typescript
const [deliveryLocationData, setDeliveryLocationData] = useState<any>(null);
```

#### **2c. Add Component to Step 2**

Find the "Delivery Information" section (around line 863-873) and ADD this component **at the top of the delivery form**, before the address fields:

```typescript
{/* Delivery Information */}
{currentStep === 2 && (
  <Card className="p-6">
    <div className="flex items-center space-x-2 mb-6">
      <Truck className="h-5 w-5 text-emerald-600" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Delivery Information
      </h2>
    </div>

    <div className="space-y-4">
      {/* ===== ADD THIS COMPONENT HERE ===== */}
      <MultiLocationDelivery 
        onDeliveryLocationChange={(location) => {
          setDeliveryLocationData(location);
          console.log('Delivery location changed:', location);
        }}
        onLocationVerified={(isValid, locationType) => {
          if (!isValid && locationType === 'self') {
            toast.warning('You are outside our 3km delivery range');
          }
        }}
      />
      {/* ===== END NEW COMPONENT ===== */}

      {/* Rest of your delivery form fields... */}
      <div>
        <Label htmlFor="address">Street Address</Label>
        ...
      </div>
    </div>
  </Card>
)}
```

#### **2d. Update Order Data**

Find the `handlePlaceOrder` function where `orderData` is created. UPDATE it to include:

```typescript
const orderData = {
  user_id: user?.id || null,
  customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
  customer_email: customerInfo.email,
  customer_phone: customerInfo.phone,
  items: cartState.items.map(item => ({
    product: item.product,
    quantity: item.quantity
  })),
  subtotal: cartState.total,
  discount: totalDiscount,
  
  // Update delivery fee based on delivery type
  delivery_fee: deliveryLocationData?.type === 'mahabubabad' ? 150 : 
                deliveryLocationData?.type === 'friends_family' ? 100 : 
                deliveryFee,
  
  tax: tax,
  total: total,
  status: 'pending',
  payment_method: paymentMethod,
  delivery_address: {
    address: deliveryInfo.address,
    city: deliveryInfo.city,
    state: deliveryInfo.state,
    zipCode: deliveryInfo.zipCode,
    instructions: deliveryInfo.instructions
  },
  
  // ===== ADD THESE FIELDS ===== */}
  delivery_type: deliveryLocationData?.type || 'self',
  recipient_name: deliveryLocationData?.recipientName || null,
  recipient_phone: deliveryLocationData?.recipientPhone || null,
  recipient_location: deliveryLocationData?.city || 
                      (deliveryLocationData?.type === 'mahabubabad' ? 'Mahabubabad' : null),
  customer_location: deliveryLocationData?.gpsLocation || null,
  // ===== END NEW FIELDS =====
};
```

---

## 📋 **What Each Option Does:**

### **Option 1: Deliver to Me (Within 3km)**
- **Use Case:** Regular delivery to customer's location
- **Validation:** GPS check - must be within 3km
- **Delivery Fee:** ₹50 (free above ₹500)
- **Time:** 30-45 minutes
- **Location Capture:** Automatic GPS

### **Option 2: Deliver to Mahabubabad**
- **Use Case:** Send gifts to friends & family in Mahabubabad
- **Validation:** Recipient details required
- **Delivery Fee:** ₹150 (fixed)
- **Time:** 2-3 hours (~100km distance)
- **Location Capture:** Recipient address (no GPS needed)
- **Fields Required:**
  - Recipient Name
  - Recipient Phone
  - Complete Address in Mahabubabad
  - Landmark (optional)
  - PIN Code

### **Option 3: Deliver to Friends & Family (Other Locations)**
- **Use Case:** Send orders anywhere else
- **Validation:** Complete address required
- **Delivery Fee:** ₹100 (varies by distance)
- **Time:** 1-3 hours (depending on location)
- **Location Capture:** Full address with city, state, PIN
- **Fields Required:**
  - Recipient Name
  - Recipient Phone
  - Complete Address
  - City
  - State
  - PIN Code
  - Landmark (optional)

---

## 🎨 **User Experience**

### **What Customers See:**

```
┌─────────────────────────────────────┐
│ 🎁 Delivery Location Options        │
├─────────────────────────────────────┤
│                                     │
│ ◉ 🏠 Deliver to Me (Within 3km)     │
│    Standard delivery to your        │
│    current location                 │
│    Fee: ₹50 • Time: 30-45 min       │
│                                     │
│ ○ 📍 Deliver to Mahabubabad         │
│    Send gifts to friends & family   │
│    Fee: ₹150 • Time: 2-3 hours      │
│                                     │
│ ○ 👥 Deliver to Friends & Family    │
│    Send orders anywhere             │
│    Fee: ₹100 • Time: 1-3 hours      │
└─────────────────────────────────────┘
```

### **When Mahabubabad is Selected:**

```
┌─────────────────────────────────────┐
│ 🎁 Recipient Details (Mahabubabad)  │
├─────────────────────────────────────┤
│ Recipient Name: [____________]      │
│ Recipient Phone: [____________]     │
│ Address: [_____________________]    │
│ Landmark: [____________]            │
│ PIN Code: [______]                  │
│                                     │
│ 📍 Delivery Fee: ₹150               │
│ ⏱️  Estimated Time: 2-3 hours        │
│ 📏 Distance: ~100 km                │
└─────────────────────────────────────┘
```

---

## 💾 **Database Structure**

### **New Fields in `orders` Table:**

```sql
delivery_type      VARCHAR(20)   -- 'self', 'mahabubabad', 'friends_family'
recipient_name     VARCHAR(255)  -- Recipient's name (for gifts)
recipient_phone    VARCHAR(20)   -- Recipient's phone
recipient_location VARCHAR(100)  -- Delivery city/area
```

### **Sample Order Data:**

#### **Self Delivery:**
```json
{
  "delivery_type": "self",
  "customer_name": "John Doe",
  "customer_phone": "9876543210",
  "recipient_name": null,
  "recipient_phone": null,
  "recipient_location": null,
  "customer_location": {
    "latitude": 17.390000,
    "longitude": 78.490000,
    "distance": 1.5,
    "isWithinRange": true
  }
}
```

#### **Mahabubabad Delivery:**
```json
{
  "delivery_type": "mahabubabad",
  "customer_name": "John Doe",
  "customer_phone": "9876543210",
  "recipient_name": "Ram Kumar",
  "recipient_phone": "9123456789",
  "recipient_location": "Mahabubabad",
  "delivery_address": {
    "address": "123 Main Road, Near Bus Stand",
    "city": "Mahabubabad",
    "state": "Telangana",
    "zipCode": "506101"
  }
}
```

---

## 👨‍💼 **Admin Dashboard View**

### **What Admins See:**

For **Self Delivery Orders:**
- 🏠 Standard delivery badge
- GPS location with Google Maps link
- Distance from store

For **Mahabubabad Orders:**
- 📍 Mahabubabad badge (orange)
- Recipient name and phone
- Special delivery fee: ₹150
- Estimated time: 2-3 hours

For **Friends & Family Orders:**
- 👥 Gift order badge (blue)
- Recipient details
- Destination city
- Variable delivery fee

---

## ⚙️ **Configuration**

### **Update Mahabubabad Coordinates:**

If you need to update Mahabubabad location, edit `lib/config/store.ts`:

```typescript
specialZones: {
  mahabubabad: {
    name: 'Mahabubabad',
    latitude: 17.5981,      // ← Update if needed
    longitude: 80.0034,     // ← Update if needed
    deliveryFee: 150,       // ← Change delivery fee
    estimatedTime: '2-3 hours',
  },
}
```

### **Add More Special Zones:**

You can add more cities by editing `lib/config/store.ts`:

```typescript
specialZones: {
  mahabubabad: { ... },
  warangal: {
    name: 'Warangal',
    latitude: 17.9689,
    longitude: 79.5941,
    deliveryFee: 120,
    estimatedTime: '1.5-2 hours',
  },
  khammam: {
    name: 'Khammam',
    latitude: 17.2473,
    longitude: 80.1436,
    deliveryFee: 130,
    estimatedTime: '2-2.5 hours',
  },
}
```

---

## 🧪 **Testing**

### **Test Scenario 1: Self Delivery**
1. Go to checkout
2. Select "Deliver to Me (Within 3km)"
3. Click "Verify My Location"
4. Allow location access
5. See: ✓ Within 3km range
6. Complete order
7. Check admin - see GPS location

### **Test Scenario 2: Mahabubabad Delivery**
1. Go to checkout
2. Select "Deliver to Mahabubabad"
3. Fill recipient details:
   - Name: Ram Kumar
   - Phone: 9123456789
   - Address: 123 Main Road
   - Landmark: Near Bus Stand
   - PIN: 506101
4. Complete order
5. Check admin - see Mahabubabad badge and recipient info

### **Test Scenario 3: Friends & Family**
1. Go to checkout
2. Select "Deliver to Friends & Family"
3. Fill all recipient details including city
4. Complete order
5. Check admin - see gift order badge

---

## 📊 **Admin Dashboard Queries**

### **Get Mahabubabad Orders:**
```sql
SELECT * FROM mahabubabad_orders LIMIT 10;
```

### **Get Delivery Statistics:**
```sql
SELECT * FROM get_delivery_type_statistics();
```

### **Get Orders by Type:**
```sql
-- Self deliveries only
SELECT * FROM get_orders_by_delivery_type('self', 20);

-- Mahabubabad only
SELECT * FROM get_orders_by_delivery_type('mahabubabad', 20);

-- Friends & family only
SELECT * FROM get_orders_by_delivery_type('friends_family', 20);
```

---

## 💰 **Pricing Summary**

| Delivery Type | Fee | Free Delivery Threshold | Estimated Time |
|---------------|-----|------------------------|----------------|
| Self (3km) | ₹50 | Above ₹500 | 30-45 min |
| Mahabubabad | ₹150 | No free delivery | 2-3 hours |
| Friends & Family | ₹100 | No free delivery | 1-3 hours |

---

## ✅ **Integration Checklist**

### **Database:**
- [ ] Run `database/add_multi_location_delivery.sql` in Supabase
- [ ] Verify new columns added
- [ ] Test queries work

### **Code:**
- [ ] Import `MultiLocationDelivery` in checkout page
- [ ] Add `deliveryLocationData` state
- [ ] Add component to Step 2 form
- [ ] Update order data with delivery type fields
- [ ] Update delivery fee calculation

### **Testing:**
- [ ] Test self delivery (within 3km)
- [ ] Test Mahabubabad delivery
- [ ] Test friends & family delivery
- [ ] Verify in admin dashboard
- [ ] Check recipient info displays correctly

---

## 🎁 **Benefits**

### **For Customers:**
- ✅ Send gifts to friends & family
- ✅ No geographical restrictions for gifts
- ✅ Special Mahabubabad delivery option
- ✅ Clear pricing upfront

### **For Business:**
- ✅ Expand delivery reach beyond 3km
- ✅ Capture gift order market
- ✅ Higher delivery fees for distant locations
- ✅ Track delivery types in analytics

### **For Admin:**
- ✅ See delivery type at a glance
- ✅ Recipient contact information
- ✅ Special badges for different order types
- ✅ Filter orders by delivery type

---

## 📞 **Use Cases**

### **Scenario 1: Birthday Gift**
Customer in Hyderabad wants to send a birthday gift to friend in Mahabubabad:
1. Selects "Deliver to Mahabubabad"
2. Enters friend's name and phone
3. Provides Mahabubabad address
4. Pays ₹150 delivery fee
5. Order delivered in 2-3 hours

### **Scenario 2: Family Order**
Customer wants to send groceries to parents in another city:
1. Selects "Deliver to Friends & Family"
2. Enters parents' details
3. Provides complete address with city/state
4. Pays ₹100 delivery fee
5. Order delivered based on distance

### **Scenario 3: Regular Order**
Customer wants items for themselves:
1. Selects "Deliver to Me"
2. GPS auto-verifies location
3. Must be within 3km
4. Standard ₹50 delivery (free above ₹500)
5. Fast delivery in 30-45 min

---

## 🎨 **Customization**

### **Change Mahabubabad Delivery Fee:**

Edit `lib/config/store.ts`:
```typescript
mahabubabad: {
  deliveryFee: 200,  // Change from ₹150 to ₹200
}
```

### **Add More Cities:**

```typescript
specialZones: {
  mahabubabad: { ... },
  warangal: {
    name: 'Warangal',
    latitude: 17.9689,
    longitude: 79.5941,
    deliveryFee: 120,
    estimatedTime: '1.5-2 hours',
  },
}
```

Then update the component to add more radio options!

---

## 📱 **Mobile Experience**

The component is fully responsive and optimized for Android:
- ✅ Touch-friendly radio buttons
- ✅ Easy form filling
- ✅ GPS auto-capture for self delivery
- ✅ Clear visual feedback
- ✅ Toast notifications

---

## 🔍 **Admin Dashboard Integration**

The admin dashboard will automatically show:

**For Self Delivery:**
- Badge: "🏠 Self Delivery"
- GPS Location with map link
- Distance from store

**For Mahabubabad:**
- Badge: "📍 Mahabubabad"
- Recipient: Ram Kumar (9123456789)
- Delivery Fee: ₹150
- Location: Mahabubabad, Telangana

**For Friends & Family:**
- Badge: "👥 Gift Order"
- Recipient: Name (Phone)
- Location: City, State
- Delivery Fee: ₹100

---

## 🎉 **You're All Set!**

After integration, customers can:
- ✅ Order for themselves (within 3km)
- ✅ Send gifts to Mahabubabad
- ✅ Deliver to friends & family anywhere

**Next Steps:**
1. Run the database script
2. Follow the integration steps above
3. Test all three delivery options
4. Check admin dashboard displays correctly

Happy delivering! 🚚



