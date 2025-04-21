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

export default function ServiceProviderStep3Screen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFinish = () => {
    navigation.navigate('ProviderVerification');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveAndExit}
        >
          <Text style={styles.saveButtonText}>Save & exit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 3D Illustration */}
        <View style={[styles.illustrationContainer, { backgroundColor: '#F5F5F5' }]}>
        <Image
            source={require('../assets/images/Contract.jpg')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContent}>
          <Text style={styles.stepLabel}>Step 3</Text>
          <Text style={styles.title}>Finish up and publish</Text>
          
          <Text style={styles.description}>
            Set your pricing, verify your identity, and get ready to start earning. We'll review your listing and let you know when it's live.
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
            onPress={handleFinish}
          >
            <Text style={styles.nextButtonText}>Finish</Text>
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
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  saveButton: {
    alignSelf: 'flex-end',
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
  },
  illustrationContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  textContent: {
    paddingHorizontal: 24,
  },
  stepLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 24,
    lineHeight: 44,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 28,
    marginBottom: 40,
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
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 