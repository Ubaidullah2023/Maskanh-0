import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function BottomNavigation() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const route = useRoute();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    switch (screen) {
      case 'FindService':
        navigation.navigate('FindService');
        break;
      case 'Blog':
        navigation.navigate('Blog');
        break;
      case 'Search':
        navigation.navigate('Search');
        break;
      case 'Messages':
        navigation.navigate('Messages');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'PersonalInfo':
        navigation.navigate('PersonalInfo');
        break;
    }
  };

  const getTabColor = (screenName: string) => {
    return route.name === screenName ? '#00A86B' : '#666666';
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('FindService')}
      >
        <Ionicons
          name="home"
          size={24}
          color={getTabColor('FindService')}
        />
        <Text style={[
          styles.tabText,
          { color: getTabColor('FindService') }
        ]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Blog')}
      >
        <Ionicons
          name="newspaper-outline"
          size={24}
          color={getTabColor('Blog')}
        />
        <Text style={[
          styles.tabText,
          { color: getTabColor('Blog') }
        ]}>Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Search')}
      >
        <Ionicons
          name="search"
          size={24}
          color={getTabColor('Search')}
        />
        <Text style={[
          styles.tabText,
          { color: getTabColor('Search') }
        ]}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Messages')}
      >
        <Ionicons
          name="chatbubble-ellipses"
          size={24}
          color={getTabColor('Messages')}
        />
        <Text style={[
          styles.tabText,
          { color: getTabColor('Messages') }
        ]}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Profile')}
      >
        <Ionicons
          name="person"
          size={24}
          color={getTabColor('Profile')}
        />
        <Text style={[
          styles.tabText,
          { color: getTabColor('Profile') }
        ]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
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
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 