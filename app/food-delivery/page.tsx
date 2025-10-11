'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Clock, DollarSign, MapPin, Search, Filter, Utensils, Flame, Truck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_type: string;
  rating: number;
  delivery_fee: number;
  estimated_delivery_time: number;
  minimum_order: number;
  image_url?: string;
}

export default function FoodDeliveryPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Sample restaurant data with high-quality food images
  const sampleRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizza Palace',
      description: 'Authentic Italian pizzas with fresh ingredients and traditional recipes',
      cuisine_type: 'Italian',
      rating: 4.5,
      delivery_fee: 2.99,
      estimated_delivery_time: 25,
      minimum_order: 15.00,
      image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center&q=80'
    },
    {
      id: '2',
      name: 'Burger Barn',
      description: 'Gourmet burgers made with premium beef and fresh vegetables',
      cuisine_type: 'American',
      rating: 4.2,
      delivery_fee: 1.99,
      estimated_delivery_time: 20,
      minimum_order: 12.00,
      image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&q=80'
    },
    {
      id: '3',
      name: 'Sushi Zen',
      description: 'Fresh sushi and Japanese cuisine prepared by expert chefs',
      cuisine_type: 'Japanese',
      rating: 4.7,
      delivery_fee: 3.99,
      estimated_delivery_time: 30,
      minimum_order: 20.00,
      image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center&q=80'
    },
    {
      id: '4',
      name: 'Taco Fiesta',
      description: 'Authentic Mexican tacos and burritos with spicy flavors',
      cuisine_type: 'Mexican',
      rating: 4.3,
      delivery_fee: 1.50,
      estimated_delivery_time: 18,
      minimum_order: 10.00,
      image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center&q=80'
    },
    {
      id: '5',
      name: 'Curry Corner',
      description: 'Spicy Indian curries and aromatic naan bread',
      cuisine_type: 'Indian',
      rating: 4.4,
      delivery_fee: 2.50,
      estimated_delivery_time: 35,
      minimum_order: 18.00,
      image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center&q=80'
    },
    {
      id: '6',
      name: 'Noodle House',
      description: 'Fresh Asian noodles and stir-fries with authentic flavors',
      cuisine_type: 'Asian',
      rating: 4.1,
      delivery_fee: 2.00,
      estimated_delivery_time: 22,
      minimum_order: 14.00,
      image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center&q=80'
    }
  ];

  useEffect(() => {
    // Use sample data for now, can be replaced with actual Supabase call
    setRestaurants(sampleRestaurants);
    setLoading(false);
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine_type === cuisineFilter;
    return matchesSearch && matchesCuisine;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery_time':
        return a.estimated_delivery_time - b.estimated_delivery_time;
      case 'delivery_fee':
        return a.delivery_fee - b.delivery_fee;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const cuisineTypes = Array.from(new Set(restaurants.map(r => r.cuisine_type)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Utensils className="h-5 w-5" />
            FOOD DELIVERY
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mb-6">
            🍕 Delicious Food
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Order from your favorite restaurants and get mouth-watering meals delivered right to your door!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500 transition-colors"
                />
              </div>
              <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                <SelectTrigger className="w-full lg:w-56 h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  {cuisineTypes.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-56 h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">⭐ Rating</SelectItem>
                  <SelectItem value="delivery_time">⏱️ Delivery Time</SelectItem>
                  <SelectItem value="delivery_fee">💰 Delivery Fee</SelectItem>
                  <SelectItem value="name">🔤 Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 rounded-2xl overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 text-gray-900 hover:bg-white font-semibold px-3 py-1 rounded-full shadow-lg">
                    {restaurant.cuisine_type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/95 px-3 py-1 rounded-full shadow-lg">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-t from-black/70 to-transparent p-4 rounded-lg">
                    <h3 className="text-white text-xl font-bold mb-1">{restaurant.name}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{restaurant.description}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">{restaurant.estimated_delivery_time} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="font-medium">${restaurant.delivery_fee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">${restaurant.minimum_order} min</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = `/food-delivery/restaurant/${restaurant.id}`}
                >
                  <Utensils className="h-5 w-5 mr-2" />
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <Search className="h-24 w-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No restaurants found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search or filters to find what you're looking for</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your food delivered in 20-30 minutes on average</p>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Top Rated</h3>
            <p className="text-gray-600">Only the best restaurants with high ratings and reviews</p>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh & Hot</h3>
            <p className="text-gray-600">Food prepared fresh and delivered hot to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
}
