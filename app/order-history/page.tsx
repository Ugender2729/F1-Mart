'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, Truck, Search, ArrowLeft, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useOrderHistory } from '@/hooks/useOrderHistory';

const OrderHistoryPage = () => {
  const [searchType, setSearchType] = useState<'mobile' | 'email'>('mobile');
  const [searchValue, setSearchValue] = useState('');
  const { orders, loading, error, searchOrdersByMobileNumber, searchOrdersByEmail, clearResults } = useOrderHistory();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      return;
    }

    if (searchType === 'mobile') {
      await searchOrdersByMobileNumber(searchValue.trim());
    } else {
      await searchOrdersByEmail(searchValue.trim());
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Order History Lookup
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Search your orders using mobile number or email
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Orders
              </CardTitle>
              <CardDescription>
                Enter your mobile number or email to find your order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Search Type Toggle */}
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={searchType === 'mobile' ? 'default' : 'outline'}
                    onClick={() => setSearchType('mobile')}
                    className="flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Mobile Number
                  </Button>
                  <Button
                    type="button"
                    variant={searchType === 'email' ? 'default' : 'outline'}
                    onClick={() => setSearchType('email')}
                    className="flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>

                {/* Search Input */}
                <div className="flex space-x-2">
                  <Input
                    type={searchType === 'mobile' ? 'tel' : 'email'}
                    placeholder={searchType === 'mobile' ? 'Enter 10-digit mobile number' : 'Enter email address'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1"
                    maxLength={searchType === 'mobile' ? 10 : undefined}
                  />
                  <Button type="submit" disabled={loading || !searchValue.trim()}>
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Clear Results */}
                {orders.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearResults}
                    className="w-full"
                  >
                    Clear Results
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {orders.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Found {orders.length} order{orders.length !== 1 ? 's' : ''}
                </h2>
              </div>

              {orders.map((order) => {
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
                            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
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

                        {/* Customer Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Customer Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Name:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.customer_name || 'N/A'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Email:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.customer_email || 'N/A'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.customer_phone || 'N/A'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Payment:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.payment_method?.toUpperCase() || 'N/A'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Order Type:</span>
                              <span className="text-gray-900 dark:text-white ml-2">
                                {order.user_id ? 'Registered User' : 'Guest User'}
                              </span>
                            </div>
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

          {/* No Results */}
          {!loading && orders.length === 0 && searchValue && !error && (
            <Card>
              <CardContent className="pt-6 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No orders found for the provided {searchType === 'mobile' ? 'mobile number' : 'email address'}.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
