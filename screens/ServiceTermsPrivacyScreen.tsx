import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServiceTermsPrivacyScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();

  const sections = [
    {
      id: '1',
      title: 'Terms of Service',
      content: 'By using Maskanh as a service provider, you agree to our terms of service. This includes following our community guidelines, maintaining accurate service information, and providing quality service to customers.',
    },
    {
      id: '2',
      title: 'Privacy Policy',
      content: 'We take your privacy seriously. Your personal information and service data are protected under our privacy policy. We only share necessary information with customers and use data to improve our platform.',
    },
    {
      id: '3',
      title: 'Service Provider Guidelines',
      content: 'As a service provider, you must maintain professional conduct, respond to customer inquiries promptly, and provide accurate service descriptions. Failure to comply may result in account restrictions.',
    },
    {
      id: '4',
      title: 'Data Protection',
      content: 'We implement industry-standard security measures to protect your data. This includes encryption, secure servers, and regular security audits to ensure your information remains safe.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {
        paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: '4%',
        minHeight: 56,
        maxHeight: 80,
        width: '100%',
      }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={Math.max(24, SCREEN_WIDTH * 0.06)} color="#00A86B" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Terms & Privacy
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>{section.title}</Text>
            <Text style={[styles.sectionContent, { fontSize: SCREEN_WIDTH < 360 ? 12 : 14 }]}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#222',
    marginLeft: 16,
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#666',
    lineHeight: 20,
  },
}); 