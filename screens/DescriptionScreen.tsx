import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type DescriptionScreenRouteProp = RouteProp<RootStackParamList, 'Description'>;

const { height } = Dimensions.get('window');
const MAX_CHARACTERS = 600;

const SAMPLE_DESCRIPTIONS = [
  "Our premium construction services combine expert craftsmanship with high-quality materials. With over 10 years of experience, we deliver exceptional results on time and within budget. Whether it's a new build, renovation, or repair, our professional team ensures meticulous attention to detail.",
  "Transform your property with our reliable masonry services. We specialize in brick, stone, and concrete work, creating beautiful and durable structures. Our team uses only the finest materials and proven techniques for results that stand the test of time.",
  "Professional home renovation services with an eye for detail. We bring your vision to life with expert craftsmanship, quality materials, and transparent pricing. Our team handles everything from concept to completion, ensuring a stress-free process."
];

export default function DescriptionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DescriptionScreenRouteProp>();
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (text: string) => {
    if (text.length <= MAX_CHARACTERS) {
      setDescription(text);
    }
  };

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_DESCRIPTIONS.length);
    return SAMPLE_DESCRIPTIONS[randomIndex];
  };

  const handleNext = () => {
    navigation.navigate('ProfileComplete', {
        ...route.params,
      description,
      highlights: ['Expertly Crafted', 'Top-Quality Construction'],
      guestType: 'any_guest',
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
          <Text style={styles.title}>Describe your service</Text>
        <Text style={styles.subtitle}>
            A compelling description helps attract potential clients. Highlight your expertise, quality of work, and what makes your service unique.
        </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder={getRandomPlaceholder()}
              placeholderTextColor="#999999"
              multiline
              maxLength={MAX_CHARACTERS}
              textAlignVertical="top"
              />
            <Text style={styles.characterCount}>
              {MAX_CHARACTERS - description.length} characters remaining
              </Text>
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for a great description:</Text>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={18} color="#00A86B" />
              <Text style={styles.tipText}>Highlight your experience and expertise</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={18} color="#00A86B" />
              <Text style={styles.tipText}>Mention the quality of materials you use</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={18} color="#00A86B" />
              <Text style={styles.tipText}>Describe your process or approach</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={18} color="#00A86B" />
              <Text style={styles.tipText}>Explain what makes your service stand out</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, !description.trim() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!description.trim()}
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
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: height * 0.05,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#222222',
    minHeight: 200,
    maxHeight: 300,
  },
  characterCount: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'right',
  },
  tipsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#444444',
    marginLeft: 8,
    flex: 1,
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
    fontWeight: '500',
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