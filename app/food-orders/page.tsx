'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFoodOrders } from '@/hooks/useFoodOrders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, Truck, User, ArrowLeft, Utensils, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FoodOrdersPage = () => {
  const { user } = useAuth();
  const { orders, loading, error, fetchFoodOrders } = useFoodOrders();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchFoodOrders();
    }
  }, [user, fetchFoodOrders]);

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Preparing' };
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Confirmed' };
      case 'preparing':
        return { icon: Utensils, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Preparing' };
      case 'out_for_delivery':
        return { icon: Truck, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Out for Delivery' };
      case 'delivered':
        return { icon: Package, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Delivered' };
      case 'cancelled':
        return { icon: Package, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Cancelled' };
      default:
        return { icon: Package, color: 'text-gray-600', bgColor: 'bg-gray-100', label: status };
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sign In Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please sign in to view your food delivery orders and track your meals.
            </p>
            <div className="space-y-4">
              <Link href="/auth">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  Sign In
                </Button>
              </Link>
              <div>
                <Link href="/food-delivery" className="text-orange-600 hover:text-orange-700 font-medium">
                  Browse Restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🍕 Food Delivery Orders
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your food orders - Recent orders appear first
              </p>
            </div>
            <Link href="/food-delivery">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Restaurants
              </Button>
            </Link>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading your food orders...</p>
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
              <Button onClick={() => fetchFoodOrders(true)} variant="outline">
                Try Again
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Food Orders Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any food delivery orders yet. Browse restaurants to order delicious meals!
              </p>
              <Link href="/food-delivery">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Food Order #{order.id.slice(-8)}
                          </CardTitle>
                          <CardDescription>
                            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </CardDescription>
                          <div className="mt-1">
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                              🍕 Food Delivery
                            </Badge>
                          </div>
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
                            Food Items ({order.items?.length || 0})
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
                          {order.restaurant_name && (
                            <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <p className="text-sm text-orange-700 dark:text-orange-300">
                                🏪 From: {order.restaurant_name}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Delivery Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Delivery Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">Address:</span>
                              <p className="text-gray-900 dark:text-white">
                                {order.delivery_address?.address || 'N/A'}, {order.delivery_address?.city || 'N/A'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">Payment:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.payment_method?.toUpperCase() || 'N/A'}
                              </span>
                            </div>
                            {order.estimated_delivery_time && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">Est. Delivery:</span>
                                <span className="text-gray-900 dark:text-white ml-2">
                                  {order.estimated_delivery_time} minutes
                                </span>
                              </div>
                            )}
                            {order.special_instructions && (
                              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  📝 Special Instructions: {order.special_instructions}
                                </p>
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

export default FoodOrdersPage;


