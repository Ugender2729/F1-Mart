'use client';

import { useState, useCallback } from 'react';
import { STORE_CONFIG, checkDeliveryRange, getDeliveryFee, getEstimatedDeliveryTime } from '@/lib/config/store';

interface DeliveryLocation {
  lat: number;
  lng: number;
  distance: number;
  isWithinRange: boolean;
  deliveryFee: number;
  estimatedTime: string;
  address?: string;
}

export function useDeliveryLocation() {
  const [location, setLocation] = useState<DeliveryLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkLocation = useCallback(async (orderAmount: number = 0): Promise<DeliveryLocation | null> => {
    setLoading(true);
    setError(null);

    try {
      // Check if geolocation is available
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Check delivery range
            const { isWithinRange, distance } = checkDeliveryRange(lat, lng);

            // Calculate delivery fee
            const deliveryFee = getDeliveryFee(distance, orderAmount);

            // Get estimated time
            const estimatedTime = getEstimatedDeliveryTime(distance);

            const locationData: DeliveryLocation = {
              lat,
              lng,
              distance,
              isWithinRange,
              deliveryFee: deliveryFee === -1 ? 0 : deliveryFee,
              estimatedTime,
              address: `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`,
            };

            setLocation(locationData);
            setLoading(false);
            resolve(locationData);
          },
          (error) => {
            let errorMessage = 'Unable to get your location. ';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage += 'Please allow location access.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage += 'Location information is unavailable.';
                break;
              case error.TIMEOUT:
                errorMessage += 'Request timed out.';
                break;
              default:
                errorMessage += error.message;
            }
            setError(errorMessage);
            setLoading(false);
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check location';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  }, []);

  const resetLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    loading,
    error,
    checkLocation,
    resetLocation,
    isWithinDeliveryRange: location?.isWithinRange || false,
    distance: location?.distance || 0,
    deliveryFee: location?.deliveryFee || STORE_CONFIG.delivery.fee,
  };
}


