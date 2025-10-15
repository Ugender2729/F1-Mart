import React, { memo } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = memo(({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-300 dark:bg-gray-700" />
            <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-2 sm:h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;