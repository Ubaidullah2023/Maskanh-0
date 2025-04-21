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
    description: 'Kamra, Punjab',
    icon: require('../assets/icons/Builder.png')
  },
  {
    id: '2',
    name: 'Attock',
    coordinates: {
      latitude: 33.7667,
      longitude: 72.3667,
    },
    description: 'Attock City, Punjab',
    icon: require('../assets/icons/Builder.png')
  },
  {
    id: '3',
    name: 'Islamabad',
    coordinates: {
      latitude: 33.6844,
      longitude: 73.0479,
    },
    description: 'Federal Capital',
    icon: require('../assets/icons/Builder.png')
  }
];

export default function ServiceMapScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
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

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const newRegion: UserLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
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
        initialRegion={{
          latitude: 33.7667,
          longitude: 72.7007,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {/* Service Coverage Area Polygon */}
        <Polygon
          coordinates={SERVICE_AREA}
          fillColor="rgba(0, 168, 107, 0.2)"
          strokeColor="#00A86B"
          strokeWidth={2}
        />

        {/* City Markers */}
        {CITIES.map((city) => (
          <Marker
            key={city.id}
            coordinate={city.coordinates}
            title={city.name}
            description={city.description}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerBubble}>
                <Text style={styles.markerTitle}>{city.name}</Text>
                <View style={styles.marker}>
                  <Image 
                    source={city.icon} 
                    style={styles.markerImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.markerArrow} />
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
          >
            <View style={styles.userMarkerContainer}>
              <View style={styles.userMarker}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
            </View>
          </Marker>
        )}
      </MapView>

      {/* Coverage Area Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Service available in Kamra, Attock, and Islamabad
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
  markerContainer: {
    width: 140,
    alignItems: 'center',
  },
  markerBubble: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
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
  markerTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  marker: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 16,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    transform: [{ translateY: -1 }],
  },
  userMarkerContainer: {
    alignItems: 'center',
  },
  userMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  markerImage: {
    width: 24,
    height: 24,
  },
}); 