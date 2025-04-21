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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

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
  phoneNumber: string;
  province: string;
  city: string;
  profession: string;
  cnicNumber: string;
  cnicFront: string;
  cnicBack: string;
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
  const cities = province ? citiesByProvince[province] : [];
  
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
    phoneNumber: '',
    province: '',
    city: '',
    profession: '',
    cnicNumber: '',
    cnicFront: '',
    cnicBack: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isAgePickerVisible, setIsAgePickerVisible] = useState(false);
  const [isProvincePickerVisible, setIsProvincePickerVisible] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);

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
      case 4:
        if (!formData.profession) {
          newErrors.profession = 'Please select your profession';
        }
        break;
      case 5:
        if (!formData.cnicNumber.trim()) {
          newErrors.cnicNumber = 'CNIC number is required';
        } else if (!/^\d{13}$/.test(formData.cnicNumber)) {
          newErrors.cnicNumber = 'Enter a valid 13-digit CNIC number';
        }
        if (!formData.cnicFront) {
          newErrors.cnicFront = 'CNIC front image is required';
        }
        if (!formData.cnicBack) {
          newErrors.cnicBack = 'CNIC back image is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
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
      // All steps completed, show success message and navigate to MaskanhPro
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
    }
  };

  const renderError = (key: keyof FormData) => {
    return errors[key] ? (
      <Text style={styles.errorText}>{errors[key]}</Text>
    ) : null;
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
                errors.age ? styles.inputError : undefined,
                styles.selectInput
              ]}
              onPress={() => setIsAgePickerVisible(true)}
            >
              <Text style={[
                styles.inputText,
                !formData.age ? styles.placeholderText : undefined
              ]}>
                {formData.age || 'Select your age'}
              </Text>
            </TouchableOpacity>
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>
        );
      case 3:
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
                errors.province ? styles.inputError : undefined,
                styles.selectInput
              ]}
              onPress={() => setIsProvincePickerVisible(true)}
            >
              <Text style={[
                styles.inputText,
                !formData.province ? styles.placeholderText : undefined
              ]}>
                {formData.province || 'Select your province'}
              </Text>
            </TouchableOpacity>
            {renderError('province')}
            <TouchableOpacity
              style={[
                styles.input,
                errors.city ? styles.inputError : undefined,
                styles.selectInput
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
            </TouchableOpacity>
            {renderError('city')}
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="briefcase" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Your Profession</Text>
            <Text style={styles.stepSubtitle}>Tell us about your skills</Text>
            <View style={styles.professionGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.professionItem,
                    formData.profession === category.id && styles.professionSelected,
                  ]}
                  onPress={() => updateFormData('profession', category.id)}
                >
                  <Image 
                    source={category.icon}
                    style={styles.professionIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.professionLabel}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {renderError('profession')}
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
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={[styles.uploadButton, errors.cnicFront ? styles.uploadButtonError : null]}
                onPress={() => updateFormData('cnicFront', 'uploaded')}
              >
                <Ionicons name="cloud-upload" size={24} color="#00A86B" />
                <Text style={styles.uploadText}>Upload CNIC Front</Text>
                {formData.cnicFront && (
                  <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.uploadButton, errors.cnicBack ? styles.uploadButtonError : null]}
                onPress={() => updateFormData('cnicBack', 'uploaded')}
              >
                <Ionicons name="cloud-upload" size={24} color="#00A86B" />
                <Text style={styles.uploadText}>Upload CNIC Back</Text>
                {formData.cnicBack && (
                  <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F7F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  professionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  professionItem: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  professionSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#E8F7F1',
  },
  professionIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  professionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  uploadButton: {
    width: '48%',
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  uploadButtonError: {
    borderColor: '#FF3B30',
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    height: 48,
    borderRadius: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#666666',
    padding: 4,
  },
  ageOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedAgeOption: {
    backgroundColor: '#F7FFFC',
  },
  ageOptionText: {
    fontSize: 16,
    color: '#222222',
  },
  selectedAgeOptionText: {
    color: '#00A86B',
    fontWeight: '500',
  },
  inputText: {
    fontSize: 16,
    color: '#222222',
    textAlignVertical: 'center',
  },
  placeholderText: {
    color: '#999999',
    textAlignVertical: 'center',
  },
  provinceOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedProvinceOption: {
    backgroundColor: '#F7FFFC',
  },
  provinceOptionText: {
    fontSize: 16,
    color: '#222222',
  },
  selectedProvinceOptionText: {
    color: '#00A86B',
    fontWeight: '500',
  },
  cityOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedCityOption: {
    backgroundColor: '#F7FFFC',
  },
  cityOptionText: {
    fontSize: 16,
    color: '#222222',
  },
  selectedCityOptionText: {
    color: '#00A86B',
    fontWeight: '500',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
}); 