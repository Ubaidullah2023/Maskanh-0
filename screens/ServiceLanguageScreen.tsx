import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  icon: string;
  selected: boolean;
}

export default function ServiceLanguageScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [languages, setLanguages] = useState<Language[]>([
    {
      id: '1',
      name: 'English',
      nativeName: 'English',
      code: 'en',
      icon: 'language-outline',
      selected: true,
    },
    {
      id: '2',
      name: 'Urdu',
      nativeName: 'اردو',
      code: 'ur',
      icon: 'language-outline',
      selected: false,
    },
  ]);

  const selectLanguage = (id: string) => {
    setLanguages(prevLanguages =>
      prevLanguages.map(lang => ({
        ...lang,
        selected: lang.id === id,
      }))
    );
  };

  const renderLanguageOption = (language: Language) => (
    <TouchableOpacity
      key={language.id}
      style={[
        styles.languageCard,
        language.selected && styles.selectedCard
      ]}
      onPress={() => selectLanguage(language.id)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={language.selected ? ['#E8F5E9', '#F1F8E9'] : ['#F8F9FA', '#F8F9FA']}
        style={styles.iconContainer}
      >
        <Ionicons 
          name={language.icon as any} 
          size={24} 
          color={language.selected ? '#00A86B' : '#6C757D'} 
        />
      </LinearGradient>
      <View style={styles.languageContent}>
        <Text style={[
          styles.languageName,
          language.selected && styles.selectedText
        ]}>
          {language.name}
        </Text>
        <Text style={[
          styles.nativeName,
          language.selected && styles.selectedText
        ]}>
          {language.nativeName}
        </Text>
      </View>
      {language.selected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
        </View>
      )}
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
          <Text style={styles.headerTitle}>Language</Text>
          <View style={{ width: 50 }} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="globe-outline" size={24} color="#00A86B" />
            <Text style={styles.sectionTitle}>Select Language</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Choose your preferred language for the app
          </Text>
        </View>

        <View style={styles.languagesContainer}>
          {languages.map(renderLanguageOption)}
        </View>
      </View>
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
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    fontWeight: '700',
    color: '#212529',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    color: '#6C757D',
    marginLeft: 36,
  },
  languagesContainer: {
    gap: 16,
  },
  languageCard: {
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
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 80,
  },
  selectedCard: {
    borderColor: '#00A86B',
    backgroundColor: '#F0FFF4',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  languageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  languageName: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  nativeName: {
    fontSize: Platform.OS === 'ios' ? 13 : 12,
    color: '#6C757D',
  },
  selectedText: {
    color: '#00A86B',
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
}); 