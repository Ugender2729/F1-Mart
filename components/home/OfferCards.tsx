'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, Truck, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfferCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      title: "Flash Sale!",
      subtitle: "Up to 60% OFF",
      description: "Fresh fruits & vegetables at unbeatable prices",
      discount: "60%",
      originalPrice: "₹500",
      newPrice: "₹200",
      image: "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Star className="h-6 w-6" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-500"
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "On orders over ₹1000",
      description: "Get your groceries delivered free to your doorstep",
      discount: "FREE",
      originalPrice: "₹50",
      newPrice: "₹0",
      image: "https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Truck className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "New User Bonus",
      subtitle: "₹200 OFF",
      description: "Welcome bonus for new customers on first order",
      discount: "₹200",
      originalPrice: "₹1000",
      newPrice: "₹800",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Gift className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Limited Time",
      subtitle: "Premium Quality",
      description: "Organic products at special prices for today only",
      discount: "40%",
      originalPrice: "₹800",
      newPrice: "₹480",
      image: "https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: <Clock className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-500"
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [offers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Special Offers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Don't miss out on these amazing deals!
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {offers.map((offer) => (
                <div key={offer.id} className="w-full flex-shrink-0">
                  <div className={`relative h-80 ${offer.bgColor} overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32"></div>
                    </div>

                    <div className="relative z-10 h-full flex items-center">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-8">
                        {/* Content */}
                        <div className="flex flex-col justify-center text-white">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                              {offer.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">{offer.title}</h3>
                              <p className="text-lg opacity-90">{offer.subtitle}</p>
                            </div>
                          </div>
                          
                          <p className="text-lg mb-6 opacity-90 leading-relaxed">
                            {offer.description}
                          </p>

                          <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                              <span className="text-2xl font-bold">{offer.discount}</span>
                            </div>
                            <div className="text-sm">
                              <div className="line-through opacity-70">{offer.originalPrice}</div>
                              <div className="text-xl font-bold">{offer.newPrice}</div>
                            </div>
                          </div>

                          <Button 
                            size="lg" 
                            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
                          >
                            Shop Now
                          </Button>
                        </div>

                        {/* Image */}
                        <div className="hidden lg:flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                            <img 
                              src={offer.image} 
                              alt={offer.title}
                              className="relative w-64 h-64 object-cover rounded-2xl shadow-2xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous offer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next offer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gray-900 dark:bg-white scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCards;
