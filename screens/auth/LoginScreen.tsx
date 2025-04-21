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

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement login logic here
      // await auth.signIn(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
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
            <Text style={styles.title}>Sign In</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.tabs}>
              <Text style={styles.activeTab}>Log In</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register' as never)}
              >
                <Text style={styles.inactiveTab}>Register</Text>
              </TouchableOpacity>
            </View>

            <AuthInput
              placeholder="Username/Email"
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

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword' as never)}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Lost Your Password?</Text>
            </TouchableOpacity>

            <AuthButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.rememberMe}>
              <TouchableOpacity style={styles.checkbox}>
                {/* Add checkbox component here */}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
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
    marginRight: 24,
    paddingBottom: 8,
  },
  inactiveTab: {
    fontSize: 16,
    color: '#666',
    paddingBottom: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#00A86B',
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 16,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 4,
    marginRight: 8,
  },
  rememberMeText: {
    color: '#666',
    fontSize: 14,
  },
}); 