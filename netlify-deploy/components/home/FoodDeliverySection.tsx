'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Clock, Star, Sparkles } from 'lucide-react';

const FoodDeliverySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Coming Soon Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse">
            <Sparkles className="h-5 w-5" />
            COMING SOON
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              🍛 Food Delivery
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get ready for delicious food delivered hot to your doorstep! We're working on bringing you the best local restaurants.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden border-2 border-gradient-to-r from-orange-500 to-pink-500 shadow-2xl">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop&crop=center&q=80"
                alt="Delicious Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                  <Utensils className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Coming Very Soon!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're cooking up something special for you
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your favorite meals delivered hot in 30-45 minutes
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Quality Food</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Authentic recipes from the best local restaurants
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Wide Variety</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from multiple cuisines and restaurants
            </p>
          </Card>
        </div>

        {/* Notification CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-2xl">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold mb-4">
                Stay Tuned!
              </h3>
              <p className="text-lg mb-6 opacity-90">
                We're currently working hard to bring you the best food delivery experience. Check back soon for exciting updates!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Launching Soon in Your Area</span>
                <Sparkles className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FoodDeliverySection;
