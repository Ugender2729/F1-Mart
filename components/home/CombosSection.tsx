'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ArrowRight, Sparkles, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ComboCard from '@/components/combos/ComboCard';
import { combos } from '@/data/combos';

const CombosSection = () => {
  // Get first 4 combos to display
  const featuredCombos = combos.slice(0, 4);

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <Gift className="h-5 w-5" />
            <span className="font-bold text-lg">Super Saver Combos</span>
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            🎁 Amazing Combo Deals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Save up to 20% on curated product bundles • Perfect combinations for your daily needs
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-md">
              <Package className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900 dark:text-white">{combos.length}+</div>
                <div className="text-xs text-gray-500">Combo Packs</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-md">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900 dark:text-white">20%</div>
                <div className="text-xs text-gray-500">Avg. Savings</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-md">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="text-2xl font-black text-gray-900 dark:text-white">4</div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Combos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12">
          {featuredCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/combos">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl px-12 py-6 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Gift className="h-6 w-6 mr-3" />
              View All {combos.length} Combos
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            💰 Limited time offers • 🚚 Free delivery on combo orders above ₹500
          </p>
        </div>

        {/* Why Choose Combos */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Curated Selections
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expertly paired products that complement each other perfectly
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Maximum Savings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Save up to ₹120 compared to buying items separately
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              One-Click Shopping
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get all your essentials in one pack, delivered fast
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombosSection;

