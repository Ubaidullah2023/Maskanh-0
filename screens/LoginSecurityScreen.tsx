import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type LoginSecurityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginSecurity'>;

type SecurityOption = {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'action';
  enabled?: boolean;
  action?: string;
};

export default function LoginSecurityScreen() {
  const navigation = useNavigation<LoginSecurityScreenNavigationProp>();
  const [securityOptions, setSecurityOptions] = useState<SecurityOption[]>([
    {
      id: '1',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      type: 'toggle',
      enabled: false,
    },
    {
      id: '2',
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition to log in',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '3',
      title: 'Change Password',
      description: 'Update your account password',
      type: 'action',
      action: 'Change',
    },
    {
      id: '4',
      title: 'Login History',
      description: 'View your recent login activities',
      type: 'action',
      action: 'View',
    },
    {
      id: '5',
      title: 'Trusted Devices',
      description: 'Manage devices that can access your account',
      type: 'action',
      action: 'Manage',
    },
  ]);

  const toggleOption = (id: string) => {
    setSecurityOptions(options =>
      options.map(option =>
        option.id === id && option.type === 'toggle'
          ? { ...option, enabled: !option.enabled }
          : option
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login & Security</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {securityOptions.map((option) => (
          <View key={option.id} style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            {option.type === 'toggle' ? (
              <Switch
                value={option.enabled}
                onValueChange={() => toggleOption(option.id)}
                trackColor={{ false: '#e0e0e0', true: '#b3d4ff' }}
                thumbColor={option.enabled ? '#00A86B' : '#f4f3f4'}
              />
            ) : (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  switch (option.id) {
                    case '3':
                      navigation.navigate('Profile');
                      break;
                    case '4':
                      navigation.navigate('Notification');
                      break;
                    case '5':
                      navigation.navigate('NotificationSettings');
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Text style={styles.actionButtonText}>{option.action}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Security Tips</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🔑</Text>
            <Text style={styles.infoText}>Use a strong, unique password</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🔔</Text>
            <Text style={styles.infoText}>Enable two-factor authentication for extra security</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📱</Text>
            <Text style={styles.infoText}>Keep your trusted devices list up to date</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 60,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00A86B',
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    margin: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
}); 