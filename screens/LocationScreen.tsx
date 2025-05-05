import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;

export default function LocationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LocationScreenRouteProp>();
  const [address, setAddress] = useState('');

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (address.trim()) {
      navigation.navigate('ProviderVerification', {
        placeType: route.params?.placeType,
        address: address
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      

      <View style={styles.content}>
        <Text style={styles.title}>Where's your place located?</Text>
        <Text style={styles.subtitle}>
          Your address is only shared with clients after they've made a reservation.
        </Text>

        {/* Address Input */}
        <TouchableOpacity 
          style={styles.inputContainer}
          onPress={() => navigation.navigate('AddressSearch')}
        >
          <Ionicons name="location-outline" size={24} color="#666666" />
          <Text style={[styles.input, !address && { color: '#666666' }]}>
            {address || 'Enter your address'}
          </Text>
        </TouchableOpacity>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 33.6844,  // Centered between Islamabad and Kamra
              longitude: 72.7329, // Centered between Islamabad and Kamra
              latitudeDelta: 0.5, // Zoom level to show the area
              longitudeDelta: 0.5,
            }}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, !address.trim() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!address.trim()}
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
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
    lineHeight: 40,
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
    height: 24,
  },
  mapContainer: {
    height: 300,
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
  },
  map: {
    flex: 1,
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