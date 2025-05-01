import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type ServiceType = 'architectural' | 'contractor' | 'painting' | 'structural' | 'labor' | 'carpentry' | 'drilling' | 'electrical';

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>At Maskanh, we connect you with skilled and verified professionals to turn your construction ideas into reality. Check out the services we offer:
        </Text>

        {/* Service Options */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('architectural') && styles.selectedCard]}
          onPress={() => toggleServiceType('architectural')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Architectural Design</Text>
              <Text style={styles.optionDescription}>Creative and practical designs tailored to meet your unique space needs.</Text>
            </View>
            <Ionicons name="color-palette-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('contractor') && styles.selectedCard]}
          onPress={() => toggleServiceType('contractor')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Contractor Services</Text>
              <Text style={styles.optionDescription}>Full-service project management to ensure your construction runs smoothly, on time, and within budget.</Text>
            </View>
            <Ionicons name="construct-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('painting') && styles.selectedCard]}
          onPress={() => toggleServiceType('painting')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Painting Expertise</Text>
              <Text style={styles.optionDescription}>Quality painting services for a flawless finish that lasts, for both interior and exterior projects.</Text>
            </View>
            <Ionicons name="brush-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('structural') && styles.selectedCard]}
          onPress={() => toggleServiceType('structural')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Structural Work</Text>
              <Text style={styles.optionDescription}>Reliable structural solutions, ensuring a solid foundation and durable construction.</Text>
            </View>
            <Ionicons name="cube-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('labor') && styles.selectedCard]}
          onPress={() => toggleServiceType('labor')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Labor Services</Text>
              <Text style={styles.optionDescription}>Skilled labor for all types of construction work, ensuring efficiency and precision.</Text>
            </View>
            <Ionicons name="people-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('carpentry') && styles.selectedCard]}
          onPress={() => toggleServiceType('carpentry')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Carpentry</Text>
              <Text style={styles.optionDescription}>Custom woodwork, from furniture design to detailed fittings and installations.</Text>
            </View>
            <Ionicons name="hammer-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('drilling') && styles.selectedCard]}
          onPress={() => toggleServiceType('drilling')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Drilling Operations</Text>
              <Text style={styles.optionDescription}>Safe, precise drilling for all your construction and installation needs.</Text>
            </View>
            <Ionicons name="hardware-chip-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, selectedTypes.includes('electrical') && styles.selectedCard]}
          onPress={() => toggleServiceType('electrical')}
        >
          <View style={styles.optionContent}>
            <View>
              <Text style={styles.optionTitle}>Electrical Services</Text>
              <Text style={styles.optionDescription}>Certified electrical work for installations, repairs, and maintenance that you can rely on.</Text>
            </View>
            <Ionicons name="flash-outline" size={24} color="#666666" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Buttons */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },


  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
    lineHeight: 30,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
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
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    maxWidth: '90%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    paddingVertical: 16,
    paddingHorizontal: 30,
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