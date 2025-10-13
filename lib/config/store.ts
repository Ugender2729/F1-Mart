/**
 * Store Configuration
 * Update these values to match your actual store location
 */

export const STORE_CONFIG = {
  // Store Location Coordinates (Update these with your actual store location)
  location: {
    lat: 17.597093, // Store Latitude - CHANGE THIS
    lng: 80.00231, // Store Longitude - CHANGE THIS
    name: 'F1 Mart',
    address: 'thorrur bus stand ',
    city: 'mahabubabad',
    state: 'Telangana',
    country: 'India',
  },

  // Delivery Settings
  delivery: {
    radius: 500, // Delivery radius in kilometers (Telangana state coverage)
    fee: 50, // Base delivery fee in ₹
    freeDeliveryThreshold: 500, // Free delivery above this amount
    estimatedTime: '2-4 hours', // Estimated delivery time for Telangana
    stateCoverage: 'Telangana', // State-wide delivery coverage
  },

  // Store Timings
  timings: {
    openTime: '08:00',
    closeTime: '22:00',
    daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  // Contact Information
  contact: {
    phone: '+91 9876543210', // Your store phone number
    whatsapp: '+91 9876543210', // Your WhatsApp number
    email: 'contact@f1mart.com',
  },

  // Special Delivery Zones (for friends & family orders)
  specialZones: {
    mahabubabad: {
      name: 'Mahabubabad',
      latitude: 17.5981,
      longitude: 80.0034,
      state: 'Telangana',
      deliveryFee: 150,
      estimatedTime: '2-3 hours',
      distanceFromStore: '~100 km',
      enabled: true,
    },
  },
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of point 1
 * @param lon1 - Longitude of point 1
 * @param lat2 - Latitude of point 2
 * @param lon2 - Longitude of point 2
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

/**
 * Check if a location is within delivery range
 * @param userLat - User's latitude
 * @param userLng - User's longitude
 * @returns Object with isWithinRange and distance
 */
export const checkDeliveryRange = (
  userLat: number,
  userLng: number
): { isWithinRange: boolean; distance: number } => {
  const distance = calculateDistance(
    STORE_CONFIG.location.lat,
    STORE_CONFIG.location.lng,
    userLat,
    userLng
  );

  return {
    isWithinRange: distance <= STORE_CONFIG.delivery.radius,
    distance,
  };
};

/**
 * Get delivery fee based on distance and order amount
 * @param distance - Distance in kilometers
 * @param orderAmount - Order amount in ₹
 * @returns Delivery fee in ₹
 */
export const getDeliveryFee = (distance: number, orderAmount: number): number => {
  // Free delivery if order amount exceeds threshold
  if (orderAmount >= STORE_CONFIG.delivery.freeDeliveryThreshold) {
    return 0;
  }

  // Outside Telangana state coverage
  if (distance > STORE_CONFIG.delivery.radius) {
    return -1; // Return -1 to indicate out of range
  }

  // Progressive delivery fee based on distance within Telangana
  if (distance <= 50) {
    return STORE_CONFIG.delivery.fee; // Base fee for nearby areas
  } else if (distance <= 150) {
    return STORE_CONFIG.delivery.fee + 25; // Medium distance
  } else {
    return STORE_CONFIG.delivery.fee + 50; // Far distance within Telangana
  }
};

/**
 * Get estimated delivery time based on distance
 * @param distance - Distance in kilometers
 * @returns Estimated delivery time string
 */
export const getEstimatedDeliveryTime = (distance: number): string => {
  if (distance <= 25) {
    return '1-2 hours'; // Local delivery within 25km
  } else if (distance <= 75) {
    return '2-3 hours'; // Medium distance within Telangana
  } else if (distance <= 150) {
    return '3-4 hours'; // Far distance within Telangana
  } else if (distance <= 500) {
    return '4-6 hours'; // Remote areas within Telangana
  } else {
    return 'Not available'; // Outside Telangana state
  }
};
