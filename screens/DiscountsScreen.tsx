import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type DiscountsScreenRouteProp = RouteProp<RootStackParamList, 'Discounts'>;

export default function DiscountsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DiscountsScreenRouteProp>();
  
  const [newListingPromo, setNewListingPromo] = useState(true);
  const [weeklyDiscount, setWeeklyDiscount] = useState(true);
  const [monthlyDiscount, setMonthlyDiscount] = useState(true);

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Implement questions/help functionality
  };

  const handleNext = () => {
    navigation.navigate('SafetyDetails', {
      ...route.params,
      newListingDiscount: newListingPromo ? 20 : 0,
      weeklyDiscount: weeklyDiscount ? 10 : 0,
      monthlyDiscount: monthlyDiscount ? 20 : 0,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add discounts</Text>
        <Text style={styles.subtitle}>
        Make your service more appealing to attract early clients and earn your first reviews.
        </Text>

        <View style={styles.discountsList}>
          <View style={styles.discountItem}>
            <View style={styles.discountInfo}>
              <Text style={styles.discountPercentage}>20%</Text>
              <View>
                <Text style={styles.discountTitle}>New listing promotion</Text>
                <Text style={styles.discountDescription}>
                Offer 20% off on your first 3 services
                </Text>
              </View>
            </View>
            <Switch
              value={newListingPromo}
              onValueChange={setNewListingPromo}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.discountItem}>
            <View style={styles.discountInfo}>
              <View style={styles.percentageBox}>
                <Text style={styles.discountPercentage}>10%</Text>
              </View>
              <View>
                <Text style={styles.discountTitle}>Weekly discount</Text>
                <Text style={styles.discountDescription}>
                For services booked for 7 days or more.
                </Text>
              </View>
            </View>
            <Switch
              value={weeklyDiscount}
              onValueChange={setWeeklyDiscount}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.discountItem}>
            <View style={styles.discountInfo}>
              <View style={styles.percentageBox}>
                <Text style={styles.discountPercentage}>20%</Text>
              </View>
              <View>
                <Text style={styles.discountTitle}>Monthly discount</Text>
                <Text style={styles.discountDescription}>
                For services booked for 28 days or more.
                </Text>
              </View>
            </View>
            <Switch
              value={monthlyDiscount}
              onValueChange={setMonthlyDiscount}
              trackColor={{ false: '#DDDDDD', true: '#222222' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Only one discount will be applied per stay.{' '}
          <Text style={styles.learnMore}>Learn more</Text>
        </Text>
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
  discountsList: {
    gap: 16,
  },
  discountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  percentageBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  discountPercentage: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
  },
  discountTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  discountDescription: {
    fontSize: 14,
    color: '#717171',
  },
  disclaimer: {
    fontSize: 14,
    color: '#717171',
    marginTop: 24,
  },
  learnMore: {
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
}); 