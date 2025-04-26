import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { isDarkMode } = useTheme();
  const navigationNative = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Add password reset logic here
    Alert.alert(
      'Reset Link Sent',
      'We have sent a password reset link to your email address. Please check your inbox.',
      [
        {
          text: 'OK',
          onPress: () => navigationNative.goBack()
        }
      ]
    );
  };

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
          onPress={() => navigationNative.goBack()}
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
          Forgot Password
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="lock-closed-outline" 
            size={64} 
            color="#00A86B" 
          />
        </View>

        <Text style={[
          styles.title,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Reset Your Password
        </Text>

        <Text style={[
          styles.description,
          { color: isDarkMode ? '#CCCCCC' : '#666666' }
        ]}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[
            styles.label,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Email Address
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
                color: isDarkMode ? '#FFFFFF' : '#000000',
                borderColor: isDarkMode ? '#333333' : '#E5E5E5'
              }
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.resetButton,
            { 
              opacity: !email ? 0.5 : 1,
              backgroundColor: isDarkMode ? '#00A86B' : '#00A86B'
            }
          ]}
          onPress={handleResetPassword}
          disabled={!email}
        >
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backToLogin}
          onPress={() => navigationNative.goBack()}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resetButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    padding: 8,
  },
  backToLoginText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen; 