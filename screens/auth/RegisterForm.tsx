import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthButton } from '../../components/auth/AuthButton';

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

type UserRole = 'guest' | 'owner';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('guest');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (selectedRole === 'owner' && !formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required for owners';
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;
    setLoading(true);
    try {
      // TODO: Implement registration
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'guest' && styles.roleButtonActive]}
          onPress={() => setSelectedRole('guest')}
        >
          <Text style={[styles.roleButtonText, selectedRole === 'guest' && styles.roleButtonTextActive]}>
            Guest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'owner' && styles.roleButtonActive]}
          onPress={() => setSelectedRole('owner')}
        >
          <Text style={[styles.roleButtonText, selectedRole === 'owner' && styles.roleButtonTextActive]}>
            Owner
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <AuthInput
            placeholder="First Name"
            icon="person-outline"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            error={errors.firstName}
            returnKeyType="next"
          />
        </View>
        <View style={styles.halfField}>
          <AuthInput
            placeholder="Last Name"
            icon="person-outline"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            error={errors.lastName}
            returnKeyType="next"
          />
        </View>
      </View>

      <AuthInput
        placeholder="Username"
        icon="person-outline"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        error={errors.username}
        containerStyle={styles.input}
        returnKeyType="next"
      />

      <AuthInput
        placeholder="Email"
        icon="mail-outline"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        error={errors.email}
        containerStyle={styles.input}
        returnKeyType="next"
      />

      {selectedRole === 'owner' && (
        <AuthInput
          placeholder="Phone Number"
          icon="call-outline"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          error={errors.phoneNumber}
          containerStyle={styles.input}
          returnKeyType="next"
        />
      )}

      <AuthInput
        placeholder="Password"
        icon="lock-closed-outline"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        error={errors.password}
        containerStyle={styles.input}
        returnKeyType="done"
        onSubmitEditing={handleRegister}
      />

      <AuthButton
        title="Register"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: height * 0.015,
  },
  roleButton: {
    flex: 1,
    paddingVertical: isSmallDevice ? 8 : 10,
    alignItems: 'center',
    borderRadius: 8,
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
    fontSize: isSmallDevice ? 13 : 14,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#139C58',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  halfField: {
    flex: 0.485,
  },
  input: {
    marginBottom: height * 0.015,
  },
  button: {
    marginTop: height * 0.01,
  },
}); 