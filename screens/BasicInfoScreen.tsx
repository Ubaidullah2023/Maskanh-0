import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

type BasicInfoScreenRouteProp = RouteProp<RootStackParamList, 'BasicInfo'>;

export default function BasicInfoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BasicInfoScreenRouteProp>();
  const [Architectural, setArchitectural] = useState(0);
  const [Contractor, setContractor] = useState(0);
  const [Painting, setPainting] = useState(0);
  const [Structural, setStructural] = useState(0);
  const [Labor, setLabor] = useState(0);
  const [Carpentry, setCarpentry] = useState(0);
  const [Drilling, setDrilling] = useState(0);
  const [Electrical, setElectrical] = useState(0);
  const [Plumbing, setPlumbing] = useState(0);
  const [Masonry, setMasonry] = useState(0);
  const [Tile, setTile] = useState(0);
  const [FalseCeiling, setFalseCeiling] = useState(0);
  const [Interior, setInterior] = useState(0);
  const [AC, setAC] = useState(0);
  const [Steel, setSteel] = useState(0);
  const [Water, setWater] = useState(0);
  const [Roof, setRoof] = useState(0);
  const [hasLock, setHasLock] = useState<boolean | null>(null);

  const handleSaveAndExit = () => {
    // TODO: Save progress and navigate to appropriate screen
    navigation.goBack();
  };

  const handleQuestions = () => {
    // TODO: Navigate to help/questions screen
  };

  const validateForm = () => {
    if (hasLock === null || hasLock === undefined) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('AddPhotos', {
        placeType: route.params?.placeType || 'entire',
        guestCount: Architectural,
        bedroomCount: Contractor,
        bedCount: Painting,
        hasLock: hasLock || false,
        amenities: []
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderCounter = (
    label: string,
    value: number,
    setValue: (value: number) => void,
    minValue: number = 1
  ) => (
    <View style={styles.counterContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterControls}>
        <TouchableOpacity
          style={[styles.counterButton, value <= minValue && styles.counterButtonDisabled]}
          onPress={() => value > minValue && setValue(value - 1)}
          disabled={value <= minValue}
        >
          <Ionicons name="remove" size={24} color={value <= minValue ? '#CCCCCC' : '#222222'} />
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setValue(value + 1)}
        >
          <Ionicons name="add" size={24} color="#222222" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Let's start with the Services Offered by Maskanh</Text>

        <View style={styles.formSection}>
          {/* Counters */}
          {renderCounter('Architectural Design', Architectural, setArchitectural)}
          {renderCounter('Contractor Services', Contractor, setContractor)}
          {renderCounter('Painting Expertise', Painting, setPainting)}
          {renderCounter('Structural Work', Structural, setStructural)}
          {renderCounter('Labor Services', Labor, setLabor)}
          {renderCounter('Carpentry', Carpentry, setCarpentry)}
          {renderCounter('Drilling Operations', Drilling, setDrilling)}
          {renderCounter('Electrical Services', Electrical, setElectrical)}
          {renderCounter('Plumbing Services', Plumbing, setPlumbing)}
          {renderCounter('Masonry Work', Masonry, setMasonry)}
          {renderCounter('Tile & Marble Fixing', Tile, setTile)}
          {renderCounter('False Ceiling Installation', FalseCeiling, setFalseCeiling)}
          {renderCounter('Interior Design', Interior, setInterior)}
          {renderCounter('AC Installation & Repair', AC, setAC)}
          {renderCounter('Steel & Welding Work', Steel, setSteel)}
          {renderCounter('Water Tank Cleaning', Water, setWater)}
          {renderCounter('Roof Waterproofing', Roof, setRoof)}
        </View>

        {/* Lock Question */}
        <View style={styles.lockQuestion}>
          <Text style={styles.lockQuestionText}>Which of these services are you interested in for your project?</Text>
          <View style={styles.lockOptions}>
            <TouchableOpacity
              style={[styles.lockOption, hasLock === true && styles.selectedOption]}
              onPress={() => setHasLock(true)}
            >
              <Text style={[styles.lockOptionText, hasLock === true && styles.selectedOptionText]}>
                Yes
              </Text>
              <View style={[styles.radio, hasLock === true && styles.radioSelected]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lockOption, hasLock === false && styles.selectedOption]}
              onPress={() => setHasLock(false)}
            >
              <Text style={[styles.lockOptionText, hasLock === false && styles.selectedOptionText]}>
                No
              </Text>
              <View style={[styles.radio, hasLock === false && styles.radioSelected]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, hasLock === null && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={hasLock === null}
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
    paddingVertical: Platform.OS === 'ios' ? 12 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 8,
    color: '#222222',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: isSmallScreen ? 30 : 28,
    fontWeight: '500',
    color: '#222222',
    marginBottom: isSmallScreen ? 24 : 32,
    paddingRight: 20,
  },
  formSection: {
    marginBottom: 32,
  },
  counterContainer: {
    marginBottom: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  label: {
    fontSize: 18,
    color: '#222222',
    marginBottom: 16,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  counterButtonDisabled: {
    borderColor: '#EEEEEE',
    backgroundColor: '#F8F8F8',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 24,
    minWidth: 24,
    textAlign: 'center',
  },
  lockQuestion: {
    marginTop: isSmallScreen ? 8 : 16,
  },
  lockQuestionText: {
    fontSize: isSmallScreen ? 22 : 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: isSmallScreen ? 16 : 24,
  },
  lockOptions: {
    gap: 8,
  },
  lockOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#00A86B',
    borderWidth: 2,
  },
  lockOptionText: {
    fontSize: 16,
    color: '#222222',
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#00A86B',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    borderColor: '#00A86B',
    borderWidth: 2,
    backgroundColor: '#00A86B',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#DDDDDD',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 