import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const feedbackOptions = [
    'Excellent',
    'Good',
    'Needs improvement'
  ];

  const handleContactSupport = () => {
    Linking.openURL('https://maskanh.com');
  };

  const handleSubmit = () => {
    // Here you would typically send the feedback to your backend
    alert('Thank you for your feedback!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>Share your feedback</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={[
            styles.description,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Thanks for sending us your ideas, issues, or appreciations. We can't respond individually, but we'll pass it on to the teams who are working to help make Maskanh better for everyone.
          </Text>

          <Text style={[
            styles.helpText,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            If you do have a specific question, or need help resolving a problem, you can visit our Help Center or contact us to connect with our support team.
          </Text>

          <View style={styles.feedbackSection}>
            <Text style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              What's your feedback about?
            </Text>
            
            {feedbackOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: selectedFeedback === option 
                      ? '#00A86B' 
                      : isDarkMode ? '#333' : '#F5F5F5'
                  }
                ]}
                onPress={() => setSelectedFeedback(option)}
              >
                <Text style={[
                  styles.optionText,
                  {
                    color: selectedFeedback === option
                      ? '#FFFFFF'
                      : isDarkMode ? '#FFFFFF' : '#000000'
                  }
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contactSection}>
            <Text style={[
              styles.sectionTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              Need to get in touch?
            </Text>
            <Text style={[
              styles.contactText,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              We'll start with some questions and get you to the right place.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactSupport}
            >
              <Text style={styles.contactButtonText}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              opacity: selectedFeedback ? 1 : 0.5
            }
          ]}
          onPress={handleSubmit}
          disabled={!selectedFeedback}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  helpText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  feedbackSection: {
    marginBottom: 32,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'left',
  },
  contactSection: {
    marginBottom: 32,
    width: '100%',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  contactButtonText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  submitButton: {
    backgroundColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 