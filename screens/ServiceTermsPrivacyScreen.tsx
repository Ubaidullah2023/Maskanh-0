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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  color: string[];
}

export default function ServiceTermsPrivacyScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleContactPrivacy = () => {
    Alert.alert(
      "Coming Soon",
      "This feature will be available in the next update",
      [{ text: "OK" }]
    );
  };

  const privacySections: PrivacySection[] = [
    {
      id: '1',
      title: 'Data Collection',
      description: 'Learn about what information we collect and how we use it to provide our services.',
      content: 'We collect information that you provide directly to us, including your name, email address, phone number, and service-related information. This helps us provide and improve our services, communicate with you, and ensure the security of our platform.',
      icon: 'shield-checkmark-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '2',
      title: 'Information Usage',
      description: 'Understand how your information is used to improve your experience.',
      content: 'Your information is used to provide, maintain, and improve our services, develop new features, and protect our users. We may use your information to send you updates, marketing communications, and respond to your requests.',
      icon: 'analytics-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '3',
      title: 'Data Security',
      description: 'Our commitment to protecting your personal information and maintaining security.',
      content: 'We implement appropriate technical and organizational measures to protect your personal information. This includes encryption, secure servers, and regular security assessments. We also limit access to your personal information to authorized personnel only.',
      icon: 'lock-closed-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '4',
      title: 'Your Rights',
      description: 'Your rights regarding your personal data and how to exercise them.',
      content: 'You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact our privacy team through the button below.',
      icon: 'person-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '5',
      title: 'Cookies Policy',
      description: 'How we use cookies and similar technologies on our platform.',
      content: 'We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.',
      icon: 'settings-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
    {
      id: '6',
      title: 'Updates & Changes',
      description: 'How we notify you about changes to our privacy policy.',
      content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.',
      icon: 'notifications-outline',
      color: ['#E8F5E9', '#F1F8E9'],
    },
  ];

  const renderPrivacySection = (section: PrivacySection) => (
    <TouchableOpacity
      key={section.id}
      style={[
        styles.sectionCard,
        selectedSection === section.id && styles.selectedSection
      ]}
      onPress={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={section.color}
        style={styles.iconContainer}
      >
        <Ionicons name={section.icon as any} size={24} color="#00A86B" />
      </LinearGradient>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionDescription}>{section.description}</Text>
        {selectedSection === section.id && (
          <View style={styles.expandedContent}>
            <Text style={styles.contentText}>{section.content}</Text>
          </View>
        )}
      </View>
      <Ionicons 
        name={selectedSection === section.id ? "chevron-up" : "chevron-down"} 
        size={24} 
        color="#6C757D" 
      />
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Terms & Privacy</Text>
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
            <Ionicons name="shield-checkmark" size={32} color="#00A86B" />
          </LinearGradient>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introDescription}>
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </Text>
        </View>

        <View style={styles.sectionsContainer}>
          {privacySections.map(renderPrivacySection)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactPrivacy}
            activeOpacity={0.7}
          >
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Contact Privacy Team</Text>
          </TouchableOpacity>
        </View>
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
  sectionsContainer: {
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedSection: {
    borderWidth: 2,
    borderColor: '#00A86B',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  contentText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 12,
    padding: 16,
    width: width * 0.8,
    gap: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 