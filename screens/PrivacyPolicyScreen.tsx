import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to Maskanh. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
        </Text>
        
        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.text}>
          We collect information that you provide directly to us, including but not limited to:
        </Text>
        <Text style={styles.bulletPoint}>• Personal information (name, email address, phone number)</Text>
        <Text style={styles.bulletPoint}>• Profile information (profile picture, bio)</Text>
        <Text style={styles.bulletPoint}>• Payment information</Text>
        <Text style={styles.bulletPoint}>• Communication preferences</Text>
        
        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information we collect to:
        </Text>
        <Text style={styles.bulletPoint}>• Provide, maintain, and improve our services</Text>
        <Text style={styles.bulletPoint}>• Process transactions and send related information</Text>
        <Text style={styles.bulletPoint}>• Send administrative information</Text>
        <Text style={styles.bulletPoint}>• Provide customer support</Text>
        <Text style={styles.bulletPoint}>• Send marketing and promotional communications</Text>
        
        <Text style={styles.sectionTitle}>4. Information Sharing</Text>
        <Text style={styles.text}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this Privacy Policy.
        </Text>
        
        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate technical and organizational measures to protect the security of your personal information.
        </Text>
        
        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:
        </Text>
        <Text style={styles.bulletPoint}>• Access your personal information</Text>
        <Text style={styles.bulletPoint}>• Correct inaccurate data</Text>
        <Text style={styles.bulletPoint}>• Request deletion of your data</Text>
        <Text style={styles.bulletPoint}>• Object to processing of your data</Text>
        <Text style={styles.bulletPoint}>• Data portability</Text>
        
        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at support@maskanh.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginLeft: 16,
    marginBottom: 8,
  },
}); 