'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, Truck, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const { user } = useAuth();
  const { orders, loading, error, fetchOrders } = useOrders();
  const [localStorageOrders, setLocalStorageOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  useEffect(() => {
    // Also fetch localStorage orders for guest users or as backup
    const getLocalStorageOrders = () => {
      try {
        const ordersData = localStorage.getItem('orders');
        if (!ordersData) return [];
        
        const orders = JSON.parse(ordersData);
        if (!Array.isArray(orders)) return [];
        
        return orders.map(order => ({
          ...order,
          is_localStorage: true,
          created_at: order.orderDate || order.created_at,
          delivery_address: order.deliveryInfo || order.delivery_address,
          payment_method: order.paymentMethod || order.payment_method || 'cod',
          status: order.status || 'confirmed',
          total: order.total || 0,
          items: order.items || [],
          // Ensure customer information is available
          customer_name: order.customer_name || order.customerInfo ? 
            `${order.customerInfo?.firstName || ''} ${order.customerInfo?.lastName || ''}`.trim() : '',
          customer_email: order.customer_email || order.customerInfo?.email || '',
          customer_phone: order.customer_phone || order.customerInfo?.phone || ''
        })).sort((a, b) => new Date(b.orderDate || b.created_at).getTime() - new Date(a.orderDate || a.created_at).getTime());
      } catch (error) {
        console.error('Error reading localStorage orders:', error);
        return [];
      }
    };

    setLocalStorageOrders(getLocalStorageOrders());
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Pending' };
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Confirmed' };
      case 'shipped':
        return { icon: Truck, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Shipped' };
      case 'delivered':
        return { icon: Package, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Delivered' };
      default:
        return { icon: Package, color: 'text-gray-600', bgColor: 'bg-gray-100', label: status };
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sign In Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please sign in to view your order history and track your deliveries.
            </p>
            <div className="space-y-4">
              <Link href="/auth">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                  Sign In
                </Button>
              </Link>
              <div>
                <Link href="/products" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allOrders = [...orders, ...localStorageOrders];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Order History
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your orders and view order details
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Orders
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={() => fetchOrders(true)} variant="outline">
                Try Again
              </Button>
            </div>
          ) : allOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <Link href="/products">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {allOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Order #{order.id.slice(-8)}
                          </CardTitle>
                          <CardDescription>
                            Placed on {new Date(order.created_at || order.orderDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{order.total.toFixed(2)}
                          </p>
                          <Badge className={`${statusInfo.bgColor} ${statusInfo.color} border-0`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Items ({order.items?.length || 0})
                          </h4>
                          <div className="space-y-2">
                            {order.items?.slice(0, 3).map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {item.product?.name || item.name} × {item.quantity}
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  ₹{((item.product?.price || item.price) * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            {order.items?.length > 3 && (
                              <p className="text-sm text-gray-500">
                                +{order.items.length - 3} more items
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Delivery Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Address:</span>
                              <p className="text-gray-900 dark:text-white">
                                {order.delivery_address?.address || order.deliveryInfo?.address}, {order.delivery_address?.city || order.deliveryInfo?.city}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Payment:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.payment_method?.toUpperCase() || 'N/A'}
                              </span>
                            </div>
                            {order.is_localStorage && (
                              <div>
                                <span className="text-orange-600 text-xs bg-orange-100 px-2 py-1 rounded">
                                  Local Storage Order
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items?.length || 0} items • {order.payment_method?.toUpperCase() || 'N/A'}
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
