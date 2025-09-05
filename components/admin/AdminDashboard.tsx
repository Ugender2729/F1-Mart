'use client';

import React, { useState, useEffect } from 'react';
import { useProducts, useCategories } from '@/hooks/useSupabase';
import { useAllOrders } from '@/hooks/useOrders';
import AddProductForm from './AddProductForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { products, loading: productsLoading, refetch: refetchProducts } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { orders, loading: ordersLoading, updateOrderStatus } = useAllOrders();
  const router = useRouter();

  useEffect(() => {
    // Check admin session from localStorage
    const adminSession = localStorage.getItem('admin');
    if (adminSession) {
      setAdmin(JSON.parse(adminSession));
    } else {
      router.push('/auth');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('admin');
    router.push('/auth');
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: Users,
      iconColor: 'text-emerald-600',
      valueColor: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/25'
    },
    {
      title: 'Orders Today',
      value: orders.length.toString(),
      icon: ShoppingCart,
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/25'
    },
    {
      title: 'Revenue',
      value: '₹45,230',
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-500/25'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-indigo-100">Welcome back, {admin.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.shadowColor} shadow-lg`}>
                    <stat.icon className={`h-8 w-8 text-white`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg border-0">
            <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Products</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">Categories</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">Product Management</CardTitle>
                    <CardDescription className="text-gray-600">
                      Manage your store's product inventory
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProduct(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl shadow-md"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600">₹{product.price} • {product.stock} in stock</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">Category Management</CardTitle>
                    <CardDescription className="text-gray-600">
                      Organize your products into categories
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <div className="text-center py-8">Loading categories...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-32 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <h3 className="font-semibold text-gray-800 text-lg mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{category.productCount} products</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-2xl font-bold text-gray-800">Order Management</CardTitle>
                <CardDescription className="text-gray-600">
                  View and manage customer orders ({orders.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <ShoppingCart className="h-12 w-12 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500">Orders will appear here when customers place them.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                              <p className="text-gray-600">
                                {order.users?.email || 'Guest User'} • {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Items ({order.items.length})</h4>
                              <div className="space-y-1">
                                {order.items.slice(0, 3).map((item: any, index: number) => (
                                  <p key={index} className="text-sm text-gray-600">
                                    {item.product.name} × {item.quantity}
                                  </p>
                                ))}
                                {order.items.length > 3 && (
                                  <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
                              <p className="text-sm text-gray-600">
                                {order.delivery_address?.address}, {order.delivery_address?.city}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.delivery_address?.state} - {order.delivery_address?.zipCode}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              Payment: {order.payment_method.toUpperCase()}
                            </div>
                            <div className="flex space-x-2">
                              {order.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Confirm
                                </Button>
                              )}
                              {order.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Ship
                                </Button>
                              )}
                              {order.status === 'shipped' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Mark Delivered
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductForm
          onClose={() => setShowAddProduct(false)}
          onProductAdded={() => {
            refetchProducts();
            setShowAddProduct(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
