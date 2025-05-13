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

export default function ServiceSecurityScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [securityOptions, setSecurityOptions] = useState([
    {
      id: '1',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      type: 'toggle',
      enabled: false,
    },
    {
      id: '2',
      title: 'Login Notifications',
      description: 'Get notified when someone logs into your account',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '3',
      title: 'Password',
      description: 'Change your password regularly to keep your account secure',
      type: 'action',
      action: 'Change',
    },
    {
      id: '4',
      title: 'Phone Number',
      description: 'Add or update your phone number for account recovery',
      type: 'action',
      action: 'Update',
    },
    {
      id: '5',
      title: 'Email Notifications',
      description: 'Manage your email notification preferences',
      type: 'action',
      action: 'Manage',
    },
  ]);

  const toggleOption = (id: string) => {
    setSecurityOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
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
          Security Settings
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {securityOptions.map((option) => (
          <View key={option.id} style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>{option.title}</Text>
              <Text style={[styles.optionDescription, { fontSize: SCREEN_WIDTH < 360 ? 12 : 14 }]}>{option.description}</Text>
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
                      navigation.navigate('ServiceProfile');
                      break;
                    case '4':
                      navigation.navigate('ServiceNotificationSettings');
                      break;
                    case '5':
                      navigation.navigate('ServiceNotificationSettings');
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
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 