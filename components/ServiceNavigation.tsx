import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#00A86B';

type TabName = 'Analytics' | 'Messages' | 'Listing' | 'Notifications' | 'ServiceProfile';

interface TabInfo {
  name: TabName;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabInfo[] = [
  { name: 'Analytics', label: 'Dashboard', icon: 'stats-chart' },
  { name: 'Messages', label: 'Messages', icon: 'chatbubble-outline' },
  { name: 'Listing', label: 'Listings', icon: 'home' },
  { name: 'Notifications', label: 'Notifications', icon: 'notifications' },
  { name: 'ServiceProfile', label: 'Profile', icon: 'person' },
];

export default function ServiceNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  // For Listing, you may need to pass required params. Adjust as needed.
  const handleNavigate = (tabName: TabName) => {
    if (tabName === 'Listing') {
      navigation.navigate('ServiceTabs', {
        screen: tabName
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