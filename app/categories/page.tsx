'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Leaf, Milk, Fish, Wheat, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';

const CategoriesPage = () => {
  const categoryIcons = {
    'fruits': <Leaf className="h-8 w-8 text-orange-500" />,
    'vegetables': <Leaf className="h-8 w-8 text-green-500" />,
    'dairy': <Milk className="h-8 w-8 text-blue-500" />,
    'meat-seafood': <Fish className="h-8 w-8 text-red-500" />,
    'pantry': <Wheat className="h-8 w-8 text-yellow-500" />,
    'snacks-beverages': <Coffee className="h-8 w-8 text-purple-500" />,
    'bakery': <Wheat className="h-8 w-8 text-amber-500" />,
    'frozen': <ShoppingBag className="h-8 w-8 text-cyan-500" />,
    'organic-natural': <Leaf className="h-8 w-8 text-emerald-500" />,
    'health-wellness': <Leaf className="h-8 w-8 text-pink-500" />,
    'baby-care': <ShoppingBag className="h-8 w-8 text-rose-500" />,
    'household': <ShoppingBag className="h-8 w-8 text-indigo-500" />,
    'pet-care': <ShoppingBag className="h-8 w-8 text-teal-500" />,
    'personal-care': <ShoppingBag className="h-8 w-8 text-violet-500" />,
    'beverages': <Coffee className="h-8 w-8 text-amber-500" />,
    'international': <ShoppingBag className="h-8 w-8 text-orange-500" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Shop by <span className="text-emerald-600">Categories</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our wide range of fresh groceries organized by categories. 
            Find exactly what you're looking for with ease.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="glass-card hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category.id as keyof typeof categoryIcons] || <ShoppingBag className="h-8 w-8 text-emerald-500" />}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                    <span className="mr-2">Shop Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Fresh Fruits
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Hand-picked seasonal fruits delivered at peak ripeness. 
                  From tropical delights to local favorites.
                </p>
                <Link href="/products?category=fruits">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Explore Fruits
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Organic Vegetables
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Farm-fresh organic vegetables grown without harmful pesticides. 
                  Nutritious and delicious for your family.
                </p>
                <Link href="/products?category=vegetables">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                    Explore Vegetables
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Milk className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Dairy & Eggs
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fresh dairy products and farm-fresh eggs from trusted local farms. 
                  Quality you can taste.
                </p>
                <Link href="/products?category=dairy">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                    Explore Dairy
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Benefits */}
        <div className="mb-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Why Shop by Categories?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Navigation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Find products quickly with organized categories
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fresh Selection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Curated products for each category
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Browse specific product types easily
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Variety</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Wide range of products in each category
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Use our search feature or browse all products to find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                    Browse All Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
