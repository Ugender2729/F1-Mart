'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg border-b border-purple-500/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl blur-sm opacity-80 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white rounded-2xl p-3 group-hover:scale-110 transition-all duration-300 shadow-xl">
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 group-hover:from-pink-400 group-hover:via-red-400 group-hover:to-orange-400 transition-all duration-300">
                FreshMart
              </span>
              <span className="text-sm text-gray-300 font-medium tracking-wider">PREMIUM GROCERIES</span>
            </div>
          </Link>

          {/* Search Engine */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80" />
              <Input
                type="text"
                placeholder="Search for groceries, fruits, vegetables..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="pl-12 pr-4 py-3 w-full rounded-xl border-white/30 bg-white/20 backdrop-blur-xl text-white placeholder-white/80 focus:bg-white/30 focus:border-white/50 transition-all duration-300 shadow-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white px-4 py-1 rounded-lg shadow-md"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Home Button */}
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-white rounded-xl p-3 transition-all duration-300 shadow-md"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative bg-white/20 hover:bg-white/30 text-white rounded-xl p-3 transition-all duration-300 shadow-md">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative bg-white/20 hover:bg-white/30 text-white rounded-xl p-3 transition-all duration-300 shadow-md">
                <ShoppingCart className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {cartState.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Link */}
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-3 transition-all duration-300 shadow-md">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">Sign In</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden bg-white/20 hover:bg-white/30 text-white rounded-xl p-3 transition-all duration-300 shadow-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
            <Input
              type="text"
              placeholder="Search for groceries..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10 pr-16 w-full bg-white/20 border-white/30 text-white placeholder-white/80 focus:bg-white/30 focus:border-white/50 rounded-xl shadow-lg"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white px-3 py-1 text-xs rounded-lg shadow-md"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href="/wishlist" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
              <Heart className="h-5 w-5" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
            <Link href="/cart" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({cartState.itemCount})</span>
            </Link>
            <Link href="/auth" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;