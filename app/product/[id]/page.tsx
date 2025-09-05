'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { Star, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/products/ProductCard';

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(params.id);
  const { addItem, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  if (!product) {
    notFound();
  }

  const isWishlisted = isInWishlist(product.id);
  const cartQuantity = getItemQuantity(product.id);
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span>Products</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 ${
                      selectedImage === index 
                        ? 'border-emerald-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {product.brand} • {product.weight}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.onSale && (
                <Badge variant="destructive" className="bg-red-500">
                  Save ₹{(product.originalPrice! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-lg font-semibold text-gray-900 dark:text-white px-4">
                      {quantity}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="h-10 w-10 p-0"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total: ₹{(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                  size="lg"
                >
                  Add to Cart {cartQuantity > 0 && `(${cartQuantity} in cart)`}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  disabled={product.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="h-5 w-5 text-emerald-600" />
                <span>Free delivery over ₹2000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span>Quality guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <RotateCcw className="h-5 w-5 text-emerald-600" />
                <span>Easy returns</span>
              </div>
            </div>

            <Separator />

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-6">
                {product.nutritionalInfo ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{product.nutritionalInfo.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{product.nutritionalInfo.protein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{product.nutritionalInfo.carbs}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Fat:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{product.nutritionalInfo.fat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Fiber:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{product.nutritionalInfo.fiber}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Nutritional information not available</p>
                )}
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-6">
                {product.ingredients ? (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Ingredient information not available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;