import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert, StatusBar, Platform } from 'react-native';
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
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F9FA' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      {/* Header with Profile title */}
      <View style={[
        styles.headerBar,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
      ]}>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Profile
        </Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Card */}
        <View style={[
          styles.profileCard,
          { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
        ]}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={handleEditProfile}
          >
            <Text style={styles.avatarText}>{userInitials}</Text>
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={[
              styles.name,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>John Doe</Text>
            <Text style={styles.occupation}>Electrician</Text>
            
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="star" size={24} color="#00A86B" />
              </View>
              <Text style={[
                styles.statValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="calendar" size={24} color="#00A86B" />
              </View>
              <Text style={[
                styles.statValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>156</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="heart" size={24} color="#00A86B" />
              </View>
              <Text style={[
                styles.statValue,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>89%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>
        </View>
        
        {/* About Me Section */}
        <View style={[
          styles.aboutSection,
          { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
        ]}>
          <View style={styles.aboutHeader}>
            <Text style={[
              styles.aboutTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>About Me</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#00A86B" />
            </TouchableOpacity>
          </View>
          <Text style={[
            styles.aboutText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            Experienced service provider with a passion for delivering exceptional quality. Specialized in providing top-notch services with attention to detail and customer satisfaction.
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          {renderSectionHeader('Account Settings')}
          <View style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
          ]}>
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
          <View style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
          ]}>
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
          <View style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
          ]}>
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 10,
  },
  headerTitle: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    marginTop: 50,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A86B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
    position: 'relative',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  occupation: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editProfileButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#00A86B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  aboutSection: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  settingsContainer: {
    marginTop: 10,
    flex: 1,
    paddingTop: 16,
  },
  sectionHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  section: {
    margin: 16,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
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
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 