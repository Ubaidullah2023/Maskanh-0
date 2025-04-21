import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HelpCenterScreen() {
  const faqItems = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, tap on the "Sign Up" button on the login screen and follow the prompts to enter your information.',
    },
    {
      question: 'How do I post an ad?',
      answer: 'To post an ad, go to the "More" tab, select "Post Ad", and follow the steps to create your listing.',
    },
    {
      question: 'How do I contact a seller?',
      answer: 'You can contact a seller by tapping on the "Message" button on their listing or profile page.',
    },
    {
      question: 'How do I update my profile?',
      answer: 'To update your profile, go to the "Profile" tab and tap on the edit icon in the top right corner.',
    },
    {
      question: 'How do I report a problem?',
      answer: 'To report a problem, go to the "More" tab, select "Help Center", and tap on "Contact Support".',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search for help</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {faqItems.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
        
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A86B',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 