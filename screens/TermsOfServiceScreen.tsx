import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type TermsOfServiceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsOfService'>;

export default function TermsOfServiceScreen() {
  const navigation = useNavigation<TermsOfServiceScreenNavigationProp>();
  const { isDarkMode } = useTheme();

  const terms = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Maskanh, you accept and agree to be bound by the terms and provision of this agreement. This agreement constitutes a legally binding contract between you and Maskanh.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to temporarily use Maskanh for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.'
    },
    {
      title: '3. User Account',
      content: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.'
    },
    {
      title: '4. Service Providers',
      content: 'Maskanh connects users with service providers. We do not guarantee the quality of services provided by third parties. You acknowledge that any reliance on such information or services will be at your own risk.'
    },
    {
      title: '5. Limitation of Liability',
      content: 'Maskanh shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.'
    },
    {
      title: '6. Privacy Policy',
      content: 'Your use of Maskanh is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.'
    },
    {
      title: '7. Modifications',
      content: 'Maskanh reserves the right to modify or discontinue, temporarily or permanently, the Service with or without notice. You agree that Maskanh shall not be liable to you or any third party for any modification, suspension or discontinuance of the Service.'
    }
  ];

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Terms of Service
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.introSection}>
          <Text style={[
            styles.introTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Welcome to Maskanh
          </Text>
          <Text style={[
            styles.introText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            Please read these terms of service carefully before using our platform.
          </Text>
        </View>

        {terms.map((term, index) => (
          <View 
            key={term.title}
            style={[
              styles.termSection,
              { 
                borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5',
                marginBottom: index === terms.length - 1 ? 0 : 24
              }
            ]}
          >
            <Text style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              {term.title}
            </Text>
            <Text style={[
              styles.text,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              {term.content}
            </Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[
            styles.footerText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            Last updated: March 15, 2024
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  introSection: {
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  termSection: {
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 