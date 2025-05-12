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
  Alert,
  Modal,
  FlatList,
  Dimensions,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';
import * as LocationService from '../utils/LocationService';
import * as ImagePicker from 'expo-image-picker';

type ProviderVerificationScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'ProviderVerification'
>;

interface Category {
  id: string;
  name: string;
  icon: any; // Using any for now since it's a require() result
}

interface ProvinceOption {
  id: string;
  name: string;
}

interface CityOption {
  id: string;
  name: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  phoneNumber: string;
  province: string;
  city: string;
  cnicNumber: string;
  cnicFront: string;
  cnicBack: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
}

const categories: Category[] = [
  { id: '1', name: 'Architect', icon: require('../assets/icons/Blueprint.png') },
  { id: '2', name: 'Contractor', icon: require('../assets/icons/Builder.png') },
  { id: '3', name: 'Structural Engineer', icon: require('../assets/icons/Civil.png') },
  { id: '4', name: 'Labor', icon: require('../assets/icons/Construction.png') },
  { id: '5', name: 'Carpenter', icon: require('../assets/icons/Cuttingwood.png') },
  { id: '6', name: 'Driller', icon: require('../assets/icons/Drill.png') },
  { id: '7', name: 'Electrician', icon: require('../assets/icons/Electrician.png') },
  { id: '8', name: 'Painter', icon: require('../assets/icons/Paint.png') },
  { id: '9', name: 'Solar Panel', icon: require('../assets/icons/Solarpower.png') },
  { id: '10', name: 'Tile Mason', icon: require('../assets/icons/Tiles.png') },
  { id: '11', name: 'Mason Mistri', icon: require('../assets/icons/Wall.png') },
  { id: '12', name: 'Welder', icon: require('../assets/icons/Welder.png') },
];

const provinces: ProvinceOption[] = [
  { id: 'punjab', name: 'Punjab' },
  { id: 'federal', name: 'Federal' },
];

const citiesByProvince: Record<string, CityOption[]> = {
  'Punjab': [
    { id: 'kamra', name: 'Kamra' },
    { id: 'attock', name: 'Attock' },
  ],
  'Federal': [
    { id: 'islamabad', name: 'Islamabad' },
  ],
};

const { height } = Dimensions.get('window');

interface AgePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (age: string) => void;
  selectedAge: string;
}

const generateAgeOptions = () => {
  const ages = [];
  for (let i = 18; i <= 100; i++) {
    ages.push(i.toString());
  }
  return ages;
};

const AgePickerModal: React.FC<AgePickerModalProps> = ({ visible, onClose, onSelect, selectedAge }) => {
  const ages = generateAgeOptions();
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Age</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={ages}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.ageOption,
                  selectedAge === item && styles.selectedAgeOption
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={[
                  styles.ageOptionText,
                  selectedAge === item && styles.selectedAgeOptionText
                ]}>{item} years</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    </Modal>
  );
};

interface ProvincePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (province: string) => void;
  selectedProvince: string;
}

const ProvincePickerModal: React.FC<ProvincePickerModalProps> = ({ visible, onClose, onSelect, selectedProvince }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Province</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View>
            {provinces.map((province) => (
              <TouchableOpacity
                key={province.id}
                style={[
                  styles.provinceOption,
                  selectedProvince === province.name && styles.selectedProvinceOption
                ]}
                onPress={() => {
                  onSelect(province.name);
                  onClose();
                }}
              >
                <Text style={[
                  styles.provinceOptionText,
                  selectedProvince === province.name && styles.selectedProvinceOptionText
                ]}>{province.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface CityPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selectedCity: string;
  province: string;
}

const CityPickerModal: React.FC<CityPickerModalProps> = ({ visible, onClose, onSelect, selectedCity, province }) => {
  const cities = province && province in citiesByProvince 
    ? citiesByProvince[province] 
    : [];
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select City</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View>
            {cities.map((city) => (
              <TouchableOpacity
                key={city.id}
                style={[
                  styles.cityOption,
                  selectedCity === city.name && styles.selectedCityOption
                ]}
                onPress={() => {
                  onSelect(city.name);
                  onClose();
                }}
              >
                <Text style={[
                  styles.cityOptionText,
                  selectedCity === city.name && styles.selectedCityOptionText
                ]}>{city.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function ProviderVerificationScreen() {
  const navigation = useNavigation<ProviderVerificationScreenProps>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    phoneNumber: '',
    province: '',
    city: '',
    cnicNumber: '',
    cnicFront: '',
    cnicBack: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isAgePickerVisible, setIsAgePickerVisible] = useState(false);
  const [isProvincePickerVisible, setIsProvincePickerVisible] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Add state for images
  const [cnicFrontImage, setCnicFrontImage] = useState<string | null>(null);
  const [cnicBackImage, setCnicBackImage] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateStep = () => {
    const newErrors: Partial<FormData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 2:
        if (!formData.age.trim()) {
          newErrors.age = 'Age is required';
        } else if (parseInt(formData.age) < 18) {
          newErrors.age = 'You must be at least 18 years old';
        }
        break;
      case 3:
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        break;
      case 4:
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{11}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Enter a valid 11-digit phone number';
        }
        if (!formData.province.trim()) {
          newErrors.province = 'Province is required';
        }
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }
        break;
      case 5:
        if (!formData.cnicNumber.trim()) {
          newErrors.cnicNumber = 'CNIC number is required';
        } else if (!/^\d{13}$/.test(formData.cnicNumber)) {
          newErrors.cnicNumber = 'Enter a valid 13-digit CNIC number';
        }
        if (!cnicFrontImage) {
          newErrors.cnicFront = 'CNIC front image is required';
        }
        if (!cnicBackImage) {
          newErrors.cnicBack = 'CNIC back image is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add image picker functions
  const pickImage = async (type: 'front' | 'back') => {
    try {
      // Request permissions first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload your CNIC images.');
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        
        if (type === 'front') {
          setCnicFrontImage(selectedImage);
          updateFormData('cnicFront', selectedImage);
        } else {
          setCnicBackImage(selectedImage);
          updateFormData('cnicBack', selectedImage);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'There was a problem selecting your image. Please try again.');
    }
  };

  const handleNext = async () => {
    if (!validateStep()) {
      Alert.alert(
        'Required Fields',
        'Please fill in all required fields correctly before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // For now, only log the data that would be saved
        console.log('Service provider data to save:', formData);
        
        // Here we'd normally upload the images to storage and save the URLs
        // But as requested, we're just logging for now
        console.log('CNIC Front Image:', cnicFrontImage);
        console.log('CNIC Back Image:', cnicBackImage);

        // Success, show message and navigate to MaskanhPro
      Alert.alert(
        'Verification Complete',
        'Your provider account has been successfully verified. You can now start offering your services.',
        [
          {
            text: 'Get Started',
            onPress: () => {
              navigation.navigate('MaskanhPro');
            },
          },
        ]
      );
      } catch (error) {
        console.error('Error saving provider data:', error);
        Alert.alert(
          'Error',
          'There was an error saving your information. Please try again.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const renderError = (key: keyof FormData) => {
    if (!errors[key]) return null;
    
    return (
      <Text style={styles.errorText}>{errors[key] as string}</Text>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Tell us your name</Text>
            <Text style={styles.stepSubtitle}>Let's get to know you better</Text>
            <TextInput
              style={[styles.input, errors.firstName ? styles.inputError : null]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => updateFormData('firstName', text)}
            />
            {renderError('firstName')}
            <TextInput
              style={[styles.input, errors.lastName ? styles.inputError : null]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => updateFormData('lastName', text)}
            />
            {renderError('lastName')}
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>How old are you?</Text>
            <Text style={styles.stepSubtitle}>We use this to verify your account</Text>
            <TouchableOpacity
              style={[
                styles.input,
                styles.selectInput,
                errors.age ? styles.inputError : undefined
              ]}
              onPress={() => setIsAgePickerVisible(true)}
            >
              <Text style={[
                styles.inputText,
                !formData.age ? styles.placeholderText : undefined
              ]}>
                {formData.age || 'Select your age'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Email & Password</Text>
            <Text style={styles.stepSubtitle}>For account security</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
            />
            {renderError('email')}
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPasswordButtonText}>
                {showPassword ? 'Hide' : 'Show'} Password
              </Text>
            </TouchableOpacity>
            {renderError('password')}
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Contact & Location</Text>
            <Text style={styles.stepSubtitle}>Help customers find you</Text>
            <TextInput
              style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
              placeholder="Phone Number (11 digits)"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => updateFormData('phoneNumber', text)}
              maxLength={11}
            />
            {renderError('phoneNumber')}
            <TouchableOpacity
              style={[
                styles.input,
                styles.selectInput,
                errors.province ? styles.inputError : undefined
              ]}
              onPress={() => setIsProvincePickerVisible(true)}
            >
              <Text style={[
                styles.inputText,
                !formData.province ? styles.placeholderText : undefined
              ]}>
                {formData.province || 'Select your province'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            {renderError('province')}
            <TouchableOpacity
              style={[
                styles.input,
                styles.selectInput,
                errors.city ? styles.inputError : undefined
              ]}
              onPress={() => {
                if (!formData.province) {
                  Alert.alert('Select Province', 'Please select a province first');
                  return;
                }
                setIsCityPickerVisible(true);
              }}
            >
              <Text style={[
                styles.inputText,
                !formData.city ? styles.placeholderText : undefined
              ]}>
                {formData.city || 'Select your city'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            {renderError('city')}
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Identity Verification</Text>
            <Text style={styles.stepSubtitle}>To ensure safety and trust</Text>
            <TextInput
              style={[styles.input, errors.cnicNumber ? styles.inputError : null]}
              placeholder="CNIC Number (13 digits)"
              keyboardType="numeric"
              value={formData.cnicNumber}
              onChangeText={(text) => updateFormData('cnicNumber', text)}
              maxLength={13}
            />
            {renderError('cnicNumber')}
            <View style={[
              styles.uploadContainer, 
              isSmallScreen && styles.uploadContainerColumn
            ]}>
              <TouchableOpacity
                style={[
                  styles.uploadButton, 
                  errors.cnicFront ? styles.uploadButtonError : null,
                  isSmallScreen && styles.uploadButtonFull,
                  cnicFrontImage ? styles.uploadButtonWithImage : null
                ]}
                onPress={() => pickImage('front')}
              >
                {cnicFrontImage ? (
                  <>
                    <Image source={{ uri: cnicFrontImage }} style={styles.previewImage} />
                    <View style={styles.uploadOverlay}>
                      <Text style={styles.uploadOverlayText}>CNIC Front</Text>
                      <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                    </View>
                  </>
                ) : (
                  <View style={styles.buttonContentWrapper}>
                <Ionicons name="cloud-upload" size={24} color="#00A86B" />
                <Text style={styles.uploadText}>Upload CNIC Front</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.uploadButton, 
                  errors.cnicBack ? styles.uploadButtonError : null,
                  isSmallScreen && styles.uploadButtonFull,
                  cnicBackImage ? styles.uploadButtonWithImage : null
                ]}
                onPress={() => pickImage('back')}
              >
                {cnicBackImage ? (
                  <>
                    <Image source={{ uri: cnicBackImage }} style={styles.previewImage} />
                    <View style={styles.uploadOverlay}>
                      <Text style={styles.uploadOverlayText}>CNIC Back</Text>
                      <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                    </View>
                  </>
                ) : (
                  <View style={styles.buttonContentWrapper}>
                <Ionicons name="cloud-upload" size={24} color="#00A86B" />
                <Text style={styles.uploadText}>Upload CNIC Back</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {(renderError('cnicFront') || renderError('cnicBack'))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step {currentStep} of 5</Text>
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { width: `${(currentStep / 5) * 100}%` }]}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 5 ? 'Get Started' : 'Next'}
          </Text>
          {currentStep < 5 && (
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      <AgePickerModal
        visible={isAgePickerVisible}
        onClose={() => setIsAgePickerVisible(false)}
        onSelect={(age) => {
          setFormData(prev => ({ ...prev, age }));
          setErrors(prev => ({ ...prev, age: '' }));
        }}
        selectedAge={formData.age}
      />

      <ProvincePickerModal
        visible={isProvincePickerVisible}
        onClose={() => setIsProvincePickerVisible(false)}
        onSelect={(province) => {
          setFormData(prev => ({ ...prev, province, city: '' }));
          setErrors(prev => ({ ...prev, province: '' }));
        }}
        selectedProvince={formData.province}
      />

      <CityPickerModal
        visible={isCityPickerVisible}
        onClose={() => setIsCityPickerVisible(false)}
        onSelect={(city) => {
          setFormData(prev => ({ ...prev, city }));
          setErrors(prev => ({ ...prev, city: '' }));
        }}
        selectedCity={formData.city}
        province={formData.province}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A86B',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 24,
    paddingTop: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    height: 64,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFF',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  uploadContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  uploadContainerColumn: {
    flexDirection: 'column',
    gap: 12,
  },
  uploadButtonFull: {
    minWidth: '100%',
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 168, 107, 0.3)',
    paddingVertical: 16,
    paddingHorizontal: 12,
    height: 90,
    minWidth: 170,
  },
  uploadButtonError: {
    borderColor: '#FF3B30',
  },
  uploadText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#00A86B',
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContentWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  checkIcon: {
    marginLeft: 4,
  },
  professionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  professionItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 8,
  },
  professionSelected: {
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    borderWidth: 2,
    borderColor: '#00A86B',
  },
  professionIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  professionLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#222',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  modalCloseButton: {
    fontSize: 22,
    color: '#888',
  },
  ageOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedAgeOption: {
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  ageOptionText: {
    fontSize: 16,
    color: '#222',
  },
  selectedAgeOptionText: {
    color: '#00A86B',
    fontWeight: '600',
  },
  provinceOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedProvinceOption: {
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  provinceOptionText: {
    fontSize: 16,
    color: '#222',
  },
  selectedProvinceOptionText: {
    color: '#00A86B',
    fontWeight: '600',
  },
  cityOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedCityOption: {
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  cityOptionText: {
    fontSize: 16,
    color: '#222',
  },
  selectedCityOptionText: {
    color: '#00A86B',
    fontWeight: '600',
  },
  uploadButtonWithImage: {
    padding: 0,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadOverlayText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 6,
  },
  showPasswordButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showPasswordButtonText: {
    color: '#00A86B',
    fontSize: 14,
  },
}); 