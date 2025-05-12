import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

type ServiceType = 
  | 'electrician' 
  | 'interior_designer' 
  | 'mason' 
  | 'contractor' 
  | 'solar_work' 
  | 'carpenter' 
  | 'painter' 
  | 'wall_3d' 
  | 'plumber' 
  | 'ceiling_work' 
  | 'aluminum_steel' 
  | 'glass_work' 
  | 'welder' 
  | 'architect';

interface ServiceOption {
  type: ServiceType;
  title: string;
  description: string;
  icon: any;
}

const serviceOptions: ServiceOption[] = [
  {
    type: 'electrician',
    title: 'Electrician',
    description: 'Professional electrical services for installations, repairs, and maintenance.',
    icon: require('../assets/icons/Electrician.png'),
  },
  {
    type: 'interior_designer',
    title: 'Interior Designer',
    description: 'Creative interior design solutions to transform your living spaces.',
    icon: require('../assets/icons/Blueprint.png'),
  },
  {
    type: 'mason',
    title: 'Mason',
    description: 'Expert masonry work for construction and renovation projects.',
    icon: require('../assets/icons/Wall.png'),
  },
  {
    type: 'contractor',
    title: 'Contractor',
    description: 'Full-service project management for construction and renovation.',
    icon: require('../assets/icons/Builder.png'),
  },
  {
    type: 'solar_work',
    title: 'Solar Work',
    description: 'Professional solar panel installation and maintenance services.',
    icon: require('../assets/icons/Solarpower.png'),
  },
  {
    type: 'carpenter',
    title: 'Carpenter',
    description: 'Skilled carpentry work for custom furniture and installations.',
    icon: require('../assets/icons/Cuttingwood.png'),
  },
  {
    type: 'painter',
    title: 'Painter',
    description: 'Quality painting services for interior and exterior projects.',
    icon: require('../assets/icons/Paint.png'),
  },
  {
    type: 'wall_3d',
    title: '3D Wall',
    description: 'Creative 3D wall designs and installations for modern spaces.',
    icon: require('../assets/icons/3d.png'),
  },
  {
    type: 'plumber',
    title: 'Plumber',
    description: 'Professional plumbing services for repairs and installations.',
    icon: require('../assets/icons/plumber.png'),
  },
  {
    type: 'ceiling_work',
    title: 'Ceiling Work',
    description: 'Expert ceiling installation, repair, and design services.',
    icon: require('../assets/icons/ceiling.png'),
  },
  {
    type: 'aluminum_steel',
    title: 'Aluminum & Steel Work',
    description: 'Specialized metal work for construction and fabrication.',
    icon: require('../assets/icons/laser-cutting.png'),
  },
  {
    type: 'glass_work',
    title: 'Glass Work',
    description: 'Professional glass installation and custom glass solutions.',
    icon: require('../assets/icons/window.png'),
  },
  {
    type: 'welder',
    title: 'Welder & Blacksmith',
    description: 'Expert welding and blacksmithing services for metal work.',
    icon: require('../assets/icons/Welder.png'),
  },
  {
    type: 'architect',
    title: 'Architect',
    description: 'Professional architectural design and planning services.',
    icon: require('../assets/icons/architect.png'),
  },
];

export default function PlaceTypeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedTypes, setSelectedTypes] = useState<ServiceType[]>([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedTypes.length > 0) {
      navigation.navigate('Location', { placeType: 'entire', serviceTypes: selectedTypes });
    }
  };

  const toggleServiceType = (type: ServiceType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              At Maskanh, we connect you with skilled and verified professionals to turn your construction ideas into reality. Check out the services we offer:
            </Text>
          </View>

          {serviceOptions.map((service) => (
            <TouchableOpacity 
              key={service.type}
              style={[styles.optionCard, selectedTypes.includes(service.type) && styles.selectedCard]}
              onPress={() => toggleServiceType(service.type)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{service.title}</Text>
                  <Text style={styles.optionDescription}>{service.description}</Text>
                </View>
                <Image source={service.icon} style={styles.serviceIcon} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.nextButton, selectedTypes.length === 0 && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={selectedTypes.length === 0}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? statusBarHeight + 25 : 25,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: isSmallScreen ? 17 : 19,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 26,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedCard: {
    borderColor: '#00A86B',
    backgroundColor: '#F7FFFA',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#666666',
    lineHeight: 22,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 