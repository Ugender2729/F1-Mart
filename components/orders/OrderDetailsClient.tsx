'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';

interface Order {
  id: string;
  user_id?: string | null;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customerInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryInfo?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    instructions: string;
  };
  delivery_address?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
    customer?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
  paymentMethod?: string;
  payment_method?: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  total: number;
  status: string;
  orderDate?: string;
  created_at?: string;
  users?: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  is_localStorage?: boolean;
}

interface OrderDetailsClientProps {
  orderId: string;
}

const OrderDetailsClient: React.FC<OrderDetailsClientProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { orders: dbOrders } = useOrders();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // First, try to find the order in database orders
        let foundOrder = dbOrders.find((o: Order) => o.id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
          setLoading(false);
          return;
        }

        // If not found in database, check localStorage
        const getLocalStorageOrders = () => {
          if (typeof window === 'undefined') return [];
          const ordersData = localStorage.getItem('orders');
          return ordersData ? JSON.parse(ordersData) : [];
        };

        const localStorageOrders = getLocalStorageOrders();
        foundOrder = localStorageOrders.find((o: Order) => o.id === orderId);
        
        if (foundOrder) {
          // Normalize localStorage order format
          const normalizedOrder: Order = {
            ...foundOrder,
            is_localStorage: true,
            customer_name: foundOrder.customer_name || (foundOrder as any).customerInfo ? `${(foundOrder as any).customerInfo.firstName || ''} ${(foundOrder as any).customerInfo.lastName || ''}`.trim() : '',
            customer_email: foundOrder.customer_email || (foundOrder as any).customerInfo?.email || '',
            customer_phone: foundOrder.customer_phone || (foundOrder as any).customerInfo?.phone || '',
            delivery_address: foundOrder.delivery_address || (foundOrder as any).deliveryInfo,
            payment_method: foundOrder.payment_method || (foundOrder as any).paymentMethod || 'cod',
            created_at: foundOrder.created_at || (foundOrder as any).orderDate,
            status: foundOrder.status || 'confirmed'
          };
          setOrder(normalizedOrder);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, dbOrders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
          <Link href="/orders">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Helper functions to get customer information
  const getCustomerName = () => {
    if (order?.customer_name) return order.customer_name;
    if (order?.customerInfo) return `${order.customerInfo.firstName} ${order.customerInfo.lastName}`;
    if (order?.users) return `${order.users.first_name} ${order.users.last_name}`;
    return 'N/A';
  };

  const getCustomerEmail = () => {
    return order?.customer_email || order?.customerInfo?.email || order?.users?.email || 'N/A';
  };

  const getCustomerPhone = () => {
    return order?.customer_phone || order?.customerInfo?.phone || order?.users?.phone || 'N/A';
  };

  const getDeliveryAddress = () => {
    return order?.delivery_address || order?.deliveryInfo;
  };

  const getPaymentMethod = () => {
    return order?.payment_method || order?.paymentMethod || 'COD';
  };

  const getOrderDate = () => {
    return order?.created_at || order?.orderDate || new Date().toISOString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orders">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Details</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Order #{order.id.slice(0, 8)}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(getOrderDate()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                {order.is_localStorage && (
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    Local Storage
                  </Badge>
                )}
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-2 capitalize">{order.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                        <p className="text-emerald-600 font-semibold">₹{item.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {order.customer_name || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.customer_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.customer_phone || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-900 dark:text-white">
                    {typeof order.delivery_address === 'string' ? order.delivery_address : 
                     order.delivery_address?.address || 'N/A'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {typeof order.delivery_address === 'object' && order.delivery_address ? 
                     `${order.delivery_address.city || ''}, ${order.delivery_address.state || ''} ${order.delivery_address.zipCode || ''}`.trim() : 
                     'N/A'}
                  </p>
                  {typeof order.delivery_address === 'object' && order.delivery_address?.instructions && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Special Instructions:</p>
                      <p className="text-gray-900 dark:text-white">{order.delivery_address.instructions}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                  <span className="font-semibold">{order.payment_method || 'Cash on Delivery'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order Date</span>
                  <span className="font-semibold">{new Date(order.created_at || new Date().toISOString()).toLocaleDateString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsClient;

