'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface StockSummary {
  total_products: number;
  in_stock_count: number;
  low_stock_count: number;
  out_of_stock_count: number;
}

export interface LowStockProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  stock_status: string;
  low_stock_threshold: number;
}

export function useStockManagement() {
  const [stockSummary, setStockSummary] = useState<StockSummary | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stock summary
  const fetchStockSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('get_stock_summary');

      if (queryError) throw queryError;

      setStockSummary(data?.[0] || null);
    } catch (err) {
      console.error('Error fetching stock summary:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch stock summary');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch low stock products
  const fetchLowStockProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .rpc('get_low_stock_products');

      if (queryError) throw queryError;

      setLowStockProducts(data || []);
    } catch (err) {
      console.error('Error fetching low stock products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch low stock products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product stock
  const updateProductStock = useCallback(async (productId: string, newStock: number) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('products')
        .update({ 
          stock: newStock,
          last_stock_update: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

      if (updateError) throw updateError;

      // Refresh data after update
      await Promise.all([
        fetchStockSummary(),
        fetchLowStockProducts()
      ]);

      return { data, error: null };
    } catch (err) {
      console.error('Error updating product stock:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product stock';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  }, [fetchStockSummary, fetchLowStockProducts]);

  // Check if product is low stock
  const isLowStock = useCallback((product: any) => {
    if (!product) return false;
    
    // For powder products (check if category contains 'powder' or unit is 'kg')
    if (product.category?.toLowerCase().includes('powder') || product.unit?.toLowerCase() === 'kg') {
      return product.stock < 10;
    }
    
    // For other products, check if stock is less than 10 items
    return product.stock < 10;
  }, []);

  // Get stock status for a product
  const getStockStatus = useCallback((product: any) => {
    if (!product) return 'in_stock';
    
    if (product.stock <= 0) {
      return 'out_of_stock';
    } else if (isLowStock(product)) {
      return 'low_stock';
    } else {
      return 'in_stock';
    }
  }, [isLowStock]);

  // Get stock warning message
  const getStockWarningMessage = useCallback((product: any) => {
    const status = getStockStatus(product);
    
    switch (status) {
      case 'out_of_stock':
        return 'Out of Stock';
      case 'low_stock':
        if (product.category?.toLowerCase().includes('powder') || product.unit?.toLowerCase() === 'kg') {
          return `Only ${product.stock}kg left in stock!`;
        } else {
          return `Only ${product.stock} items left in stock!`;
        }
      default:
        return null;
    }
  }, [getStockStatus]);

  // Get stock warning color
  const getStockWarningColor = useCallback((product: any) => {
    const status = getStockStatus(product);
    
    switch (status) {
      case 'out_of_stock':
        return 'text-red-600 bg-red-100';
      case 'low_stock':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  }, [getStockStatus]);

  // Load initial data
  useEffect(() => {
    fetchStockSummary();
    fetchLowStockProducts();
  }, [fetchStockSummary, fetchLowStockProducts]);

  return {
    stockSummary,
    lowStockProducts,
    loading,
    error,
    fetchStockSummary,
    fetchLowStockProducts,
    updateProductStock,
    isLowStock,
    getStockStatus,
    getStockWarningMessage,
    getStockWarningColor
  };
}



