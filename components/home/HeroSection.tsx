'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Fresh Groceries',
    subtitle: 'Handpicked organic produce delivered fresh to your doorstep',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    cta: 'Shop Now',
    offer: 'Free delivery on orders over ₹500',
    route: '/products'
  },
  {
    id: 2,
    title: 'Artisan Quality Meats',
    subtitle: 'Premium cuts and wild-caught seafood from trusted suppliers',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    cta: 'View Selection',
    offer: 'Farm-to-table quality',
    route: '/products?category=meat-seafood'
  },
  {
    id: 3,
    title: 'Fresh Bakery & Deli',
    subtitle: 'Artisan breads, pastries, and gourmet deli items made daily',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    cta: 'Explore Bakery',
    offer: 'Baked fresh daily',
    route: '/products?category=bakery'
  },
  {
    id: 4,
    title: 'Premium Dry Fruits',
    subtitle: 'Handpicked nuts, dried fruits, and healthy snacks for every occasion',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    cta: 'Shop Dry Fruits',
    offer: 'Premium quality nuts',
    route: '/products?category=dry-fruits'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleCTAClick = (route: string) => {
    router.push(route);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="hero-container relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Images - Fixed to screen */}
      {heroSlides.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute top-0 left-0 w-full h-full object-cover object-center scale-105 brightness-80"
          />
        </div>
      ))}
      
      {/* Content Overlay */}
      <div className="hero-overlay" />
      
      {/* Content Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={`content-${slide.id}`}
          className={`hero-content absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 
            index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-6 shadow-lg backdrop-blur-sm">
                  ✨ {slide.offer}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-95 font-medium leading-relaxed drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <Button 
                  size="lg" 
                  onClick={() => handleCTAClick(slide.route)}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 backdrop-blur-sm border ${
              index === currentSlide 
                ? 'bg-white shadow-lg scale-125 border-white/50' 
                : 'bg-white/30 hover:bg-white/50 hover:scale-110 border-white/20'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;