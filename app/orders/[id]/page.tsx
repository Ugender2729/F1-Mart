'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Order {
  id: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryInfo: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    instructions: string;
  };
  paymentMethod: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: string;
  orderDate: string;
  estimatedDelivery: string;
}

const OrderTrackingPage = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === params.id);
    setOrder(foundOrder || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
            <Package className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'shipped': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-5 w-5" />;
      case 'processing': return <Package className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      Order #{order.id}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-semibold capitalize">{order.status}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Order Items */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ₹{item.product.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {order.deliveryInfo.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipCode}
                    </p>
                  </div>
                  {order.deliveryInfo.instructions && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Delivery Instructions:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.deliveryInfo.instructions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Tracking */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order.deliveryFee === 0 ? 'Free' : `₹${order.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{order.tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Timeline */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-emerald-600" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Order Confirmed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Package className={`h-4 w-4 ${
                        order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                          ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Processing</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Preparing your order
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Truck className={`h-4 w-4 ${
                        order.status === 'shipped' || order.status === 'delivered'
                          ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Out for Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your order is on the way
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'delivered'
                        ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <CheckCircle className={`h-4 w-4 ${
                        order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Delivered</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Call Us</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1-800-FRESH-01</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Email Us</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">help@freshmarket.com</p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full mt-4">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
