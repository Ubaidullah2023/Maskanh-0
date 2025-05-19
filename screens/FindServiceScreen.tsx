import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import BottomNavigation from '../components/BottomNavigation';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import IcoImage from '../components/IcoImage';

type FindServiceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FindService' | 'ServiceMap'>;

interface Category {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  views: number;
  postedTime: string;
  images: ImageSourcePropType[];
}

const categories: Category[] = [
  { id: '1', name: 'Electrician', icon: require('../assets/icons/Electrician.png') },
  { id: '2', name: 'Interior Designer', icon: require('../assets/icons/Blueprint.png') },
  { id: '3', name: 'Mason', icon: require('../assets/icons/Wall.png') },
  { id: '4', name: 'Contractor', icon: require('../assets/icons/Builder.png') },
  { id: '5', name: 'Solar Work', icon: require('../assets/icons/Solarpower.png') },
  { id: '6', name: 'Carpenter', icon: require('../assets/icons/Cuttingwood.png') },
  { id: '7', name: 'Painter', icon: require('../assets/icons/Paint.png') },
  { id: '8', name: '3D Wall', icon: require('../assets/icons/3d.png') },
  { id: '9', name: 'Plumber', icon: require('../assets/icons/plumber.png') },
  { id: '10', name: 'Ceiling Work', icon: require('../assets/icons/ceiling.png') },
  { id: '11', name: 'Aluminum & Steel Work', icon: require('../assets/icons/laser-cutting.png') },
  { id: '12', name: 'Glass Work', icon: require('../assets/icons/window.png') },
  { id: '13', name: 'Welder & Blacksmith', icon: require('../assets/icons/Welder.png') },
  { id: '14', name: 'Architect', icon: require('../assets/icons/architect.png') },
];

const recommendedServices: Service[] = [
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
  },
  {
    id: '5',
    title: 'Design Masters',
    subtitle: 'Interior Designer • Karachi',
    rating: 4.7,
    views: 190,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Interior-Designer.jpeg'),
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
    ],
  },
  {
    id: '6',
    title: 'Quick Labor',
    subtitle: 'Labor Services • Peshawar',
    rating: 4.7,
    views: 170,
    postedTime: '2 days ago',
    images: [
      require('../assets/services/Labor.png'),
      require('../assets/services/Plumber.png'),
      require('../assets/services/Professional-Painter.png'),
    ],
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
  },
  {
    id: '9',
    title: 'Solar Solutions',
    subtitle: 'Solar Panel Installation • Islamabad',
    rating: 4.7,
    views: 200,
    postedTime: '3 days ago',
    images: [
      require('../assets/services/Solar-Panel.png'),
      require('../assets/services/Welder.png'),
      require('../assets/services/electrician.png'),
    ],
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
  },
];

const CategoryItem = ({ icon, name }: { icon: ImageSourcePropType; name: string }) => {
  const { colors, isDarkMode } = useTheme();
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIconContainer}>
        <IcoImage 
          source={icon} 
          style={styles.categoryIcon} 
          resizeMode="contain"
          fallbackSource={require('../assets/services/electrician.png')}
        />
      </View>
      <Text style={[styles.categoryLabel, { 
        color: isDarkMode ? '#fff' : '#000' 
      }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const ServiceCard = ({ images, title, subtitle, rating, views, postedTime, id }: Service) => {
  const { colors, isDarkMode } = useTheme();
  const navigation = useNavigation<FindServiceScreenNavigationProp>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  
  const onViewableItemsChanged = React.useCallback(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  // Auto swipe functionality
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex === images.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true
        });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [activeIndex, images.length]);

  // Handle scroll error
  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true
      });
    });
  };

  const handleImagePress = () => {
    // Navigate to service details with all the service information
    navigation.navigate('ServiceDetails', {
      id,
      images,
      title,
      subtitle,
      rating,
      views,
      postedTime
    });
  };

  const handleContact = () => {
    // Navigate to Registration screen for first-time users
    navigation.navigate('Registration', {
      // After registration, redirect to chat with this service provider
      redirectAfterAuth: 'ChatScreen',
      serviceId: id,
      serviceTitle: title,
      serviceSubtitle: subtitle
    } as any); // Type assertion to avoid type errors
  };

  return (
    <View style={[styles.serviceCard, { 
      backgroundColor: isDarkMode ? '#2A2A2A' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#000',
    }]}>
      <TouchableOpacity onPress={handleImagePress}>
        <View style={styles.imageContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <Image source={item} style={styles.serviceImage} />
                <View style={styles.verifiedContainer}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={14} 
                    color="#00A86B" 
                    style={styles.verifiedIcon}
                  />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(_, index) => index.toString()}
            onScrollToIndexFailed={onScrollToIndexFailed}
          />
          <View style={styles.paginationDots}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activeIndex ? '#00A86B' : 'rgba(255, 255, 255, 0.5)' }
                ]}
              />
            ))}
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.serviceInfo}>
        <View style={styles.serviceMetaInfo}>
          <View style={styles.viewsContainer}>
            <Ionicons name="eye-outline" size={14} color={isDarkMode ? '#999' : '#666'} />
            <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>
              {views} views
            </Text>
          </View>
          <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>•</Text>
          <Text style={[styles.metaText, { color: isDarkMode ? '#999' : '#666' }]}>
            {postedTime}
          </Text>
        </View>
        <View style={styles.serviceContentContainer}>
          <View style={styles.serviceTextContainer}>
            <Text style={[styles.serviceTitle, { 
              color: isDarkMode ? '#fff' : '#000' 
            }]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.serviceSubtitle, { 
              color: isDarkMode ? '#999' : '#666' 
            }]} numberOfLines={1}>{subtitle}</Text>
          </View>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={handleContact}
          >
            <Text style={styles.bookButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FindServiceScreen = () => {
  const navigation = useNavigation<FindServiceScreenNavigationProp>();
  const { isDarkMode } = useTheme();

  const handleMapPress = () => {
    navigation.navigate('ServiceMap');
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryItem icon={item.icon} name={item.name} />
  );

  const renderService = ({ item }: { item: Service }) => (
    <ServiceCard {...item} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={isDarkMode ? '#1a1a1a' : '#fff'}
        translucent={true}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Categories */}
          <View style={[styles.section, { 
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderBottomColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            marginBottom: 4
          }]}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              Explore by Category
            </Text>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          {/* Recommended Services */}
          <View style={[styles.section, { 
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            paddingTop: 12
          }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000', marginBottom: 0 }]}>
                Recommended Services
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('AllServices', { type: 'recommended' })}
                style={styles.viewAllContainer}
              >
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 16}} />
            <View style={styles.recommendedList}>
              {recommendedServices.map((service) => (
                <View key={service.id} style={styles.recommendedItem}>
                  <ServiceCard {...service} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <TouchableOpacity 
            style={{
              backgroundColor: '#00A86B',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 25,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={handleMapPress}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 100,
            }}>
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                marginRight: 8,
              }}>Map</Text>
              <Ionicons name="map-outline" size={18} color="#fff" style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        </View>

        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 0,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    height: 56,
  },
  backButton: {
    padding: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 13,
  },
  categoriesList: {
    paddingRight: 16,
    marginBottom: -8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    borderRadius: 30,
  },
  categoryIcon: {
    width: 28,
    height: 28,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  servicesList: {
    paddingRight: 16,
  },
  serviceCard: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  imageWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width - 32,
    height: 200,
  },
  serviceImage: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    resizeMode: 'cover',
  },
  verifiedContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  verifiedIcon: {
    marginRight: 4,
  },
  verifiedText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 60,
    justifyContent: 'center',
  },
  serviceInfo: {
    padding: 16,
  },
  serviceMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  serviceContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  serviceTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  serviceSubtitle: {
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  starIcon: {
    marginRight: 4,
    fontSize: 14,
    color: '#FFD700',
  },
  ratingText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#00A86B',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  recommendedList: {
    paddingHorizontal: 16,
  },
  recommendedItem: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  viewAllContainer: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
  },
  viewAllButton: {
    color: '#00A86B',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default FindServiceScreen; 