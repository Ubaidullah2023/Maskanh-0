import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function ServiceHelpScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const helpCategories = [
    {
      id: '1',
      title: 'Account & Profile',
      description: 'Manage your account settings and profile information',
      icon: 'person-outline',
    },
    {
      id: '2',
      title: 'Bookings & Services',
      description: 'Help with managing your bookings and services',
      icon: 'calendar-outline',
    },
    {
      id: '3',
      title: 'Payments & Refunds',
      description: 'Information about payments, refunds, and transactions',
      icon: 'wallet-outline',
    },
    {
      id: '4',
      title: 'Safety & Security',
      description: 'Learn about our safety measures and security features',
      icon: 'shield-checkmark-outline',
    },
    {
      id: '5',
      title: 'Technical Support',
      description: 'Get help with technical issues and app problems',
      icon: 'construct-outline',
    },
  ];

  const renderHelpCategory = (category: HelpCategory) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      activeOpacity={0.7}
      onPress={() => {/* Handle category press */}}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={category.icon as any} size={24} color="#00A86B" />
      </View>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#6C757D" />
    </TouchableOpacity>
  );

  const handleContactSupport = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      text2: 'This feature will be available in the next update',
      position: 'bottom',
      visibilityTime: 3000,
    });
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
          <Text style={styles.headerTitle}>Help & Support</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactSupport}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#00A86B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="help-circle-outline" size={24} color="#00A86B" />
            </View>
            <Text style={styles.sectionTitle}>How can we help you?</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Choose a category below to get the help you need
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {helpCategories.map(renderHelpCategory)}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingVertical: 16,
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
    backgroundColor: '#F0FFF4',
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
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  contactButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 