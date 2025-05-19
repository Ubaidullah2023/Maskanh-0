import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { height, width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export default function ServiceProviderStep2Screen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNext = () => {
    navigation.navigate('AddPhotos', {
      placeType: 'entire' as const,
      guestCount: 2,
      bedroomCount: 1,
      bedCount: 1,
      hasLock: true,
      amenities: []
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Step Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../assets/images/Contract.jpg')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContent}>
            <Text style={styles.stepLabel}>Step 2</Text>
            <Text style={styles.title}>Make it stand out</Text>
            
            <Text style={styles.description}>
              Add high-quality photos, a catchy title, and a short description that highlights your service.
            </Text>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Math.max(statusBarHeight, 10) + 15,
  },
  illustrationContainer: {
    width: '100%',
    height: Math.min(height * 0.25, 180), // Cap the height on larger screens
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  illustration: {
    width: width * 0.7, // Make width responsive
    height: '80%',
  },
  textContent: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepLabel: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
    lineHeight: isSmallScreen ? 30 : 34,
  },
  description: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#666666',
    lineHeight: isSmallScreen ? 22 : 24,
    marginBottom: 24,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 'auto', // Push to bottom of container
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
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 