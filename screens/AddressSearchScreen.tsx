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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

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
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ title: string; subtitle: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  const handleSearch = (text: string) => {
    setIsLoading(true);
    const searchLower = text.toLowerCase();
    
    // Simulate API delay
    setTimeout(() => {
      if (searchLower in LOCATION_SUGGESTIONS) {
        setSuggestions(LOCATION_SUGGESTIONS[searchLower as keyof typeof LOCATION_SUGGESTIONS]);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleSelectAddress = (address: { title: string; subtitle: string }) => {
    // Parse the address components
    const [street, ...locationParts] = address.title.split(',').map(part => part.trim());
    const [city, province] = address.subtitle.split(',').map(part => part.trim());
    
    navigation.navigate('ConfirmAddress', {
      placeType: 'entire', // This should be passed from the previous screen
      street,
      city: city || locationParts[0] || '',
      province: province?.replace('Pakistan', '').trim() || '',
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClear = () => {
    setSearchText('');
    setSuggestions([]);
  };

  const handleUseCurrentLocation = () => {
    // TODO: Implement getting current location
    navigation.goBack();
  };

  const handleUseEnteredAddress = () => {
    if (searchText.trim()) {
      navigation.navigate('ConfirmAddress', {
        placeType: 'entire',
        street: searchText,
      });
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
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="location-outline" size={24} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
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
          <ActivityIndicator style={styles.loader} color="#00A86B" />
        ) : (
          <ScrollView style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSelectAddress(suggestion)}
              >
                <Ionicons name="business-outline" size={24} color="#666666" style={styles.suggestionIcon} />
                <View style={styles.suggestionText}>
                  <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                  <Text style={styles.suggestionSubtitle}>{suggestion.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={styles.currentLocationButton}
            onPress={handleUseCurrentLocation}
          >
            <Ionicons name="navigate" size={24} color="#666666" />
            <Text style={styles.currentLocationText}>Use my current location</Text>
          </TouchableOpacity>

          {searchText.length > 0 && (
            <TouchableOpacity 
              style={styles.useEnteredButton}
              onPress={handleUseEnteredAddress}
            >
              <Text style={styles.useEnteredText}>Use the address entered</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#222222',
  },
  clearButton: {
    padding: 4,
  },
  loader: {
    marginTop: 20,
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
    marginRight: 16,
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
  bottomButtons: {
    marginTop: 'auto',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
  useEnteredButton: {
    paddingVertical: 12,
    marginTop: 8,
  },
  useEnteredText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
}); 