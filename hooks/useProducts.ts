'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types';
import { products } from '@/data/products';

interface UseProductsOptions {
  limit?: number;
  category?: string;
  featured?: boolean;
  onSale?: boolean;
  searchTerm?: string;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (options.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === options.category?.toLowerCase()
      );
    }

    if (options.featured) {
      filtered = filtered.filter(product => product.featured);
    }

    if (options.onSale) {
      filtered = filtered.filter(product => product.onSale);
    }

    if (options.searchTerm) {
      const searchLower = options.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }

    // Apply limit
    if (options.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }, [options]);

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return {
    products: filteredProducts,
    loading,
    error,
    getFeaturedProducts,
    getProductsByCategory,
    getProductById,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
  };
};
