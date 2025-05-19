import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PersonalInformationScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const renderInfoItem = (label: string, value: string, action: string = 'Edit') => (
    <View style={styles.infoItem}>
      <View>
        <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          {label}
        </Text>
        <Text style={[styles.value, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
          {value}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.actionText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Personal info
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {renderInfoItem('Legal name', 'Ubaidullah Hello', 'Edit')}
        {renderInfoItem('Preferred first name', 'Not provided', 'Add')}
        {renderInfoItem('Phone number', 'Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they\'re used.', 'Add')}
        {renderInfoItem('Email', 'u***3@gmail.com', 'Edit')}
        {renderInfoItem('Address', 'Not provided', 'Add')}
        {renderInfoItem('Emergency contact', 'Not provided', 'Add')}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    maxWidth: '80%',
  },
  actionText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
}); 