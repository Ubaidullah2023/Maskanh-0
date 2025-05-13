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

export default function ServiceHelpCenterScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();

  const helpTopics = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Learn how to set up your service provider account',
      icon: 'rocket-outline',
    },
    {
      id: '2',
      title: 'Managing Listings',
      description: 'How to create and manage your service listings',
      icon: 'list-outline',
    },
    {
      id: '3',
      title: 'Booking Management',
      description: 'Handle bookings and appointments effectively',
      icon: 'calendar-outline',
    },
    {
      id: '4',
      title: 'Payments & Pricing',
      description: 'Set up payments and manage your pricing',
      icon: 'cash-outline',
    },
    {
      id: '5',
      title: 'Customer Support',
      description: 'Best practices for customer service',
      icon: 'people-outline',
    },
    {
      id: '6',
      title: 'Account Settings',
      description: 'Manage your account preferences and settings',
      icon: 'settings-outline',
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
          Help Center
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {helpTopics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.topicItem}>
            <View style={styles.topicIcon}>
              <Ionicons name={topic.icon as any} size={24} color="#00A86B" />
            </View>
            <View style={styles.topicContent}>
              <Text style={[styles.topicTitle, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>{topic.title}</Text>
              <Text style={[styles.topicDescription, { fontSize: SCREEN_WIDTH < 360 ? 12 : 14 }]}>{topic.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
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
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 