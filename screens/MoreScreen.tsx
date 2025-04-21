import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

type MoreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'More'>;

export default function MoreScreen() {
  const navigation = useNavigation<MoreScreenNavigationProp>();

  const menuItems = [
    { title: 'Maskanh Pro', icon: 'star', screen: 'MaskanhProSetting' },
    { title: 'My Ads', icon: 'list', screen: 'MyAds' },
    { title: 'Certified Cars', icon: 'check-circle', screen: 'CertifiedCars' },
    { title: 'Post Ad', icon: 'plus-circle', screen: 'PostAd' },
    { title: 'Top Up', icon: 'credit-card', screen: 'TopUp' },
    { title: 'Personal Info', icon: 'user', screen: 'PersonalInfo' },
    { title: 'Legal Name', icon: 'id-card', screen: 'LegalName' },
    { title: 'Terms of Service', icon: 'file-text', screen: 'TermsOfService' },
    { title: 'Privacy Policy', icon: 'shield', screen: 'PrivacyPolicy' },
    { title: 'Help Center', icon: 'question-circle', screen: 'HelpCenter' },
    { title: 'Language', icon: 'globe', screen: 'Language' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => {
              // @ts-ignore - We know these screens exist in the navigator
              navigation.navigate(item.screen);
            }}
          >
            <View style={styles.menuItemContent}>
              <Icon name={item.icon} size={20} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        ))}
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
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
}); 