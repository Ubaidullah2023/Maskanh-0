import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

type ListingScreenRouteProp = RouteProp<RootStackParamList, 'Listing'>;

const PRIMARY_COLOR = '#34A853';
const STATUS_COLOR = '#F5A623';

export default function ListingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ListingScreenRouteProp>();

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleNotifications = () => {
    // TODO: Implement notifications functionality
  };

  const handleAdd = () => {
    // TODO: Implement add new listing functionality
  };

  const handleAddAddress = () => {
    // TODO: Navigate to address input screen
  };

  const handleTabPress = (tabName: string) => {
    navigation.navigate('MainTabs', { screen: tabName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your listing</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#222222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleNotifications}>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>1</Text>
            </View>
            <Ionicons name="notifications" size={24} color="#222222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleAdd}>
            <Ionicons name="add" size={24} color="#222222" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.actionCard}>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>In progress</Text>
          </View>
          <TouchableOpacity 
            style={styles.mapContainer}
            onPress={handleAddAddress}
          >
            <View style={styles.mapPlaceholder} />
            <View style={styles.addressInput}>
              <Ionicons name="location" size={20} color="#666666" />
              <Text style={styles.addressPlaceholder}>Enter your address</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listingDetails}>
          <Text style={styles.listingTitle}>This is very beautiful</Text>
          <Text style={styles.listingLocation}>Rawalpindi, Punjab</Text>
          <Text style={styles.listingDate}>Your listing started April 15, 2025</Text>
        </View>

        <View style={[styles.actionCard, styles.secondaryCard]}>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>In progress</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => navigation.navigate('Today')}
        >
          <Ionicons name="checkmark" size={24} color="#666666" />
          <Text style={styles.tabText}>Today</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Calendar')}
        >
          <Ionicons name="calendar-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Listings')}
        >
          <Ionicons name="home" size={24} color={PRIMARY_COLOR} />
          <Text style={[styles.tabText, { color: PRIMARY_COLOR }]}>Listings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Messages')}
        >
          <View style={styles.messageBadge}>
            <Text style={styles.messageBadgeText}>1</Text>
          </View>
          <Ionicons name="chatbubble-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('Menu')}
        >
          <Ionicons name="menu" size={24} color="#666666" />
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  actionCard: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryCard: {
    height: 200,
    backgroundColor: '#F8F8F8',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: STATUS_COLOR,
    marginRight: 8,
  },
  statusText: {
    color: STATUS_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  addressInput: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -25 }],
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressPlaceholder: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
  },
  listingDetails: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  listingTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  listingLocation: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  listingDate: {
    fontSize: 14,
    color: '#666666',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  tabItem: {
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  messageBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
}); 