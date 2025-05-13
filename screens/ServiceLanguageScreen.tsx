import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServiceLanguageScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { id: '1', name: 'English', code: 'en' },
    { id: '2', name: 'Arabic', code: 'ar' },
    { id: '3', name: 'French', code: 'fr' },
    { id: '4', name: 'Spanish', code: 'es' },
    { id: '5', name: 'German', code: 'de' },
    { id: '6', name: 'Italian', code: 'it' },
    { id: '7', name: 'Portuguese', code: 'pt' },
    { id: '8', name: 'Russian', code: 'ru' },
    { id: '9', name: 'Chinese', code: 'zh' },
    { id: '10', name: 'Japanese', code: 'ja' },
  ];

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
          Language Settings
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={styles.languageItem}
            onPress={() => setSelectedLanguage(language.name)}
          >
            <Text style={[styles.languageName, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>{language.name}</Text>
            {selectedLanguage === language.name && (
              <Ionicons name="checkmark" size={24} color="#00A86B" />
            )}
          </TouchableOpacity>
        ))}
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
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageName: {
    color: '#222',
  },
}); 