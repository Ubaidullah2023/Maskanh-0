import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import * as LocationService from '../utils/LocationService';
import { LocationAddress } from '../utils/LocationService';

// Define the correct type for the route
type AddressSearchScreenRouteProp = RouteProp<RootStackParamList, 'AddressSearch'>;
const { height } = Dimensions.get('window');

// Mock data for location suggestions
const LOCATION_SUGGESTIONS = {
  'kamra': [
    { title: 'Kamra Road', subtitle: 'Attock, Pakistan' },
    { title: 'Kamra Road', subtitle: 'Taxila, Pakistan' },
    { title: 'Kamra Darbar Road', subtitle: 'Pakistan' },
    { title: 'Kamra Road', subtitle: 'Kamra, Pakistan' },
    { title: 'Kamran Masjid Street', subtitle: 'Madina Colony, Lahore, Pakistan' },
  ],
  'attock': [
    { title: 'Attock Refinery Road', subtitle: 'Jamhra Nai Abadi Morgah, Rawalpindi, Pakistan' },
    { title: 'Attock Bridge', subtitle: 'Attock Khurd, Pakistan' },
    { title: 'Attock - River Link', subtitle: 'Attock Cantt., Attock, Pakistan' },
    { title: 'Attock Road', subtitle: 'Fateh Jang, Pakistan' },
    { title: 'Attock Road', subtitle: 'Haji Shah, Pakistan' },
  ],
  'islamabad': [
    { title: 'Islamabad Expressway', subtitle: 'Islamabad, Pakistan' },
    { title: 'Islamabad-Peshawar Motorway', subtitle: 'Yaseen Abad, Peshawar, Pakistan' },
    { title: 'Islamabad - Murree Expressway', subtitle: 'Lower Topa, Pakistan' },
    { title: 'D-Chowk', subtitle: 'G-5, Islamabad, Pakistan' },
    { title: 'Islamabad Link - Fatehjang Road', subtitle: 'Benazir Chowk, Islamabad, Pakistan' },
  ],
};

export default function AddressSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AddressSearchScreenRouteProp>();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<LocationAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  // Get the placeType from route.params with type safety
  const placeType = route.params?.placeType || 'entire';

  // Check location permission when component mounts
  useEffect(() => {
    const checkLocationPermission = async () => {
      const hasPermission = await LocationService.requestLocationPermission();
      setLocationPermissionGranted(hasPermission);
      if (hasPermission) {
        // Automatically try to get current location
        handleUseCurrentLocation();
      }
    };
    
    checkLocationPermission();
  }, []);

  // When search text changes, search for locations
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchText.length >= 3) {
        setIsLoading(true);
        try {
          const results = await LocationService.searchAddresses(searchText);
          setSuggestions(results);
        } catch (error) {
          console.error('Error searching for locations:', error);
          Alert.alert('Error', 'Could not retrieve location suggestions. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else if (searchText.length === 0) {
        setSuggestions([]);
      }
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(searchTimeout);
  }, [searchText]);

  const handleSelectAddress = (address: LocationAddress) => {
    // Navigate back to LocationScreen with the selected address
    navigation.navigate('Location', {
      placeType: placeType,
      selectedAddress: address,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClear = () => {
    setSearchText('');
    setSuggestions([]);
  };

  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    try {
      // First check if we have permission
      const hasPermission = await LocationService.requestLocationPermission();
      
      if (!hasPermission) {
        setLocationPermissionGranted(false);
        Alert.alert(
          'Location Permission Required',
          'To use your current location, please grant location permission in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                // This would open settings on a real device
                Alert.alert('Open Settings', 'This would open location settings on a real device');
              } 
            }
          ]
        );
        setIsLoading(false);
        return;
      }
      
      setLocationPermissionGranted(true);
      const currentLocation = await LocationService.getCurrentLocation();
      
      if (currentLocation) {
        const addressDetails = await LocationService.getAddressFromCoordinates(currentLocation);
        
        if (addressDetails) {
          // Navigate back to LocationScreen with current location data
          navigation.navigate('Location', {
            placeType: placeType,
            selectedCoordinates: currentLocation,
            selectedAddress: addressDetails,
          });
        } else {
          Alert.alert('Error', 'Could not retrieve address details for your location.');
        }
      } else {
        Alert.alert('Error', 'Could not retrieve your current location. Please try again.');
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Error', 'Unable to access your current location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseEnteredAddress = () => {
    if (searchText.trim() && suggestions.length > 0) {
      // Use the first suggestion if available
      handleSelectAddress(suggestions[0]);
    } else {
      Alert.alert('No Results', 'Please select a valid address from the suggestions.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter your address</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for location"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            placeholderTextColor="#666666"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00A86B" />
            <Text style={styles.loaderText}>Searching locations...</Text>
          </View>
        ) : (
          <ScrollView style={styles.suggestionsContainer} keyboardShouldPersistTaps="handled">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSelectAddress(suggestion)}
              >
                  <Ionicons name="location-outline" size={24} color="#666666" style={styles.suggestionIcon} />
                <View style={styles.suggestionText}>
                    <Text style={styles.suggestionTitle}>{suggestion.street || 'Unknown Location'}</Text>
                    <Text style={styles.suggestionSubtitle}>
                      {[suggestion.city, suggestion.province, suggestion.country].filter(Boolean).join(', ')}
                    </Text>
                </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
              </TouchableOpacity>
              ))
            ) : searchText.length >= 3 ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={48} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No locations found</Text>
                <Text style={styles.noResultsSubText}>Try a different search term</Text>
              </View>
            ) : null}
          </ScrollView>
        )}

        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={styles.currentLocationButton}
            onPress={handleUseCurrentLocation}
            disabled={isLoading}
          >
            <Ionicons name="navigate" size={24} color="#666666" />
            <Text style={styles.currentLocationText}>Use my current location</Text>
          </TouchableOpacity>

          {suggestions.length > 0 && (
            <TouchableOpacity 
              style={styles.useEnteredButton}
              onPress={handleUseEnteredAddress}
              disabled={isLoading}
            >
              <Text style={styles.useEnteredText}>Use selected location</Text>
            </TouchableOpacity>
          )}
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#222222',
  },
  clearButton: {
    padding: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  suggestionsContainer: {
    flex: 1,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginTop: 16,
  },
  noResultsSubText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomButtons: {
    marginTop: 'auto',
    paddingVertical: 16,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
  },
  currentLocationText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  useEnteredButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#00A86B',
    borderRadius: 12,
    height: 56,
  },
  useEnteredText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 