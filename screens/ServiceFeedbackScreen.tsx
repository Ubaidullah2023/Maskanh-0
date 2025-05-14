import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface FeedbackCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string[];
}

export default function ServiceFeedbackScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const feedbackCategories: FeedbackCategory[] = [
    {
      id: '1',
      title: 'App Experience',
      description: 'Share your thoughts about the app interface and usability',
      icon: 'phone-portrait-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '2',
      title: 'Service Quality',
      description: 'Tell us about your experience with our services',
      icon: 'star-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '3',
      title: 'Customer Support',
      description: 'How was your experience with our support team?',
      icon: 'people-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '4',
      title: 'Suggestions',
      description: 'Share your ideas for improving our platform',
      icon: 'bulb-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
  ];

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a feedback category');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }
    // Handle feedback submission
    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderFeedbackCategory = (category: FeedbackCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={category.color}
        style={styles.iconContainer}
      >
        <Ionicons name={category.icon as any} size={24} color="#00A86B" />
      </LinearGradient>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
      <View style={styles.checkmarkContainer}>
        {selectedCategory === category.id && (
          <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRatingStars = () => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Rate your experience</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={star <= (rating || 0) ? "star" : "star-outline"}
                size={32}
                color={star <= (rating || 0) ? "#FFD700" : "#6C757D"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#00A86B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Feedback</Text>
          <View style={{ width: 50 }} />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <LinearGradient
            colors={['#E8F5E9', '#F1F8E9']}
            style={styles.introIconContainer}
          >
            <Ionicons name="chatbubble-ellipses" size={32} color="#00A86B" />
          </LinearGradient>
          <Text style={styles.introTitle}>Share Your Thoughts</Text>
          <Text style={styles.introDescription}>
            Your feedback helps us improve our services and create a better experience for everyone.
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {feedbackCategories.map(renderFeedbackCategory)}
        </View>

        {renderRatingStars()}

        <View style={styles.feedbackInputContainer}>
          <Text style={styles.inputLabel}>Your Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={6}
            placeholder="Tell us what you think..."
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Ionicons name="send-outline" size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingVertical: 16,
  },
  backButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  introIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
  categoriesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#00A86B',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  checkmarkContainer: {
    width: 24,
    alignItems: 'center',
  },
  ratingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  feedbackInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#212529',
    minHeight: 120,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 