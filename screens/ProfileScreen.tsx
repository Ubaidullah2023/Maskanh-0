import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BottomNavigation from '../components/BottomNavigation';

type RootStackParamList = {
  EditProfile: undefined;
  PersonalInfo: undefined;
  Security: undefined;
  NotificationSettings: undefined;
  Language: undefined;
  HelpCenter: undefined;
  TermsPrivacy: undefined;
  Feedback: undefined;
  Login: undefined;
};

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userName = "User";
  const userInitials = userName.split(' ').map(n => n[0]).join('');

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handlePersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const handleSecurity = () => {
    navigation.navigate('Security');
  };

  const handleNotifications = () => {
    navigation.navigate('NotificationSettings');
  };

  const handleLanguage = () => {
    navigation.navigate('Language');
  };

  const handleHelpCenter = () => {
    navigation.navigate('HelpCenter');
  };

  const handleTermsPrivacy = () => {
    navigation.navigate('TermsPrivacy');
  };

  const handleAbout = () => {
    navigation.navigate('Feedback');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
      {title}
    </Text>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={handleEditProfile}
          >
            <Text style={styles.avatarText}>{userInitials}</Text>
          </TouchableOpacity>
          <Text style={[
            styles.name,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>John Doe</Text>
          <Text style={styles.email}>user@gmail.com</Text>
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsContainer}>
          {renderSectionHeader('Account Settings')}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handlePersonalInfo}
            >
              <Ionicons name="person-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Personal Information
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleSecurity}
            >
              <Ionicons name="lock-closed-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Security
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleNotifications}
            >
              <Ionicons name="notifications-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Notifications
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          {renderSectionHeader('Preferences')}
          <View style={styles.section}>
            <View style={styles.menuItem}>
              <Ionicons name="moon-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Dark Mode
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#00A86B' : '#f4f3f4'}
              />
            </View>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLanguage}
            >
              <Ionicons name="language-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Language
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          {renderSectionHeader('Support')}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleHelpCenter}
            >
              <Ionicons name="help-circle-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Help Center
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleTermsPrivacy}
            >
              <Ionicons name="document-text-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                Terms & Privacy Policy
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleAbout}
            >
              <Ionicons name="information-circle-outline" size={24} color="#00A86B" />
              <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                About
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  section: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 