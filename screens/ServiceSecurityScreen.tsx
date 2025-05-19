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
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServiceSecurityScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH_LOCAL } = Dimensions.get('window');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveChanges = () => {
    // Implement password change logic
    navigation.goBack();
  };

  const renderSecurityOption = (
    icon: string,
    title: string,
    description: string,
    isEnabled: boolean,
    onToggle: (value: boolean) => void
  ) => (
    <View style={styles.securityOption}>
      <LinearGradient
        colors={['#E8F5E9', '#F1F8E9']}
        style={styles.iconContainer}
      >
        <Ionicons name={icon as any} size={24} color="#00A86B" />
      </LinearGradient>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ false: '#E9ECEF', true: '#00A86B' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E9ECEF"
      />
    </View>
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
          <Text style={styles.headerTitle}>Security</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.securityContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6C757D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholderTextColor="#6C757D"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={20} color="#6C757D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#6C757D"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={20} color="#6C757D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#6C757D"
            />
          </View>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Features</Text>
          {renderSecurityOption(
            'shield-checkmark-outline',
            'Two-Factor Authentication',
            'Add an extra layer of security to your account',
            twoFactorEnabled,
            setTwoFactorEnabled
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#00A86B" />
              <Text style={styles.tipText}>Use a strong, unique password</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#00A86B" />
              <Text style={styles.tipText}>Enable two-factor authentication</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#00A86B" />
              <Text style={styles.tipText}>Keep your app updated</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
  },
  backButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  securityContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#212529',
  },
  saveButton: {
    backgroundColor: '#00A86B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  securityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  tipsContainer: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 12,
  },
}); 