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
import { Ionicons } from '@expo/vector-icons';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'message' | 'system';
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Booking Request',
    message: 'John Doe has requested your service for tomorrow at 2:00 PM',
    time: '2 hours ago',
    type: 'booking',
    read: false,
  },
  {
    id: '2',
    title: 'Message from Sarah',
    message: 'Hi, I would like to discuss the project details',
    time: '5 hours ago',
    type: 'message',
    read: true,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Your profile has been verified successfully',
    time: '1 day ago',
    type: 'system',
    read: true,
  },
  {
    id: '4',
    title: 'New Review',
    message: 'You received a 5-star review from Michael',
    time: '2 days ago',
    type: 'system',
    read: true,
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return 'calendar-outline';
      case 'message':
        return 'chatbubble-outline';
      case 'system':
        return 'notifications-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return '#00A86B';
      case 'message':
        return '#007AFF';
      case 'system':
        return '#FF9500';
      default:
        return '#666666';
    }
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
        <Ionicons 
          name={getNotificationIcon(notification.type)} 
          size={24} 
          color={getNotificationColor(notification.type)} 
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#222222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Ionicons name="checkmark-done-outline" size={24} color="#222222" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  notificationsContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    backgroundColor: '#F8F9FA',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
}); 