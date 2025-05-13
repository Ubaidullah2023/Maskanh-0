import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define a separate param list for service provider screens
export type ServiceStackParamList = {
  ServiceEditProfile: undefined;
  ServicePersonalInfo: undefined;
  ServiceSecurity: undefined;
  ServiceNotificationSettings: undefined;
  ServiceLanguage: undefined;
  ServiceHelpCenter: undefined;
  ServiceTermsPrivacy: undefined;
  ServiceFeedback: undefined;
  ServiceLogin: undefined;
};

export default function ServiceProfileScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const userName = "Service User";
  const userInitials = userName.split(' ').map(n => n[0]).join('');
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

  const handleEditProfile = () => {
    navigation.navigate('ServiceEditProfile');
  };

  const handlePersonalInfo = () => {
    navigation.navigate('ServicePersonalInfo');
  };

  const handleSecurity = () => {
    navigation.navigate('ServiceSecurity');
  };

  const handleNotifications = () => {
    navigation.navigate('ServiceNotificationSettings');
  };

  const handleLanguage = () => {
    navigation.navigate('ServiceLanguage');
  };

  const handleHelpCenter = () => {
    navigation.navigate('ServiceHelpCenter');
  };

  const handleTermsPrivacy = () => {
    navigation.navigate('ServiceTermsPrivacy');
  };

  const handleAbout = () => {
    navigation.navigate('ServiceFeedback');
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
              routes: [{ name: 'ServiceLogin' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {
        paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: '4%',
        minHeight: 56,
        maxHeight: 80,
        width: '100%',
      }]}> 
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Service Profile
        </Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={[styles.profileCard, { marginTop: SCREEN_HEIGHT * 0.04 }]}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={handleEditProfile}
          >
            <Text style={styles.avatarText}>{userInitials}</Text>
          </TouchableOpacity>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>serviceuser@gmail.com</Text>
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
              <Text style={styles.menuText}>Personal Information</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleSecurity}
            >
              <Ionicons name="lock-closed-outline" size={24} color="#00A86B" />
              <Text style={styles.menuText}>Security</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleNotifications}
            >
              <Ionicons name="notifications-outline" size={24} color="#00A86B" />
              <Text style={styles.menuText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          {renderSectionHeader('Preferences')}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLanguage}
            >
              <Ionicons name="language-outline" size={24} color="#00A86B" />
              <Text style={styles.menuText}>Language</Text>
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
              <Text style={styles.menuText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleTermsPrivacy}
            >
              <Ionicons name="document-text-outline" size={24} color="#00A86B" />
              <Text style={styles.menuText}>Terms & Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleAbout}
            >
              <Ionicons name="information-circle-outline" size={24} color="#00A86B" />
              <Text style={styles.menuText}>About</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#222',
    flex: 1,
    textAlign: 'left',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 8,
  },
  editProfileButton: {
    backgroundColor: '#00A86B',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 8,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  settingsContainer: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A86B',
    marginTop: 24,
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#222222',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 16,
  },
}); 