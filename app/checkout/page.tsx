'use client';

import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, Banknote, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';

const CheckoutPage = () => {
  const { state: cartState, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Debug logging
  console.log('CheckoutPage rendered');
  console.log('Cart state:', cartState);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Tiered discount system
  const getDiscountInfo = (subtotal: number) => {
    if (subtotal >= 1000) {
      return { 
        type: 'coupon', 
        amount: 250, 
        description: '₹250 coupon applied!',
        threshold: 1000
      };
    } else if (subtotal >= 700) {
      return { 
        type: 'coupon', 
        amount: 150, 
        description: '₹150 coupon applied!',
        threshold: 700
      };
    } else if (subtotal >= 500) {
      return { 
        type: 'delivery', 
        amount: 0, 
        description: 'Free delivery applied!',
        threshold: 500
      };
    }
    return null;
  };

  const discountInfo = getDiscountInfo(cartState.total);
  const deliveryFee = cartState.total >= 500 ? 0 : 415;
  const couponDiscount = discountInfo?.type === 'coupon' ? discountInfo.amount : 0;
  const tax = (cartState.total - couponDiscount) * 0.08; // 8% tax on discounted amount
  const total = cartState.total - couponDiscount + deliveryFee + tax;

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `FM${timestamp}${random}`.toUpperCase();
  };

  // Form validation
  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
      if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (step === 2) {
      if (!deliveryInfo.address.trim()) newErrors.address = 'Address is required';
      if (!deliveryInfo.city.trim()) newErrors.city = 'City is required';
      if (!deliveryInfo.state.trim()) newErrors.state = 'State is required';
      if (!deliveryInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      else if (!/^\d{6}$/.test(deliveryInfo.zipCode)) newErrors.zipCode = 'ZIP code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      
      // Save order to localStorage (in real app, this would be sent to backend)
      const order = {
        id: newOrderId,
        customerInfo,
        deliveryInfo,
        paymentMethod,
        items: cartState.items,
        subtotal: cartState.total,
        deliveryFee,
        tax,
        total,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      };
      
      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartState.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add some items to your cart before checkout
          </p>
          <Link href="/products">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Order ID</p>
              <p className="text-2xl font-bold text-emerald-600">{orderId}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : 
                   paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                <span className="font-bold text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {paymentMethod === 'cod' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Banknote className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Cash on Delivery</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Please keep ₹{total.toFixed(2)} ready for payment when your order arrives. 
                Our delivery partner will collect the payment upon delivery.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link href={`/orders/${orderId}`}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                Track Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/cart">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h1>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-1 mx-2 ${
                      currentStep > step 
                        ? 'bg-emerald-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Customer Information */}
            {currentStep === 1 && (
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      placeholder="John"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      placeholder="Doe"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="9876543210"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    if (validateStep(1)) {
                      setCurrentStep(2);
                    }
                  }}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continue to Delivery
                </Button>
              </Card>
            )}

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
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                      placeholder="123 Main Street, Apartment 2B"
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                        placeholder="Mumbai"
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={deliveryInfo.state}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})}
                        placeholder="Maharashtra"
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={deliveryInfo.zipCode}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                        placeholder="400001"
                        className={errors.zipCode ? 'border-red-500' : ''}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      value={deliveryInfo.instructions}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, instructions: e.target.value})}
                      placeholder="Leave at front door, apartment 2B"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => {
                      if (validateStep(2)) {
                        setCurrentStep(3);
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {/* Payment Information */}
            {currentStep === 3 && (
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Banknote className="h-5 w-5 text-emerald-600" />
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                          <span className="text-sm text-emerald-600 font-semibold">Recommended</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Pay when your order arrives at your doorstep
                        </p>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Secure payment with your card
                        </p>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5" />
                          <span>UPI Payment</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Pay using UPI apps like PhonePe, Google Pay, Paytm
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Place Order (₹${total.toFixed(2)})`
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                {cartState.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{cartState.total.toFixed(2)}</span>
                </div>
                
                {/* Coupon Discount */}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Coupon Discount
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      -₹{couponDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Delivery {cartState.total >= 500 && '(Free over ₹500)'}
                  </span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                    {deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Discount Info Banner */}
              {discountInfo && (
                <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 text-center">
                    🎉 {discountInfo.description}
                  </p>
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
export default CheckoutPage;