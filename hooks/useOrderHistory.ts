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

      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      // Search by mobile number (customer_phone)
      if (mobileNumber) {
        // Clean mobile number (remove spaces, dashes, etc.)
        const cleanMobile = mobileNumber.replace(/\D/g, '');
        query = query.or(`customer_phone.eq.${cleanMobile},customer_phone.like.%${cleanMobile}%`);
      }

      // Search by email
      if (email) {
        if (mobileNumber) {
          // If both mobile and email provided, use AND condition
          query = query.eq('customer_email', email);
        } else {
          // If only email provided
          query = query.eq('customer_email', email);
        }
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;

      setOrders(data || []);
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
