'use client';

import React from 'react';
import { AlertTriangle, Package, PackageX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StockWarningProps {
  product: {
    stock: number;
    category: string;
    unit: string;
    name?: string;
  };
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StockWarning({ 
  product, 
  showIcon = true, 
  size = 'md',
  className = '' 
}: StockWarningProps) {
  if (!product) return null;

  const isLowStock = () => {
    // For powder products (check if category contains 'powder' or unit is 'kg')
    if (product.category?.toLowerCase().includes('powder') || product.unit?.toLowerCase() === 'kg') {
      return product.stock < 10;
    }
    // For other products, check if stock is less than 10 items
    return product.stock < 10;
  };

  const getStockStatus = () => {
    if (product.stock <= 0) {
      return 'out_of_stock';
    } else if (isLowStock()) {
      return 'low_stock';
    } else {
      return 'in_stock';
    }
  };

  const getStockMessage = () => {
    const status = getStockStatus();
    
    switch (status) {
      case 'out_of_stock':
        return 'Out of Stock';
      case 'low_stock':
        if (product.category?.toLowerCase().includes('powder') || product.unit?.toLowerCase() === 'kg') {
          return `Only ${product.stock}kg left!`;
        } else {
          return `Only ${product.stock} left!`;
        }
      default:
        return null;
    }
  };

  const getStockColor = () => {
    const status = getStockStatus();
    
    switch (status) {
      case 'out_of_stock':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'low_stock':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      default:
        return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  const getStockIcon = () => {
    const status = getStockStatus();
    
    switch (status) {
      case 'out_of_stock':
        return <PackageX className="h-3 w-3" />;
      case 'low_stock':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-sm px-3 py-2';
      default:
        return 'text-xs px-2 py-1';
    }
  };

  const status = getStockStatus();
  const message = getStockMessage();
  const colorClasses = getStockColor();
  const sizeClasses = getSizeClasses();

  if (status === 'in_stock') {
    return null; // Don't show anything for in-stock items
  }

  return (
    <Badge 
      variant="outline" 
      className={`${colorClasses} ${sizeClasses} ${className} flex items-center gap-1 font-medium`}
    >
      {showIcon && getStockIcon()}
      {message}
    </Badge>
  );
}

// Additional component for stock status indicator
export function StockStatusIndicator({ 
  product, 
  showText = true,
  className = '' 
}: StockWarningProps & { showText?: boolean }) {
  if (!product) return null;

  const isLowStock = () => {
    if (product.category?.toLowerCase().includes('powder') || product.unit?.toLowerCase() === 'kg') {
      return product.stock < 10;
    }
    return product.stock < 10;
  };

  const getStockStatus = () => {
    if (product.stock <= 0) {
      return 'out_of_stock';
    } else if (isLowStock()) {
      return 'low_stock';
    } else {
      return 'in_stock';
    }
  };

  const status = getStockStatus();
  
  if (status === 'in_stock') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        {showText && <span className="text-xs text-green-600">In Stock</span>}
      </div>
    );
  }

  if (status === 'low_stock') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        {showText && <span className="text-xs text-orange-600">Low Stock</span>}
      </div>
    );
  }

  if (status === 'out_of_stock') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        {showText && <span className="text-xs text-red-600">Out of Stock</span>}
      </div>
    );
  }

  return null;
}





