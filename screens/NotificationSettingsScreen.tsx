import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Platform,
  StatusBar
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NotificationSettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotificationSettings'>;

export default function NotificationSettingsScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NotificationSettingsScreenNavigationProp>();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [messageNotifications, setMessageNotifications] = React.useState(true);
  const [orderNotifications, setOrderNotifications] = React.useState(true);
  const [marketingNotifications, setMarketingNotifications] = React.useState(false);
  const [updateNotifications, setUpdateNotifications] = React.useState(true);

  const notificationSettings = [
    {
      title: 'Email Notifications',
      icon: 'mail-outline',
      settings: [
        {
          label: 'Receive email notifications',
          value: emailNotifications,
          onValueChange: setEmailNotifications,
          description: 'Get notified about important updates via email'
        }
      ]
    },
    {
      title: 'Push Notifications',
      icon: 'notifications-outline',
      settings: [
        {
          label: 'Enable push notifications',
          value: pushNotifications,
          onValueChange: setPushNotifications,
          description: 'Receive notifications on your device'
        }
      ]
    },
    {
      title: 'Messages',
      icon: 'chatbubble-outline',
      settings: [
        {
          label: 'Message notifications',
          value: messageNotifications,
          onValueChange: setMessageNotifications,
          description: 'Get notified about new messages'
        }
      ]
    },
    {
      title: 'Orders',
      icon: 'cart-outline',
      settings: [
        {
          label: 'Order status updates',
          value: orderNotifications,
          onValueChange: setOrderNotifications,
          description: 'Receive updates about your orders'
        }
      ]
    },
    {
      title: 'Marketing',
      icon: 'megaphone-outline',
      settings: [
        {
          label: 'Marketing communications',
          value: marketingNotifications,
          onValueChange: setMarketingNotifications,
          description: 'Receive promotional offers and updates'
        }
      ]
    },
    {
      title: 'App Updates',
      icon: 'refresh-outline',
      settings: [
        {
          label: 'App updates and news',
          value: updateNotifications,
          onValueChange: setUpdateNotifications,
          description: 'Stay informed about new features and improvements'
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Notification Settings
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {notificationSettings.map((section, index) => (
          <View 
            key={section.title}
            style={[
              styles.section,
              { 
                borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5',
                marginBottom: index === notificationSettings.length - 1 ? 0 : 16
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: isDarkMode ? '#333333' : '#f5f5f5' }
              ]}>
                <Ionicons 
                  name={section.icon as any} 
                  size={20} 
                  color="#00A86B" 
                />
              </View>
              <Text style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>
                {section.title}
              </Text>
            </View>

            {section.settings.map((setting) => (
              <View key={setting.label} style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={[
                    styles.settingLabel,
                    { color: isDarkMode ? '#FFFFFF' : '#000000' }
                  ]}>
                    {setting.label}
                  </Text>
                  <Text style={[
                    styles.settingDescription,
                    { color: isDarkMode ? '#CCCCCC' : '#666666' }
                  ]}>
                    {setting.description}
                  </Text>
                </View>
                <Switch
                  value={setting.value}
                  onValueChange={setting.onValueChange}
                  trackColor={{ false: '#767577', true: '#666666' }}
                  thumbColor={setting.value ? '#00A86B' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 