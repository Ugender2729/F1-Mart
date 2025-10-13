'use client';

import React from 'react';
import SimpleMap from './SimpleMap';
import DeliveryRadiusChecker from './DeliveryRadiusChecker';
import { STORE_CONFIG } from '@/lib/config/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Zap } from 'lucide-react';

export default function DeliveryMapDemo() {
  const handleLocationVerified = (isValid: boolean, distance: number) => {
    console.log('Location verified:', { isValid, distance });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Delivery Area Verification
          </CardTitle>
          <CardDescription className="text-white/90">
            We deliver within {STORE_CONFIG.delivery.radius}km radius - No Google API needed!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Map Options */}
      <Tabs defaultValue="simple" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple Checker</TabsTrigger>
          <TabsTrigger value="visual">Visual Map</TabsTrigger>
        </TabsList>

        {/* Simple Checker */}
        <TabsContent value="simple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Quick Location Check
              </CardTitle>
              <CardDescription>
                Fast and simple delivery range verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeliveryRadiusChecker 
                onLocationVerified={handleLocationVerified}
                showMap={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visual Map */}
        <TabsContent value="visual" className="space-y-4">
          <SimpleMap
            deliveryRadius={STORE_CONFIG.delivery.radius}
            storeLat={STORE_CONFIG.location.lat}
            storeLng={STORE_CONFIG.location.lng}
            onLocationSelect={(location) => {
              console.log('Location selected:', location);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No API Costs</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                100% free - uses browser's built-in GPS
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Accurate</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uses Haversine formula for precise distance
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fast</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant calculations, no API delays
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


