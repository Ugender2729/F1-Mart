import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useOrders, Order } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Clock, CheckCircle, Truck, ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const { user } = useAuth();
  const { orders, loading: ordersLoading, fetchOrders } = useOrders();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const router = useRouter();

  // Fetch recent orders when component mounts
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  // Get recent orders (last 3)
  useEffect(() => {
    if (orders && orders.length > 0) {
      setRecentOrders(orders.slice(0, 3));
    } else {
      setRecentOrders([]);
    }
  }, [orders]);

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'delivered':
        return { icon: Truck, color: 'text-green-600', bgColor: 'bg-green-100' };
      default:
        return { icon: Package, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

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

  const discountInfo = getDiscountInfo(subtotal);
  const deliveryFee = subtotal >= 500 ? 0 : 50; // Fixed delivery fee
  const couponDiscount = discountInfo?.type === 'coupon' ? discountInfo.amount : 0;
  const tax = (subtotal - couponDiscount) * 0.18; // 18% GST on discounted amount
  const total = subtotal - couponDiscount + deliveryFee + tax;

  // Handle checkout navigation
  const handleCheckout = () => {
    if (subtotal === 0) {
      return; // Don't allow checkout with empty cart
    }
    router.push('/checkout');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Order Summary
      </h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
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
            Delivery {subtotal >= 500 && '(Free over ₹500)'}
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
      
      <Separator />
      
      <div className="flex justify-between text-lg font-bold">
        <span className="text-gray-900 dark:text-white">Total</span>
        <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
      </div>
      
      {/* Checkout Button */}
      <Button 
        onClick={handleCheckout}
        disabled={subtotal === 0}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {subtotal === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
      </Button>
      
      {!discountInfo && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
          <p>Add ₹{(500 - subtotal).toFixed(2)} more for free delivery</p>
          <p>Add ₹{(700 - subtotal).toFixed(2)} more for ₹150 coupon</p>
          <p>Add ₹{(1000 - subtotal).toFixed(2)} more for ₹250 coupon</p>
        </div>
      )}
      
      {discountInfo && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 text-center">
            🎉 {discountInfo.description}
          </p>
        </div>
      )}

      {/* Recent Orders Section */}
      {user && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Recent Orders
            </h4>
            <Link href="/orders" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </Link>
          </div>
          
          {ordersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-16 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <Link 
                    key={order.id} 
                    href={`/orders/${order.id}`}
                    className="block bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Order #{order.id.slice(-8)}
                          </span>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ₹{order.total.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {order.items?.length || 0} items
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No orders yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Your order history will appear here
              </p>
            </div>
          )}
        </div>
      )}

      {/* Guest User Order History */}
      {!user && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Order History</h4>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Sign in to view your order history and track your deliveries.
          </p>
          <Link href="/auth">
            <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
              Sign In to View Orders
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;