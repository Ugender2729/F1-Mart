'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export interface Order {
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
  deliveryInfo?: any; // For localStorage orders
  orderDate?: string; // For localStorage orders
  created_at: string;
  updated_at: string;
  users?: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [lastFetch, setLastFetch] = useState<number>(0);
  
  // Cache for 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000;

  const fetchOrders = async (forceRefresh = false) => {
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

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setOrders(data || []);
      setLastFetch(now);
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

  const fetchAllOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let dbOrders: any[] = [];

      // First try to fetch orders with user data
      const { data: ordersWithUsers, error: userError } = await supabase
        .from('orders')
        .select(`
          *,
          users(email, first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (userError) {
        console.warn('Error fetching orders with users:', userError);
        // Fallback: fetch orders without user data
        const { data: ordersOnly, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (ordersError) {
          console.warn('Error fetching orders without users:', ordersError);
          dbOrders = [];
        } else {
          dbOrders = ordersOnly || [];
        }
      } else {
        dbOrders = ordersWithUsers || [];
      }

      // Use database orders as primary source
      setOrders(dbOrders);
      
      // Optional: Keep localStorage as backup for any orders that might not have been migrated
      const localStorageOrders = getLocalStorageOrders();
      if (localStorageOrders.length > 0) {
        console.log('Found localStorage orders as backup:', localStorageOrders.length);
        // You can choose to migrate these to database or keep them separate
      }

    } catch (err) {
      console.error('Error fetching all orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we don't depend on any external values

  // Helper function to get orders from localStorage
  const getLocalStorageOrders = useCallback(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') return [];
      
      const ordersData = localStorage.getItem('orders');
      if (!ordersData) return [];
      
      const orders = JSON.parse(ordersData);
      if (!Array.isArray(orders)) return [];
      
      return orders.map(order => ({
        ...order,
        user_id: null, // Guest order
        users: null,
        is_guest: true,
        created_at: order.orderDate || order.created_at,
        delivery_address: order.deliveryInfo || order.delivery_address,
        payment_method: order.paymentMethod || order.payment_method || 'cod',
        status: order.status || 'confirmed',
        total: order.total || 0,
        items: order.items || [],
        // Ensure customer information is properly mapped
        customer_name: order.customer_name || (order.customerInfo ? `${order.customerInfo.firstName || ''} ${order.customerInfo.lastName || ''}`.trim() : ''),
        customer_email: order.customer_email || order.customerInfo?.email || '',
        customer_phone: order.customer_phone || order.customerInfo?.phone || ''
      })).sort((a, b) => new Date(b.orderDate || b.created_at).getTime() - new Date(a.orderDate || a.created_at).getTime());
    } catch (error) {
      console.error('Error reading localStorage orders:', error);
      return [];
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
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
  }, [fetchAllOrders]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]); // Now depends on the memoized function

  return {
    orders,
    loading,
    error,
    fetchAllOrders,
    updateOrderStatus,
    refetch: fetchAllOrders
  };
}
