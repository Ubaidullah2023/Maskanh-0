import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  price: string;
  image: string;
  certificationDate: string;
}

export default function CertifiedCarsScreen() {
  const cars: Car[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      price: '$25,000',
      image: 'https://via.placeholder.com/150',
      certificationDate: '2023-05-15',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: '2019',
      price: '$22,500',
      image: 'https://via.placeholder.com/150',
      certificationDate: '2023-06-20',
    },
    {
      id: '3',
      make: 'Ford',
      model: 'Mustang',
      year: '2021',
      price: '$35,000',
      image: 'https://via.placeholder.com/150',
      certificationDate: '2023-07-10',
    },
    {
      id: '4',
      make: 'BMW',
      model: '3 Series',
      year: '2018',
      price: '$30,000',
      image: 'https://via.placeholder.com/150',
      certificationDate: '2023-04-05',
    },
  ];
  
  const renderCarItem = ({ item }: { item: Car }) => (
    <TouchableOpacity style={styles.carItem}>
      <Image source={{ uri: item.image }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{item.year} {item.make} {item.model}</Text>
        <Text style={styles.carPrice}>{item.price}</Text>
        <View style={styles.certificationContainer}>
          <Icon name="check-circle" size={14} color="#4CAF50" />
          <Text style={styles.certificationText}>
            Certified on {new Date(item.certificationDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Certified Cars</Text>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Icon name="info-circle" size={20} color="#00A86B" style={styles.infoIcon} />
        <Text style={styles.descriptionText}>
          All cars listed here have been thoroughly inspected and certified by our experts.
        </Text>
      </View>
      
      {cars.length > 0 ? (
        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="car" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No certified cars found</Text>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 12,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  listContent: {
    padding: 16,
  },
  carItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  carInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  carTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 14,
    color: '#00A86B',
    fontWeight: '500',
    marginBottom: 4,
  },
  certificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificationText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  viewButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
  },
}); 