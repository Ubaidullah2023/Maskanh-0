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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type PlaceType = 'entire' | 'room' | 'shared';

export default function PlaceTypeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedType, setSelectedType] = useState<PlaceType | null>(null);

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedType) {
      // Navigate to the location screen with the selected type
      navigation.navigate('Location', { placeType: selectedType });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndExit}>
          <Text style={styles.saveButtonText}>Save & exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.questionButton}>
          <Text style={styles.saveButtonText}>Questions?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What type of place will guests have?</Text>

        {/* Place Type Options */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedType === 'entire' && styles.selectedCard]}
          onPress={() => setSelectedType('entire')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>An entire place</Text>
              <Text style={styles.optionDescription}>Guests have the whole place to themselves.</Text>
            </View>
            <Ionicons name="home-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedType === 'room' && styles.selectedCard]}
          onPress={() => setSelectedType('room')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>A room</Text>
              <Text style={styles.optionDescription}>Guests have their own room in a home, plus access to shared spaces.</Text>
            </View>
            <Ionicons name="bed-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedType === 'shared' && styles.selectedCard]}
          onPress={() => setSelectedType('shared')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>A shared room in a hostel</Text>
              <Text style={styles.optionDescription}>Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.</Text>
            </View>
            <Ionicons name="people-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, !selectedType && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedType}
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
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  questionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 32,
    lineHeight: 40,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedCard: {
    borderColor: '#00A86B',
    backgroundColor: '#F7FFFA',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    maxWidth: '90%',
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