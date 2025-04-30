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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

export default function ServiceProviderStep1Screen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNext = () => {
    navigation.navigate('ServiceProviderStep2');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Illustration */}
        <View style={[styles.illustrationContainer, { backgroundColor: '#ffffff' }]}>
          <Image
            source={require('../assets/images/construction.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContent}>
          <Text style={styles.stepLabel}>Step 1</Text>
          <Text style={styles.title}>Tell us what you do</Text>
          
          <Text style={styles.description}>
          In this step, we'll ask you to select the type of service you provide — whether you're an electrician, plumber, cleaner, or any other professional.
          Then, let us know the area you work in so we can connect you with the right clients nearby.</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderBottomWidth: 0,
    borderBottomColor: '#000000',
  },
  saveButton: {
    alignSelf: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#222222',
    fontWeight: '500',
  },
  content: {
    flex: 10,
  },
  illustrationContainer: {
    width: '100%',
    height: 250,
    marginTop: 70,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  illustration: {
    width: '80%',
    height: '80%',
  },
  textContent: {
    paddingHorizontal: 24,
  },
  stepLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
    lineHeight: 28,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 32,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 18,
    color: '#222222',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 