import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type PriceSettingScreenRouteProp = RouteProp<RootStackParamList, 'PriceSetting'>;

export default function PriceSettingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PriceSettingScreenRouteProp>();
  const [basePrice, setBasePrice] = useState('44');
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(basePrice);
  const inputRef = useRef<TextInput>(null);
  const serviceFee = 6;
  const totalBeforeTax = Number(basePrice) + serviceFee;
  const hostEarnings = Number(basePrice) - 1; // Assuming $1 platform fee

  const handlePriceChange = (text: string) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setTempPrice(numericValue);
  };

  const handleEditComplete = () => {
    if (tempPrice && Number(tempPrice) > 0) {
      setBasePrice(tempPrice);
    }
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const startEditing = () => {
    setTempPrice(basePrice);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Navigate to help/questions screen
  };

  const handleNext = () => {
    if (!basePrice) {
      Alert.alert('Please set a base price');
      return;
    }

    navigation.navigate('Discounts', {
      ...route.params,
      basePrice: Number(basePrice),
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Now, set your price</Text>
        <Text style={styles.subtitle}>You can adjust your pricing anytime to match demand. Below are the displayed values, and you can tailor them as needed</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceSymbol}>Rs</Text>
          {isEditing ? (
            <TextInput
              ref={inputRef}
              style={[styles.priceText, styles.priceInput]}
              value={tempPrice}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
              onBlur={handleEditComplete}
              onSubmitEditing={handleEditComplete}
              autoFocus
              selectTextOnFocus
              maxLength={5}
            />
          ) : (
            <TouchableOpacity onPress={startEditing}>
              <View style={styles.priceDisplayContainer}>
                <Text style={styles.priceText}>{basePrice}</Text>
                <View style={styles.editButton}>
                  <Text style={styles.editIcon}>✎</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.priceBreakdown}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Base price</Text>
            <Text style={styles.breakdownValue}>Rs{basePrice}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Client service fee</Text>
            <Text style={styles.breakdownValue}>Rs{serviceFee}</Text>
          </View>
          <View style={[styles.breakdownItem, styles.totalItem]}>
            <Text style={styles.breakdownLabel}>Client price before taxes</Text>
            <Text style={styles.breakdownValue}>Rs{totalBeforeTax}</Text>
          </View>
        </View>

        <View style={styles.earningsContainer}>
          <Text style={styles.earningsLabel}>You earn</Text>
          <Text style={styles.earningsValue}>Rs{hostEarnings}</Text>
        </View>

        <View style={styles.similarListings}>
          <Text style={styles.similarListingsText}>
             Similar listings range: Rs46 – Rs69
          </Text>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.learnMoreText}>Learn more about pricing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    paddingVertical: 12,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
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
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#717171',
    marginBottom: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  priceSymbol: {
    fontSize: 48,
    fontWeight: '600',
    color: '#222222',
  },
  priceText: {
    fontSize: 48,
    fontWeight: '600',
    color: '#222222',
  },
  editButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  editIcon: {
    fontSize: 24,
    color: '#222222',
  },
  priceBreakdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 12,
    marginBottom: 0,
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#222222',
  },
  breakdownValue: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  earningsContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  earningsLabel: {
    fontSize: 16,
    color: '#222222',
  },
  earningsValue: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },
  similarListings: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  similarListingsText: {
    fontSize: 16,
    color: '#222222',
  },
  learnMoreText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
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
  nextButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  priceDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    minWidth: 120,
    textAlign: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#222222',
  },
}); 