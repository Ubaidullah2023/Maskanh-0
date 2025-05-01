import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type DescriptionScreenRouteProp = RouteProp<RootStackParamList, 'Description'>;

type Highlight = {
  id: string;
  label: string;
  icon: string;
};

const highlights: Highlight[] = [
  { id: 'Expertly Crafted', label: 'Expertly Crafted', icon: 'construct' },
  { id: 'Top-Quality Construction', label: 'Top-Quality Construction', icon: 'hammer' },
  { id: 'Fully Equipped', label: 'Fully Equipped', icon: 'build' },
  { id: 'Premium Finishes', label: 'Premium Finishes', icon: 'brush' },
  { id: 'Spacious Layout', label: 'Spacious Layout', icon: 'resize' },
  { id: 'Dependable Service', label: 'Dependable Service', icon: 'shield-checkmark' },
];

export default function DescriptionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DescriptionScreenRouteProp>();
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Navigate to help/questions screen
  };

  const handleHighlightToggle = (id: string) => {
    setSelectedHighlights(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (selectedHighlights.length > 0) {
      navigation.navigate('CreateDescription', {
        ...route.params,
        highlights: selectedHighlights,
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Text style={styles.title}>Let's showcase your service</Text>
        <Text style={styles.subtitle}>
        Choosing up to 2 key highlights that best represent your offering:
        </Text>

        <View style={styles.highlightsGrid}>
          {highlights.map(highlight => (
            <TouchableOpacity
              key={highlight.id}
              style={[
                styles.highlightButton,
                selectedHighlights.includes(highlight.id) && styles.highlightButtonSelected
              ]}
              onPress={() => handleHighlightToggle(highlight.id)}
              disabled={selectedHighlights.length >= 2 && !selectedHighlights.includes(highlight.id)}
            >
              <Ionicons 
                name={highlight.icon as any} 
                size={24} 
                color={selectedHighlights.includes(highlight.id) ? '#FFFFFF' : '#222222'} 
              />
              <Text style={[
                styles.highlightText,
                selectedHighlights.includes(highlight.id) && styles.highlightTextSelected
              ]}>
                {highlight.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, selectedHighlights.length === 0 && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={selectedHighlights.length === 0}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 32,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  highlightButtonSelected: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },
  highlightText: {
    fontSize: 16,
    color: '#222222',
    marginLeft: 8,
  },
  highlightTextSelected: {
    color: '#FFFFFF',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
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
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
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