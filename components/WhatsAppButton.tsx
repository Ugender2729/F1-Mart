'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Indian mobile number for WhatsApp (replace with your actual number)
  const phoneNumber = '919876543210'; // Format: 91 (country code) + 10 digit number
  const message = encodeURIComponent('Hi! I want to place an order from F1 Mart 🛒');
  
  // WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            <span className="text-sm font-medium">Chat with us on WhatsApp!</span>
            <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>

          {/* WhatsApp Button */}
          <div className="relative">
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            
            {/* Button */}
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110">
              <MessageCircle className="h-7 w-7" />
            </div>

            {/* Badge - Optional "New" or "Online" indicator */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
              <span className="relative">
                <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
                <span className="relative">🔥</span>
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Banner - Alternative for mobile users */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 px-4 py-3 text-white"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">Order via WhatsApp - Quick & Easy!</span>
          <div className="bg-white/20 px-2 py-1 rounded text-xs font-bold">Chat Now</div>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;

