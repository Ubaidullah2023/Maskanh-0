import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Define a separate param list for service provider screens
export type ServiceStackParamList = {
  ServiceEditProfile: undefined;
  ServiceSecurity: undefined;
  ServiceNotificationSettings: undefined;
  ServiceLanguage: undefined;
  ServiceHelpCenter: undefined;
  ServiceTermsPrivacy: undefined;
  ServiceFeedback: undefined;
  ServiceLogin: undefined;
  ServiceSettings: undefined;
};

export default function ServiceSettingsScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.sectionHeader, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}>
        {title}
      </Text>
      <View style={styles.sectionHeaderLine} />
    </View>
  );

  const renderMenuItem = (
    icon: string,
    title: string,
    description: string,
    onPress: () => void,
    showBorder: boolean = true
  ) => (
    <TouchableOpacity 
      style={[
        styles.menuItem,
        !showBorder && { borderBottomWidth: 0 }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#E8F5E9', '#F1F8E9']}
        style={styles.iconContainer}
      >
        <Ionicons name={icon as any} size={SCREEN_WIDTH < 360 ? 20 : 24} color="#00A86B" />
      </LinearGradient>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemTextContainer}>
          <Text style={[styles.menuText, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}>
            {title}
          </Text>
          <Text style={styles.menuDescription}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={SCREEN_WIDTH < 360 ? 20 : 24} color="#666666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#00A86B" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
            Settings
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.settingsContainer}>
          {renderSectionHeader('Security & Privacy')}
          <View style={styles.section}>
            {renderMenuItem(
              'lock-closed-outline',
              'Security',
              'Manage your password and security settings',
              handleSecurity
            )}
            {renderMenuItem(
              'notifications-outline',
              'Notifications',
              'Customize your notification preferences',
              handleNotifications,
              false
            )}
          </View>

          {renderSectionHeader('Preferences')}
          <View style={styles.section}>
            {renderMenuItem(
              'language-outline',
              'Language',
              'Change your preferred language',
              handleLanguage,
              false
            )}
          </View>

          {renderSectionHeader('Support')}
          <View style={styles.section}>
            {renderMenuItem(
              'help-circle-outline',
              'Help Center',
              'Get help and support',
              handleHelpCenter
            )}
            {renderMenuItem(
              'document-text-outline',
              'Terms & Privacy',
              'Read our terms and privacy policy',
              handleTermsPrivacy
            )}
            {renderMenuItem(
              'information-circle-outline',
              'About',
              'Learn more about the app',
              handleAbout,
              false
            )}
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: 80,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0FFF4',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  settingsContainer: {
    padding: 20,
    paddingTop: 12,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    fontWeight: '700',
    color: '#00A86B',
    marginRight: 12,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  menuText: {
    color: '#212529',
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    color: '#6C757D',
    fontSize: 12,
    fontWeight: '400',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  versionText: {
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '500',
  },
}); 