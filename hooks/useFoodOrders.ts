'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export interface FoodOrder {
  id: string;
  user_id: string | null;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  items: any[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  tax: number;
  total: number;
  status: string;
  payment_method: string;
  delivery_address: any;
  order_type: 'food_delivery';
  restaurant_id?: string;
  restaurant_name?: string;
  estimated_delivery_time?: number;
  special_instructions?: string;
  customer_location?: any;
  created_at: string;
  updated_at: string;
}

export function useFoodOrders() {
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [lastFetch, setLastFetch] = useState<number>(0);
  
  // Cache for 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000;

  const fetchFoodOrders = async (forceRefresh = false) => {
    try {
      // Check cache first
      const now = Date.now();
      if (!forceRefresh && now - lastFetch < CACHE_DURATION && orders.length > 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch food delivery orders only
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('order_type', 'food_delivery')
        .order('created_at', { ascending: false }) // Most recent first
        .limit(10);

      if (error) throw error;

      setOrders(data || []);
      setLastFetch(now);
    } catch (err) {
      console.error('Error fetching food orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch food orders');
    } finally {
      setLoading(false);
    }
  };

  const createFoodOrder = async (orderData: Omit<FoodOrder, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          order_type: 'food_delivery' // Ensure it's marked as food delivery
        }])
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchFoodOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error creating food order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create food order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const updateFoodOrderStatus = async (orderId: string, status: string) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', orderId)
        .eq('order_type', 'food_delivery') // Ensure we're only updating food orders
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchFoodOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating food order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update food order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchFoodOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
    fetchFoodOrders,
    createFoodOrder,
    updateFoodOrderStatus,
    refetch: fetchFoodOrders
  };
}

// Hook for admin to fetch all food orders
export function useAllFoodOrders() {
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllFoodOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all food delivery orders (most recent first)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          users(email, first_name, last_name)
        `)
        .eq('order_type', 'food_delivery')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setOrders(data || []);

    } catch (err) {
      console.error('Error fetching all food orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch food orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFoodOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', orderId)
        .eq('order_type', 'food_delivery')
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchAllFoodOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating food order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update food order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  }, [fetchAllFoodOrders]);

  useEffect(() => {
    fetchAllFoodOrders();
  }, [fetchAllFoodOrders]);

  return {
    orders,
    loading,
    error,
    fetchAllFoodOrders,
    updateFoodOrderStatus,
    refetch: fetchAllFoodOrders
  };
}

