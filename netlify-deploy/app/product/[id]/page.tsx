import React from 'react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getProductById, products } from '@/data/products';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';

// Generate static params for static export
export async function generateStaticParams() {
  // Generate static params for all products
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <ProductDetailsClient product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;