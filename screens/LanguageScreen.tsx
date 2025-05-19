import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type LanguageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Language'>;

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function LanguageScreen() {
  const navigation = useNavigation<LanguageScreenNavigationProp>();
  const { isDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();
  
  const languages: Language[] = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇬🇧'
    },
    { 
      code: 'ur', 
      name: 'Urdu', 
      nativeName: 'اردو',
      flag: '🇵🇰'
    }
  ];

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await setLanguage(languageCode as 'en' | 'ur');
      Alert.alert(
        'Language Changed',
        'Please restart the app to apply the language change.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change language. Please try again.');
    }
  };

  const renderLanguageItem = (item: Language) => (
    <TouchableOpacity 
      style={[
        styles.languageItem,
        { 
          backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
          borderColor: isDarkMode ? '#333333' : '#E5E5E5'
        },
        language === item.code && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageChange(item.code)}
    >
      <View style={styles.languageInfo}>
        <View style={styles.languageHeader}>
          <Text style={styles.flag}>{item.flag}</Text>
          <Text style={[
            styles.languageName,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            {item.name}
          </Text>
        </View>
        <Text style={[
          styles.nativeName,
          { color: isDarkMode ? '#CCCCCC' : '#666666' }
        ]}>
          {item.nativeName}
        </Text>
      </View>
      {language === item.code && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
        </View>
      )}
    </TouchableOpacity>
  );

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
          Language
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.introSection}>
          <Text style={[
            styles.introTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Select Language
          </Text>
          <Text style={[
            styles.introText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            Choose your preferred language for the app interface.
          </Text>
        </View>

        <View style={styles.languageList}>
          {languages.map((language) => (
            <View key={language.code} style={styles.languageItemContainer}>
              {renderLanguageItem(language)}
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Ionicons 
            name="information-circle-outline" 
            size={24} 
            color={isDarkMode ? '#CCCCCC' : '#666666'} 
          />
          <Text style={[
            styles.infoText,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            You may need to restart the app for the language change to take effect.
          </Text>
        </View>
      </View>
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
    padding: 20,
  },
  introSection: {
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  languageList: {
    marginBottom: 24,
  },
  languageItemContainer: {
    marginBottom: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  selectedLanguageItem: {
    borderColor: '#00A86B',
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  languageInfo: {
    flex: 1,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
  },
  nativeName: {
    fontSize: 16,
    marginLeft: 36,
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 'auto',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
  },
}); 