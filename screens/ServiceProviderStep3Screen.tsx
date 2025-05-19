import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

type ServiceProviderStep3ScreenProps = NativeStackNavigationProp<RootStackParamList>;

export default function ServiceProviderStep3Screen() {
  const navigation = useNavigation<ServiceProviderStep3ScreenProps>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceSelection = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleComplete = () => {
    // Here you would typically save the service provider data
    // Then navigate to the dashboard
    navigation.reset({
      index: 0,
      routes: [{ name: 'ServiceProviderDashboard' }],
    });
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Step Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../assets/images/Contract.jpg')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContent}>
            <Text style={styles.stepLabel}>Step 3</Text>
            <Text style={styles.title}>Finish up and publish</Text>
            
            <Text style={styles.description}>
              Set your pricing, verify your identity, and get ready to start earning. We'll review you and will let you know when it's live.
            </Text>
          </View>

          {/* Service Selection Grid */}
          <View style={styles.servicesGrid}>
            {serviceOptions.map((service) => (
              <TouchableOpacity
                key={service.type}
                style={[
                  styles.serviceCard,
                  selectedServices.includes(service.type) && styles.serviceCardSelected
                ]}
                onPress={() => handleServiceSelection(service.type)}
              >
                <Image source={service.icon} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service.title}</Text>
                {selectedServices.includes(service.type) && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.completeButton,
                selectedServices.length === 0 && styles.completeButtonDisabled
              ]}
              onPress={handleComplete}
              disabled={selectedServices.length === 0}
            >
              <Text style={styles.completeButtonText}>Complete Registration</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const serviceOptions = [
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Math.max(statusBarHeight, 10) + 15,
  },
  illustrationContainer: {
    width: '100%',
    height: Math.min(height * 0.25, 180), // Cap the height on larger screens
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  illustration: {
    width: width * 0.7, // Make width responsive
    height: '80%',
  },
  textContent: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepLabel: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
    lineHeight: isSmallScreen ? 30 : 34,
  },
  description: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#666666',
    lineHeight: isSmallScreen ? 22 : 24,
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#F7FFFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  serviceCardSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#F0FFF5',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 'auto', // Push to bottom of container
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
  completeButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  completeButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  completeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 