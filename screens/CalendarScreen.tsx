import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '../constants';

export default function CalendarScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('Listing', {
              placeType: 'entire',
              guestCount: 1,
              bedroomCount: 1,
              bedCount: 1,
              hasLock: true,
              amenities: [],
              photos: [],
              title: '',
              highlights: [],
              description: '',
              guestType: 'any_guest',
              basePrice: 0
            })}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create listing</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.monthTitle}>April 2025</Text>

        {/* ... rest of the existing code ... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 24,
  },
}); 