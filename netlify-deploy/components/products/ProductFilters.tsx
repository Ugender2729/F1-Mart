'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/categories';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  rating: number;
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  brands: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  brands
}) => {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brandName: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brandName]
      : filters.brands.filter(name => name !== brandName);
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.slug)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.slug, checked as boolean)
                }
              />
              <Label
                htmlFor={category.id}
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={50}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Brands</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => 
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <Label
                htmlFor={brand}
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Minimum Rating</h3>
        <Select
          value={filters.rating.toString()}
          onValueChange={(value) => 
            onFiltersChange({ ...filters, rating: parseFloat(value) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All ratings</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
            <SelectItem value="4.8">4.8+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stock Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, inStock: checked as boolean })
            }
          />
          <Label
            htmlFor="in-stock"
            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            In stock only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;