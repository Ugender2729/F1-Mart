'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { Star, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg ${
                      selectedImage === index
                        ? 'ring-2 ring-emerald-500'
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-emerald-600 bg-emerald-50">
                  {product.category}
                </Badge>
                {product.onSale && (
                  <Badge variant="destructive">Sale</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Brand</span>
                      <p className="text-gray-600 dark:text-gray-400">{product.brand}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Weight</span>
                      <p className="text-gray-600 dark:text-gray-400">{product.weight}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Unit</span>
                      <p className="text-gray-600 dark:text-gray-400">{product.unit}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Stock</span>
                      <p className="text-gray-600 dark:text-gray-400">{product.stock} available</p>
                    </div>
                  </div>
                  {product.nutrition && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Nutritional Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                          <span className="ml-2 font-medium">{product.nutrition.calories}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                          <span className="ml-2 font-medium">{product.nutrition.protein}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Fat:</span>
                          <span className="ml-2 font-medium">{product.nutrition.fat}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
                          <span className="ml-2 font-medium">{product.nutrition.carbs}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.rating}
                    </div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    No reviews yet. Be the first to review this product!
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;