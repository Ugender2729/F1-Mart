import React, { memo } from 'react';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts = memo(() => {
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Best sellers and customer favorites
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:block text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/products"
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
});

FeaturedProducts.displayName = 'FeaturedProducts';

export default FeaturedProducts;