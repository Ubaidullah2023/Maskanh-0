import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function BottomNavigation() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'Home':
        navigation.navigate('FindService');
        break;
      case 'Services':
        navigation.navigate('AllServices', { type: 'featured' });
        break;
      case 'Search':
        // Navigate to search screen when implemented
        navigation.navigate('Search');
        break;
      case 'Messages':
        navigation.navigate('Messages');
        break;
      case 'Profile':
        navigation.navigate('Profile');
        break;
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Home')}
      >
        <Ionicons
          name="home"
          size={24}
          color="#00A86B"
        />
        <Text style={[
          styles.tabText,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Services')}
      >
        <Ionicons
          name="compass"
          size={24}
          color="#666666"
        />
        <Text style={[
          styles.tabText,
          { color: isDarkMode ? '#FFFFFF' : '#666666' }
        ]}>Services</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Search')}
      >
        <Ionicons
          name="search"
          size={24}
          color="#666666"
        />
        <Text style={[
          styles.tabText,
          { color: isDarkMode ? '#FFFFFF' : '#666666' }
        ]}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Messages')}
      >
        <Ionicons
          name="chatbubble-ellipses"
          size={24}
          color="#666666"
        />
        <Text style={[
          styles.tabText,
          { color: isDarkMode ? '#FFFFFF' : '#666666' }
        ]}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleNavigation('Profile')}
      >
        <Ionicons
          name="person"
          size={24}
          color="#666666"
        />
        <Text style={[
          styles.tabText,
          { color: isDarkMode ? '#FFFFFF' : '#666666' }
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
    color: '#666666',
  },
}); 