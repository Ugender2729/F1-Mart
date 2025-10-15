'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Package, Tag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Combo } from '@/types/combo';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ComboCardProps {
  combo: Combo;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Create a virtual product for the combo
    const comboProduct = {
      id: combo.id,
      name: combo.name,
      description: combo.description,
      price: combo.discountedPrice,
      original_price: combo.originalPrice,
      image: combo.image,
      images: [combo.image],
      category: 'Combos',
      brand: 'F1 Mart Combo',
      rating: 4.8,
      review_count: 150,
      reviewCount: 150,
      stock: 50,
      unit: 'combo',
      weight: 'combo pack',
      nutrition: {
        calories: 'N/A',
        protein: 'N/A',
        fat: 'N/A',
        carbs: 'N/A',
        fiber: 'N/A'
      },
      featured: true,
      on_sale: true,
      onSale: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    addItem(comboProduct, 1);
    toast.success('Combo added to cart!', {
      description: `${combo.name} - Save ₹${combo.savings}`,
      duration: 2000
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 bg-white dark:bg-gray-800">
      {/* Image Section */}
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge - Compact on mobile */}
        {combo.badge && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold shadow-lg flex items-center space-x-0.5 sm:space-x-1">
            <Sparkles className="h-2 w-2 sm:h-3 sm:w-3" />
            <span className="hidden sm:inline">{combo.badge}</span>
            <span className="sm:hidden">🔥</span>
          </div>
        )}
        
        {/* Discount Badge - Compact on mobile */}
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-gradient-to-br from-red-500 to-pink-600 text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-lg text-center shadow-lg">
          <div className="text-sm sm:text-xl font-black leading-none">{combo.discountPercent}%</div>
          <div className="text-[8px] sm:text-[10px] font-medium">OFF</div>
        </div>
      </div>

      {/* Content Section - Compact on mobile */}
      <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 sm:line-clamp-1">
            {combo.name}
          </h3>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-2 hidden sm:block">
            {combo.description}
          </p>
        </div>

        {/* Items List - Simplified on mobile */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-1.5 sm:p-2 md:p-3 space-y-1 sm:space-y-1.5">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <Package className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-emerald-600" />
            <span className="text-[9px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">
              Includes:
            </span>
          </div>
          {combo.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-start space-x-1 sm:space-x-2">
              <div className="mt-0.5 sm:mt-1 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-[9px] sm:text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{item.name}</span>
                </p>
              </div>
            </div>
          ))}
          {combo.items.length > 3 && (
            <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 ml-3 sm:ml-4">
              +{combo.items.length - 3} more
            </p>
          )}
        </div>

        {/* Pricing - Compact on mobile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-1.5 sm:pt-2 border-t border-gray-200 dark:border-gray-700 gap-1.5 sm:gap-0">
          <div>
            <div className="flex items-baseline space-x-1 sm:space-x-2">
              <span className="text-sm sm:text-lg md:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{combo.discountedPrice}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-through">
                ₹{combo.originalPrice}
              </span>
            </div>
            <div className="flex items-center space-x-0.5 sm:space-x-1 mt-0.5 sm:mt-1">
              <Tag className="h-2 w-2 sm:h-3 sm:w-3 text-green-600" />
              <span className="text-[9px] sm:text-xs font-semibold text-green-600 dark:text-green-400">
                Save ₹{combo.savings}
              </span>
            </div>
          </div>

          {/* Add to Cart Button - Compact on mobile */}
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg sm:rounded-xl px-2 py-1 sm:px-4 sm:py-2 shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            size="sm"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-[10px] sm:text-sm">Add</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ComboCard;

