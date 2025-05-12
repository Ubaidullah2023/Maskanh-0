import * as Location from 'expo-location';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LocationAddress = {
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  fullAddress?: string;
};

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

export async function getCurrentLocation(): Promise<Coordinates | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

export async function getAddressFromCoordinates(coordinates: Coordinates): Promise<LocationAddress | null> {
  try {
    const addressResponse = await Location.reverseGeocodeAsync({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    
    if (addressResponse.length > 0) {
      const address = addressResponse[0];
      return {
        street: address.street || undefined,
        city: address.city || undefined,
        province: address.region || undefined,
        country: address.country || undefined,
        fullAddress: [
          address.street,
          address.city,
          address.region,
          address.country
        ].filter(Boolean).join(', '),
      };
    }
    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}

export async function searchAddresses(query: string): Promise<LocationAddress[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }
  
  try {
    // Geocode the query to get coordinates
    const result = await Location.geocodeAsync(query);
    const addresses: LocationAddress[] = [];
    
    for (const item of result) {
      try {
        // Reverse geocode to get address details
        const reverseResult = await Location.reverseGeocodeAsync({
          latitude: item.latitude,
          longitude: item.longitude,
        });
        
        if (reverseResult.length > 0) {
          const address = reverseResult[0];
          addresses.push({
            street: address.street || undefined,
            city: address.city || undefined,
            province: address.region || undefined,
            country: address.country || undefined,
            fullAddress: [
              address.street,
              address.city,
              address.region,
              address.country
            ].filter(Boolean).join(', '),
          });
        }
      } catch (error) {
        console.error('Error processing location result:', error);
        // Continue to next result
      }
    }
    
    return addresses;
  } catch (error) {
    console.error('Error searching addresses:', error);
    return [];
  }
} 