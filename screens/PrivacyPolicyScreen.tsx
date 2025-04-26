import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: '1. Introduction',
      content: 'Welcome to Maskanh. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.',
      icon: 'information-circle-outline'
    },
    {
      title: '2. Information We Collect',
      content: 'We collect information that you provide directly to us, including but not limited to:',
      bulletPoints: [
        'Personal information (name, email address, phone number)',
        'Profile information (profile picture, bio)',
        'Payment information',
        'Communication preferences'
      ],
      icon: 'document-text-outline'
    },
    {
      title: '3. How We Use Your Information',
      content: 'We use the information we collect to:',
      bulletPoints: [
        'Provide, maintain, and improve our services',
        'Process transactions and send related information',
        'Send administrative information',
        'Provide customer support',
        'Send marketing and promotional communications'
      ],
      icon: 'settings-outline'
    },
    {
      title: '4. Information Sharing',
      content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this Privacy Policy.',
      icon: 'share-social-outline'
    },
    {
      title: '5. Data Security',
      content: 'We implement appropriate technical and organizational measures to protect the security of your personal information.',
      icon: 'shield-checkmark-outline'
    },
    {
      title: '6. Your Rights',
      content: 'You have the right to:',
      bulletPoints: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request deletion of your data',
        'Object to processing of your data',
        'Data portability'
      ],
      icon: 'key-outline'
    },
    {
      title: '7. Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at support@maskanh.com.',
      icon: 'mail-outline'
    }
  ];

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
        ]}>
          Privacy Policy
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.introSection}>
          <Text style={[
            styles.introTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Your Privacy Matters
          </Text>
          <Text style={[
            styles.introText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            We are committed to protecting your privacy and ensuring you have a positive experience on our platform.
          </Text>
        </View>

        {sections.map((section, index) => (
          <View 
            key={section.title}
            style={[
              styles.section,
              { 
                borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5',
                marginBottom: index === sections.length - 1 ? 0 : 24
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: isDarkMode ? '#333333' : '#f5f5f5' }
              ]}>
                <Ionicons 
                  name={section.icon as any} 
                  size={20} 
                  color="#00A86B" 
                />
              </View>
              <Text style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>
                {section.title}
              </Text>
            </View>

            <Text style={[
              styles.text,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              {section.content}
            </Text>

            {section.bulletPoints && section.bulletPoints.map((point, pointIndex) => (
              <View key={pointIndex} style={styles.bulletPointContainer}>
                <View style={[
                  styles.bulletPoint,
                  { backgroundColor: isDarkMode ? '#CCCCCC' : '#666666' }
                ]} />
                <Text style={[
                  styles.bulletPointText,
                  { color: isDarkMode ? '#CCCCCC' : '#666666' }
                ]}>
                  {point}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[
            styles.footerText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            Last updated: March 15, 2024
          </Text>
        </View>
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
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  introSection: {
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  bulletPointText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 