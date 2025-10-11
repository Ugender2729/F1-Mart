import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface OrderHistorySearch {
  mobileNumber?: string;
  email?: string;
}

export interface OrderHistoryResult {
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
  created_at: string;
  updated_at: string;
}

export function useOrderHistory() {
  const [orders, setOrders] = useState<OrderHistoryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchOrdersByMobileOrEmail = useCallback(async (searchParams: OrderHistorySearch) => {
    try {
      setLoading(true);
      setError(null);

      const { mobileNumber, email } = searchParams;

      if (!mobileNumber && !email) {
        setError('Please provide either mobile number or email');
        return;
      }

      // Build the query with proper customer information selection
      let query = supabase
        .from('orders')
        .select(`
          *,
          users (
            email,
            first_name,
            last_name,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      // Search by mobile number (customer_phone)
      if (mobileNumber) {
        // Clean mobile number (remove spaces, dashes, etc.)
        const cleanMobile = mobileNumber.replace(/\D/g, '');
        
        if (email) {
          // If both mobile and email provided, use AND condition
          query = query
            .or(`customer_phone.eq.${cleanMobile},customer_phone.like.%${cleanMobile}%`)
            .eq('customer_email', email);
        } else {
          // If only mobile provided, search in customer_phone field
          query = query.or(`customer_phone.eq.${cleanMobile},customer_phone.like.%${cleanMobile}%`);
        }
      }

      // Search by email
      if (email && !mobileNumber) {
        // If only email provided, search in customer_email field
        query = query.eq('customer_email', email);
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;

      // Process the results to ensure customer information is properly populated
      const processedOrders = (data || []).map(order => ({
        ...order,
        // Ensure customer information is available from direct fields or user data
        customer_name: order.customer_name || 
          (order.users ? `${order.users.first_name || ''} ${order.users.last_name || ''}`.trim() : '') ||
          (order.delivery_address?.customer ? 
            `${order.delivery_address.customer.firstName || ''} ${order.delivery_address.customer.lastName || ''}`.trim() : ''),
        customer_email: order.customer_email || 
          order.users?.email || 
          order.delivery_address?.customer?.email || '',
        customer_phone: order.customer_phone || 
          order.users?.phone || 
          order.delivery_address?.customer?.phone || ''
      }));

      setOrders(processedOrders);
    } catch (err) {
      console.error('Error searching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to search orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchOrdersByMobileNumber = useCallback(async (mobileNumber: string) => {
    await searchOrdersByMobileOrEmail({ mobileNumber });
  }, [searchOrdersByMobileOrEmail]);

  const searchOrdersByEmail = useCallback(async (email: string) => {
    await searchOrdersByMobileOrEmail({ email });
  }, [searchOrdersByMobileOrEmail]);

  const clearResults = useCallback(() => {
    setOrders([]);
    setError(null);
  }, []);

  return {
    orders,
    loading,
    error,
    searchOrdersByMobileOrEmail,
    searchOrdersByMobileNumber,
    searchOrdersByEmail,
    clearResults
  };
}
