# 📋 Copy-Paste Integration Guide

## 🎯 **Simple 4-Step Integration**

Follow these steps to add Mahabubabad delivery and friends & family orders.

---

## **STEP 1: Import**

**File:** `app/checkout/page.tsx`  
**Location:** After line 18 (after the toast import)

**COPY AND PASTE THIS:**
```typescript
import MultiLocationDelivery from '@/components/checkout/MultiLocationDelivery';
```

---

## **STEP 2: State Variable**

**File:** `app/checkout/page.tsx`  
**Location:** After line 68 (after `const [pendingStripe, setPendingStripe] = useState(false);`)

**COPY AND PASTE THIS:**
```typescript
  const [deliveryLocationData, setDeliveryLocationData] = useState<any>(null);
```

---

## **STEP 3: Add Component to Form**

**File:** `app/checkout/page.tsx`  
**Location:** In Step 2 (Delivery Information), right after the header, before address fields

**FIND THIS SECTION (around line 863-873):**
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
      {/* ⬇️ ADD COMPONENT HERE ⬇️ */}
      
      <div>
        <Label htmlFor="address">Street Address</Label>
        ...
```

**COPY AND PASTE THIS** (between `<div className="space-y-4">` and the first `<div>` with address label):

```typescript
      {/* Multi-Location Delivery Component */}
      <MultiLocationDelivery 
        onDeliveryLocationChange={(location) => {
          setDeliveryLocationData(location);
          console.log('📍 Delivery location:', location);
          
          // Update delivery fee based on type
          if (location.type === 'mahabubabad') {
            toast.info('📍 Mahabubabad delivery selected - ₹150 delivery fee');
          } else if (location.type === 'friends_family') {
            toast.info('👥 Friends & family delivery - ₹100 delivery fee');
          }
        }}
        onLocationVerified={(isValid, locationType) => {
          if (!isValid && locationType === 'self') {
            toast.warning('⚠️ You are outside our 3km delivery range');
          }
        }}
      />
```

---

## **STEP 4: Update Order Data**

**File:** `app/checkout/page.tsx`  
**Location:** In `handlePlaceOrder` function where `orderData` object is created

**FIND THE `orderData` OBJECT** (should look like this):
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
  delivery_fee: deliveryFee,
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
};
```

**UPDATE IT TO THIS** (add the new fields before the closing `}`):

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
  
  // Dynamic delivery fee based on delivery type
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
  
  // ===== NEW FIELDS - COPY THESE ===== 
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

## **STEP 5: Run Database Script**

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Open file: `database/add_multi_location_delivery.sql`
4. Copy entire content
5. Paste in SQL Editor
6. Click "Run"
7. See: ✅ Multi-location delivery support added successfully!

---

## ✅ **That's It!**

You've just added:
- ✅ 3km radius check for self delivery
- ✅ Mahabubabad special delivery
- ✅ Friends & family delivery anywhere

**Test it:**
1. Go to `/checkout`
2. See 3 delivery options
3. Try each one
4. Check admin dashboard

---

## 🎁 **Quick Reference**

**Self Delivery:**
- Within 3km only
- GPS auto-check
- ₹50 fee (free above ₹500)

**Mahabubabad:**
- Special zone
- ₹150 fixed fee
- 2-3 hours delivery
- Recipient details required

**Friends & Family:**
- Anywhere in India
- ₹100 fee
- 1-3 hours (varies)
- Full address required

---

**All Done! Happy Coding! 🚀**



