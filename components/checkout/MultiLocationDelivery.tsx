'use client';

import React, { useState } from 'react';
import { MapPin, Users, Home, Navigation, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { STORE_CONFIG, checkDeliveryRange } from '@/lib/config/store';
import { toast } from 'sonner';

interface DeliveryLocation {
  type: 'self' | 'mahabubabad' | 'friends_family';
  recipientName?: string;
  recipientPhone?: string;
  recipientAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  landmark?: string;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    distance: number;
    isWithinRange: boolean;
    timestamp: string;
  };
}

interface MultiLocationDeliveryProps {
  onDeliveryLocationChange: (location: DeliveryLocation) => void;
  onLocationVerified?: (isValid: boolean, locationType: string) => void;
}

// Mahabubabad location (you can update this)
const MAHABUBABAD_LOCATION = {
  name: 'Mahabubabad',
  lat: 17.5981,
  lng: 80.0034,
  state: 'Telangana',
  country: 'India',
  deliveryFee: 150, // Higher fee for distant location
  estimatedTime: '2-3 hours', // Longer delivery time
};

const MultiLocationDelivery: React.FC<MultiLocationDeliveryProps> = ({
  onDeliveryLocationChange,
  onLocationVerified,
}) => {
  const [deliveryType, setDeliveryType] = useState<'self' | 'mahabubabad' | 'friends_family'>('self');
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    landmark: '',
  });
  const [capturedLocation, setCapturedLocation] = useState<any>(null);
  const [capturingLocation, setCapturingLocation] = useState(false);

  const captureCurrentLocation = () => {
    setCapturingLocation(true);

    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setCapturingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Check if within Telangana state coverage
        const { isWithinRange, distance } = checkDeliveryRange(lat, lng);

        const gpsLocation = {
          latitude: lat,
          longitude: lng,
          accuracy: position.coords.accuracy,
          distance,
          isWithinRange,
          timestamp: new Date().toISOString(),
        };

        setCapturedLocation(gpsLocation);

        // Notify parent
        const deliveryData: DeliveryLocation = {
          type: deliveryType,
          gpsLocation,
        };
        onDeliveryLocationChange(deliveryData);
        onLocationVerified?.(isWithinRange, deliveryType);

        if (isWithinRange) {
          toast.success(`✓ Location verified: ${distance.toFixed(2)}km from store (Telangana delivery available)`);
        } else {
          toast.warning(`⚠️ Outside Telangana state: ${distance.toFixed(2)}km away`);
        }

        setCapturingLocation(false);
      },
      (error) => {
        toast.error('Failed to get location');
        setCapturingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleDeliveryTypeChange = (type: 'self' | 'mahabubabad' | 'friends_family') => {
    setDeliveryType(type);
    setCapturedLocation(null);

    const deliveryData: DeliveryLocation = {
      type,
      recipientName: type !== 'self' ? recipientInfo.name : undefined,
      recipientPhone: type !== 'self' ? recipientInfo.phone : undefined,
      recipientAddress: type !== 'self' ? recipientInfo.address : undefined,
      city: type === 'mahabubabad' ? MAHABUBABAD_LOCATION.name : recipientInfo.city,
      state: type === 'mahabubabad' ? MAHABUBABAD_LOCATION.state : recipientInfo.state,
      zipCode: recipientInfo.zipCode,
      landmark: recipientInfo.landmark,
    };

    onDeliveryLocationChange(deliveryData);
    
    // For Mahabubabad, automatically mark as valid
    if (type === 'mahabubabad') {
      onLocationVerified?.(true, 'mahabubabad');
      toast.info('📍 Mahabubabad delivery selected - Special delivery charges apply');
    }
  };

  const handleRecipientInfoChange = (field: string, value: string) => {
    const updated = { ...recipientInfo, [field]: value };
    setRecipientInfo(updated);

    const deliveryData: DeliveryLocation = {
      type: deliveryType,
      recipientName: updated.name,
      recipientPhone: updated.phone,
      recipientAddress: updated.address,
      city: deliveryType === 'mahabubabad' ? MAHABUBABAD_LOCATION.name : updated.city,
      state: deliveryType === 'mahabubabad' ? MAHABUBABAD_LOCATION.state : updated.state,
      zipCode: updated.zipCode,
      landmark: updated.landmark,
      gpsLocation: capturedLocation,
    };

    onDeliveryLocationChange(deliveryData);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border-2 border-purple-200 dark:border-purple-800">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-purple-600" />
            Delivery Location Options
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose where you want your order delivered
          </p>
        </div>

        {/* Delivery Type Selection */}
        <RadioGroup value={deliveryType} onValueChange={handleDeliveryTypeChange}>
          <div className="space-y-3">
            {/* Self Delivery (Telangana) */}
            <Card className={`p-4 cursor-pointer transition-all ${
              deliveryType === 'self'
                ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border border-gray-200 dark:border-gray-600 hover:border-purple-300'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="self" id="self" className="mt-1" />
                <label htmlFor="self" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Deliver to Me (Telangana)
                    </span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                      State-wide
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get it delivered to your current location anywhere in Telangana
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Delivery fee: ₹50-100 • Time: 1-6 hours
                  </p>
                </label>
              </div>
            </Card>

            {/* Mahabubabad Delivery */}
            <Card className={`p-4 cursor-pointer transition-all ${
              deliveryType === 'mahabubabad'
                ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border border-gray-200 dark:border-gray-600 hover:border-orange-300'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="mahabubabad" id="mahabubabad" className="mt-1" />
                <label htmlFor="mahabubabad" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Deliver to Mahabubabad
                    </span>
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-300">
                      Special Zone
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send gifts to friends & family in Mahabubabad
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Delivery fee: ₹{MAHABUBABAD_LOCATION.deliveryFee} • Time: {MAHABUBABAD_LOCATION.estimatedTime}
                  </p>
                </label>
              </div>
            </Card>

            {/* Friends & Family (Other Locations) */}
            <Card className={`p-4 cursor-pointer transition-all ${
              deliveryType === 'friends_family'
                ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border border-gray-200 dark:border-gray-600 hover:border-blue-300'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="friends_family" id="friends_family" className="mt-1" />
                <label htmlFor="friends_family" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Deliver to Friends & Family
                    </span>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                      Gift Order
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Send orders to friends & family anywhere
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Delivery fee varies by location • Time: 1-3 hours
                  </p>
                </label>
              </div>
            </Card>
          </div>
        </RadioGroup>

        {/* Location Capture for Self Delivery */}
        {deliveryType === 'self' && (
          <div className="space-y-3">
            <Button
              onClick={captureCurrentLocation}
              disabled={capturingLocation}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Navigation className="h-4 w-4 mr-2" />
              {capturingLocation ? 'Detecting Location...' : 'Verify My Location'}
            </Button>

            {capturedLocation && (
              <div className={`p-3 rounded-lg border-2 ${
                capturedLocation.isWithinRange
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
              }`}>
                <div className="flex items-start gap-2">
                  {capturedLocation.isWithinRange ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${
                      capturedLocation.isWithinRange
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-red-800 dark:text-red-300'
                    }`}>
                      {capturedLocation.isWithinRange
                        ? '✓ Within Telangana delivery coverage'
                        : '✗ Outside Telangana state'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Distance: {capturedLocation.distance.toFixed(2)}km from store
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recipient Information for Mahabubabad */}
        {deliveryType === 'mahabubabad' && (
          <div className="space-y-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Recipient Details (Mahabubabad)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient-name">Recipient Name *</Label>
                <Input
                  id="recipient-name"
                  value={recipientInfo.name}
                  onChange={(e) => handleRecipientInfoChange('name', e.target.value)}
                  placeholder="Friend's name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipient-phone">Recipient Phone *</Label>
                <Input
                  id="recipient-phone"
                  value={recipientInfo.phone}
                  onChange={(e) => handleRecipientInfoChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="recipient-address">Complete Address in Mahabubabad *</Label>
              <Input
                id="recipient-address"
                value={recipientInfo.address}
                onChange={(e) => handleRecipientInfoChange('address', e.target.value)}
                placeholder="House No., Street, Area"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient-landmark">Landmark</Label>
                <Input
                  id="recipient-landmark"
                  value={recipientInfo.landmark}
                  onChange={(e) => handleRecipientInfoChange('landmark', e.target.value)}
                  placeholder="Near..."
                />
              </div>
              <div>
                <Label htmlFor="recipient-zipcode">PIN Code</Label>
                <Input
                  id="recipient-zipcode"
                  value={recipientInfo.zipCode}
                  onChange={(e) => handleRecipientInfoChange('zipCode', e.target.value)}
                  placeholder="506101"
                />
              </div>
            </div>

            {/* Mahabubabad Delivery Info */}
            <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg border border-orange-300 dark:border-orange-700">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-orange-800 dark:text-orange-300">
                  <p className="font-semibold">Mahabubabad Delivery Details:</p>
                  <p className="mt-1">• Delivery Fee: ₹{MAHABUBABAD_LOCATION.deliveryFee}</p>
                  <p>• Estimated Time: {MAHABUBABAD_LOCATION.estimatedTime}</p>
                  <p>• Distance: ~100 km from store</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recipient Information for Other Friends & Family */}
        {deliveryType === 'friends_family' && (
          <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Recipient Details
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ff-recipient-name">Recipient Name *</Label>
                <Input
                  id="ff-recipient-name"
                  value={recipientInfo.name}
                  onChange={(e) => handleRecipientInfoChange('name', e.target.value)}
                  placeholder="Friend/Family member name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ff-recipient-phone">Recipient Phone *</Label>
                <Input
                  id="ff-recipient-phone"
                  value={recipientInfo.phone}
                  onChange={(e) => handleRecipientInfoChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ff-recipient-address">Complete Address *</Label>
              <Input
                id="ff-recipient-address"
                value={recipientInfo.address}
                onChange={(e) => handleRecipientInfoChange('address', e.target.value)}
                placeholder="House No., Street, Area"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="ff-city">City *</Label>
                <Input
                  id="ff-city"
                  value={recipientInfo.city}
                  onChange={(e) => handleRecipientInfoChange('city', e.target.value)}
                  placeholder="City name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ff-state">State *</Label>
                <Input
                  id="ff-state"
                  value={recipientInfo.state}
                  onChange={(e) => handleRecipientInfoChange('state', e.target.value)}
                  placeholder="State name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ff-zipcode">PIN Code *</Label>
                <Input
                  id="ff-zipcode"
                  value={recipientInfo.zipCode}
                  onChange={(e) => handleRecipientInfoChange('zipCode', e.target.value)}
                  placeholder="500001"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ff-landmark">Landmark (Optional)</Label>
              <Input
                id="ff-landmark"
                value={recipientInfo.landmark}
                onChange={(e) => handleRecipientInfoChange('landmark', e.target.value)}
                placeholder="Near famous location..."
              />
            </div>

            {/* Info Note */}
            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg border border-blue-300 dark:border-blue-700">
              <p className="text-xs text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> Delivery charges and time will vary based on the location distance from our store.
              </p>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                Selected Delivery Type:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {deliveryType === 'self' && '🏠 Deliver to me (Telangana)'}
                {deliveryType === 'mahabubabad' && '📍 Deliver to Mahabubabad'}
                {deliveryType === 'friends_family' && '👥 Deliver to friends & family'}
              </p>
              {deliveryType !== 'self' && recipientInfo.name && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Recipient: {recipientInfo.name} • {recipientInfo.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MultiLocationDelivery;


