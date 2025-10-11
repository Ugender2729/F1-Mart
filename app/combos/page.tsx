'use client';

import React, { useState } from 'react';
import { Gift, Sparkles, TrendingUp, Package } from 'lucide-react';
import ComboCard from '@/components/combos/ComboCard';
import { combos, comboCategories } from '@/data/combos';
import { Button } from '@/components/ui/button';

const CombosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCombos = selectedCategory === 'all' 
    ? combos 
    : combos.filter(combo => combo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                <Gift className="h-16 w-16" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                🎁 Super Saver Combos
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Amazing deals on essential products • Save up to 20% on combos
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-black">{combos.length}+</div>
                <div className="text-sm text-white/80 mt-1">Combo Packs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-black">20%</div>
                <div className="text-sm text-white/80 mt-1">Average Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-black">4</div>
                <div className="text-sm text-white/80 mt-1">Categories</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Curated Collections</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Best Value</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Ready to Ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {comboCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`rounded-xl px-6 py-3 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg scale-105'
                    : 'hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                <span className="text-lg mr-2">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {category.id === 'all' 
                    ? combos.length 
                    : combos.filter(c => c.category === category.id).length}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Combos Grid */}
        <div>
          {/* Category Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {comboCategories.find(c => c.id === selectedCategory)?.name || 'All Combos'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCombos.length} combo{filteredCombos.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Combos Grid */}
          {filteredCombos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCombos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto shadow-xl">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Combos Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No combos available in this category yet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Why Choose Combos Section */}
        <div className="mt-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-black mb-8 text-center">
            Why Choose F1 Mart Combos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-4 inline-block">
                <Sparkles className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Selections</h3>
              <p className="text-white/80">
                Expertly selected product combinations that work perfectly together
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-4 inline-block">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Maximum Savings</h3>
              <p className="text-white/80">
                Save up to 20% compared to buying products individually
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-4 inline-block">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Convenience</h3>
              <p className="text-white/80">
                All your essentials in one pack, delivered to your doorstep
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-xl">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Contact us via WhatsApp and we'll create a custom combo just for you!
          </p>
          <Button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl px-8 py-3 text-lg font-bold shadow-lg"
          >
            💬 Chat with Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CombosPage;

