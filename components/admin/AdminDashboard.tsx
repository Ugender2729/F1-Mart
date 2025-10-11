'use client';

import React, { useState, useEffect } from 'react';
import { useProducts, useCategories } from '@/hooks/useSupabase';
import { useAllOrders } from '@/hooks/useOrders';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import AddProductForm from './AddProductForm';
import AddCategoryForm from './AddCategoryForm';
import EditProductForm from './EditProductForm';
import EditCategoryForm from './EditCategoryForm';
import { StockManagement } from './StockManagement';
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
  LogOut,
  Phone,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { products, loading: productsLoading, refetch: refetchProducts } = useProducts();
  const { categories, loading: categoriesLoading, refetch: refetchCategories } = useCategories();
  const { orders, loading: ordersLoading, error: ordersError, updateOrderStatus, refetch: refetchOrders } = useAllOrders();
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

  // Refresh orders when component mounts
  useEffect(() => {
    if (admin) {
      refetchOrders();
    }
  }, [admin]); // Remove refetchOrders from dependencies to prevent re-runs

  const handleSignOut = () => {
    localStorage.removeItem('admin');
    router.push('/auth');
  };

  // Helper function to safely get customer name
  const getCustomerName = (order: any) => {
    if (order.customer_name) {
      return order.customer_name;
    }
    
    if (order.customerInfo && order.customerInfo.firstName) {
      const firstName = order.customerInfo.firstName || '';
      const lastName = order.customerInfo.lastName || '';
      return `${firstName} ${lastName}`.trim();
    }
    
    if (order.delivery_address?.customer?.name) {
      return order.delivery_address.customer.name;
    }
    
    return order.customer_email || 'Guest User';
  };

  // Helper function to safely get customer phone
  const getCustomerPhone = (order: any) => {
    return order.customer_phone || 
           (order.customerInfo && order.customerInfo.phone) || 
           order.delivery_address?.customer?.phone || 
           (order.users && order.users.phone);
  };

  // Helper function to safely get customer email
  const getCustomerEmail = (order: any) => {
    return order.customer_email || 
           (order.customerInfo && order.customerInfo.email) || 
           (order.users && order.users.email);
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      // Delete from Supabase database
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error('Database delete error:', error);
        toast.error('Failed to delete order from database');
        return;
      }

      // Also remove from localStorage as backup
      if (typeof window !== 'undefined') {
        const ordersData = localStorage.getItem('orders');
        if (ordersData) {
          const orders = JSON.parse(ordersData);
          const updatedOrders = orders.filter((order: any) => order.id !== orderId);
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
        }
      }

      // Refresh orders list
      await refetchOrders();
      setDeleteOrderId(null);
      
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
  };

  const handleUpdateProduct = async (updatedProduct: any) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: parseFloat(updatedProduct.price),
          original_price: updatedProduct.originalPrice ? parseFloat(updatedProduct.originalPrice) : null,
          image: updatedProduct.image,
          category: updatedProduct.category,
          stock: parseInt(updatedProduct.stock),
          unit: updatedProduct.unit
        })
        .eq('id', updatedProduct.id);

      if (error) {
        toast.error('Failed to update product');
        return;
      }

      toast.success('Product updated successfully');
      setEditingProduct(null);
      refetchProducts();
    } catch (error) {
      console.error('Update product error:', error);
      toast.error('Failed to update product');
    }
  };

  const handleUpdateCategory = async (updatedCategory: any) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          name: updatedCategory.name,
          description: updatedCategory.description,
          image: updatedCategory.image,
          slug: updatedCategory.slug
        })
        .eq('id', updatedCategory.id);

      if (error) {
        toast.error('Failed to update category');
        return;
      }

      toast.success('Category updated successfully');
      setEditingCategory(null);
      refetchCategories();
    } catch (error) {
      console.error('Update category error:', error);
      toast.error('Failed to update category');
    }
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-300">Welcome back, {admin.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
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
            <Card key={index} className="border border-gray-800 bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.shadowColor} shadow-lg`}>
                    <stat.icon className={`h-8 w-8 text-white`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 shadow-lg border border-gray-800">
            <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white">Products</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-gray-300 hover:text-white">Categories</TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-gray-300 hover:text-white">Stock</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300 hover:text-white">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">Product Management</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage your store's product inventory
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProduct(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800">
                {productsLoading ? (
                  <div className="text-center py-8 text-gray-300">Loading products...</div>
                ) : (
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl shadow-md"
                          />
                          <div>
                            <h3 className="font-semibold text-white text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-300">₹{product.price} • {product.stock} in stock</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-900/20">
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
            <Card className="border border-gray-700 bg-gray-800 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">Category Management</CardTitle>
                    <CardDescription className="text-gray-300">
                      Organize your products into categories
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddCategory(true)}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800">
                {categoriesLoading ? (
                  <div className="text-center py-8 text-gray-300">Loading categories...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="p-4 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-32 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <h3 className="font-semibold text-white text-lg mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-300 mb-4">{category.productCount} products</p>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-emerald-500 text-emerald-400 hover:bg-emerald-900/20"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-900/20">
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

          {/* Stock Management Tab */}
          <TabsContent value="stock" className="space-y-4">
            <StockManagement />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="border border-gray-800 bg-gray-900 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">Order Management</CardTitle>
                    <CardDescription className="text-gray-300">
                  View and manage customer orders ({orders.length} total)
                </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      refetchOrders();
                    }}
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-900/20"
                  >
                    Refresh Orders
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900">
                {ordersError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Error Loading Orders</h3>
                    <p className="text-red-400 mb-4">{ordersError}</p>
                    <Button onClick={refetchOrders} variant="outline" className="border-red-500 text-red-400 hover:bg-red-900/20">
                      Try Again
                    </Button>
                  </div>
                ) : ordersLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-gray-300 mt-4">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-300">
                    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <ShoppingCart className="h-12 w-12 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                    <p className="text-gray-300">Orders will appear here when customers place them.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border border-gray-700 bg-gray-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg text-white">Order #{order.id.slice(0, 8)}</h3>
                              <p className="text-gray-300">
                                {order.user_id === null ? (
                                  <span className="flex items-center">
                                    <span className="bg-orange-900 text-orange-300 px-2 py-1 rounded-full text-xs font-medium mr-2">
                                      Guest
                                    </span>
                                    {getCustomerName(order)}
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs font-medium mr-2">
                                      Registered
                                    </span>
                                    {order.users?.first_name && order.users?.last_name ? 
                                      `${order.users.first_name} ${order.users.last_name}` : 
                                      order.users?.email || 'User'
                                    }
                                  </span>
                                )} • {new Date(order.created_at || (order as any).orderDate || new Date()).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {getCustomerPhone(order) ? 
                                  `📞 ${getCustomerPhone(order)}` : 
                                  '⚠️ Phone required'
                                }
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-white">₹{(order.total || 0).toFixed(2)}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                (order.status || 'confirmed') === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                                (order.status || 'confirmed') === 'confirmed' ? 'bg-green-900 text-green-300' :
                                (order.status || 'confirmed') === 'shipped' ? 'bg-blue-900 text-blue-300' :
                                'bg-gray-700 text-gray-300'
                              }`}>
                                {(order.status || 'confirmed').charAt(0).toUpperCase() + (order.status || 'confirmed').slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-medium text-gray-300 mb-2">Items ({(order.items || []).length})</h4>
                              <div className="space-y-1">
                                {(order.items || []).slice(0, 3).map((item: any, index: number) => (
                                  <p key={index} className="text-sm text-gray-400">
                                    {item.product?.name || 'Unknown Product'} × {item.quantity || 1}
                                  </p>
                                ))}
                                {(order.items || []).length > 3 && (
                                  <p className="text-sm text-gray-500">+{(order.items || []).length - 3} more items</p>
                                )}
                              </div>
                            </div>

                            {/* Customer Information */}
                            <div>
                              <h4 className="font-medium text-gray-300 mb-2">Customer Information</h4>
                              {order.user_id === null ? (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-orange-400 bg-orange-900 px-2 py-1 rounded">Guest Order</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-400">
                                      <span className="font-medium">Name:</span> {getCustomerName(order)}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      <span className="font-medium">Phone:</span> {
                                        getCustomerPhone(order) ? (
                                        <a 
                                          href={`tel:${getCustomerPhone(order)}`}
                                          className="text-blue-400 hover:text-blue-300 underline ml-1 font-semibold"
                                        >
                                          {getCustomerPhone(order)}
                                        </a>
                                      ) : (
                                        <span className="text-red-400 ml-1 font-semibold">⚠️ Required</span>
                                      )}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      <span className="font-medium">Email:</span> {
                                        getCustomerEmail(order) ? (
                                        <a 
                                          href={`mailto:${getCustomerEmail(order)}`}
                                          className="text-blue-400 hover:text-blue-300 underline ml-1"
                                        >
                                          {getCustomerEmail(order)}
                                        </a>
                                      ) : (
                                        <span className="text-gray-500 ml-1">Not provided</span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-400">
                                    <span className="font-medium">Name:</span> {order.users?.first_name && order.users?.last_name ? 
                                      `${order.users.first_name} ${order.users.last_name}` : 
                                      order.users?.email?.split('@')[0] || 'User'
                                    }
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    <span className="font-medium">Phone:</span> {(order.users as any)?.phone || order.delivery_address?.customer?.phone ? (
                                      <a 
                                        href={`tel:${(order.users as any)?.phone || order.delivery_address?.customer?.phone}`}
                                        className="text-blue-400 hover:text-blue-300 underline ml-1"
                                      >
                                        {(order.users as any)?.phone || order.delivery_address?.customer?.phone}
                                      </a>
                                    ) : (
                                      <span className="text-gray-500 ml-1">Not provided</span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    <span className="font-medium">Email:</span> {order.users?.email ? (
                                      <a 
                                        href={`mailto:${order.users?.email}`}
                                        className="text-blue-400 hover:text-blue-300 underline ml-1"
                                      >
                                        {order.users?.email}
                                      </a>
                                    ) : (
                                      <span className="text-gray-500 ml-1">Not provided</span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    <span className="font-medium">User ID:</span> <span className="text-gray-500 ml-1">{order.user_id.slice(0, 8)}...</span>
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Delivery Information */}
                            <div>
                              <h4 className="font-medium text-gray-300 mb-2">Delivery Address</h4>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">Address:</span> {order.delivery_address?.address || (order as any).deliveryInfo?.address || 'Not provided'}
                                </p>
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">City:</span> {order.delivery_address?.city || (order as any).deliveryInfo?.city || 'Not provided'}
                                </p>
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">State:</span> {order.delivery_address?.state || (order as any).deliveryInfo?.state || 'Not provided'}
                                </p>
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">ZIP:</span> {order.delivery_address?.zipCode || (order as any).deliveryInfo?.zipCode || 'Not provided'}
                                </p>
                                {order.delivery_address?.landmark || (order as any).deliveryInfo?.landmark ? (
                                  <p className="text-sm text-gray-400">
                                    <span className="font-medium">Landmark:</span> {order.delivery_address?.landmark || (order as any).deliveryInfo?.landmark}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                            <div className="flex items-center space-x-4">
                              <div className="text-sm text-gray-300">
                                Payment: {(order.payment_method || 'COD').toUpperCase()}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-400 hover:bg-red-900/20"
                                onClick={() => setDeleteOrderId(order.id)}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                            <div className="flex space-x-2">
                              {/* Quick Contact Actions */}
                              {getCustomerPhone(order) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-500 text-green-400 hover:bg-green-900/20"
                                  onClick={() => {
                                    window.open(`tel:${getCustomerPhone(order)}`, '_self');
                                  }}
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </Button>
                              )}
                              {getCustomerEmail(order) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                                  onClick={() => {
                                    window.open(`mailto:${getCustomerEmail(order)}`, '_self');
                                  }}
                                >
                                  <Mail className="h-3 w-3 mr-1" />
                                  Email
                                </Button>
                              )}
                              {order.user_id === null ? (
                                <span className="text-xs text-orange-400 bg-orange-900 px-2 py-1 rounded">
                                  Guest Order - Status tracking in localStorage
                                </span>
                              ) : (
                                <>
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
                                </>
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

      {/* Add Category Modal */}
      {showAddCategory && (
        <AddCategoryForm
          onClose={() => setShowAddCategory(false)}
          onCategoryAdded={() => {
            refetchCategories();
            setShowAddCategory(false);
          }}
        />
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleUpdateProduct}
        />
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <EditCategoryForm
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onCategoryUpdated={handleUpdateCategory}
        />
      )}

      {/* Delete Order Confirmation Modal */}
      {deleteOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-900 rounded-full p-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Order</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete order <span className="font-mono text-white">#{deleteOrderId.slice(0, 8)}</span>? 
              This will permanently remove the order from the system.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => setDeleteOrderId(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDeleteOrder(deleteOrderId)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
