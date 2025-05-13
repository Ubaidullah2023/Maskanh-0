import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ListingScreen from '../screens/ListingScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ServiceProfileScreen from '../screens/ServiceProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import MaskanhProUpgradeScreen from '../screens/MaskanhProUpgradeScreen';

const Tab = createBottomTabNavigator();

export default function ServiceTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Listing"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Analytics':
              iconName = 'stats-chart';
              break;
            case 'Messages':
              iconName = 'chatbubble-outline';
              break;
            case 'Listing':
              iconName = 'home';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'ServiceProfile':
              iconName = 'person';
              break;
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      backBehavior="initialRoute"
      detachInactiveScreens={false}
    >
      <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{ tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ tabBarLabel: 'Messages' }} />
      <Tab.Screen name="Listing" component={ListingScreen} options={{ tabBarLabel: 'Listings' }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarLabel: 'Notifications' }} />
      <Tab.Screen name="ServiceProfile" component={ServiceProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
} 