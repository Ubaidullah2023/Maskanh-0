import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export default function ServiceNotificationSettingsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Booking Requests',
      description: 'Get notified when you receive new booking requests',
      icon: 'calendar-outline',
      enabled: true,
    },
    {
      id: '2',
      title: 'Messages',
      description: 'Receive notifications for new messages',
      icon: 'chatbubble-outline',
      enabled: true,
    },
    {
      id: '3',
      title: 'Reviews & Ratings',
      description: 'Get notified when you receive new reviews',
      icon: 'star-outline',
      enabled: true,
    },
    {
      id: '4',
      title: 'Payment Updates',
      description: 'Stay informed about payment status and transactions',
      icon: 'wallet-outline',
      enabled: true,
    },
    {
      id: '5',
      title: 'Service Updates',
      description: 'Receive updates about service changes and maintenance',
      icon: 'construct-outline',
      enabled: false,
    },
    {
      id: '6',
      title: 'Promotional Offers',
      description: 'Get notified about special offers and discounts',
      icon: 'gift-outline',
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const renderNotificationOption = (setting: NotificationSetting) => (
    <View key={setting.id} style={styles.notificationOption}>
      <LinearGradient
        colors={['#E8F5E9', '#F1F8E9']}
        style={styles.iconContainer}
      >
        <Ionicons name={setting.icon as any} size={24} color="#00A86B" />
      </LinearGradient>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{setting.title}</Text>
        <Text style={styles.optionDescription}>{setting.description}</Text>
      </View>
      <Switch
        value={setting.enabled}
        onValueChange={() => toggleNotification(setting.id)}
        trackColor={{ false: '#E9ECEF', true: '#00A86B' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E9ECEF"
      />
    </View>
  );

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
          <Text style={styles.headerTitle}>Notifications</Text>
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
            <Ionicons name="notifications-outline" size={24} color="#00A86B" />
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Customize how you want to receive notifications for different activities
          </Text>
        </View>

        <View style={styles.notificationsContainer}>
          {notificationSettings.map(renderNotificationOption)}
        </View>

        <View style={styles.infoSection}>
          <Ionicons name="information-circle-outline" size={24} color="#6C757D" />
          <Text style={styles.infoText}>
            You can change these settings at any time. Some notifications are essential for the service and cannot be disabled.
          </Text>
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
    fontSize: Platform.OS === 'ios' ? 22 : 20,
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6C757D',
    marginLeft: 36,
  },
  notificationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 12,
    lineHeight: 20,
  },
}); 