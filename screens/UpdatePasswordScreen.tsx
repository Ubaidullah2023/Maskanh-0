import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type UpdatePasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdatePassword'>;

export default function UpdatePasswordScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<UpdatePasswordScreenNavigationProp>();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: [
        password.length < minLength && 'Password must be at least 8 characters',
        !hasUpperCase && 'Password must contain at least one uppercase letter',
        !hasLowerCase && 'Password must contain at least one lowercase letter',
        !hasNumbers && 'Password must contain at least one number',
        !hasSpecialChar && 'Password must contain at least one special character'
      ].filter(Boolean)
    };
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    const { isValid, errors } = validatePassword(newPassword);
    if (!isValid) {
      Alert.alert('Invalid Password', errors.join('\n'));
      return;
    }

    // Add password update logic here
    Alert.alert(
      'Success',
      'Password updated successfully',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const renderPasswordInput = (
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    showPassword: boolean,
    setShowPassword: (show: boolean) => void
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
            borderColor: isDarkMode ? '#333333' : '#E5E5E5'
          }
        ]}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
      />
      <TouchableOpacity 
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons 
          name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
          size={24} 
          color={isDarkMode ? '#FFFFFF' : '#000000'} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Update Password
        </Text>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={[
            styles.label,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Current password
          </Text>
          {renderPasswordInput(
            currentPassword,
            setCurrentPassword,
            'Enter current password',
            showCurrentPassword,
            setShowCurrentPassword
          )}

          <TouchableOpacity 
            style={styles.forgotContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          <Text style={[
            styles.label,
            { color: isDarkMode ? '#FFFFFF' : '#000000', marginTop: 24 }
          ]}>
            New password
          </Text>
          {renderPasswordInput(
            newPassword,
            setNewPassword,
            'Enter new password',
            showNewPassword,
            setShowNewPassword
          )}

          <Text style={[
            styles.label,
            { color: isDarkMode ? '#FFFFFF' : '#000000', marginTop: 24 }
          ]}>
            Confirm password
          </Text>
          {renderPasswordInput(
            confirmPassword,
            setConfirmPassword,
            'Confirm new password',
            showConfirmPassword,
            setShowConfirmPassword
          )}

          <View style={styles.passwordRequirements}>
            <Text style={[
              styles.requirementsTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              Password Requirements:
            </Text>
            <Text style={[
              styles.requirement,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              • At least 8 characters long
            </Text>
            <Text style={[
              styles.requirement,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              • Contains uppercase and lowercase letters
            </Text>
            <Text style={[
              styles.requirement,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              • Contains at least one number
            </Text>
            <Text style={[
              styles.requirement,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              • Contains at least one special character
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.updateButton,
            { 
              opacity: (!currentPassword || !newPassword || !confirmPassword) ? 0.5 : 1,
              backgroundColor: isDarkMode ? '#00A86B' : '#00A86B'
            }
          ]}
          onPress={handleUpdatePassword}
          disabled={!currentPassword || !newPassword || !confirmPassword}
        >
          <Text style={styles.updateButtonText}>Update Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  forgotContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  forgotText: {
    color: '#00A86B',
    fontSize: 16,
  },
  passwordRequirements: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  updateButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 