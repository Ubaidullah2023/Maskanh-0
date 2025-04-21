import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const windowWidth = Dimensions.get('window').width;

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'orders', label: 'Orders' },
    { id: 'messages', label: 'Messages' },
  ];

  const notifications = [
    {
      id: '1',
      title: 'New Service Request',
      message: 'You have received a new service request from John Doe',
      time: '2 min ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $150 has been received for your recent service',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Service Completed',
      message: 'Your service has been marked as completed',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: '4',
      title: 'New Review',
      message: 'You have received a 5-star review from Sarah',
      time: '1 day ago',
      isRead: true,
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.isRead;
    return notification.title.includes(selectedFilter);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('NotificationSettings' as never)}
        >
          <Icon name="settings" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.activeFilterText,
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <ScrollView 
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.isRead && styles.unreadItem,
            ]}
          >
            <View style={styles.notificationIcon}>
              <Icon 
                name={
                  notification.title.includes('Service') ? 'build' :
                  notification.title.includes('Payment') ? 'payment' :
                  notification.title.includes('Review') ? 'star' : 'notifications'
                }
                size={24}
                color="#333"
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle} numberOfLines={1}>{notification.title}</Text>
              <Text style={styles.notificationMessage} numberOfLines={2}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButtonContainer: {
    padding: 8,
    marginLeft: -8,
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    padding: 8,
    marginRight: -8,
  },
  iconText: {
    fontSize: 20,
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  filtersContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#00A86B',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  unreadItem: {
    backgroundColor: '#f8f9fa',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
}); 