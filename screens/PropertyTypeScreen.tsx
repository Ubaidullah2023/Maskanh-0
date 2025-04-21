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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type PropertyType = 'Blueprint' | 'Builder' | 'Paint' | 'Civil' | 'Construction' | 'Cuttingwood' | 'Drill' | 'Electrician';

const propertyIcons: Record<PropertyType, any> = {
  Blueprint: require('../assets/icons/Blueprint.png'),
  Builder: require('../assets/icons/Builder.png'),
  Paint: require('../assets/icons/Paint.png'),
  Civil: require('../assets/icons/Civil.png'),
  Construction: require('../assets/icons/Construction.png'),
  Cuttingwood: require('../assets/icons/Cuttingwood.png'),
  Drill: require('../assets/icons/Drill.png'),
  Electrician: require('../assets/icons/Electrician.png'),
};

export default function PropertyTypeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);

  const handleNext = () => {
    if (selectedType) {
      navigation.navigate('ServiceProviderStep2');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // Handle questions action
  };

  const PropertyOption = ({ type, label }: { type: PropertyType; label: string }) => (
    <TouchableOpacity
      style={[
        styles.propertyOption,
        selectedType === type && styles.propertyOptionSelected
      ]}
      onPress={() => setSelectedType(type)}
    >
      <Image 
        source={propertyIcons[type]}
        style={styles.propertyIcon}
        resizeMode="contain"
      />
      <Text style={[
        styles.propertyOptionText,
        selectedType === type && styles.propertyOptionTextSelected
      ]}>{label}</Text>
    </TouchableOpacity>
  );

  const getIconName = (type: PropertyType): any => {
    switch (type) {
      case 'Blueprint':
        return 'Blueprint-outline';
      case 'Builder':
        return 'Builder-outline';
      case 'Paint':
        return 'Paint-outline';
      case 'Civil':
        return 'Civil-outline';
      case 'Construction':
        return 'Construction-outline';
      case 'Cuttingwood':
        return 'Cuttingwood-outline';
      case 'Drill':
        return 'Drill-outline';
      case 'Electrician':
        return 'Electrician-outline';
      default:
        return 'home-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleSaveAndExit}
        >
          <Text style={styles.headerButtonText}>Save & exit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleQuestions}
        >
          <Text style={styles.headerButtonText}>Questions?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Which service do you{'\n'}want to provide?</Text>
        
        <View style={styles.optionsGrid}>
          <PropertyOption type="Blueprint" label="Architect" />
          <PropertyOption type="Builder" label="Contractor" />
          <PropertyOption type="Paint" label="Painter" />
          <PropertyOption type="Civil" label="Structural  Engineer" />
          <PropertyOption type="Construction" label="Labor" />
          <PropertyOption type="Cuttingwood" label="Carpenter" />
          <PropertyOption type="Drill" label="Driller" />
          <PropertyOption type="Electrician" label="Electrician" />
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, !selectedType && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedType}
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
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222222',
    marginTop: 32,
    marginBottom: 15,
    lineHeight: 40,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  propertyOption: {
    width: '48%',
    aspectRatio: 1.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyOptionSelected: {
    borderColor: '#00A86B',
    borderWidth: 2,
    backgroundColor: '#F7FFFC',
  },
  propertyIcon: {
    width: 32,
    height: 32,
    marginBottom: 12,
  },
  propertyOptionText: {
    fontSize: 16,
    color: '#222222',
    textAlign: 'center',
  },
  propertyOptionTextSelected: {
    color: '#00A86B',
    fontWeight: '500',
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