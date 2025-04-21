import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type AllServicesScreenProps = {
  route: RouteProp<RootStackParamList, 'AllServices'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'AllServices'>;
};

const featuredServices = [
  {
    id: '1',
    title: 'Electrician',
    rating: 4.8,
    image: require('../assets/services/electrician.png'),
  },
  {
    id: '2',
    title: 'Carpenter',
    rating: 4.7,
    image: require('../assets/services/carpenter.png'),
  },
  {
    id: '3',
    title: 'Drill',
    rating: 4.7,
    image: require('../assets/services/Drill.png'),
  },
  {
    id: '4',
    title: 'Heavy-Machinery',
    rating: 4.7,
    image: require('../assets/services/Heavy-Machinery.png'),
  },
  {
    id: '5',
    title: 'Interior-Designer',
    rating: 4.7,
    image: require('../assets/services/Interior-Designer.jpeg'),
  },
  {
    id: '6',
    title: 'Labor',
    rating: 4.7,
    image: require('../assets/services/Labor.png'),
  },
  {
    id: '7',
    title: 'Plumber',
    rating: 4.7,
    image: require('../assets/services/Plumber.png'),
  },
  {
    id: '8',
    title: 'Professional-Painter',
    rating: 4.7,
    image: require('../assets/services/Professional-Painter.png'),
  },
  {
    id: '9',
    title: 'Solar-Panel',
    rating: 4.7,
    image: require('../assets/services/Solar-Panel.png'),
  },
  {
    id: '10',
    title: 'Welder',
    rating: 4.7,
    image: require('../assets/services/Welder.png'),
  },
];

const AllServicesScreen: React.FC<AllServicesScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;
  const { isDarkMode } = useTheme();

  const services = type === 'featured' ? featuredServices : [];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#fff'}
      />
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          {type === 'featured' ? 'Featured Services' : 'Recommended Services'}
        </Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.servicesList}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { 
                backgroundColor: isDarkMode ? '#333' : '#fff',
                shadowColor: isDarkMode ? '#000' : '#000',
              }]}
              onPress={() => navigation.navigate('Checkout', { title: service.title, price: 500 })}
            >
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={[styles.serviceTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {service.title}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={[styles.ratingText, { color: isDarkMode ? '#fff' : '#666' }]}>
                    {service.rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  servicesList: {
    padding: 16,
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  ratingText: {
    fontSize: 14,
  },
});

export default AllServicesScreen; 