import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Linking,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type SafetyDetailsScreenRouteProp = RouteProp<RootStackParamList, 'SafetyDetails'>;

export default function SafetyDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SafetyDetailsScreenRouteProp>();

  const [hasSecurityCamera, setHasSecurityCamera] = useState(false);
  const [hasNoiseMonitor, setHasNoiseMonitor] = useState(false);
  const [hasWeapons, setHasWeapons] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraDescription, setCameraDescription] = useState('');
  const [charactersLeft, setCharactersLeft] = useState(300);

  const handleExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Implement help/questions functionality
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSecurityCameraToggle = (value: boolean) => {
    setHasSecurityCamera(value);
    if (value) {
      setShowCameraModal(true);
    } else {
      setCameraDescription('');
    }
  };

  const handleCameraDescriptionChange = (text: string) => {
    if (text.length <= 300) {
      setCameraDescription(text);
      setCharactersLeft(300 - text.length);
    }
  };

  const handleCameraModalContinue = () => {
    if (cameraDescription.trim()) {
      setShowCameraModal(false);
    }
  };

  const handleCameraModalClose = () => {
    setHasSecurityCamera(false);
    setCameraDescription('');
    setShowCameraModal(false);
  };

  const handleCreateListing = () => {
    navigation.navigate('Listing', {
      ...route.params,
      safetyDetails: {
        hasSecurityCamera,
        cameraDescription,
        hasNoiseMonitor,
        hasWeapons,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Share safety details</Text>
        <Text style={styles.subtitle}>Let clients know about the safety precautions and equipment used at your construction site.
        </Text>

        <View style={styles.safetyList}>
          <View style={styles.safetyItem}>
            <Text style={styles.safetyItemText}>Protective gear used (helmets, gloves, safety glasses, boots)            </Text>
            <Switch
              value={hasSecurityCamera}
              onValueChange={handleSecurityCameraToggle}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.safetyItem}>
            <Text style={styles.safetyItemText}>Warning signs and safety barriers in place.</Text>
            <Switch
              value={hasNoiseMonitor}
              onValueChange={setHasNoiseMonitor}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.safetyItem}>
            <Text style={styles.safetyItemText}>Hazardous tools or materials handled with care.</Text>
            <Switch
              value={hasWeapons}
              onValueChange={setHasWeapons}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Important Note:</Text>
          <Text style={styles.infoText}>
          Ensure all safety measures follow local construction regulations and align with Maskanh’s safety and service standards.
          </Text>
          <Text style={styles.infoText}>
            Be sure to comply with your{' '}
            <Text 
              style={styles.link}
              onPress={() => Linking.openURL('https://example.com/local-laws')}
            >
              local laws
            </Text>{' '}
            and review Maskanh's{' '}
            <Text 
              style={styles.link}
              onPress={() => Linking.openURL('https://example.com/anti-discrimination')}
            >
              anti-discrimination policy.
            </Text>{' '}

          </Text>
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateListing}>
          <Text style={styles.createButtonText}>Create listing</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCameraModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCameraModalClose}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={handleCameraModalClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <Text style={styles.modalTitle}>
                Tell client about your services.
              </Text>
              <Text style={styles.modalSubtitle}>
                Describe the area that each Services Provider covers.{' '}
                <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/learn-more')}>
                  Learn more
                </Text>
              </Text>

              <TextInput
                style={styles.textInput}
                multiline
                value={cameraDescription}
                onChangeText={handleCameraDescriptionChange}
                placeholder="Enter description here"
                placeholderTextColor="#717171"
              />
              <Text style={styles.characterCount}>
                {charactersLeft} characters available
              </Text>

              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !cameraDescription.trim() && styles.continueButtonDisabled
                ]}
                onPress={handleCameraModalContinue}
                disabled={!cameraDescription.trim()}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingVertical: 12,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#222222',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#717171',
    marginBottom: 32,
  },
  safetyList: {
    gap: 24,
    marginBottom: 40,
  },
  safetyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  safetyItemText: {
    fontSize: 16,
    color: '#222222',
    flex: 1,
    marginRight: 16,
  },
  infoSection: {
    gap: 16,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
  },
  infoText: {
    fontSize: 16,
    color: '#717171',
    lineHeight: 24,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#222222',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  createButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 24,
    minHeight: '60%',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#222222',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
    marginTop: 24,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#717171',
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 14,
    color: '#717171',
    marginTop: 8,
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#DDDDDD',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 