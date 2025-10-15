'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, X, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const { orders } = useOrders();
  const { product, quantity } = item;
  const [lastOrderedDate, setLastOrderedDate] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState(0);

  // Check if this product was previously ordered
  useEffect(() => {
    if (user && orders && orders.length > 0) {
      let lastOrderDate: string | null = null;
      let totalOrdered = 0;

      orders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(orderItem => {
            if (orderItem.product && orderItem.product.id === product.id) {
              totalOrdered += orderItem.quantity || 0;
              if (!lastOrderDate || new Date(order.created_at) > new Date(lastOrderDate)) {
                lastOrderDate = order.created_at;
              }
            }
          });
        }
      });

      setLastOrderedDate(lastOrderDate);
      setOrderCount(totalOrdered);
    }
  }, [user, orders, product.id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="relative py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
      {/* Mobile Layout (< 640px) */}
      <div className="block sm:hidden">
        <div className="flex gap-3">
          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/product/${product.id}`} className="flex-1">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(product.id)}
                className="text-red-500 hover:text-red-700 h-7 w-7 p-0 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {product.brand} • {product.weight}
            </p>
            
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                ₹{product.price}
              </p>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-7 w-7 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="text-sm font-medium text-gray-900 dark:text-white px-2 min-w-[24px] text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-7 w-7 p-0"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Total:</span>
              <p className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                ₹{(product.price * quantity).toFixed(2)}
              </p>
            </div>

            {/* Order History Info - Compact for mobile */}
            {user && orderCount > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Package className="h-3 w-3" />
                  <span>Ordered {orderCount}x before</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout (≥ 640px) */}
      <div className="hidden sm:flex items-center gap-4">
        <Link href={`/product/${product.id}`} className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {product.brand} • {product.weight}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
            ₹{product.price} per {product.unit}
          </p>
          
          {/* Order History Info */}
          {user && orderCount > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                <Package className="h-3 w-3" />
                <span>Previously ordered {orderCount} times</span>
              </div>
              {lastOrderedDate && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Last: {new Date(lastOrderedDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="h-9 w-9 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium text-gray-900 dark:text-white px-3 min-w-[32px] text-center">
              {quantity}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="h-9 w-9 p-0"
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right min-w-[80px]">
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              ₹{(product.price * quantity).toFixed(2)}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(product.id)}
            className="text-red-500 hover:text-red-700 h-9 w-9 p-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;