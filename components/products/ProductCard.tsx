'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StockWarning } from '@/components/ui/stock-warning';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addItem, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const cartQuantity = getItemQuantity(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl premium-shadow hover:premium-shadow-hover transition-all duration-700 overflow-hidden border border-white/20 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.02]">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="premium-image object-cover"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-700" />
          
          {/* Premium badges - Compact on mobile */}
          <div className="absolute top-2 left-2 sm:top-5 sm:left-5 flex flex-col gap-1 sm:gap-3">
            {product.onSale && (
              <div className="glass px-2 py-1 sm:px-4 sm:py-2 rounded-full">
                <span className="text-white text-[10px] sm:text-sm font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  SALE
                </span>
              </div>
            )}
            {product.featured && (
              <div className="glass px-2 py-1 sm:px-4 sm:py-2 rounded-full">
                <span className="text-white text-[10px] sm:text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  FEATURED
                </span>
              </div>
            )}
          </div>

          {/* Premium wishlist button - Compact on mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 sm:top-5 sm:right-5 p-1.5 sm:p-3 rounded-full transition-all duration-500 glass ${
              isWishlisted 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          {/* Stock warning with premium styling - Hidden on mobile for space */}
          <div className="absolute bottom-2 left-2 sm:bottom-5 sm:left-5 hidden sm:block">
            <StockWarning 
              product={product} 
              size="sm"
              className="glass border-white/20 text-white"
            />
          </div>
        </div>
      </Link>

      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <Link href={`/product/${product.id}`}>
          <div className="mb-2 sm:mb-4 md:mb-6">
            <h3 className="font-black text-white group-hover:text-purple-300 transition-colors line-clamp-2 text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 md:mb-3">
              {product.name}
            </h3>
            <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 hidden sm:block">
              {product.brand} • {product.weight}
            </p>
          </div>

          <div className="flex items-center mb-2 sm:mb-3 md:mb-6 hidden sm:flex">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                {product.rating}
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm hidden md:inline">
                ({product.reviewCount})
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {product.stock > 0 ? (
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="relative overflow-hidden w-full sm:w-auto px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-[10px] sm:text-xs md:text-sm lg:text-base text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{cartQuantity > 0 ? `Add (${cartQuantity})` : 'Add to Cart'}</span>
                <span className="sm:hidden">Add</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          ) : (
            <Button disabled size="sm" className="w-full sm:w-auto px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl md:rounded-2xl glass text-gray-400 text-[10px] sm:text-xs md:text-sm">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
      
      {/* Premium glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;