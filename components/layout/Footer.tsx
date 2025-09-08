'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const handleNewsletterSubmit = () => {
    alert('Thank you for subscribing! You will receive our newsletter soon.');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNewsletterSubmit();
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/f1mart',
      twitter: 'https://twitter.com/f1mart',
      instagram: 'https://instagram.com/f1mart'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">F1 Mart</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for fresh groceries delivered right to your doorstep.
              Fresh and fast delivery with quality and convenience guaranteed.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-emerald-600 hover:text-white transition-colors"
                onClick={() => handleSocialClick('facebook')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-emerald-600 hover:text-white transition-colors"
                onClick={() => handleSocialClick('twitter')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-emerald-600 hover:text-white transition-colors"
                onClick={() => handleSocialClick('instagram')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Special Deals</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="space-y-3 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-FRESH-01</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>help@f1mart.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available in 50+ cities</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleNewsletterSubmit}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 F1 Mart. All rights reserved. Made with ❤️ for fresh food lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;