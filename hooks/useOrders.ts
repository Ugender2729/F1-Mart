'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export interface Order {
  id: string;
  user_id: string;
  items: any[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  tax: number;
  total: number;
  status: string;
  payment_method: string;
  delivery_address: any;
  created_at: string;
  updated_at: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setOrders([]);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error creating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    refetch: fetchOrders
  };
}

// Hook for admin to fetch all orders
export function useAllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          users!inner(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching all orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      // Refresh orders list
      await fetchAllOrders();
      
      return { data, error: null };
    } catch (err) {
      console.error('Error updating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update order';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchAllOrders,
    updateOrderStatus,
    refetch: fetchAllOrders
  };
}
