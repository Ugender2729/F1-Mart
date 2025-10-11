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
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {combo.badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
            <Sparkles className="h-3 w-3" />
            <span>{combo.badge}</span>
          </div>
        )}
        
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-pink-600 text-white px-3 py-2 rounded-lg text-center shadow-lg">
          <div className="text-xl font-black leading-none">{combo.discountPercent}%</div>
          <div className="text-[10px] font-medium">OFF</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
            {combo.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {combo.description}
          </p>
        </div>

        {/* Items List */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-1.5">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Includes:
            </span>
          </div>
          {combo.items.map((item, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{item.name}</span>
                  {item.alternatives && (
                    <span className="text-gray-500"> ({item.alternatives.join(' / ')})</span>
                  )}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{combo.discountedPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{combo.originalPrice}
              </span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Tag className="h-3 w-3 text-green-600" />
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                Save ₹{combo.savings}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl px-4 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ComboCard;

