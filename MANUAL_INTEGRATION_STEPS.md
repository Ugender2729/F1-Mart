# 📋 Manual Integration Steps for Customer Location

## 🎯 **Step-by-Step Guide to Add Location Capture to Checkout**

---

## **STEP 1: Add Import Statement**

At the top of `app/checkout/page.tsx`, add this import after line 18:

```typescript
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';
```

**Full imports section should look like:**
```typescript
import { FirstOrderCouponBanner } from '@/components/ui/coupon-display';
import { toast } from 'sonner';
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';  // ← ADD THIS LINE
```

---

## **STEP 2: Add State for Customer Location**

After line 68 where you have `const [pendingStripe, setPendingStripe] = useState(false);`, add:

```typescript
const [customerLocation, setCustomerLocation] = useState<any>(null);
```

**Should look like:**
```typescript
const [paymentMethod, setPaymentMethod] = useState('cod');
const [errors, setErrors] = useState<{[key: string]: string}>({});
const [pendingStripe, setPendingStripe] = useState(false);
const [customerLocation, setCustomerLocation] = useState<any>(null);  // ← ADD THIS LINE
```

---

## **STEP 3: Add Location Capture Component to UI**

Find the section around line 873 where you have "Delivery Information" form fields.

**After the "Street Address" input field** (around line 888), add the location capture component:

```typescript
                  </div>

                  {/* Customer Location Capture - ADD THIS ENTIRE BLOCK */}
                  <div className="mt-4">
                    <CustomerLocationCapture 
                      onLocationCaptured={(location) => {
                        setCustomerLocation(location);
                        console.log('Customer location captured:', location);
                        
                        // Optional: Show warning if outside range
                        if (!location.isWithinRange) {
                          toast.warning(`You are ${location.distance.toFixed(2)}km away. We deliver within 3km only.`);
                        } else {
                          toast.success(`Location verified! You are ${location.distance.toFixed(2)}km from our store.`);
                        }
                      }}
                      autoCapture={true}
                    />
                  </div>

                  <div>
```

**Visual guide of where to add it:**
```
Line 875: <Label htmlFor="address">Street Address</Label>
Line 876: <Input ... />
Line 883: </div>
          
          ← ADD LOCATION COMPONENT HERE (between lines 883-884)
          
Line 884: <div>
Line 885: <Label htmlFor="city">City</Label>
```

---

## **STEP 4: Include Location in Order Data**

Find the `handlePlaceOrder` function (around line 200-300) where the order is created.

In the order data object, add the `customer_location` field:

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
  customer_location: customerLocation,  // ← ADD THIS LINE
};
```

---

## **STEP 5: Run Database Script**

Before testing, you need to add the `customer_location` column to your database:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy all content from `database/add_customer_location.sql`
4. Paste and click "Run"
5. You should see: ✅ Customer location field added successfully!

---

## **STEP 6: Test the Integration**

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Go to checkout:**
   - Add items to cart
   - Go to `/checkout`
   - Fill in customer information (Step 1)
   - Click "Continue to Delivery"

3. **On Step 2 (Delivery Information):**
   - You should see the "Customer Location" card
   - Component will auto-capture your location
   - You'll see: "Location verified! You are X.XX km from our store"

4. **Complete checkout:**
   - Fill in delivery address
   - Complete payment
   - Order is created with location data

5. **Check Admin Dashboard:**
   - Go to `/admin`
   - Sign in (9381493260)
   - Click "Orders" tab
   - Find your order
   - You should see the GPS Location section with:
     - Latitude and Longitude
     - Distance badge
     - "Open in Google Maps" link

---

## 📝 **Complete Code Example**

Here's the complete section with all the changes:

### **At the top (imports):**
```typescript
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';
```

### **In state declarations:**
```typescript
const [customerLocation, setCustomerLocation] = useState<any>(null);
```

### **In the Delivery Information form (Step 2):**
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
      {/* Street Address */}
      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          value={deliveryInfo.address}
          onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
          placeholder="123 Main Street"
          required
        />
      </div>

      {/* ===== ADD CUSTOMER LOCATION HERE ===== */}
      <div className="mt-4">
        <CustomerLocationCapture 
          onLocationCaptured={(location) => {
            setCustomerLocation(location);
            console.log('Location captured:', location);
            
            if (!location.isWithinRange) {
              toast.warning(`Outside delivery range: ${location.distance.toFixed(2)}km`);
            } else {
              toast.success(`Location verified: ${location.distance.toFixed(2)}km away`);
            }
          }}
          autoCapture={true}
        />
      </div>
      {/* ===== END LOCATION SECTION ===== */}

      {/* City, State, etc... rest of the form */}
      <div>
        <Label htmlFor="city">City</Label>
        ...
      </div>
    </div>
  </Card>
)}
```

### **In handlePlaceOrder function (when creating order):**
```typescript
const orderData = {
  // ... all your existing fields ...
  customer_location: customerLocation,  // ← ADD THIS
};

await createOrder(orderData);
```

---

## ✅ **Verification Checklist**

After integration, verify:

- [ ] Import added at the top
- [ ] State variable declared
- [ ] Component added in Step 2 form
- [ ] Location included in order data
- [ ] Database script run in Supabase
- [ ] Test checkout flow
- [ ] Location captures automatically
- [ ] Toast notifications show
- [ ] Order created with location
- [ ] Location visible in admin dashboard
- [ ] Google Maps link works

---

## 🎯 **Quick Copy-Paste Sections**

### **1. Import (add after line 18):**
```typescript
import CustomerLocationCapture from '@/components/checkout/CustomerLocationCapture';
```

### **2. State (add after line 68):**
```typescript
const [customerLocation, setCustomerLocation] = useState<any>(null);
```

### **3. Component (add in delivery form):**
```typescript
<div className="mt-4">
  <CustomerLocationCapture 
    onLocationCaptured={(location) => {
      setCustomerLocation(location);
      if (!location.isWithinRange) {
        toast.warning(`Outside delivery range: ${location.distance.toFixed(2)}km`);
      }
    }}
    autoCapture={true}
  />
</div>
```

### **4. Order Data (add in orderData object):**
```typescript
customer_location: customerLocation,
```

---

## 🚀 **That's It!**

After these 4 simple changes:
1. ✅ Location auto-captures during checkout
2. ✅ Validates 3km delivery range
3. ✅ Saves with order
4. ✅ Shows in admin dashboard with Google Maps link

**Test at:** `http://localhost:3000/checkout`

---

## 💡 **Tips**

1. **Test on mobile** for better GPS accuracy
2. **Allow location permissions** when browser asks
3. **Check console** for location data logs
4. **Verify in Supabase** that location is saved
5. **Check admin dashboard** to see the GPS section

---

Need help? Check `CUSTOMER_LOCATION_INTEGRATION.md` for more details!



