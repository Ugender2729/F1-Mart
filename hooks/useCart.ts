'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { CartItem } from '@/types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        // If no user, try to load from localStorage
        const savedCart = localStorage.getItem('grocery-cart');
        if (savedCart) {
          try {
            const items = JSON.parse(savedCart);
            if (Array.isArray(items)) {
              setCartItems(items);
            }
          } catch (err) {
            console.error('Error parsing localStorage cart:', err);
            localStorage.removeItem('grocery-cart');
          }
        }
        return;
      }

      const { data, error } = await supabase
        .from('cart')
        .select('items')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      const items = data?.items || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (items: CartItem[]) => {
    try {
      setError(null);

      if (!user) {
        // If no user, save to localStorage
        localStorage.setItem('grocery-cart', JSON.stringify(items));
        setCartItems(items);
        return;
      }

      const { error } = await supabase
        .from('cart')
        .upsert({
          user_id: user.id,
          items: items,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setCartItems(items);
    } catch (err) {
      console.error('Error saving cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to save cart');
    }
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        item => item.product.id === product.id
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = [...cartItems];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...cartItems, { product, quantity }];
      }

      await saveCart(newItems);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const newItems = cartItems.filter(item => item.product.id !== productId);
      await saveCart(newItems);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const newItems = cartItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      await saveCart(newItems);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      await saveCart([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  };

  const calculateTotal = (items: CartItem[]): number => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateItemCount = (items: CartItem[]): number => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return {
    items: cartItems,
    total: calculateTotal(cartItems),
    itemCount: calculateItemCount(cartItems),
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refetch: fetchCart
  };
}
