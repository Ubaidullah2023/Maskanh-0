import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type ManageOrdersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ManageOrders'>;

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

type Order = {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: OrderStatus;
  price: number;
};

const orders: Order[] = [
  {
    id: '1',
    clientName: 'John Smith',
    service: 'Plumbing Repair',
    date: '2024-04-15',
    time: '10:00 AM',
    status: 'pending',
    price: 150,
  },
  {
    id: '2',
    clientName: 'Sarah Wilson',
    service: 'Electrical Installation',
    date: '2024-04-15',
    time: '2:30 PM',
    status: 'in_progress',
    price: 280,
  },
  {
    id: '3',
    clientName: 'Mike Johnson',
    service: 'AC Maintenance',
    date: '2024-04-14',
    time: '11:00 AM',
    status: 'completed',
    price: 200,
  },
  {
    id: '4',
    clientName: 'Emma Davis',
    service: 'House Painting',
    date: '2024-04-13',
    time: '9:00 AM',
    status: 'cancelled',
    price: 800,
  },
];

export default function ManageOrdersScreen() {
  const navigation = useNavigation<ManageOrdersScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<OrderStatus>('pending');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#ffa500';
      case 'in_progress':
        return '#00A86B';
      case 'completed':
        return '#34c759';
      case 'cancelled':
        return '#ff3b30';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => order.status === selectedTab);

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.clientName}>{item.clientName}</Text>
        <Text style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) + '20', color: getStatusColor(item.status) }
        ]}>
          {getStatusText(item.status)}
        </Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.serviceText}>{item.service}</Text>
        <Text style={styles.dateText}>{item.date} at {item.time}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: getStatusColor(item.status) }]}
        >
          <Text style={styles.actionButtonText}>
            {item.status === 'pending' ? 'Accept' : 
             item.status === 'in_progress' ? 'Complete' : 'View Details'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        {(['pending', 'in_progress', 'completed', 'cancelled'] as OrderStatus[]).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.tab,
              selectedTab === status && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab(status)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === status && styles.selectedTabText,
            ]}>
              {getStatusText(status)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#00A86B',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#00A86B',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00A86B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTabText: {
    color: '#00A86B',
    fontWeight: '600',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  messageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  messageButtonText: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
}); 