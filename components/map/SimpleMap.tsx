'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SimpleMapProps {
  onLocationSelect?: (location: LocationData) => void;
  deliveryRadius?: number; // in kilometers
  storeLat?: number;
  storeLng?: number;
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  isWithinRadius: boolean;
  distance: number;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  onLocationSelect,
  deliveryRadius = 500, // Telangana state coverage
  storeLat = 17.385044, // Default store location (you can change this)
  storeLng = 78.486671,
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const [isWithinRadius, setIsWithinRadius] = useState<boolean>(false);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  };

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setUserLocation({ lat, lng });
        
        // Calculate distance from store
        const dist = calculateDistance(storeLat, storeLng, lat, lng);
        setDistance(dist);
        
        // Check if within delivery radius
        const withinRadius = dist <= deliveryRadius;
        setIsWithinRadius(withinRadius);
        
        // Get approximate address (without API)
        const approxAddress = `Location: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`;
        setAddress(approxAddress);
        
        // Call callback if provided
        if (onLocationSelect) {
          onLocationSelect({
            lat,
            lng,
            address: approxAddress,
            isWithinRadius: withinRadius,
            distance: dist,
          });
        }
        
        setLoading(false);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              Delivery Location
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We deliver within {deliveryRadius}km radius
            </p>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
          {/* Store location marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              {/* Delivery radius circle */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-orange-400 border-dashed opacity-30"
                style={{
                  width: '180px',
                  height: '180px',
                }}
              />
              {/* Store marker */}
              <div className="relative bg-orange-500 text-white p-3 rounded-full shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                  Store Location
                </span>
              </div>
            </div>
          </div>

          {/* User location marker (if available) */}
          {userLocation && (
            <div 
              className={`absolute z-20 ${
                isWithinRadius ? 'animate-bounce' : ''
              }`}
              style={{
                // Position relative to store (simplified visualization)
                top: `${50 + (distance / deliveryRadius) * 20}%`,
                left: `${50 + (distance / deliveryRadius) * 15}%`,
              }}
            >
              <div className={`relative ${isWithinRadius ? 'bg-green-500' : 'bg-red-500'} text-white p-2 rounded-full shadow-lg`}>
                <Navigation className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                  You ({distance.toFixed(2)}km)
                </span>
              </div>
            </div>
          )}

          {/* Grid pattern for visual effect */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Get Location Button */}
        <Button
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Navigation className="h-4 w-4 mr-2" />
          {loading ? 'Getting Location...' : 'Get My Current Location'}
        </Button>

        {/* Location Info */}
        {userLocation && (
          <div className="space-y-3">
            {/* Distance Info */}
            <div className={`p-4 rounded-lg ${
              isWithinRadius 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-3">
                {isWithinRadius ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    isWithinRadius 
                      ? 'text-green-800 dark:text-green-300' 
                      : 'text-red-800 dark:text-red-300'
                  }`}>
                    {isWithinRadius 
                      ? '✓ Within Delivery Range!' 
                      : '✗ Outside Delivery Range'}
                  </p>
                  <p className={`text-sm ${
                    isWithinRadius 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    Distance from store: <strong>{distance.toFixed(2)} km</strong>
                    {!isWithinRadius && ` (Telangana coverage: ${deliveryRadius} km)`}
                  </p>
                  {!isWithinRadius && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Sorry, we currently don't deliver to your location. Please choose a location within {deliveryRadius}km.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Your Location:</strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Latitude: {userLocation.lat.toFixed(6)}°, Longitude: {userLocation.lng.toFixed(6)}°
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {address}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {locationError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-300">Location Error</p>
                <p className="text-sm text-red-700 dark:text-red-400">{locationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-400">
            <strong>Note:</strong> We use your device's GPS to calculate the delivery distance. Make sure location services are enabled in your browser.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SimpleMap;


