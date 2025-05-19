import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleMenuItemPress = (screen: keyof RootStackParamList) => {
    setIsMenuVisible(false);
    navigation.navigate(screen);
  };

  const handleLanguagePress = () => {
    navigation.navigate('Language' as keyof RootStackParamList, undefined);
  };

  return (
    <>
      <View style={[
        styles.header,
        { 
          backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF',
          borderBottomColor: isDarkMode ? '#333333' : '#EEEEEE',
        }
      ]}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        )}
        
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {title}
        </Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleLanguagePress}>
            <Ionicons 
              name="language" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
            <Ionicons 
              name="menu" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={[
            styles.menuContainer,
            { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
          ]}>
            <MenuItem
              icon="person-outline"
              title="Personal Info"
              onPress={() => handleMenuItemPress('PersonalInfo')}
              isDarkMode={isDarkMode}
            />
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              onPress={() => handleMenuItemPress('NotificationSettings')}
              isDarkMode={isDarkMode}
            />
            <MenuItem
              icon="shield-outline"
              title="Security"
              onPress={() => handleMenuItemPress('Security')}
              isDarkMode={isDarkMode}
            />
            <MenuItem
              icon="help-circle-outline"
              title="Help Center"
              onPress={() => handleMenuItemPress('HelpCenter')}
              isDarkMode={isDarkMode}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  isDarkMode: boolean;
}

const MenuItem = ({ icon, title, onPress, isDarkMode }: MenuItemProps) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
  >
    <Ionicons 
      name={icon as any}
      size={24}
      color={isDarkMode ? '#FFFFFF' : '#000000'}
      style={styles.menuIcon}
    />
    <Text style={[
      styles.menuText,
      { color: isDarkMode ? '#FFFFFF' : '#000000' }
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    height: 56,
  },
  backButton: {
    padding: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 60,
    right: 16,
    width: 200,
    borderRadius: 12,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
  },
}); 