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
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type ServiceDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServiceDetails'>;
type ServiceDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;

export default function ServiceDetailsScreen() {
  const navigation = useNavigation<ServiceDetailsScreenNavigationProp>();
  const route = useRoute<ServiceDetailsScreenRouteProp>();
  const { colors, isDarkMode } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  const { id, images, title, subtitle, rating, views, postedTime } = route.params;

  const handleContact = () => {
    navigation.navigate('Registration', {
      redirectAfterAuth: 'ChatScreen',
      serviceId: id,
      serviceTitle: title,
      serviceSubtitle: subtitle
    });
  };

  // Default coordinates for Pakistan (you should replace these with actual service provider coordinates)
  const defaultLocation = {
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Service Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Images Carousel */}
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Image source={item} style={styles.image} resizeMode="cover" />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
              setActiveImageIndex(newIndex);
            }}
          />
          <View style={styles.paginationDots}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activeImageIndex ? '#00A86B' : 'rgba(255, 255, 255, 0.5)' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Service Information */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {rating}</Text>
              <Text style={styles.viewsText}>({views} reviews)</Text>
            </View>
          </View>
          
          <Text style={[styles.subtitle, { color: isDarkMode ? '#999' : '#666' }]}>{subtitle}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={16} color={isDarkMode ? '#999' : '#666'} />
              <Text style={[styles.statText, { color: isDarkMode ? '#999' : '#666' }]}>{postedTime}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="eye-outline" size={16} color={isDarkMode ? '#999' : '#666'} />
              <Text style={[styles.statText, { color: isDarkMode ? '#999' : '#666' }]}>{views} views</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>About</Text>
            <Text style={[styles.description, { color: isDarkMode ? '#999' : '#666' }]}>
              Professional service provider with extensive experience in the field. Available for consultations and service delivery across the region.
            </Text>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Location</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color={isDarkMode ? '#999' : '#666'} />
              <Text style={[styles.locationText, { color: isDarkMode ? '#999' : '#666' }]}>
                Based in {subtitle.split('•')[1].trim()}
              </Text>
            </View>
            
            {/* Map View */}
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={defaultLocation}
              >
                <Marker
                  coordinate={{
                    latitude: defaultLocation.latitude,
                    longitude: defaultLocation.longitude,
                  }}
                  title={title}
                  description={subtitle}
                >
                  <View style={styles.customMarker}>
                    <Ionicons name="location" size={24} color="#00A86B" />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Contact Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactButtonText}>Contact Service Provider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300,
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
  infoContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginRight: 4,
  },
  viewsText: {
    fontSize: 14,
    color: '#666',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  contactButton: {
    backgroundColor: '#00A86B',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mapContainer: {
    marginTop: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00A86B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 