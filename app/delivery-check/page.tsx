'use client';

import React from 'react';
import DeliveryMapDemo from '@/components/map/DeliveryMapDemo';
import { STORE_CONFIG } from '@/lib/config/store';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeliveryCheckPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Demo Component */}
        <DeliveryMapDemo />

        {/* How to Find Your Coordinates */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
            📍 How to Update Store Location
          </h3>
          <div className="space-y-3 text-sm text-blue-800 dark:text-blue-300">
            <p>To update your store's location coordinates:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Go to <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google Maps</a></li>
              <li>Search for your store address</li>
              <li>Right-click on your store location</li>
              <li>Click on the coordinates (they will be copied)</li>
              <li>Update the coordinates in <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">lib/config/store.ts</code></li>
            </ol>
            <p className="font-semibold">Example: 17.385044, 78.486671</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
