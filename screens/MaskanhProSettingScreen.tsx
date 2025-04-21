import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type MaskanhProSettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MaskanhProSetting'>;

type SettingItem = {
  id: string;
  title: string;
  description: string;
  value?: string;
  action?: string;
};

const settings: SettingItem[] = [
  {
    id: '1',
    title: 'Service Area',
    description: 'Set your service coverage area',
    value: '25 km radius',
  },
  {
    id: '2',
    title: 'Working Hours',
    description: 'Set your availability',
    value: 'Mon-Fri, 9AM-6PM',
  },
  {
    id: '3',
    title: 'Service Categories',
    description: 'Manage your service offerings',
    value: '3 active services',
  },
  {
    id: '4',
    title: 'Pricing',
    description: 'Set your service rates',
    action: 'Manage',
  },
];

export default function MaskanhProSettingScreen() {
  const navigation = useNavigation<MaskanhProSettingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pro Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {settings.map((item) => (
          <TouchableOpacity key={item.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
              {item.value && (
                <Text style={styles.settingValue}>{item.value}</Text>
              )}
            </View>
            <Text style={styles.actionText}>{item.action || 'Edit'}</Text>
          </TouchableOpacity>
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
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
    color: '#00A86B',
  },
  actionText: {
    fontSize: 14,
    color: '#00A86B',
    fontWeight: '500',
  },
}); 