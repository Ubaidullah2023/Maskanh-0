import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TermsPrivacyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useTheme();

  const menuItems = [
    {
      title: 'Terms of Service',
      icon: 'document-text-outline',
      route: 'TermsOfService',
      description: 'Read our terms of service and conditions'
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      route: 'PrivacyPolicy',
      description: 'Learn how we handle your data and privacy'
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
          Terms & Privacy
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[
          styles.sectionDescription,
          { color: isDarkMode ? '#CCCCCC' : '#666666' }
        ]}>
          Review our terms of service and privacy policy to understand how we operate and protect your information.
        </Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={item.route}
            style={[
              styles.option,
              { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                marginBottom: index < menuItems.length - 1 ? 16 : 0
              }
            ]}
            onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color="#00A86B"
                />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={[
                  styles.optionTitle,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' }
                ]}>
                  {item.title}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  { color: isDarkMode ? '#CCCCCC' : '#666666' }
                ]}>
                  {item.description}
                </Text>
              </View>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        ))}
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
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
}); 