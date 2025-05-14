import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  Dimensions,
  FlatList,
  TextInput,
  Animated,
  Pressable
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type AllServicesScreenProps = {
  route: RouteProp<RootStackParamList, 'AllServices'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'AllServices'>;
};

const { width } = Dimensions.get('window');

// Service provider data
const serviceProviders = [
  {
    id: '1',
    title: 'Muhammad Ali',
    subtitle: 'Electrician • Kamra',
    rating: 4.8,
    reviews: 56,
    views: 243,
    hourlyRate: 50,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/electrician.png'),
      require('../assets/services/carpenter.png'),
      require('../assets/services/Drill.png'),
    ],
    category: 'Electrician',
    description: 'Professional electrician with 8+ years of experience in residential and commercial electrical work.',
  },
  {
    id: '2',
    title: 'Ahmad Workshop',
    subtitle: 'Carpenter • Islamabad',
    rating: 4.7,
    reviews: 42,
    views: 150,
    hourlyRate: 45,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/carpenter.png'),
      require('../assets/services/Drill.png'),
      require('../assets/services/Heavy-Machinery.png'),
    ],
    category: 'Carpenter',
    description: 'Custom furniture and carpentry services. Specialized in modern designs with quality wood.',
  },
  {
    id: '3',
    title: 'Ali Construction',
    subtitle: 'Drill Services • Rawalpindi',
    rating: 4.7,
    reviews: 38,
    views: 180,
    hourlyRate: 55,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Drill.png'),
      require('../assets/services/Heavy-Machinery.png'),
      require('../assets/services/Interior-Designer.jpeg'),
    ],
    category: 'Contractor',
    description: 'Expert drilling services for all your construction needs. We use professional grade equipment.',
  },
  {
    id: '4',
    title: 'Modern Machinery',
    subtitle: 'Heavy Equipment • Lahore',
    rating: 4.8,
    reviews: 64,
    views: 200,
    hourlyRate: 200,
    postedTime: '4 days ago',
    images: [
      require('../assets/services/Heavy-Machinery.png'),
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
    ],
    category: 'Heavy Machinery',
    description: 'Heavy equipment rental and operation services for construction projects of all sizes.',
  },
  {
    id: '5',
    title: 'Design Masters',
    subtitle: 'Interior Designer • Karachi',
    rating: 4.9,
    reviews: 72,
    views: 190,
    hourlyRate: 80,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
    ],
    category: 'Interior Designer',
    description: 'Premium interior design services for homes and offices. Modern, elegant, and practical designs.',
  },
  {
    id: '6',
    title: 'Quick Labor',
    subtitle: 'Labor Services • Peshawar',
    rating: 4.6,
    reviews: 31,
    views: 170,
    hourlyRate: 35,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
      require('../assets/services/Professional-Painter.png'),
    ],
    category: 'Labor',
    description: 'Reliable labor services for construction, moving, and general work. Punctual and hardworking team.',
  },
  {
    id: '7',
    title: 'Plumbing Pro',
    subtitle: 'Plumber • Multan',
    rating: 4.7,
    reviews: 45,
    views: 160,
    hourlyRate: 60,
    postedTime: '1 day ago',
    images: [
      require('../assets/services/Plumber.png'),
      require('../assets/services/Professional-Painter.png'),
      require('../assets/services/Solar-Panel.png'),
    ],
    category: 'Plumber',
    description: 'Professional plumbing services. Installation, repair, and maintenance of all plumbing systems.',
  },
  {
    id: '8',
    title: 'Color Masters',
    subtitle: 'Professional Painter • Faisalabad',
    rating: 4.7,
    reviews: 53,
    views: 150,
    hourlyRate: 55,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Professional-Painter.png'),
      require('../assets/services/Solar-Panel.png'),
      require('../assets/services/Welder.png'),
    ],
    category: 'Painter',
    description: 'Quality painting services for interior and exterior. We use premium paints and modern techniques.',
  },
  {
    id: '9',
    title: 'Solar Solutions',
    subtitle: 'Solar Panel Installation • Islamabad',
    rating: 4.9,
    reviews: 67,
    views: 200,
    hourlyRate: 90,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Solar-Panel.png'),
      require('../assets/services/Welder.png'),
      require('../assets/services/electrician.png'),
    ],
    category: 'Solar Work',
    description: 'Complete solar power solutions. Installation, maintenance, and consulting for residential and commercial needs.',
  },
  {
    id: '10',
    title: 'Welding Experts',
    subtitle: 'Welder • Rawalpindi',
    rating: 4.7,
    reviews: 49,
    views: 180,
    hourlyRate: 70,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Welder.png'),
      require('../assets/services/electrician.png'),
      require('../assets/services/carpenter.png'),
    ],
    category: 'Welder & Blacksmith',
    description: 'Professional welding services for all types of metals. Custom fabrication and repairs.',
  },
  {
    id: '11',
    title: 'Glass Designs',
    subtitle: 'Glass Work • Lahore',
    rating: 4.8,
    reviews: 58,
    views: 175,
    hourlyRate: 75,
    postedTime: '5 days ago',
    images: [
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Heavy-Machinery.png'),
      require('../assets/services/Welder.png'),
    ],
    category: 'Glass Work',
    description: 'Specialized in glass installations, designs and repairs. Windows, doors, tables, and decorative pieces.',
  },
  {
    id: '12',
    title: 'Ceiling Masters',
    subtitle: 'Ceiling Work • Karachi',
    rating: 4.6,
    reviews: 41,
    views: 155,
    hourlyRate: 65,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
      require('../assets/services/Professional-Painter.png'),
    ],
    category: 'Ceiling Work',
    description: 'Professional ceiling installation and repair. False ceilings, POP designs, and modern ceiling solutions.',
  },
];

// Filter categories
const filterCategories = [
  'All Categories',
  'Electrician',
  'Interior Designer',
  'Carpenter',
  'Plumber',
  'Painter',
  'Welder & Blacksmith',
  'Glass Work',
  'Ceiling Work',
  'Mason',
  'Solar Work',
  'Contractor',
];

// Filter locations
const filterLocations = [
  'All Locations',
  'Islamabad',
  'Kamra',
  'Attock',
];

// Filter ratings
const filterRatings = [
  { label: 'All Ratings', value: 0 },
  { label: '4.5+', value: 4.5 },
  { label: '4.0+', value: 4.0 },
  { label: '3.5+', value: 3.5 },
];

const AllServicesScreen: React.FC<AllServicesScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedRating, setSelectedRating] = useState({ label: 'All Ratings', value: 0 });
  const [showFilters, setShowFilters] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filterAnimation = useRef(new Animated.Value(0)).current;

  // All services data from the existing serviceProviders array
  const allServices = serviceProviders;

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterAnimation, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedRating({ label: 'All Ratings', value: 0 });
    setFiltersApplied(false);
    setSearchQuery('');
  };

  // Filter services based on selected filters
  const filteredServices = allServices.filter(service => {
    // Search query filter
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'All Categories' && service.category !== selectedCategory) {
      return false;
    }
    
    // Location filter
    if (selectedLocation !== 'All Locations') {
      const locationInSubtitle = service.subtitle.includes(selectedLocation);
      if (!locationInSubtitle) return false;
    }
    
    // Rating filter
    if (selectedRating.value > 0 && service.rating < selectedRating.value) {
      return false;
    }
    
    return true;
  });

  // Determine if any filters are applied
  React.useEffect(() => {
    const hasFilters = selectedCategory !== 'All Categories' || 
                      selectedLocation !== 'All Locations' || 
                      selectedRating.value > 0 ||
                      searchQuery.length > 0;
    setFiltersApplied(hasFilters);
  }, [selectedCategory, selectedLocation, selectedRating, searchQuery]);

  const handleContact = (service: any) => {
    // Navigate to Registration screen for first-time users
    navigation.navigate('Registration', {
      // Pass service info for redirect after registration
      redirectAfterAuth: 'ChatScreen',
      serviceId: service.id,
      serviceTitle: service.title,
      serviceSubtitle: service.subtitle
    } as any); // Type assertion to avoid type errors
  };

  const handleServicePress = (service: any) => {
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

  // Render a filter chip
  const renderFilterChip = (
    label: string, 
    isSelected: boolean, 
    onPress: () => void,
    type: 'category' | 'location' | 'rating'
  ) => (
    <TouchableOpacity
      key={`${type}-${label}`}
      style={[
        styles.filterChip,
        isSelected && styles.selectedFilterChip,
        isDarkMode && isSelected && { backgroundColor: '#00A86B' },
        isDarkMode && !isSelected && { backgroundColor: '#333' }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          isSelected && styles.selectedFilterChipText,
          isDarkMode && { color: isSelected ? '#fff' : '#ccc' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Render a smaller service card
  const renderServiceCard = ({ item: service }: { item: any }) => {
    return (
      <TouchableOpacity 
        style={[styles.serviceCard, { 
          backgroundColor: isDarkMode ? '#2A2A2A' : '#fff',
          shadowColor: isDarkMode ? '#000' : '#000',
        }]}
        onPress={() => handleServicePress(service)}
        activeOpacity={0.9}
      >
        <View style={styles.cardInner}>
          <View style={styles.imageContainer}>
            <Image
              source={service.images[0]}
              style={styles.serviceImage}
              resizeMode="cover"
            />
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{service.rating}</Text>
            </View>
          </View>
          
          <View style={styles.serviceInfo}>
            <Text style={[styles.serviceTitle, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]} numberOfLines={1}>{service.title}</Text>
            
            <Text style={[styles.serviceSubtitle, { 
              color: isDarkMode ? '#999' : '#666' 
            }]} numberOfLines={1}>{service.subtitle}</Text>
            
            <View style={styles.serviceMetaInfo}>
              <Ionicons name="eye-outline" size={12} color={isDarkMode ? '#999' : '#666'} />
              <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>
                {service.views}
              </Text>
              <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>•</Text>
              <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>
                {service.postedTime}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleContact(service)}
            >
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8' }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#f8f8f8'}
      />
      <View style={[styles.header, { 
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
        borderBottomColor: isDarkMode ? '#333' : '#E5E5E5' 
      }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          {type === 'featured' ? 'Featured Services' : 'All Services'}
        </Text>
        <TouchableOpacity onPress={toggleFilters} style={styles.filterButton}>
          <Ionicons 
            name={showFilters ? "options" : "options-outline"} 
            size={22} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Search input */}
      <View style={[styles.searchContainer, {
        backgroundColor: isDarkMode ? '#2A2A2A' : '#fff'
      }]}>
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={isDarkMode ? '#999' : '#666'} 
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, {
            color: isDarkMode ? '#fff' : '#000',
          }]}
          placeholder="Search services..."
          placeholderTextColor={isDarkMode ? '#999' : '#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            style={styles.clearSearchButton}
          >
            <Ionicons name="close-circle" size={18} color={isDarkMode ? '#999' : '#666'} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Animated Filter Section */}
      <Animated.View style={[
        styles.filtersContainer,
        {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
          maxHeight: filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500]
          }),
          opacity: filterAnimation,
          overflow: 'hidden',
          borderBottomColor: isDarkMode ? '#333' : '#E5E5E5',
          borderBottomWidth: filterAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }
      ]}>
        {/* Category filters */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsScrollView}>
            {filterCategories.map(category => (
              renderFilterChip(
                category, 
                selectedCategory === category,
                () => setSelectedCategory(category),
                'category'
              )
            ))}
          </ScrollView>
        </View>
        
        {/* Location filters */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Locations
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsScrollView}>
            {filterLocations.map(location => (
              renderFilterChip(
                location, 
                selectedLocation === location,
                () => setSelectedLocation(location),
                'location'
              )
            ))}
          </ScrollView>
        </View>
        
        {/* Rating filters */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Ratings
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsScrollView}>
            {filterRatings.map(rating => (
              renderFilterChip(
                rating.label, 
                selectedRating.label === rating.label,
                () => setSelectedRating(rating),
                'rating'
              )
            ))}
          </ScrollView>
        </View>
        
        {/* Clear filters button */}
        <TouchableOpacity 
          style={[styles.clearFiltersButton, {
            backgroundColor: isDarkMode ? '#333' : '#E5E5E5',
            opacity: filtersApplied ? 1 : 0.5,
          }]}
          onPress={clearFilters}
          disabled={!filtersApplied}
        >
          <Text style={[styles.clearFiltersText, { 
            color: isDarkMode ? '#fff' : '#000',
            opacity: filtersApplied ? 1 : 0.5,
          }]}>
            Clear All Filters
          </Text>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Results count */}
      <View style={styles.resultsCountContainer}>
        <Text style={[styles.resultsCountText, { color: isDarkMode ? '#ccc' : '#666' }]}>
          Showing {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'}
          {filtersApplied ? ' with filters' : ''}
        </Text>
      </View>

      {/* Services list */}
      {filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesListContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key="two-columns"
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons 
            name="search-outline" 
            size={64} 
            color={isDarkMode ? '#333' : '#ddd'} 
          />
          <Text style={[styles.noResultsText, { color: isDarkMode ? '#ccc' : '#666' }]}>
            No services found
          </Text>
          <Text style={[styles.noResultsSubtext, { color: isDarkMode ? '#999' : '#999' }]}>
            Try adjusting your filters or search
          </Text>
          <TouchableOpacity 
            style={[styles.clearFiltersButton, {
              backgroundColor: isDarkMode ? '#333' : '#E5E5E5',
              marginTop: 20,
            }]}
            onPress={clearFilters}
          >
            <Text style={[styles.clearFiltersText, { color: isDarkMode ? '#fff' : '#000' }]}>
              Clear All Filters
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    height: 60,
  },
  backButton: {
    padding: 6,
  },
  filterButton: {
    padding: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 15,
    padding: 0,
  },
  clearSearchButton: {
    padding: 4,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  filterSection: {
    marginTop: 16,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterChipsScrollView: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#EFEFEF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedFilterChip: {
    backgroundColor: '#00A86B',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterChipText: {
    color: '#FFFFFF',
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultsCountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCountText: {
    fontSize: 13,
  },
  servicesListContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (Dimensions.get('window').width - 36) / 2,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    margin: 8,
  },
  cardInner: {
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  verifiedContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  verifiedIcon: {
    marginRight: 2,
  },
  verifiedText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 42,
    justifyContent: 'center',
  },
  serviceInfo: {
    padding: 12,
  },
  serviceMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 11,
    marginLeft: 4,
    marginRight: 4,
  },
  serviceContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTextContainer: {
    flex: 1,
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  serviceSubtitle: {
    fontSize: 12,
    letterSpacing: 0.1,
    lineHeight: 18,
  },
  starIcon: {
    marginRight: 2,
    fontSize: 11,
    color: '#FFD700',
  },
  ratingText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  contactButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#00A86B',
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AllServicesScreen; 