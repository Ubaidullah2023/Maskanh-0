import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type ConfirmAddressScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmAddress'>;

export default function ConfirmAddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmAddressScreenRouteProp>();
  const [showLocation, setShowLocation] = useState(true);
  const [addressDetails, setAddressDetails] = useState({
    country: 'Pakistan',
    street: route.params?.street || '',
    building: '',
    city: route.params?.city || '',
    province: route.params?.province || 'Islamabad Capital Territory',
    postalCode: '',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    // Navigate to the BasicInfo screen with the confirmed address and place type
    navigation.navigate('BasicInfo', {
      placeType: route.params?.placeType || 'entire',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm your address</Text>
      </View>

      <View style={styles.content}>
        {/* Country Selection */}
        <TouchableOpacity style={styles.countryContainer}>
          <View>
            <Text style={styles.inputLabel}>Country / region</Text>
            <Text style={styles.countryText}>Pakistan</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color="#666666" />
        </TouchableOpacity>

        {/* Address Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Street address</Text>
            <TextInput
              style={styles.input}
              value={addressDetails.street}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, street: text })}
              placeholder="Enter street address"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Apt, floor, bldg (if applicable)</Text>
            <TextInput
              style={styles.input}
              value={addressDetails.building}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, building: text })}
              placeholder="Enter building details"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>City / town / village</Text>
            <TextInput
              style={styles.input}
              value={addressDetails.city}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, city: text })}
              placeholder="Enter city"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Province / state / territory (if applicable)</Text>
            <TextInput
              style={styles.input}
              value={addressDetails.province}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, province: text })}
              placeholder="Enter province"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={[styles.inputField, styles.lastInputField]}>
            <Text style={styles.inputLabel}>Postal code (if applicable)</Text>
            <TextInput
              style={styles.input}
              value={addressDetails.postalCode}
              onChangeText={(text) => setAddressDetails({ ...addressDetails, postalCode: text })}
              placeholder="Enter postal code"
              placeholderTextColor="#999999"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Show Location Toggle */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleText}>
            <Text style={styles.toggleTitle}>Show your specific location</Text>
            <Text style={styles.toggleDescription}>
              Make it clear to clients where your place is located. We'll only share your address after they've made a reservation.{' '}
              <Text style={styles.learnMore}>Learn more</Text>
            </Text>
          </View>
          <Switch
            value={showLocation}
            onValueChange={setShowLocation}
            trackColor={{ false: '#DDDDDD', true: '#00A86B' }}
            thumbColor="#FFFFFF"
            style={styles.switch}
          />
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Looks good</Text>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 0,
    marginBottom: 1,
    backgroundColor: '#FFFFFF',
  },
  countryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
    marginTop: 2,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: 16,
  },
  lastInputField: {
    borderBottomWidth: 0,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    color: '#222222',
    padding: 0,
    marginTop: 2,
    height: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 1,
  },
  toggleText: {
    flex: 1,
    marginRight: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 6,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  learnMore: {
    textDecorationLine: 'underline',
    color: '#666666',
  },
  switch: {
    transform: [{ scale: 1 }],
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 1,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 