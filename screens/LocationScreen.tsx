import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as LocationService from '../utils/LocationService';
import { Coordinates, LocationAddress } from '../utils/LocationService';

type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;
const { height, width } = Dimensions.get('window');

export default function LocationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LocationScreenRouteProp>();
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationDetails, setLocationDetails] = useState<LocationAddress | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for selected location from AddressSearchScreen
  useEffect(() => {
    if (route.params?.selectedAddress) {
      setLocationDetails(route.params.selectedAddress);
      
      // Set the address text from the selected address
      const selectedAddress = route.params.selectedAddress;
      const fullAddress = selectedAddress.fullAddress || 
        [selectedAddress.street, selectedAddress.city, selectedAddress.province, selectedAddress.country]
          .filter(Boolean)
          .join(', ');
          
      setAddress(fullAddress);
    }
    
    // If we have coordinates from the search screen, use them
    if (route.params?.selectedCoordinates) {
      setCoordinates(route.params.selectedCoordinates);
    }
    // If we didn't get coordinates but got an address, we need to geocode the address
    else if (route.params?.selectedAddress && !coordinates) {
      geocodeSelectedAddress(route.params.selectedAddress);
    }
  }, [route.params?.selectedAddress, route.params?.selectedCoordinates]);

  // Geocode the selected address to get coordinates
  const geocodeSelectedAddress = async (selectedAddress: LocationAddress) => {
    setLoading(true);
    try {
      const addressString = selectedAddress.fullAddress || 
        [selectedAddress.street, selectedAddress.city, selectedAddress.province, selectedAddress.country]
          .filter(Boolean)
          .join(', ');
          
      if (addressString) {
        const results = await LocationService.searchAddresses(addressString);
        if (results && results.length > 0) {
          // This is a workaround since we don't have direct geocoding
          // In a real app, we would have coordinates from the selected address
          const coords = await LocationService.getCurrentLocation();
          if (coords) {
            setCoordinates(coords);
          }
        }
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check for location permission and get current location if no selected location
  useEffect(() => {
    if (!coordinates && !route.params?.selectedAddress && !route.params?.selectedCoordinates) {
      const getLocation = async () => {
        setLoading(true);
        const hasPermission = await LocationService.requestLocationPermission();
        
        if (hasPermission) {
          try {
            const currentLocation = await LocationService.getCurrentLocation();
            if (currentLocation) {
              setCoordinates(currentLocation);
              const addressDetails = await LocationService.getAddressFromCoordinates(currentLocation);
              if (addressDetails) {
                setLocationDetails(addressDetails);
                setAddress(addressDetails.fullAddress || '');
              }
            }
          } catch (error) {
            console.error('Error getting location:', error);
            Alert.alert('Error', 'Unable to get your current location.');
          }
        } else {
          Alert.alert(
            'Location Permission',
            'We need access to your location to show nearby services. Please enable location services in your device settings.',
            [{ text: 'OK' }]
          );
        }
        
        setLoading(false);
      };

      getLocation();
    }
  }, []);

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddressSearch = () => {
    const placeType = route.params?.placeType || 'entire';
    navigation.navigate('AddressSearch', {
      placeType: placeType,
    });
  };

  const handleNext = () => {
    if (coordinates) {
      // Navigate directly to AddPhotos screen (skipping Amenities)
      navigation.navigate('AddPhotos', {
        placeType: route.params?.placeType,
        guestCount: 2,
        bedroomCount: 1,
        bedCount: 1,
        hasLock: true,
        amenities: [], // Empty array for amenities
        coordinates: coordinates,
        address: address
      });
    } else {
      Alert.alert('Missing Location', 'Please select a location before continuing.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Where's your place located?</Text>
        <Text style={styles.subtitle}>
          Your address is only shared with clients after they've made a booking.
        </Text>

        {/* Address Input */}
        <TouchableOpacity 
          style={styles.inputContainer}
          onPress={handleAddressSearch}
        >
          <Ionicons name="location-outline" size={24} color="#666666" />
          <Text style={[styles.input, !address && styles.placeholderText]}>
            {address || 'Enter your address'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>

        {/* Map View */}
        <View style={styles.mapContainer}>
          {coordinates ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                }}
                pinColor="#00A86B"
              >
                <Ionicons name="location" size={40} color="#00A86B" />
              </Marker>
            </MapView>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 33.6844,  // Default to a location in Pakistan
                longitude: 72.7329,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
            />
          )}
          
          {loading && (
            <View style={styles.mapLoader}>
              <Text style={styles.mapLoaderText}>Loading map...</Text>
            </View>
          )}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, !coordinates && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!coordinates}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: height * 0.05, // Add responsive top padding
  },
  title: {
    fontSize: 28, // Reduced from 32
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
    marginTop: 20,
    lineHeight: 34, // Adjusted for better text rendering
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: 100, // Fixed height to prevent text cutting
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#222222',
    marginRight: 8, // Added to prevent text running into the chevron
  },
  placeholderText: {
    color: '#666666',
  },
  mapContainer: {
    marginTop: 24,
    height: height * 0.3, // Make map height responsive
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLoaderText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    height: 56, // Added fixed height
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 