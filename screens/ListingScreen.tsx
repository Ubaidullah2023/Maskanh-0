import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';
const STATUS_COLOR = '#F5A623';

type ListingStatus = 'active' | 'pending' | 'completed';

interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  photos: any[];
  serviceType: string;
  highlights: string[];
  createdAt: string;
  status: ListingStatus;
}

const CONSTRUCTION_IMAGES = [
  require('../assets/services/Heavy-Machinery.png'),
  require('../assets/services/Drill.png'),
  require('../assets/services/carpenter.png'),
  require('../assets/services/electrician.png'),
  require('../assets/services/Plumber.png'),
];

export default function ListingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const [listings, setListings] = useState<Listing[]>([{
    id: '1',
    title: 'Downtown Construction Project',
    description: 'A modern high-rise under construction in the city center. Includes commercial and residential spaces.',
    location: 'Downtown, Metropolis',
    photos: CONSTRUCTION_IMAGES,
    serviceType: 'General Contractor',
    highlights: ['Cranes', 'Concrete', 'Steelwork'],
    createdAt: new Date().toISOString(),
    status: 'active',
  }]);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = (prev + 1) % CONSTRUCTION_IMAGES.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Centered header title
  useEffect(() => {
    navigation.setOptions &&
      navigation.setOptions({
        headerTitle: () => (
          <Text style={styles.headerTitle}>Your Services</Text>
        ),
        headerTitleAlign: 'center',
        headerLeft: () => null,
      });
  }, [navigation]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: ListingStatus): string => {
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

  // --- HEADER & BOTTOM BAR LOGIC (unchanged) ---
  const handleAdd = () => {
    navigation.navigate('MaskanhProUpgrade');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header, 
        { 
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 10,
          paddingBottom: SCREEN_HEIGHT * 0.01 
        }
      ]}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.headerTitle}>Your Services</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.headerButton} onPress={handleAdd}>
            <Ionicons name="add" size={28} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ 
          paddingBottom: 100 // Add padding for bottom nav
        }}
      >
        <View style={styles.listingCard}>
          <View style={styles.listingHeader}>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(listings[0].status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(listings[0].status) }]}>
                {listings[0].status.charAt(0).toUpperCase() + listings[0].status.slice(1)}
              </Text>
            </View>
            <Text style={styles.serviceType}>{listings[0].serviceType}</Text>
          </View>

          {/* Image Carousel */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={CONSTRUCTION_IMAGES}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                <View style={styles.imageWrapper}>
                  <Image 
                    source={item} 
                    style={styles.listingImage} 
                    resizeMode="cover"
                  />
                </View>
              )}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH * 0.92));
                setCarouselIndex(index);
              }}
              style={{ flexGrow: 0 }}
            />
            <View style={styles.carouselDots}>
              {CONSTRUCTION_IMAGES.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    carouselIndex === idx && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>{listings[0].title}</Text>
            <Text style={styles.listingLocation}>{listings[0].location}</Text>
            <Text style={styles.listingDescription} numberOfLines={2}>
              {listings[0].description}
            </Text>
            <Text style={styles.listingDate}>
              Listed on {formatDate(listings[0].createdAt)}
            </Text>
          </View>

          <View style={styles.highlightsContainer}>
            {listings[0].highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightTag}>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '4%',
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
    zIndex: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'center',
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
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 15, // Add space between header and content
  },
  listingCard: {
    marginHorizontal: '4%',
    marginBottom: SCREEN_HEIGHT * 0.02,
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
  carouselContainer: {
    width: '100%',
    aspectRatio: 1.6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  imageWrapper: {
    width: SCREEN_WIDTH * 0.92,
    height: undefined,
    aspectRatio: 1.6,
  },
  listingImage: {
    width: '100%',
    height: '100%',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: PRIMARY_COLOR,
    width: 12,
    height: 12,
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
}); 