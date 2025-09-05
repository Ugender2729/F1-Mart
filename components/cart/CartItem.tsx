'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

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