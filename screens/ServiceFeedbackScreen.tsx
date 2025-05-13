import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServiceFeedbackScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (feedback.trim().length === 0) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    // TODO: Implement feedback submission
    Alert.alert('Success', 'Thank you for your feedback!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {
        paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: '4%',
        minHeight: 56,
        maxHeight: 80,
        width: '100%',
      }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={Math.max(24, SCREEN_WIDTH * 0.06)} color="#00A86B" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Feedback
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>How would you rate your experience?</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={Math.max(24, SCREEN_WIDTH * 0.08)}
                color={star <= rating ? '#00A86B' : '#666'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>Your Feedback</Text>
        <TextInput
          style={[styles.input, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16, minHeight: Math.max(100, SCREEN_HEIGHT * 0.15) }]}
          multiline
          numberOfLines={6}
          placeholder="Tell us about your experience..."
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={[styles.submitButtonText, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#222',
    marginLeft: 16,
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  starButton: {
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    color: '#222',
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 