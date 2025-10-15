'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const NavigationLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reset loading when navigation completes
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Listen for navigation start (when route changes are triggered)
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Custom event listeners for programmatic navigation
    window.addEventListener('navigationStart', handleStart);
    window.addEventListener('navigationComplete', handleComplete);

    return () => {
      window.removeEventListener('navigationStart', handleStart);
      window.removeEventListener('navigationComplete', handleComplete);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-800 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-white animate-pulse">
            Loading...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we redirect you
          </p>
        </div>
        
        {/* Loading bar */}
        <div className="w-64 mx-auto h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default NavigationLoader;

