import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

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

  const handleContactSupport = () => {
    Alert.alert(
      "Coming Soon",
      "This feature will be available in the next update",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#00A86B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 50 }} />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={['#E8F5E9', '#F1F8E9']}
              style={styles.sectionIconContainer}
            >
              <Ionicons name="help-circle-outline" size={24} color="#00A86B" />
            </LinearGradient>
            <Text style={styles.sectionTitle}>How can we help you?</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Browse through our help topics to find what you need
          </Text>
        </View>

        <View style={styles.topicsContainer}>
          {helpTopics.map((topic) => (
            <TouchableOpacity 
              key={topic.id} 
              style={styles.topicCard}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#E8F5E9', '#F1F8E9']}
                style={styles.topicIcon}
              >
                <Ionicons name={topic.icon as any} size={24} color="#00A86B" />
              </LinearGradient>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
              <View style={styles.chevronContainer}>
                <Ionicons name="chevron-forward" size={20} color="#6C757D" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <LinearGradient
              colors={['#E8F5E9', '#F1F8E9']}
              style={styles.contactIconContainer}
            >
              <Ionicons name="call-outline" size={24} color="#00A86B" />
            </LinearGradient>
            <Text style={styles.contactTitle}>Need more help?</Text>
          </View>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactSupport}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    //iski gradle files kdr hai 
    // andorid wala folder delete kar diya tha wait i can discard those changes from github
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
  },
  backButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#6C757D',
    marginLeft: 36,
  },
  topicsContainer: {
    gap: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 80,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
    justifyContent: 'center',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  chevronContainer: {
    marginLeft: 8,
    width: 24,
    alignItems: 'center',
  },
  contactSection: {
    marginTop: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginLeft: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 