import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

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
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <View style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? '#333333' : '#F2F2F2' }
        ]}>
          <Ionicons 
            name="search" 
            size={20} 
            color="#666666" 
            style={styles.searchIcon} 
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}
            placeholder="Search services, providers..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {searchQuery.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons 
              name="search-outline" 
              size={64} 
              color={isDarkMode ? '#333333' : '#CCCCCC'} 
            />
            <Text style={[
              styles.emptyStateText,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              Search for services or providers
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Try searching for "cleaning", "repair", etc.
            </Text>
          </View>
        ) : (
          // Search results will be rendered here
          <View style={styles.resultsContainer}>
            {/* Example result item - you can replace with actual search results */}
            <TouchableOpacity style={styles.resultItem}>
              <Ionicons name="construct-outline" size={24} color="#00A86B" />
              <View style={styles.resultTextContainer}>
                <Text style={[
                  styles.resultTitle,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' }
                ]}>
                  Home Repair Services
                </Text>
                <Text style={styles.resultSubtitle}>
                  Professional repair and maintenance
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  resultsContainer: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  resultTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
}); 