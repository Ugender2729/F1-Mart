'use client';

import React, { useEffect, useState } from 'react';
import { useProducts, useCategories } from '@/hooks/useSupabase';

const SupabaseTest = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  if (productsLoading || categoriesLoading) {
    return <div className="p-8 text-center">🔄 Loading data from Supabase...</div>;
  }

  if (productsError || categoriesError) {
    return (
      <div className="p-8 text-center text-red-600">
        ❌ Error loading data: {productsError || categoriesError}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">🎉 Supabase Backend Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Categories ({categories.length})</h3>
          <div className="space-y-2">
            {categories.slice(0, 5).map((category) => (
              <div key={category.id} className="p-2 bg-gray-100 rounded">
                {category.name} ({category.productCount} products)
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Products ({products.length})</h3>
          <div className="space-y-2">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="p-2 bg-gray-100 rounded">
                {product.name} - ₹{product.price}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-green-100 rounded-lg">
        <p className="text-green-800 font-semibold">
          ✅ Supabase backend is working perfectly! Your data is now live in the database.
        </p>
      </div>
    </div>
  );
};

export default SupabaseTest;

