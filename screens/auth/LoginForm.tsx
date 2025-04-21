import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthButton } from '../../components/auth/AuthButton';

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

export const LoginForm = () => {
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
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
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
    <View style={styles.container}>
      <AuthInput
        placeholder="Email Address"
        icon="mail-outline"
        autoCapitalize="none"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        error={errors.email}
        containerStyle={styles.input}
        returnKeyType="next"
      />

      <AuthInput
        placeholder="Password"
        icon="lock-closed-outline"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        error={errors.password}
        containerStyle={styles.input}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Lost Your Password?</Text>
      </TouchableOpacity>

      <AuthButton
        title="Login"
        onPress={handleLogin}
        loading={loading}
        style={styles.loginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: height * 0.015,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: height * 0.02,
  },
  forgotPasswordText: {
    color: '#139C58',
    fontSize: isSmallDevice ? 12 : 14,
  },
  loginButton: {
    marginBottom: height * 0.02,
  },
}); 