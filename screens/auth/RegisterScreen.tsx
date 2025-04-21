import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthButton } from '../../components/auth/AuthButton';

type UserRole = 'guest' | 'owner';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('guest');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement registration logic here
      // await auth.register({ ...formData, role: selectedRole });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login' as never)}
              >
                <Text style={styles.inactiveTab}>Log In</Text>
              </TouchableOpacity>
              <Text style={styles.activeTab}>Register</Text>
            </View>

            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'guest' && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole('guest')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'guest' && styles.roleButtonTextActive,
                  ]}
                >
                  Guest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'owner' && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole('owner')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'owner' && styles.roleButtonTextActive,
                  ]}
                >
                  Owner
                </Text>
              </TouchableOpacity>
            </View>

            <AuthInput
              placeholder="Username"
              icon="person-outline"
              autoCapitalize="none"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              error={errors.username}
            />

            <AuthInput
              placeholder="Email Address"
              icon="mail-outline"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              error={errors.email}
            />

            <AuthInput
              placeholder="Password"
              icon="lock-closed-outline"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              error={errors.password}
            />

            <AuthInput
              placeholder="First Name"
              icon="person-outline"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              error={errors.firstName}
            />

            <AuthInput
              placeholder="Last Name"
              icon="person-outline"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              error={errors.lastName}
            />

            <View style={styles.privacyPolicy}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.privacyPolicyText}>
                I agree to the{' '}
                <Text style={styles.privacyPolicyLink}>Privacy Policy</Text>
              </Text>
            </View>

            <AuthButton
              title="Register"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A86B',
    borderBottomWidth: 2,
    borderBottomColor: '#00A86B',
    marginLeft: 24,
    paddingBottom: 8,
  },
  inactiveTab: {
    fontSize: 16,
    color: '#666',
    paddingBottom: 8,
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  roleButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#00A86B',
  },
  privacyPolicy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 4,
    marginRight: 8,
  },
  privacyPolicyText: {
    color: '#666',
    fontSize: 14,
  },
  privacyPolicyLink: {
    color: '#00A86B',
    textDecorationLine: 'underline',
  },
  registerButton: {
    marginBottom: 16,
  },
}); 