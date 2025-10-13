'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STORE_CONFIG, checkDeliveryRange } from '@/lib/config/store';

interface DeliveryRadiusCheckerProps {
  onLocationVerified?: (isValid: boolean, distance: number) => void;
  showMap?: boolean;
}

const DeliveryRadiusChecker: React.FC<DeliveryRadiusCheckerProps> = ({
  onLocationVerified,
  showMap = true,
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number>(0);
  const [isWithinRadius, setIsWithinRadius] = useState<boolean>(false);
  const [locationChecked, setLocationChecked] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError('');
    setLocationChecked(false);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please enable location services.');
      setLoading(false);
      if (onLocationVerified) onLocationVerified(false, 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setUserLocation({ lat, lng });
        
        // Check delivery range
        const { isWithinRange, distance: dist } = checkDeliveryRange(lat, lng);
        setDistance(dist);
        setIsWithinRadius(isWithinRange);
        setLocationChecked(true);
        
        // Call callback
        if (onLocationVerified) {
          onLocationVerified(isWithinRange, dist);
        }
        
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += error.message;
        }
        setLocationError(errorMessage);
        setLoading(false);
        setLocationChecked(false);
        if (onLocationVerified) onLocationVerified(false, 0);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Auto-check location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="space-y-4">
      {/* Visual Map (optional) */}
      {showMap && (
        <div className="relative w-full h-48 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
          {/* Store marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Telangana delivery radius circle */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-orange-400 border-dashed opacity-30"
                style={{ width: '140px', height: '140px' }}
              />
              {/* Store pin */}
              <div className="relative bg-orange-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* User location (if available) */}
          {userLocation && locationChecked && (
            <div 
              className={`absolute z-20 ${isWithinRadius ? 'animate-pulse' : ''}`}
              style={{
                top: `${50 + (distance / STORE_CONFIG.delivery.radius) * 15}%`,
                left: `${50 + (distance / STORE_CONFIG.delivery.radius) * 15}%`,
              }}
            >
              <div className={`${isWithinRadius ? 'bg-green-500' : 'bg-red-500'} text-white p-2 rounded-full shadow-lg`}>
                <Navigation className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Radius label */}
          <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
            {STORE_CONFIG.delivery.radius}km radius
          </div>
        </div>
      )}

      {/* Check Location Button */}
      <Button
        onClick={getCurrentLocation}
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Checking Location...
          </>
        ) : (
          <>
            <Navigation className="h-4 w-4 mr-2" />
            {locationChecked ? 'Re-check Location' : 'Verify Delivery Location'}
          </>
        )}
      </Button>

      {/* Location Status */}
      {locationChecked && userLocation && (
        <div className={`p-4 rounded-lg border-2 ${
          isWithinRadius
            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
        }`}>
          <div className="flex items-start gap-3">
            {isWithinRadius ? (
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-bold text-lg ${
                isWithinRadius
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {isWithinRadius 
                  ? '✓ Delivery Available!' 
                  : '✗ Outside Delivery Area'}
              </p>
              <p className={`text-sm mt-1 ${
                isWithinRadius
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
              }`}>
                You are <strong>{distance.toFixed(2)} km</strong> from our store
              </p>
              {isWithinRadius ? (
                <div className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
                  <p>✓ Within Telangana state delivery coverage ({STORE_CONFIG.delivery.radius}km)</p>
                  <p>✓ Delivery fee: ₹{STORE_CONFIG.delivery.fee}</p>
                  <p>✓ Est. delivery time: {STORE_CONFIG.delivery.estimatedTime}</p>
                </div>
              ) : (
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  <p>We currently deliver only within {STORE_CONFIG.delivery.radius}km from our store.</p>
                  <p className="mt-1">Distance exceeds by: <strong>{(distance - STORE_CONFIG.delivery.radius).toFixed(2)} km</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {locationError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 dark:text-red-300">Location Error</p>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">{locationError}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                <strong>Tip:</strong> Make sure to allow location access when prompted by your browser.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 dark:text-blue-400">
            <p><strong>Store Location:</strong> {STORE_CONFIG.location.name}</p>
            <p className="mt-1">{STORE_CONFIG.location.address}, {STORE_CONFIG.location.city}</p>
            <p className="mt-1"><strong>Delivery Radius:</strong> {STORE_CONFIG.delivery.radius}km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryRadiusChecker;


