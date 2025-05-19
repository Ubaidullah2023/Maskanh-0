import { supabase } from '../lib/supabase';
import { Coordinates, LocationAddress } from '../utils/LocationService';

export type ServiceProviderProfile = {
  id?: string;
  user_id?: string;
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  province: string;
  city: string;
  profession: string;
  photos: { uri: string; type: 'image' }[];
  title: string;
  highlights: string[];
  description: string;
  location?: LocationAddress;
  coordinates?: Coordinates;
  created_at?: string;
  updated_at?: string;
};

export const saveServiceProvider = async (
  userId: string,
  profileData: Omit<ServiceProviderProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<{ data: any; error: any }> => {
  const { error, data } = await supabase
    .from('service_providers')
    .upsert({
      user_id: userId,
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .select();

  return { data, error };
};

export const getServiceProviderProfile = async (userId: string): Promise<{ data: ServiceProviderProfile | null; error: any }> => {
  const { data, error } = await supabase
    .from('service_providers')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
};

export const getAllServiceProviders = async (): Promise<{ data: ServiceProviderProfile[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('service_providers')
    .select('*');

  return { data, error };
};

export const searchServiceProviders = async (
  query: string,
  profession?: string,
  city?: string
): Promise<{ data: ServiceProviderProfile[] | null; error: any }> => {
  let queryBuilder = supabase
    .from('service_providers')
    .select('*');

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }

  if (profession) {
    queryBuilder = queryBuilder.eq('profession', profession);
  }

  if (city) {
    queryBuilder = queryBuilder.eq('city', city);
  }

  const { data, error } = await queryBuilder;

  return { data, error };
};

export const getServiceProvidersByLocation = async (
  latitude: number,
  longitude: number,
  radiusInKm: number = 10
): Promise<{ data: ServiceProviderProfile[] | null; error: any }> => {
  // This is a simplified approach; in a real app, you'd use PostGIS or another spatial database
  // For now, we'll just fetch all providers and filter them client-side
  const { data, error } = await supabase
    .from('service_providers')
    .select('*');

  if (error || !data) {
    return { data: null, error };
  }

  // Filter providers by distance (approximate calculation)
  const providersInRadius = data.filter(provider => {
    if (!provider.coordinates) return false;
    
    const distance = calculateDistance(
      latitude, 
      longitude, 
      provider.coordinates.latitude, 
      provider.coordinates.longitude
    );
    
    return distance <= radiusInKm;
  });

  return { data: providersInRadius, error: null };
};

// Haversine formula to calculate distance between two coordinates in kilometers
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c;
  return distance;
} 