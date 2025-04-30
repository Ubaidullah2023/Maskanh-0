import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

const PRIMARY_COLOR = '#34A853';
const WARNING_COLOR = '#34A853';

export default function TodayScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToListing = () => {
    navigation.navigate('Listing', {
      placeType: 'entire',
      guestCount: 1,
      bedroomCount: 1,
      bedCount: 1,
      hasLock: true,
      amenities: [],
      photos: [],
      title: '',
      highlights: [],
      description: '',
      guestType: 'any_guest',
      basePrice: 0
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>Ubaidullah</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.confirmationCards}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: PRIMARY_COLOR }]}>Confirm important details</Text>
              <Text style={[styles.cardSubtitle, { color: PRIMARY_COLOR }]}>Required to publish</Text>
              <Text style={styles.listingTitle}>This is very beautiful</Text>
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <View style={styles.warningIcon}>
              <Ionicons name="warning-outline" size={24} color={WARNING_COLOR} />
            </View>
          </View>
        </View>

        <View style={styles.reservationsSection}>
          <Text style={styles.sectionTitle}>Your reservations</Text>
          <View style={styles.reservationTabs}>
            <TouchableOpacity style={[styles.reservationTab, styles.activeTab]}>
              <Text style={styles.reservationTabText}>Checking out (0)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reservationTab}>
              <Text style={styles.reservationTabText}>Currently hosting (0)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="document-text-outline" size={32} color="#000" />
            </View>
            <Text style={styles.emptyStateText}>
              You don't have any guests{'\n'}checking out today or tomorrow.
            </Text>
          </View>

          <TouchableOpacity style={styles.allReservationsButton}>
            <Text style={styles.allReservationsText}>All reservations (0)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>We're here to help</Text>
          
          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons name="people-outline" size={24} color="#000" />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Join your local Host Club</Text>
              <Text style={styles.helpDescription}>
                Connect, collaborate, and share with other Hosts and community members.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons name="headset-outline" size={24} color="#000" />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Contact specialized support</Text>
              <Text style={styles.helpDescription}>
                As a new Host, you get one-tap access to a specially trained support team.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Resources and tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.resourcesScroll}>
            <TouchableOpacity style={styles.resourceCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.resourceImage}
              />
              <Text style={styles.resourceTitle}>How you get paid for hosting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.resourceImage}
              />
              <Text style={styles.resourceTitle}>Help your listing stand out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.resourceImage}
              />
              <Text style={styles.resourceTitle}>Review your price</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="checkmark" size={24} color={PRIMARY_COLOR} />
          <Text style={[styles.tabText, { color: PRIMARY_COLOR }]}>Today</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Ionicons name="calendar-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={navigateToListing}
        >
          <Ionicons name="home-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Listings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Messages')}
        >
          <View style={[styles.messageBadge, { backgroundColor: PRIMARY_COLOR }]}>
            <Text style={styles.messageBadgeText}>1</Text>
          </View>
          <Ionicons name="chatbubble-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Menu')}
        >
          <Ionicons name="menu-outline" size={24} color="#666666" />
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    position: 'relative',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#222222',
  },
  nameText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
  },
  notificationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  confirmationCards: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  cardSubtitle: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    marginTop: 4,
  },
  listingTitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  startButton: {
    marginTop: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    textDecorationLine: 'underline',
  },
  warningIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  reservationsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  reservationTabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  reservationTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F7F7F7',
  },
  activeTab: {
    backgroundColor: '#222222',
  },
  reservationTabText: {
    fontSize: 14,
    color: '#222222',
  },
  emptyState: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#222222',
    textAlign: 'center',
    lineHeight: 24,
  },
  allReservationsButton: {
    marginTop: 16,
  },
  allReservationsText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  helpSection: {
    padding: 20,
  },
  helpCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  resourcesSection: {
    padding: 20,
  },
  resourcesScroll: {
    marginLeft: -20,
  },
  resourceCard: {
    width: 280,
    marginLeft: 20,
    marginBottom: 20,
  },
  resourceImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  tabItem: {
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  messageBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
}); 