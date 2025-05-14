import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Text,
  TextInput,
  Alert,
  Platform,
  Image
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, Polygon } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface UserLocation extends Region {}

// Service coverage area coordinates (polygon)
const SERVICE_AREA = [
  { latitude: 33.9747, longitude: 72.3007 }, // North of Kamra
  { latitude: 33.9247, longitude: 72.5007 }, // Northeast
  { latitude: 33.8344, longitude: 73.1479 }, // East of Islamabad
  { latitude: 33.5844, longitude: 73.0479 }, // South of Islamabad
  { latitude: 33.6667, longitude: 72.2667 }, // South of Attock
  { latitude: 33.8747, longitude: 72.3007 }, // Back to start
];

// Define the cities with their coordinates
const CITIES = [
  {
    id: '1',
    name: 'Kamra',
    coordinates: {
      latitude: 33.8747,
      longitude: 72.4007,
    },
    description: 'Kamra, Punjab'
  },
  {
    id: '2',
    name: 'Attock',
    coordinates: {
      latitude: 33.7667,
      longitude: 72.3667,
    },
    description: 'Attock City, Punjab'
  },
  {
    id: '3',
    name: 'Islamabad',
    coordinates: {
      latitude: 33.6844,
      longitude: 73.0479,
    },
    description: 'Federal Capital'
  }
];

// Define dummy service providers with their categories and locations
interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  icon: any;
}

const SERVICE_PROVIDERS: ServiceProvider[] = [
  // Kamra area service providers
  {
    id: 'sp1',
    name: 'Ali Electric Services',
    category: 'Electrician',
    rating: 4.8,
    coordinates: {
      latitude: 33.8647,
      longitude: 72.4107,
    },
    description: 'Electrician • Kamra',
    icon: require('../assets/icons/Electrician.png')
  },
  {
    id: 'sp2',
    name: 'Khan Carpentry',
    category: 'Carpenter',
    rating: 4.5,
    coordinates: {
      latitude: 33.8827,
      longitude: 72.3957,
    },
    description: 'Carpenter • Kamra',
    icon: require('../assets/icons/Cuttingwood.png')
  },
  {
    id: 'sp3',
    name: 'Modern Interiors',
    category: 'Interior Designer',
    rating: 4.9,
    coordinates: {
      latitude: 33.8697,
      longitude: 72.4227,
    },
    description: 'Interior Designer • Kamra',
    icon: require('../assets/icons/Blueprint.png')
  },
  
  // Attock area service providers
  {
    id: 'sp4',
    name: 'Attock Plumbing',
    category: 'Plumber',
    rating: 4.7,
    coordinates: {
      latitude: 33.7597,
      longitude: 72.3747,
    },
    description: 'Plumber • Attock',
    icon: require('../assets/icons/plumber.png')
  },
  {
    id: 'sp5',
    name: 'Zafar Solar Solutions',
    category: 'Solar Work',
    rating: 4.6,
    coordinates: {
      latitude: 33.7727,
      longitude: 72.3587,
    },
    description: 'Solar Work • Attock',
    icon: require('../assets/icons/Solarpower.png')
  },
  {
    id: 'sp6',
    name: 'Ahmed Masonry',
    category: 'Mason',
    rating: 4.4,
    coordinates: {
      latitude: 33.7677,
      longitude: 72.3847,
    },
    description: 'Mason • Attock',
    icon: require('../assets/icons/Wall.png')
  },
  
  // Islamabad area service providers
  {
    id: 'sp7',
    name: 'Capital Painters',
    category: 'Painter',
    rating: 4.8,
    coordinates: {
      latitude: 33.6914,
      longitude: 73.0409,
    },
    description: 'Painter • Islamabad',
    icon: require('../assets/icons/Paint.png')
  },
  {
    id: 'sp8',
    name: '3D Wall Designs',
    category: '3D Wall',
    rating: 4.9,
    coordinates: {
      latitude: 33.6794,
      longitude: 73.0559,
    },
    description: '3D Wall • Islamabad',
    icon: require('../assets/icons/3d.png')
  },
  {
    id: 'sp9',
    name: 'Islamabad Glass Works',
    category: 'Glass Work',
    rating: 4.7,
    coordinates: {
      latitude: 33.7014,
      longitude: 73.0499,
    },
    description: 'Glass Work • Islamabad',
    icon: require('../assets/icons/window.png')
  },
  {
    id: 'sp10',
    name: 'Pak Architects',
    category: 'Architect',
    rating: 4.9,
    coordinates: {
      latitude: 33.6884,
      longitude: 73.0339,
    },
    description: 'Architect • Islamabad',
    icon: require('../assets/icons/architect.png')
  },
  {
    id: 'sp11',
    name: 'Ceiling Masters',
    category: 'Ceiling Work',
    rating: 4.6,
    coordinates: {
      latitude: 33.6744,
      longitude: 73.0449,
    },
    description: 'Ceiling Work • Islamabad',
    icon: require('../assets/icons/ceiling.png')
  },
  {
    id: 'sp12',
    name: 'Premium Welding',
    category: 'Welder & Blacksmith',
    rating: 4.5,
    coordinates: {
      latitude: 33.6924,
      longitude: 73.0619,
    },
    description: 'Welder & Blacksmith • Islamabad',
    icon: require('../assets/icons/Welder.png')
  }
];

export default function ServiceMapScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: 33.7667,
    longitude: 72.7007,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  });
  const mapRef = useRef<MapView | null>(null);

  // Function to fit map to show all markers and service area
  const fitToServiceArea = () => {
    mapRef.current?.fitToCoordinates(SERVICE_AREA, {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      animated: true
    });
  };

  // Fit to service area when component mounts
  useEffect(() => {
    setTimeout(fitToServiceArea, 1000);
  }, []);

  // Check if the user is zoomed in enough to show service providers
  const handleRegionChange = (region: Region) => {
    setCurrentRegion(region);
    // Increased threshold to show service providers with less zooming required
    setIsZoomedIn(region.latitudeDelta < 0.3 && region.longitudeDelta < 0.3);
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const newRegion: UserLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };
        setUserLocation(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to find services near you.",
          [{ text: "OK" }]
        );
      }
    } catch (err) {
      console.warn(err);
      Alert.alert("Error", "Could not get location.");
    }
  };

  const handleSearch = () => {
    const city = CITIES.find(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (city) {
      const region: Region = {
        ...city.coordinates,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      mapRef.current?.animateToRegion(region, 1000);
    } else {
      Alert.alert("Not Found", "No matching location found.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Coverage Area</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search this area"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            {searchQuery ? (
              <Ionicons name="close-circle" size={20} color="#666" />
            ) : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={requestLocationPermission}
        >
          <Ionicons name="navigate" size={24} color="#00A86B" />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {/* Service Coverage Area Polygon */}
        <Polygon
          coordinates={SERVICE_AREA}
          fillColor="rgba(0, 168, 107, 0.2)"
          strokeColor="#00A86B"
          strokeWidth={2}
        />

        {/* City Markers (shown when zoomed out) */}
        {!isZoomedIn && CITIES.map((city) => (
          <Marker
            key={city.id}
            coordinate={city.coordinates}
            title={city.name}
            description={city.description}
            pinColor="red"
          />
        ))}

        {/* Service Provider Markers (shown when zoomed in) */}
        {isZoomedIn && SERVICE_PROVIDERS.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={provider.coordinates}
            title={provider.name}
            description={`${provider.category} • ${provider.rating}★`}
          >
            <View style={styles.providerMarker}>
              <Image 
                source={provider.icon} 
                style={styles.providerIcon} 
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
      </MapView>

      {/* Coverage Area Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {isZoomedIn 
            ? "Service providers available in this area" 
            : "Zoom in slightly to see service providers"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 16,
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 50,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    width: width,
    height: height,
  },
  providerMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00A86B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  providerIcon: {
    width: 26,
    height: 26,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
  },
}); 