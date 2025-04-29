import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type BookingSettingsScreenRouteProp = RouteProp<RootStackParamList, 'BookingSettings'>;

type GuestType = 'any_guest' | 'experienced_guest';

export default function BookingSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BookingSettingsScreenRouteProp>();
  const [guestType, setGuestType] = useState<GuestType>('experienced_guest');

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Navigate to help/questions screen
  };

  const handleLearnMore = () => {
    // TODO: Navigate to learn more screen
  };

  const handleNext = () => {
    navigation.navigate('PriceSetting', {
      ...route.params,
      guestType,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

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

      <View style={styles.content}>
        <Text style={styles.title}>Choose who to welcome{'\n'}for your first reservation</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>After your first guest, anyone can book your place. </Text>
          <TouchableOpacity onPress={handleLearnMore}>
            <Text style={styles.learnMore}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              guestType === 'any_guest' && styles.selectedCard
            ]}
            onPress={() => setGuestType('any_guest')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Any Airbnb guest</Text>
              <Text style={styles.optionDescription}>
                Get reservations faster when you welcome anyone from the Airbnb community.
              </Text>
            </View>
            <View style={[
              styles.radioButton,
              guestType === 'any_guest' && styles.radioButtonSelected
            ]}>
              {guestType === 'any_guest' && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              guestType === 'experienced_guest' && styles.selectedCard
            ]}
            onPress={() => setGuestType('experienced_guest')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>An experienced guest</Text>
              <Text style={styles.optionDescription}>
                For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great Host.
              </Text>
            </View>
            <View style={[
              styles.radioButton,
              guestType === 'experienced_guest' && styles.radioButtonSelected
            ]}>
              {guestType === 'experienced_guest' && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
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
  subtitleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#717171',
  },
  learnMore: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  selectedCard: {
    borderColor: '#222222',
    borderWidth: 2,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222222',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#717171',
    lineHeight: 24,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#222222',
    borderWidth: 2,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#222222',
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
    backgroundColor: '#222222',
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