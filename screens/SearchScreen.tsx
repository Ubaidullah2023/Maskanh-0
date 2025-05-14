import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServiceDetails'>;

interface Service {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  views: number;
  postedTime: string;
  images: ImageSourcePropType[];
  category?: string;
  location?: string;
}

// Services data imported from FindServiceScreen
const allServices: Service[] = [
  {
    id: '1',
    title: 'Muhammad Ali',
    subtitle: 'Electrician • Kamra',
    rating: 4.8,
    views: 243,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/electrician.png'),
      require('../assets/services/carpenter.png'),
      require('../assets/services/Drill.png'),
    ],
    category: 'Electrician',
    location: 'Kamra',
  },
  {
    id: '2',
    title: 'Ahmad Workshop',
    subtitle: 'Carpenter • Islamabad',
    rating: 4.7,
    views: 150,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/carpenter.png'),
      require('../assets/services/Drill.png'),
      require('../assets/services/Heavy-Machinery.png'),
    ],
    category: 'Carpenter',
    location: 'Islamabad',
  },
  {
    id: '3',
    title: 'Ali Construction',
    subtitle: 'Drill Services • Rawalpindi',
    rating: 4.7,
    views: 180,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Drill.png'),
      require('../assets/services/Heavy-Machinery.png'),
      require('../assets/services/Interior-Designer.jpeg'),
    ],
    category: 'Contractor',
    location: 'Rawalpindi',
  },
  {
    id: '4',
    title: 'Modern Machinery',
    subtitle: 'Heavy Equipment • Lahore',
    rating: 4.7,
    views: 200,
    postedTime: '4 days ago',
    images: [
      require('../assets/services/Heavy-Machinery.png'),
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
    ],
    category: 'Heavy Equipment',
    location: 'Lahore',
  },
  {
    id: '5',
    title: 'Design Masters',
    subtitle: 'Interior Designer • Karachi',
    rating: 4.9,
    views: 190,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
    ],
    category: 'Interior Designer',
    location: 'Karachi',
  },
  {
    id: '6',
    title: 'Quick Labor',
    subtitle: 'Labor Services • Peshawar',
    rating: 4.6,
    views: 170,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
      require('../assets/services/Professional-Painter.png'),
    ],
    category: 'Labor',
    location: 'Peshawar',
  },
  {
    id: '7',
    title: 'Plumbing Pro',
    subtitle: 'Plumber • Multan',
    rating: 4.7,
    views: 160,
    postedTime: '1 day ago',
    images: [
      require('../assets/services/Plumber.png'),
      require('../assets/services/Professional-Painter.png'),
      require('../assets/services/Solar-Panel.png'),
    ],
    category: 'Plumber',
    location: 'Multan',
  },
  {
    id: '8',
    title: 'Color Masters',
    subtitle: 'Professional Painter • Faisalabad',
    rating: 4.7,
    views: 150,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Professional-Painter.png'),
      require('../assets/services/Solar-Panel.png'),
      require('../assets/services/Welder.png'),
    ],
    category: 'Painter',
    location: 'Faisalabad',
  },
  {
    id: '9',
    title: 'Solar Solutions',
    subtitle: 'Solar Panel Installation • Islamabad',
    rating: 4.9,
    views: 200,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Solar-Panel.png'),
      require('../assets/services/Welder.png'),
      require('../assets/services/electrician.png'),
    ],
    category: 'Solar Work',
    location: 'Islamabad',
  },
  {
    id: '10',
    title: 'Welding Experts',
    subtitle: 'Welder • Rawalpindi',
    rating: 4.7,
    views: 180,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Welder.png'),
      require('../assets/services/electrician.png'),
      require('../assets/services/carpenter.png'),
    ],
    category: 'Welder & Blacksmith',
    location: 'Rawalpindi',
  },
];

// Extended popular search terms based on categories
const popularSearchTerms = [
  "Electrician", "Carpenter", "Plumber", "Painter", "Interior Designer",
  "Solar Work", "Welder", "Mason", "Contractor", "Attock", "Kamra", "Islamabad"
];

const { width } = Dimensions.get('window');
const cardWidth = width < 768 ? width - 32 : (width - 48) / 2;

export default function SearchScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Enhanced search filtering with debounce
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Clear any existing timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    
    // Set a new timeout for improved performance
    const newTimeout = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      
      const filteredResults = allServices.filter(service => 
        service.title.toLowerCase().includes(query) ||
        service.subtitle.toLowerCase().includes(query) ||
        (service.category && service.category.toLowerCase().includes(query)) ||
        (service.location && service.location.toLowerCase().includes(query))
      );
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 300);
    
    setTypingTimeout(newTimeout);
    
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [searchQuery]);
  
  const handleServicePress = (service: Service) => {
    // Save search term to recent searches
    if (searchQuery.trim() !== '') {
      const updatedRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedRecentSearches);
    }
    
    // Navigate to service details
    navigation.navigate('ServiceDetails', {
      id: service.id,
      images: service.images,
      title: service.title,
      subtitle: service.subtitle,
      rating: service.rating,
      views: service.views,
      postedTime: service.postedTime
    });
  };
  
  const handlePopularSearchPress = (term: string) => {
    setSearchQuery(term);
  };
  
  const handleRecentSearchPress = (term: string) => {
    setSearchQuery(term);
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity 
      style={[
        styles.serviceCard, 
        { 
          backgroundColor: isDarkMode ? '#2A2A2A' : '#fff',
          width: cardWidth,
        }
      ]}
      onPress={() => handleServicePress(item)}
      activeOpacity={0.8}
    >
      <Image 
        source={item.images[0]}
        style={styles.serviceImage}
        resizeMode="cover"
      />
      <View style={styles.serviceInfo}>
        <Text 
          style={[styles.serviceTitle, { color: isDarkMode ? '#fff' : '#000' }]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text 
          style={[styles.serviceSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}
          numberOfLines={1}
        >
          {item.subtitle}
        </Text>
        <View style={styles.serviceFooter}>
          <View style={styles.serviceRating}>
            <Text style={styles.ratingText}>{item.rating} ⭐</Text>
          </View>
          <Text style={[styles.serviceMeta, { color: isDarkMode ? '#999' : '#999' }]}>
            {item.postedTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <View style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? '#333333' : '#F2F2F2' }
        ]}>
          <Ionicons 
            name="search" 
            size={20} 
            color={isDarkMode ? '#ccc' : '#666666'} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}
            placeholder="Search services, providers, locations..."
            placeholderTextColor={isDarkMode ? '#999' : '#666666'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={isDarkMode ? '#ccc' : '#666666'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A86B" />
          <Text style={[styles.loadingText, { color: isDarkMode ? '#ccc' : '#666' }]}>
            Searching...
          </Text>
        </View>
      ) : (
        <>
          {searchQuery.length === 0 ? (
            <ScrollView 
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                      Recent Searches
                    </Text>
                    <TouchableOpacity onPress={() => setRecentSearches([])}>
                      <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.termsList}>
                    {recentSearches.map((term, index) => (
                      <TouchableOpacity 
                        key={`recent-${index}`} 
                        style={[
                          styles.searchTerm,
                          { backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }
                        ]}
                        onPress={() => handleRecentSearchPress(term)}
                      >
                        <Ionicons name="time-outline" size={16} color="#00A86B" style={styles.termIcon} />
                        <Text style={[styles.termText, { color: isDarkMode ? '#fff' : '#000' }]}>
                          {term}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                  Popular Searches
                </Text>
                <View style={styles.termsList}>
                  {popularSearchTerms.map((term, index) => (
                    <TouchableOpacity 
                      key={`popular-${index}`} 
                      style={[
                        styles.searchTerm,
                        { backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }
                      ]}
                      onPress={() => handlePopularSearchPress(term)}
                    >
                      <Ionicons 
                        name={term === 'Attock' || term === 'Kamra' || term === 'Islamabad' ? 'location' : 'trending-up'} 
                        size={16} 
                        color="#00A86B" 
                        style={styles.termIcon} 
                      />
                      <Text style={[styles.termText, { color: isDarkMode ? '#fff' : '#000' }]}>
                        {term}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.emptyStateContainer}>
                <Ionicons 
                  name="search-outline" 
                  size={64} 
                  color={isDarkMode ? '#333333' : '#EEEEEE'} 
                />
                <Text style={[
                  styles.emptyStateText,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' }
                ]}>
                  Find Your Service Provider
                </Text>
                <Text style={[
                  styles.emptyStateSubtext,
                  { color: isDarkMode ? '#999' : '#666666' }
                ]}>
                  Search by name, service type, or location
                </Text>
              </View>
            </ScrollView>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  renderItem={renderServiceItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.resultsContainer}
                  numColumns={width >= 768 ? 2 : 1}
                  key={width >= 768 ? 'two-columns' : 'one-column'}
                  columnWrapperStyle={width >= 768 ? styles.columnWrapper : undefined}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.noResultsContainer}>
                  <Ionicons 
                    name="search-outline" 
                    size={64} 
                    color={isDarkMode ? '#333333' : '#EEEEEE'} 
                  />
                  <Text style={[
                    styles.noResultsText,
                    { color: isDarkMode ? '#FFFFFF' : '#000000' }
                  ]}>
                    No results found
                  </Text>
                  <Text style={[
                    styles.noResultsSubtext,
                    { color: isDarkMode ? '#999' : '#666666' }
                  ]}>
                    Try a different search term or explore categories
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
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
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  clearText: {
    color: '#00A86B',
    fontSize: 14,
    fontWeight: '500',
  },
  termsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  termIcon: {
    marginRight: 6,
  },
  termText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  resultsContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  serviceCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
    alignSelf: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 140,
  },
  serviceInfo: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#00A86B',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceMeta: {
    fontSize: 12,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 