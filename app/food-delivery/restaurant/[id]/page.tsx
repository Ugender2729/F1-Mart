'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, DollarSign, MapPin, Plus, Minus, ShoppingCart, ArrowLeft, Search, Utensils, Flame, Leaf, Wheat, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useFoodCart } from '@/context/FoodCartContext';

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
  address: string;
  phone: string;
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_spicy: boolean;
  allergens?: string[];
  calories?: number;
  preparation_time: number;
}

// Sample data with high-quality food images
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
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop&crop=center&q=80',
    address: '123 Main St, City',
    phone: '+1-555-0123'
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
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop&crop=center&q=80',
    address: '456 Oak Ave, City',
    phone: '+1-555-0124'
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
    image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop&crop=center&q=80',
    address: '789 Pine St, City',
    phone: '+1-555-0125'
  }
];

const sampleMenuItems: MenuItem[] = [
  // Pizza Palace items
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato, mozzarella, and fresh basil on our signature thin crust',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: true,
    is_vegan: false,
    is_gluten_free: false,
    is_spicy: false,
    calories: 280,
    preparation_time: 15
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni and mozzarella cheese on our crispy crust',
    price: 14.99,
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
    is_spicy: true,
    calories: 320,
    preparation_time: 15
  },
  {
    id: '3',
    name: 'Quattro Stagioni',
    description: 'Four seasons pizza with artichokes, mushrooms, ham, and olives',
    price: 16.99,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
    is_spicy: false,
    calories: 380,
    preparation_time: 18
  },
  // Burger Barn items
  {
    id: '4',
    name: 'Classic Cheeseburger',
    description: 'Premium beef patty with cheddar cheese, lettuce, tomato, and our special sauce',
    price: 8.99,
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
    is_spicy: false,
    calories: 450,
    preparation_time: 12
  },
  {
    id: '5',
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables and vegan mayo',
    price: 7.99,
    image_url: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: true,
    is_vegan: true,
    is_gluten_free: false,
    is_spicy: false,
    calories: 380,
    preparation_time: 10
  },
  // Sushi Zen items
  {
    id: '6',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber wrapped in seaweed and rice',
    price: 9.99,
    image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: true,
    is_spicy: false,
    calories: 250,
    preparation_time: 8
  },
  {
    id: '7',
    name: 'Spicy Tuna Roll',
    description: 'Fresh tuna with spicy mayo and cucumber',
    price: 11.99,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center&q=80',
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: true,
    is_spicy: true,
    calories: 280,
    preparation_time: 10
  }
];

const sampleCategories: MenuCategory[] = [
  { id: '1', name: 'Pizzas', description: 'Fresh baked pizzas with authentic Italian flavors' },
  { id: '2', name: 'Burgers', description: 'Gourmet burgers made with premium ingredients' },
  { id: '3', name: 'Sushi Rolls', description: 'Fresh sushi rolls prepared by expert chefs' }
];

export default function RestaurantPage() {
  const params = useParams();
  const { addToCart, getItemCount, getTotalPrice, canAddFromRestaurant } = useFoodCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchRestaurantData(params.id as string);
    }
  }, [params.id]);

  const fetchRestaurantData = async (restaurantId: string) => {
    try {
      // Use sample data for now
      const foundRestaurant = sampleRestaurants.find(r => r.id === restaurantId);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        setMenuCategories(sampleCategories);
        setMenuItems(sampleMenuItems);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCartLocal = (item: MenuItem) => {
    if (!restaurant) return;
    
    if (!canAddFromRestaurant(restaurant.id)) {
      alert('Please clear your cart first - you can only order from one restaurant at a time');
      return;
    }

    addToCart({
      menu_item_id: item.id,
      restaurant_id: restaurant.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image_url: item.image_url
    });
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedMenuItems = menuCategories.map(category => ({
    ...category,
    items: filteredMenuItems.filter(item => {
      // Simple category mapping based on item type
      if (category.name === 'Pizzas' && item.name.toLowerCase().includes('pizza')) return true;
      if (category.name === 'Burgers' && item.name.toLowerCase().includes('burger')) return true;
      if (category.name === 'Sushi Rolls' && item.name.toLowerCase().includes('roll')) return true;
      return false;
    })
  })).filter(category => category.items.length > 0);

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

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Button>

        {/* Restaurant Header */}
        <Card className="mb-8 border-0 shadow-2xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
                  {restaurant.cuisine_type}
                </Badge>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{restaurant.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl font-black mb-2">{restaurant.name}</h1>
              <p className="text-xl text-white/90 mb-6">{restaurant.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span className="font-semibold">{restaurant.estimated_delivery_time} min delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="font-semibold">${restaurant.delivery_fee} delivery fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="font-semibold">Min. ${restaurant.minimum_order}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500 bg-white shadow-lg"
                />
              </div>
            </div>

            {/* Menu Categories */}
            {groupedMenuItems.map((category) => (
              <div key={category.id} className="mb-12">
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">{category.name}</h2>
                  {category.description && (
                    <p className="text-gray-600 text-lg">{category.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.items.map((item) => (
                    <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 rounded-2xl overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/95 px-3 py-1 rounded-full shadow-lg">
                            <span className="font-bold text-lg text-gray-900">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-gradient-to-t from-black/70 to-transparent p-4 rounded-lg">
                            <h3 className="text-white text-xl font-bold mb-1">{item.name}</h3>
                            <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.is_vegetarian && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Leaf className="h-3 w-3 mr-1" />
                              Veg
                            </Badge>
                          )}
                          {item.is_vegan && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Leaf className="h-3 w-3 mr-1" />
                              Vegan
                            </Badge>
                          )}
                          {item.is_gluten_free && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              <Wheat className="h-3 w-3 mr-1" />
                              GF
                            </Badge>
                          )}
                          {item.is_spicy && (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <Flame className="h-3 w-3 mr-1" />
                              Spicy
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {item.preparation_time} min
                            </div>
                            {item.calories && (
                              <div className="text-xs text-gray-400 mt-1">
                                {item.calories} calories
                              </div>
                            )}
                          </div>
                          <Button 
                            onClick={() => addToCartLocal(item)}
                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-white border-0 shadow-2xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShoppingCart className="h-6 w-6" />
                  Your Order ({getItemCount()})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {getItemCount() === 0 ? (
                  <div className="text-center py-8">
                    <Utensils className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        Items from {restaurant.name}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery fee:</span>
                        <span className="font-semibold">${restaurant.delivery_fee.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-orange-600">${(getTotalPrice() + restaurant.delivery_fee).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={getTotalPrice() < restaurant.minimum_order}
                    >
                      {getTotalPrice() < restaurant.minimum_order 
                        ? `Min. order $${restaurant.minimum_order.toFixed(2)}`
                        : 'Proceed to Checkout'
                      }
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
