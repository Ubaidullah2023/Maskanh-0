import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type AccountNotificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AccountNotification'>;

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export default function AccountNotificationScreen() {
  const navigation = useNavigation<AccountNotificationScreenNavigationProp>();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'New Orders',
      description: 'Get notified when you receive new service requests',
      enabled: true,
    },
    {
      id: '2',
      title: 'Messages',
      description: 'Receive notifications for new messages',
      enabled: true,
    },
    {
      id: '3',
      title: 'Order Updates',
      description: 'Get updates about your ongoing orders',
      enabled: true,
    },
    {
      id: '4',
      title: 'Promotions',
      description: 'Receive promotional offers and updates',
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setSettings(current =>
      current.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
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
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        {settings.map((item) => (
          <View key={item.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleNotification(item.id)}
              trackColor={{ false: '#e0e0e0', true: '#b3d4ff' }}
              thumbColor={item.enabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        ))}
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
    padding: 8,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 