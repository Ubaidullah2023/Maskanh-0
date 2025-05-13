import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServiceNotificationSettingsScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [notificationSettings, setNotificationSettings] = useState([
    {
      id: '1',
      title: 'Push Notifications',
      description: 'Receive notifications on your device',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '2',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '3',
      title: 'SMS Notifications',
      description: 'Receive notifications via SMS',
      type: 'toggle',
      enabled: false,
    },
    {
      id: '4',
      title: 'Booking Requests',
      description: 'Get notified when you receive new booking requests',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '5',
      title: 'Messages',
      description: 'Get notified when you receive new messages',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '6',
      title: 'Reviews',
      description: 'Get notified when you receive new reviews',
      type: 'toggle',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setNotificationSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={Math.max(24, SCREEN_WIDTH * 0.06)} color="#00A86B" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Notification Settings
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notificationSettings.map((setting) => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>{setting.title}</Text>
              <Text style={[styles.settingDescription, { fontSize: SCREEN_WIDTH < 360 ? 12 : 14 }]}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: '#e0e0e0', true: '#b3d4ff' }}
              thumbColor={setting.enabled ? '#00A86B' : '#f4f3f4'}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#222',
    marginLeft: 16,
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 