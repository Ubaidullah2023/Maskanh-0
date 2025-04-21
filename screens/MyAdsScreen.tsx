import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Ad {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  status: 'active' | 'pending' | 'sold';
}

export default function MyAdsScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'sold'>('active');
  
  const ads: Ad[] = [
    {
      id: '1',
      title: 'Modern Apartment in Downtown',
      price: '$1,200/month',
      location: 'Downtown, City',
      image: 'https://via.placeholder.com/150',
      status: 'active',
    },
    {
      id: '2',
      title: 'Cozy Studio Near University',
      price: '$800/month',
      location: 'University District',
      image: 'https://via.placeholder.com/150',
      status: 'active',
    },
    {
      id: '3',
      title: 'Luxury Villa with Pool',
      price: '$3,500/month',
      location: 'Suburbs',
      image: 'https://via.placeholder.com/150',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Family Home with Garden',
      price: '$2,200/month',
      location: 'Residential Area',
      image: 'https://via.placeholder.com/150',
      status: 'sold',
    },
  ];
  
  const filteredAds = ads.filter(ad => ad.status === activeTab);
  
  const renderAdItem = ({ item }: { item: Ad }) => (
    <TouchableOpacity style={styles.adItem}>
      <Image source={{ uri: item.image }} style={styles.adImage} />
      <View style={styles.adInfo}>
        <Text style={styles.adTitle}>{item.title}</Text>
        <Text style={styles.adPrice}>{item.price}</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={14} color="#666" />
          <Text style={styles.adLocation}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.adActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={16} color="#00A86B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="trash" size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Ads</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'sold' && styles.activeTab]}
          onPress={() => setActiveTab('sold')}
        >
          <Text style={[styles.tabText, activeTab === 'sold' && styles.activeTabText]}>Sold</Text>
        </TouchableOpacity>
      </View>
      
      {filteredAds.length > 0 ? (
        <FlatList
          data={filteredAds}
          renderItem={renderAdItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="file-text-o" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No {activeTab} ads found</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create New Ad</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#00A86B',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#00A86B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00A86B',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#00A86B',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  adItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  adImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  adInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  adTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 14,
    color: '#00A86B',
    fontWeight: '500',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  adActions: {
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 