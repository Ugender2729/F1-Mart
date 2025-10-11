'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_delivery';
  value: number;
  minimum_amount: number;
  maximum_discount?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  is_first_order_only: boolean;
  valid_from: string;
  valid_until?: string;
}

export interface CouponApplication {
  success: boolean;
  message: string;
  discount_amount: number;
  coupon_id?: string;
}

export interface FirstOrderCoupon {
  coupon_code: string | null;
  discount_amount: number;
  message: string;
}

export function useCoupons() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get applicable coupons for a given amount and customer info
  const getApplicableCoupons = useCallback(async (
    amount: number,
    email: string,
    phone: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('get_applicable_coupons', {
          p_amount: amount,
          p_email: email,
          p_phone: phone
        });

      if (queryError) throw queryError;

      return { data: data || [], error: null };
    } catch (err) {
      console.error('Error fetching applicable coupons:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch coupons';
      setError(errorMessage);
      return { data: [], error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply a specific coupon
  const applyCoupon = useCallback(async (
    couponCode: string,
    amount: number,
    email: string,
    phone: string
  ): Promise<CouponApplication> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('apply_coupon', {
          p_coupon_code: couponCode,
          p_amount: amount,
          p_email: email,
          p_phone: phone
        });

      if (queryError) throw queryError;

      const result = data?.[0];
      if (!result) {
        throw new Error('No result returned from coupon application');
      }

      return {
        success: result.success,
        message: result.message,
        discount_amount: result.discount_amount,
        coupon_id: result.coupon_id
      };
    } catch (err) {
      console.error('Error applying coupon:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply coupon';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        discount_amount: 0
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get first order coupon automatically
  const getFirstOrderCoupon = useCallback(async (
    amount: number,
    email: string,
    phone: string
  ): Promise<FirstOrderCoupon> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('get_first_order_coupon', {
          p_amount: amount,
          p_email: email,
          p_phone: phone
        });

      if (queryError) throw queryError;

      const result = data?.[0];
      if (!result) {
        return {
          coupon_code: null,
          discount_amount: 0,
          message: 'No first order coupon available'
        };
      }

      return {
        coupon_code: result.coupon_code,
        discount_amount: result.discount_amount,
        message: result.message
      };
    } catch (err) {
      console.error('Error getting first order coupon:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get first order coupon';
      setError(errorMessage);
      return {
        coupon_code: null,
        discount_amount: 0,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if customer is first-time
  const isFirstTimeCustomer = useCallback(async (
    email: string,
    phone: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('is_first_time_customer', {
          p_email: email,
          p_phone: phone
        });

      if (queryError) throw queryError;

      return data || false;
    } catch (err) {
      console.error('Error checking first time customer:', err);
      setError(err instanceof Error ? err.message : 'Failed to check customer status');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate discount amount for a coupon
  const calculateDiscount = useCallback((
    coupon: Coupon,
    amount: number
  ): number => {
    switch (coupon.type) {
      case 'percentage':
        const percentageDiscount = amount * (coupon.value / 100);
        return Math.min(percentageDiscount, coupon.maximum_discount || percentageDiscount);
      case 'fixed':
        return Math.min(coupon.value, amount);
      case 'free_delivery':
        return 0; // This would be handled separately for delivery fees
      default:
        return 0;
    }
  }, []);

  // Format coupon display text
  const formatCouponText = useCallback((coupon: Coupon): string => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% off`;
      case 'fixed':
        return `₹${coupon.value} off`;
      case 'free_delivery':
        return 'Free delivery';
      default:
        return 'Discount';
    }
  }, []);

  // Get coupon validity status
  const getCouponValidity = useCallback((coupon: Coupon): {
    isValid: boolean;
    message: string;
  } => {
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null;

    if (!coupon.is_active) {
      return { isValid: false, message: 'Coupon is not active' };
    }

    if (now < validFrom) {
      return { isValid: false, message: 'Coupon is not yet valid' };
    }

    if (validUntil && now > validUntil) {
      return { isValid: false, message: 'Coupon has expired' };
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return { isValid: false, message: 'Coupon usage limit reached' };
    }

    return { isValid: true, message: 'Coupon is valid' };
  }, []);

  return {
    loading,
    error,
    getApplicableCoupons,
    applyCoupon,
    getFirstOrderCoupon,
    isFirstTimeCustomer,
    calculateDiscount,
    formatCouponText,
    getCouponValidity
  };
}



