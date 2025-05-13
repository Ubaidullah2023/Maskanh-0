import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../lib/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';
const STATUS_COLOR = '#F5A623';

type ListingScreenRouteProp = RouteProp<RootStackParamList, 'Listing'>;

interface ServiceListing {
  id: string;
  title: string;
  description: string;
  location: string;
  photos: string[];
  serviceType: string;
  highlights: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  status: 'active' | 'pending' | 'completed';
}

function getHeaderDynamicPadding(insets: any) {
  return {
    paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.01,
  };
}

function getHeaderStyle(insets: any) {
  return {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.01,
    minHeight: 56,
    maxHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
  };
}

export default function ListingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ListingScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const [listings, setListings] = useState<ServiceListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for demonstration
  const dummyListings: ServiceListing[] = [
    {
      id: '1',
      title: 'Modern Apartment in City Center',
      description: 'A beautiful and modern apartment located in the heart of the city. Close to all amenities and public transport.',
      location: 'Downtown, Metropolis',
      photos: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
      serviceType: 'Electrician',
      highlights: ['WiFi', 'Parking', '24/7 Service'],
      coordinates: { latitude: 0, longitude: 0 },
      createdAt: new Date().toISOString(),
      status: 'active',
    },
    {
      id: '2',
      title: 'Cozy Suburban Home',
      description: 'A cozy home perfect for families. Quiet neighborhood and spacious backyard.',
      location: 'Suburbia, Metropolis',
      photos: ['https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80'],
      serviceType: 'Plumber',
      highlights: ['Garden', 'Pet Friendly'],
      coordinates: { latitude: 0, longitude: 0 },
      createdAt: new Date().toISOString(),
      status: 'pending',
    },
    {
      id: '3',
      title: 'Luxury Villa with Pool',
      description: 'Experience luxury living in this villa with a private pool and stunning views.',
      location: 'Hillside, Metropolis',
      photos: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'],
      serviceType: 'Cleaner',
      highlights: ['Pool', 'Mountain View', 'Breakfast Included'],
      coordinates: { latitude: 0, longitude: 0 },
      createdAt: new Date().toISOString(),
      status: 'completed',
    },
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setListings([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('user_id', session.user.id);
      if (error) throw error;
      if (data && data.length > 0) {
        setListings(data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: `${item.city}, ${item.province}`,
          photos: item.photos,
          serviceType: item.profession,
          highlights: item.highlights,
          coordinates: item.coordinates,
          createdAt: item.created_at,
          status: 'active'
        })));
      } else {
        setListings([]);
      }
    } catch (error) {
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleAdd = () => {
    navigation.navigate('ServiceProviderStep1');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return PRIMARY_COLOR;
      case 'pending':
        return STATUS_COLOR;
      case 'completed':
        return '#666666';
      default:
        return STATUS_COLOR;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, getHeaderDynamicPadding(insets)]}>
        <Text style={styles.headerTitle}>Your Services</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleAdd}>
            <Ionicons name="add" size={24} color="#222222" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={[styles.content, { paddingBottom: insets.bottom }]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {(listings.length === 0 && !loading ? dummyListings : listings).map((listing) => (
          <View key={listing.id} style={styles.listingCard}>
            <View style={styles.listingHeader}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(listing.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(listing.status) }]}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </Text>
              </View>
              <Text style={styles.serviceType}>{listing.serviceType}</Text>
            </View>

            {listing.photos && listing.photos.length > 0 && (
              <Image
                source={{ uri: listing.photos[0] }}
                style={styles.listingImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.listingDetails}>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <Text style={styles.listingLocation}>{listing.location}</Text>
              <Text style={styles.listingDescription} numberOfLines={2}>
                {listing.description}
              </Text>
              <Text style={styles.listingDate}>
                Listed on {formatDate(listing.createdAt)}
              </Text>
            </View>

            <View style={styles.highlightsContainer}>
              {listing.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightTag}>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => navigation.navigate('Analytics')}
        >
          <Ionicons name="stats-chart" size={24} color="#666666" />
          <Text style={styles.tabText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Messages')}
        >
          <View style={styles.messageBadge}>
            <Text style={styles.messageBadgeText}>1</Text>
          </View>
          <Ionicons name="chatbubble-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Listing', {
            placeType: 'entire',
            guestCount: 1,
            bedroomCount: 1,
            bedCount: 1,
            hasLock: true,
            amenities: [],
            photos: [],
            title: '',
            highlights: [],
            description: '',
            guestType: 'any_guest',
            basePrice: 0
          })}
        >
          <Ionicons name="home" size={24} color={PRIMARY_COLOR} />
          <Text style={[styles.tabText, { color: PRIMARY_COLOR }]}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications" size={24} color="#666666" />
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('ServiceProfile')}
        >
          <Ionicons name="person" size={24} color="#666666" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    minHeight: 56,
    maxHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  headerTitle: {
    flex: 1,
    fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
    fontWeight: '600',
    color: '#222222',
    textAlign: 'left',
    flexShrink: 1,
    marginRight: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  headerButton: {
    width: Math.max(SCREEN_WIDTH * 0.1, 36),
    height: Math.max(SCREEN_WIDTH * 0.1, 36),
    maxWidth: 44,
    maxHeight: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    flexShrink: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  listingCard: {
    marginHorizontal: '4%',
    marginTop: SCREEN_HEIGHT * 0.02,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    width: '92%',
    alignSelf: 'center',
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
    fontWeight: '600',
  },
  serviceType: {
    fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
    color: '#666666',
    fontWeight: '500',
  },
  listingImage: {
    width: '100%',
    maxWidth: 500,
    height: SCREEN_HEIGHT * 0.22,
    minHeight: 120,
    maxHeight: 260,
    alignSelf: 'center',
    borderRadius: 0,
  },
  listingDetails: {
    paddingHorizontal: '4%',
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  listingTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 16 : 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  listingLocation: {
    fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
    color: '#666666',
    marginBottom: 8,
  },
  listingDescription: {
    fontSize: SCREEN_WIDTH < 360 ? 12 : 14,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 8,
  },
  listingDate: {
    fontSize: 12,
    color: '#888888',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '4%',
    paddingBottom: SCREEN_HEIGHT * 0.015,
    gap: 8,
  },
  highlightTag: {
    backgroundColor: '#F0FFF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginRight: 8,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: SCREEN_WIDTH < 360 ? 10 : 12,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: SCREEN_WIDTH < 360 ? 10 : 12,
    color: '#666666',
    marginTop: 4,
  },
  messageBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
}); 