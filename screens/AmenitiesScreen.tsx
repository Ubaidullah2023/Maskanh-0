import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';

type Amenity = {
  id: string;
  name: string;
  icon: string;
};

const basicAmenities: Amenity[] = [
  { id: 'wifi', name: 'Wifi', icon: 'wifi' },
  { id: 'tv', name: 'TV', icon: 'tv' },
  { id: 'kitchen', name: 'Kitchen', icon: 'restaurant' },
  { id: 'washer', name: 'Washer', icon: 'water' },
  { id: 'free-parking', name: 'Free parking on premises', icon: 'car' },
  { id: 'paid-parking', name: 'Paid parking on premises', icon: 'cash' },
  { id: 'air-conditioning', name: 'Air conditioning', icon: 'snow' },
  { id: 'workspace', name: 'Dedicated workspace', icon: 'desktop' },
];

const standoutAmenities: Amenity[] = [
  { id: 'pool', name: 'Pool', icon: 'water' },
  { id: 'hot-tub', name: 'Hot tub', icon: 'thermometer' },
  { id: 'patio', name: 'Patio', icon: 'grid' },
  { id: 'bbq', name: 'BBQ grill', icon: 'flame' },
  { id: 'outdoor-dining', name: 'Outdoor dining area', icon: 'restaurant' },
  { id: 'fire-pit', name: 'Fire pit', icon: 'bonfire' },
  { id: 'pool-table', name: 'Pool table', icon: 'ellipse' },
  { id: 'indoor-fireplace', name: 'Indoor fireplace', icon: 'flame' },
];

const safetyItems: Amenity[] = [
  { id: 'smoke-alarm', name: 'Smoke alarm', icon: 'warning' },
  { id: 'first-aid', name: 'First aid kit', icon: 'medical' },
  { id: 'fire-extinguisher', name: 'Fire extinguisher', icon: 'flame' },
  { id: 'carbon-monoxide', name: 'Carbon monoxide alarm', icon: 'alert-circle' },
];

type AmenitiesScreenRouteProp = RouteProp<RootStackParamList, 'Amenities'>;

export default function AmenitiesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AmenitiesScreenRouteProp>();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityToggle = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    navigation.navigate('AddPhotos', {
      placeType: route.params.placeType,
      guestCount: 2,
      bedroomCount: 1,
      bedCount: 1,
      hasLock: true,
      amenities: selectedAmenities,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Navigate to help screen
  };

  const renderAmenityItem = (amenity: Amenity) => (
    <TouchableOpacity
      key={amenity.id}
      style={[
        styles.amenityItem,
        selectedAmenities.includes(amenity.id) && styles.selectedAmenityItem
      ]}
      onPress={() => handleAmenityToggle(amenity.id)}
    >
      <Ionicons 
        name={amenity.icon as any} 
        size={24} 
        color={selectedAmenities.includes(amenity.id) ? '#00A86B' : '#222222'} 
      />
      <Text style={[
        styles.amenityText,
        selectedAmenities.includes(amenity.id) && styles.selectedAmenityText
      ]}>
        {amenity.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleSaveAndExit}>
          <Text style={styles.headerButtonText}>Save & exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleQuestions}>
          <Text style={styles.headerButtonText}>Questions?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Tell guests what your place has to offer</Text>
        <Text style={styles.subtitle}>
          You can add more amenities after you publish your listing.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What about these guest favorites?</Text>
          <View style={styles.amenitiesGrid}>
            {basicAmenities.map(renderAmenityItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do you have any standout amenities?</Text>
          <View style={styles.amenitiesGrid}>
            {standoutAmenities.map(renderAmenityItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do you have any of these safety items?</Text>
          <View style={styles.amenitiesGrid}>
            {safetyItems.map(renderAmenityItem)}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#222222',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  selectedAmenityItem: {
    borderColor: '#00A86B',
    borderWidth: 2,
  },
  amenityText: {
    fontSize: 16,
    color: '#222222',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedAmenityText: {
    color: '#00A86B',
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 