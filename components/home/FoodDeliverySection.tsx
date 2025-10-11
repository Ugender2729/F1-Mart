'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, Utensils, ArrowRight } from 'lucide-react';

const FoodDeliverySection = () => {
  const featuredRestaurants = [
    {
      id: '5',
      name: 'Biryani House',
      cuisine: 'Indian',
      rating: 4.8,
      deliveryTime: 35,
      deliveryFee: 1.99,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&crop=center&q=80',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Utensils className="h-4 w-4" />
            NEW FEATURE
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🍛 Food Delivery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Craving delicious Biryani? Get authentic flavors delivered hot to your doorstep!
          </p>
        </div>

        {/* Featured Restaurants */}
        <div className="flex justify-center mb-8">
          <div className="max-w-md w-full">
          {featuredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-900">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{restaurant.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${restaurant.deliveryFee} delivery</span>
                  </div>
                </div>
                <Button 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300"
                  onClick={() => window.location.href = `/food-delivery/restaurant/${restaurant.id}`}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Craving More?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Explore our food delivery menu and order your favorite Biryani varieties with fast delivery.
              </p>
              <Link href="/food-delivery">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 group"
                >
                  Order Biryani Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">Get your biryani delivered hot in 30-40 minutes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Authentic Taste</h3>
            <p className="text-gray-600 dark:text-gray-400">Traditional recipes with premium quality ingredients</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Great Value</h3>
            <p className="text-gray-600 dark:text-gray-400">Affordable prices with minimal delivery fees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDeliverySection;
