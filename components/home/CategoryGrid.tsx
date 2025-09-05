import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

const CategoryGrid = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header with premium styling */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
              Explore Our Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Shop by
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover premium ingredients and artisanal products curated for the modern lifestyle. 
            From farm-fresh produce to gourmet essentials, find everything you need.
          </p>
        </div>

        {/* Premium category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-3xl card-premium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image-premium w-full h-full object-cover"
                />
                
                {/* Premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-700" />
                
                {/* Floating elements */}
                <div className="absolute top-6 left-6">
                  <div className="glass px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-bold">
                      {category.productCount} items
                    </span>
                  </div>
                </div>
                
                {/* Premium badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pulse-glow"></div>
                </div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-purple-300 transition-colors duration-500">
                  {category.name}
                </h3>
                <div className="flex items-center text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="mr-3 font-medium">Explore Collection</span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </Link>
          ))}
        </div>
        
        {/* Premium CTA section */}
        <div className="text-center">
          <div className="inline-block">
            <Link 
              href="/products"
              className="group relative inline-flex items-center px-12 py-6 btn-premium text-white font-bold text-lg rounded-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Discover All Categories
                <ArrowRight className="ml-3 h-6 w-6 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">
            Over 500+ premium products across 16 categories
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;