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
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { state: cartState, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [driverDetails, setDriverDetails] = useState<any>(null);

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
  const deliveryFee = cartState.total >= 500 ? 0 : 50;
  const couponDiscount = discountInfo?.type === 'coupon' ? discountInfo.amount : 0;
  const tax = (cartState.total - couponDiscount) * 0.18; // 18% GST on discounted amount
  const total = cartState.total - couponDiscount + deliveryFee + tax;

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `FM${timestamp}${random}`.toUpperCase();
  };

  // Generate mock driver details
  const generateDriverDetails = () => {
    const drivers = [
      { name: 'Rajesh Kumar', phone: '+91 98765 43210', vehicle: 'Honda Activa', rating: 4.8, experience: '3 years' },
      { name: 'Priya Sharma', phone: '+91 87654 32109', vehicle: 'Bajaj Pulsar', rating: 4.9, experience: '5 years' },
      { name: 'Amit Singh', phone: '+91 76543 21098', vehicle: 'TVS Jupiter', rating: 4.7, experience: '2 years' },
      { name: 'Sunita Patel', phone: '+91 65432 10987', vehicle: 'Hero Splendor', rating: 4.6, experience: '4 years' },
      { name: 'Vikram Reddy', phone: '+91 54321 09876', vehicle: 'Yamaha FZ', rating: 4.9, experience: '6 years' }
    ];
    
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    const estimatedTime = Math.floor(Math.random() * 30) + 20; // 20-50 minutes
    
    return {
      ...randomDriver,
      estimatedTime: estimatedTime,
      estimatedArrival: new Date(Date.now() + estimatedTime * 60 * 1000).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  // Form validation
  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      
      // Email validation - must be @gmail.com
      if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
      else if (!customerInfo.email.endsWith('@gmail.com')) newErrors.email = 'Email must be a Gmail address (@gmail.com)';
      else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(customerInfo.email)) newErrors.email = 'Please enter a valid Gmail address';
      
      // Phone validation - must start with 6,7,8,9 and be exactly 10 digits
      if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
      else {
        const cleanPhone = customerInfo.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          newErrors.phone = 'Phone number must be exactly 10 digits';
        } else if (!/^[6789]/.test(cleanPhone)) {
          newErrors.phone = 'Phone number must start with 6, 7, 8, or 9';
        }
      }
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
    setOrderError(''); // Clear any previous errors
    
    try {
      // Calculate order totals
      const subtotal = cartState.total;
      const deliveryFee = subtotal >= 500 ? 0 : 50;
      const discount = subtotal >= 1000 ? 250 : subtotal >= 700 ? 150 : 0;
      const tax = (subtotal - discount) * 0.18; // 18% GST
      const total = subtotal - discount + deliveryFee + tax;
      
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      
      // Generate driver details
      const driver = generateDriverDetails();
      setDriverDetails(driver);
      
      // Create order object for localStorage (always works)
      const order = {
        id: newOrderId,
        customerInfo,
        // Add individual customer fields for admin dashboard compatibility
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone.replace(/\D/g, ''), // Store only digits
        deliveryInfo,
        paymentMethod,
        items: cartState.items,
        subtotal: subtotal,
        deliveryFee,
        discount,
        tax,
        total,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      };
      
      // Prepare order data for database
      const orderData = user ? {
        // Authenticated user order
        user_id: user.id,
        items: cartState.items,
        subtotal: subtotal,
        discount: discount,
        delivery_fee: deliveryFee,
        tax: tax,
        total: total,
        status: 'confirmed',
        payment_method: paymentMethod,
        delivery_address: {
          ...deliveryInfo,
          customer: customerInfo
        }
      } : {
        // Guest user order
        user_id: null,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone.replace(/\D/g, ''), // Store only digits
        items: cartState.items,
        subtotal: subtotal,
        discount: discount,
        delivery_fee: deliveryFee,
        tax: tax,
        total: total,
        status: 'confirmed',
        payment_method: paymentMethod,
        delivery_address: {
          ...deliveryInfo,
          customer: customerInfo
        }
      };
      
      // Save to database FIRST
      const { data: savedOrder, error: saveError } = await createOrder(orderData);
      
      if (saveError) {
        console.error('Database save failed:', saveError);
        setOrderError('Failed to save order. Please try again.');
        setIsProcessing(false);
        return;
      }
      
      // Update order ID with database ID if available
      if (savedOrder && savedOrder.id) {
        setOrderId(savedOrder.id);
      }
      
      // Also save to localStorage as backup for immediate access
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push({
        ...order,
        id: savedOrder?.id || newOrderId,
        database_id: savedOrder?.id
      });
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
      // Show success toast
      toast.success('Order placed successfully!', {
        description: `Order ID: ${savedOrder?.id || newOrderId}`,
        duration: 3000
      });
      
      console.log('Order placed successfully:', savedOrder || order);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('There was an error placing your order. Please try again.');
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-900 dark:to-emerald-900 flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your order! Your order has been confirmed and will be processed shortly.
            </p>
            
            {/* Order ID Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Your Order ID</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-wider">{orderId}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Save this ID for order tracking</p>
            </div>
            
            {/* Guest User Notice */}
            {!user && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Guest Checkout</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You checked out as a guest. <Link href="/auth" className="underline font-medium">Sign up</Link> to track your order history and get faster checkout next time!
                </p>
              </div>
            )}
          </div>

          {/* Driver Details */}
          {driverDetails && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Delivery Partner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assigned and ready for pickup</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Driver Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{driverDetails.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{driverDetails.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{driverDetails.vehicle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{driverDetails.rating}/5.0 ({driverDetails.experience})</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Estimated Delivery Time */}
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery Time</p>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">{driverDetails.estimatedTime} minutes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expected Arrival</p>
                    <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{driverDetails.estimatedArrival}</p>
                  </div>
                </div>
              </div>
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

            {/* Authentication Status */}
            {!user && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Guest Checkout:</strong> You're checking out as a guest. 
                      <Link href="/auth" className="underline ml-1">Sign in</Link> to save your order history and get faster checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}

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

            {/* Error Display */}
            {orderError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {orderError}
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      onClick={() => setOrderError('')}
                      className="text-red-400 hover:text-red-600"
                      title="Close error message"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="john@gmail.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    <p className="text-xs text-gray-500 mt-1">Only Gmail addresses are accepted</p>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="9876543210"
                      maxLength={10}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    <p className="text-xs text-gray-500 mt-1">Must start with 6, 7, 8, or 9 and be exactly 10 digits</p>
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

                {/* Cash on Delivery Only */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 border border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Banknote className="h-5 w-5 text-emerald-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          Only Option
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Pay when your order arrives at your doorstep - No advance payment required
                      </p>
                    </div>
                  </div>
                  
                  {/* Coming Soon Notice */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">Online Payment Coming Soon</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          We're working on adding card payments and UPI options. For now, we accept Cash on Delivery only.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


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
                        <span>Placing Order...</span>
                      </div>
                    ) : (
                      `Place Order - Cash on Delivery (₹${total.toFixed(2)})`
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