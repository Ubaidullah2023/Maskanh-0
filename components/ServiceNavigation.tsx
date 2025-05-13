import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#00A86B';

const TABS = [
  { name: 'Analytics', label: 'Dashboard', icon: 'stats-chart' },
  { name: 'Messages', label: 'Messages', icon: 'chatbubble-outline' },
  { name: 'Listing', label: 'Listings', icon: 'home' },
  { name: 'Notifications', label: 'Notifications', icon: 'notifications' },
  { name: 'ServiceProfile', label: 'Profile', icon: 'person' },
];

export default function ServiceNavigation() {
  const navigation = useNavigation();
  const route = useRoute();

  // For Listing, you may need to pass required params. Adjust as needed.
  const handleNavigate = (tabName: string) => {
    if (tabName === 'Listing') {
      navigation.navigate('Listing', {
        placeType: 'entire',
        guestCount: 1,
        bedroomCount: 1,
        bedCount: 1,
        hasLock: true,
        amenities: [],
        photos: [],
        title: '',
        highlights: [],
        description: '',
        guestType: 'any_guest',
        basePrice: 0
      });
    } else {
      navigation.navigate(tabName);
    }
  };

  return (
    <View style={styles.tabBar}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => handleNavigate(tab.name)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={route.name === tab.name ? PRIMARY_COLOR : "#666666"}
          />
          <Text style={[
            styles.tabText,
            route.name === tab.name && { color: PRIMARY_COLOR }
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
}); 