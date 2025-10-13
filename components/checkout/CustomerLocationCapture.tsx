'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STORE_CONFIG, checkDeliveryRange } from '@/lib/config/store';

interface CustomerLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  distance: number;
  isWithinRange: boolean;
  timestamp: string;
  address?: string;
}

interface CustomerLocationCaptureProps {
  onLocationCaptured: (location: CustomerLocation) => void;
  autoCapture?: boolean;
}

const CustomerLocationCapture: React.FC<CustomerLocationCaptureProps> = ({
  onLocationCaptured,
  autoCapture = true,
}) => {
  const [location, setLocation] = useState<CustomerLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [captureAttempted, setCaptureAttempted] = useState(false);

  const captureLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        // Check delivery range
        const { isWithinRange, distance } = checkDeliveryRange(lat, lng);

        const locationData: CustomerLocation = {
          latitude: lat,
          longitude: lng,
          accuracy,
          distance,
          isWithinRange,
          timestamp: new Date().toISOString(),
          address: `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`,
        };

        setLocation(locationData);
        setCaptureAttempted(true);
        
        // Call parent callback
        onLocationCaptured(locationData);
        
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to get location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Request timed out.';
            break;
          default:
            errorMessage += error.message;
        }
        setError(errorMessage);
        setCaptureAttempted(true);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Auto-capture on mount if enabled
  useEffect(() => {
    if (autoCapture && !captureAttempted) {
      captureLocation();
    }
  }, [autoCapture]);

  return (
    <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-200 dark:border-orange-800">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Customer Location
            </h4>
          </div>
          {location && (
            <Badge variant="outline" className={
              location.isWithinRange
                ? 'bg-green-50 text-green-700 border-green-300'
                : 'bg-red-50 text-red-700 border-red-300'
            }>
              {location.isWithinRange ? '✓ Telangana' : '✗ Outside State'}
            </Badge>
          )}
        </div>

        {/* Capture Button */}
        {!location && (
          <Button
            onClick={captureLocation}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            size="sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-2" />
                Capture Location
              </>
            )}
          </Button>
        )}

        {/* Location Info */}
        {location && (
          <div className="space-y-2">
            <div className={`p-3 rounded-lg ${
              location.isWithinRange
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-2">
                {location.isWithinRange ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${
                    location.isWithinRange
                      ? 'text-green-800 dark:text-green-300'
                      : 'text-red-800 dark:text-red-300'
                  }`}>
                    {location.isWithinRange
                      ? 'Within Telangana delivery coverage'
                      : 'Outside Telangana state'}
                  </p>
                  <p className={`text-xs mt-1 ${
                    location.isWithinRange
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    Distance: {location.distance.toFixed(2)} km
                    {!location.isWithinRange && ` (Telangana state coverage: ${STORE_CONFIG.delivery.radius}km)`}
                  </p>
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400">Latitude</p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white">
                  {location.latitude.toFixed(6)}°
                </p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400">Longitude</p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white">
                  {location.longitude.toFixed(6)}°
                </p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Accuracy: ±{Math.round(location.accuracy)}m</span>
              <Button
                onClick={captureLocation}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
              >
                Re-capture
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-xs text-blue-700 dark:text-blue-400">
            📍 Your location helps us calculate delivery time and ensure we can deliver to you.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CustomerLocationCapture;


