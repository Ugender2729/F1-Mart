'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { useNavigate } from '@/hooks/useNavigate';

const CartPage = () => {
  const { state: cartState } = useCart();
  const { navigate } = useNavigate();

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="text-gray-400 dark:text-gray-500">
            <ShoppingCart className="h-24 w-24 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-8 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart ({cartState.itemCount} items)
            </h1>
          </div>
          
          {/* Quick Checkout Button */}
          <Button 
            onClick={() => navigate('/checkout')}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Checkout Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Items in your cart
                </h2>
                <div className="space-y-0">
                  {cartState.items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary
                subtotal={cartState.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;