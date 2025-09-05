'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Star, ShoppingCart, Heart, Percent, Zap, Gift, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

const DealsPage = () => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter products that are on sale or have deals
  const dealProducts = products.filter(product => 
    product.onSale || (product.originalPrice && product.originalPrice > product.price)
  );

  const filterProducts = (filter: string) => {
    switch (filter) {
      case 'flash':
        return dealProducts.filter(product => product.featured);
      case 'bundle':
        return dealProducts.filter(product => product.category === 'snacks-beverages');
      case 'clearance':
        return dealProducts.filter(product => 
          product.originalPrice && (product.originalPrice - product.price) > 100
        );
      default:
        return dealProducts;
    }
  };

  const filteredProducts = filterProducts(selectedFilter);

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Special <span className="text-emerald-600">Deals</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover amazing deals and discounts on your favorite groceries. 
            Limited time offers that you won't want to miss!
          </p>
        </div>

        {/* Deal Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              All Deals
            </Button>
            <Button
              variant={selectedFilter === 'flash' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('flash')}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <Zap className="h-4 w-4 mr-2" />
              Flash Sales
            </Button>
            <Button
              variant={selectedFilter === 'bundle' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('bundle')}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <Gift className="h-4 w-4 mr-2" />
              Bundle Deals
            </Button>
            <Button
              variant={selectedFilter === 'clearance' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('clearance')}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <Tag className="h-4 w-4 mr-2" />
              Clearance
            </Button>
          </div>
        </div>

        {/* Featured Deal Banner */}
        <div className="mb-16">
          <Card className="glass-card overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">🎉 Mega Sale!</h2>
                  <p className="text-lg mb-4">Up to 50% off on selected items</p>
                  <p className="text-sm opacity-90">Limited time offer - Don't miss out!</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">50%</div>
                  <div className="text-sm opacity-90">OFF</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => {
            const discount = product.originalPrice 
              ? calculateDiscount(product.originalPrice, product.price)
              : 0;
            
            return (
              <Card key={product.id} className="glass-card hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        -{discount}%
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-2 right-2 bg-emerald-500 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        Flash
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="text-sm text-emerald-600 font-semibold">
                        Save ₹{product.originalPrice! - product.price}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => addItem(product)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/product/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Deal Benefits */}
        <div className="mb-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Why Shop Our Deals?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Percent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Best Prices</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Unbeatable discounts on quality products
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Limited Time</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Exclusive offers that won't last long
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Assured</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Same quality standards, better prices
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flash Sales</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Lightning-fast deals on popular items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Don't Miss Out on Great Deals!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to our newsletter and be the first to know about exclusive deals and offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
