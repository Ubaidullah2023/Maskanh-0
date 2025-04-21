import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type FilterInboxScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FilterInbox'>;

type FilterOption = {
  id: string;
  title: string;
  description: string;
  selected: boolean;
};

export default function FilterInboxScreen() {
  const navigation = useNavigation<FilterInboxScreenNavigationProp>();
  const [filters, setFilters] = useState<FilterOption[]>([
    {
      id: 'unread',
      title: 'Unread',
      description: 'Show only unread messages',
      selected: false,
    },
    {
      id: 'recent',
      title: 'Recent',
      description: 'Show messages from the last 24 hours',
      selected: true,
    },
    {
      id: 'clients',
      title: 'Clients',
      description: 'Show messages from active clients',
      selected: false,
    },
    {
      id: 'pending',
      title: 'Pending Orders',
      description: 'Show messages related to pending orders',
      selected: false,
    },
    {
      id: 'completed',
      title: 'Completed Orders',
      description: 'Show messages from completed orders',
      selected: false,
    },
  ]);

  const toggleFilter = (id: string) => {
    setFilters(currentFilters =>
      currentFilters.map(filter =>
        filter.id === id
          ? { ...filter, selected: !filter.selected }
          : filter
      )
    );
  };

  const applyFilters = () => {
    // Here you would typically pass the selected filters back to the Messages screen
    navigation.goBack();
  };

  const resetFilters = () => {
    setFilters(currentFilters =>
      currentFilters.map(filter => ({ ...filter, selected: false }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Messages</Text>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetFilters}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Filter By</Text>
        
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterOption,
              filter.selected && styles.selectedFilter,
            ]}
            onPress={() => toggleFilter(filter.id)}
          >
            <View style={styles.filterContent}>
              <Text style={[
                styles.filterTitle,
                filter.selected && styles.selectedText,
              ]}>
                {filter.title}
              </Text>
              <Text style={styles.filterDescription}>
                {filter.description}
              </Text>
            </View>
            <View style={[
              styles.checkbox,
              filter.selected && styles.checkedBox,
            ]}>
              {filter.selected && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    padding: 8,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#00A86B',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedFilter: {
    backgroundColor: '#f0f7ff',
  },
  filterContent: {
    flex: 1,
    marginRight: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  selectedText: {
    color: '#00A86B',
  },
  filterDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#00A86B',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 