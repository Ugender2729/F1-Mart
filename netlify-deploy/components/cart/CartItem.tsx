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
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
      <Link href={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.brand} • {product.weight}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
          ₹{product.price} per {product.unit}
        </p>
        
        {/* Order History Info */}
        {user && orderCount > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400">
              <Package className="h-3 w-3" />
              <span>Previously ordered {orderCount} times</span>
            </div>
            {lastOrderedDate && (
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>Last: {new Date(lastOrderedDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium text-gray-900 dark:text-white px-2">
            {quantity}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-8 w-8 p-0"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">
            ₹{(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(product.id)}
          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;