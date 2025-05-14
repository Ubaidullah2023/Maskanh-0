import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
type RegistrationScreenRouteProp = RouteProp<RootStackParamList, 'Registration'>;

const { width, height } = Dimensions.get('window');

export default function RegistrationScreen() {
  const navigation = useNavigation<RegistrationScreenNavigationProp>();
  const route = useRoute<RegistrationScreenRouteProp>();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Layout adjustments based on screen size
  const isSmallScreen = height < 700;
  const contentPadding = width > 500 ? 40 : 16;
  const inputHeight = isSmallScreen ? 48 : 56;

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 11-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setFormData({ ...formData, profileImage: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // TODO: Implement your registration API call here
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if there's a redirect after auth
        const { redirectAfterAuth, serviceId, serviceTitle, serviceSubtitle } = route.params || {};
        
        Alert.alert(
          'Registration Successful',
          'Your account has been created successfully!',
          [
            {
              text: 'Continue',
              onPress: () => {
                // If redirect parameters exist, navigate to that screen
                if (redirectAfterAuth === 'ChatScreen' && serviceId && serviceTitle && serviceSubtitle) {
                  navigation.navigate('ChatScreen', {
                    serviceId,
                    serviceTitle,
                    serviceSubtitle
                  });
                } else {
                  // Default navigation
                  navigation.navigate('FindService');
                }
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth login
      // Simulating Google login with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If Google login is successful, navigate to FindService
      navigation.navigate('FindService');
    } catch (error) {
      Alert.alert('Error', 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#fff' }
    ]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.header,
            { 
              borderBottomColor: isDarkMode ? '#333' : '#E5E5E5',
              paddingTop: Platform.OS === 'ios' ? 50 : 30,
              paddingBottom: 16,
            }
          ]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
            <Text style={[
              styles.headerTitle,
              { color: '#00A86B' }
            ]}>Create Account</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>

          <View style={[styles.formContainer, { padding: contentPadding }]}>
            <TouchableOpacity 
              style={[
                styles.imagePickerButton,
                { 
                  borderColor: isDarkMode ? '#333' : '#E5E5E5',
                  backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                  height: width > 500 ? 120 : 100,
                  width: width > 500 ? 120 : 100,
                  borderRadius: width > 500 ? 60 : 50,
                }
              ]} 
              onPress={handleImagePick}
            >
              {formData.profileImage ? (
                <Image 
                  source={{ uri: formData.profileImage }} 
                  style={[
                    styles.profileImage,
                    {
                      height: width > 500 ? 120 : 100,
                      width: width > 500 ? 120 : 100,
                      borderRadius: width > 500 ? 60 : 50,
                    }
                  ]} 
                />
              ) : (
                <View style={styles.photoPickerContent}>
                  <Ionicons 
                    name="camera-outline" 
                    size={width > 500 ? 32 : 24} 
                    color="#00A86B" 
                  />
                  <Text style={styles.imagePickerText}>
                    Add Photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={[
              styles.sectionTitle,
              { 
                color: isDarkMode ? '#fff' : '#000',
                fontSize: width > 500 ? 22 : 18,
              }
            ]}>Personal Information</Text>

            <View style={[
              styles.inputContainer,
              errors.phoneNumber ? [styles.inputError, { borderColor: '#FF3B30' }] : { borderColor: isDarkMode ? '#333' : '#E5E5E5' },
              { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }
            ]}>
              <Ionicons 
                name="call-outline" 
                size={20} 
                color={isDarkMode ? '#ccc' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#fff' : '#000',
                    height: inputHeight - 2,
                  }
                ]}
                placeholder="Phone Number"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                maxLength={11}
              />
            </View>
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

            <Text style={[
              styles.sectionTitle,
              { 
                color: isDarkMode ? '#fff' : '#000',
                fontSize: width > 500 ? 22 : 18,
              }
            ]}>Account Information</Text>

            <View style={[
              styles.inputContainer,
              errors.email ? [styles.inputError, { borderColor: '#FF3B30' }] : { borderColor: isDarkMode ? '#333' : '#E5E5E5' },
              { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }
            ]}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={isDarkMode ? '#ccc' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#fff' : '#000',
                    height: inputHeight - 2,
                  }
                ]}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={[
              styles.inputContainer,
              errors.password ? [styles.inputError, { borderColor: '#FF3B30' }] : { borderColor: isDarkMode ? '#333' : '#E5E5E5' },
              { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }
            ]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={isDarkMode ? '#ccc' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#fff' : '#000',
                    height: inputHeight - 2,
                  }
                ]}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={isDarkMode ? '#ccc' : '#666'} 
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={[
              styles.inputContainer,
              errors.confirmPassword ? [styles.inputError, { borderColor: '#FF3B30' }] : { borderColor: isDarkMode ? '#333' : '#E5E5E5' },
              { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }
            ]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={isDarkMode ? '#ccc' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: isDarkMode ? '#fff' : '#000',
                    height: inputHeight - 2,
                  }
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={isDarkMode ? '#ccc' : '#666'} 
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity 
              style={[
                styles.registerButton, 
                isLoading && styles.disabledButton,
                { height: inputHeight }
              ]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Continue</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? '#444' : '#E5E5E5' }]} />
              <Text style={[styles.dividerText, { color: isDarkMode ? '#ccc' : '#666' }]}>OR</Text>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? '#444' : '#E5E5E5' }]} />
            </View>

            <TouchableOpacity 
              style={[
                styles.googleButton, 
                isLoading && styles.disabledButton,
                { 
                  height: Math.max(inputHeight - 8, 40),
                  borderColor: isDarkMode ? '#444' : '#E5E5E5',
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  marginBottom: 30,
                  marginTop: 10
                }
              ]} 
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#DB4437" />
              ) : (
                <>
                  <Image 
                    source={require('../assets/icons/Google.png')}
                    style={styles.googleLogo}
                    resizeMode="contain"
                  />
                  <Text style={[
                    styles.googleButtonText,
                    { 
                      color: isDarkMode ? '#fff' : '#000',
                      fontSize: 15
                    }
                  ]}>Continue with Google</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
  },
  backButton: {
    marginTop: 20,
    padding: 8,
    width: 40,
  },
  headerTitle: {
  marginTop: 20,
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  eyeIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: '#00A86B',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  imagePickerButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  photoPickerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#00A86B',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 