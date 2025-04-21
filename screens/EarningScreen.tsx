import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type EarningScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Earning'>;

type Transaction = {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending';
};

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-04-15',
    service: 'Plumbing Repair',
    amount: 150,
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-04-14',
    service: 'Electrical Work',
    amount: 280,
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-04-14',
    service: 'AC Maintenance',
    amount: 200,
    status: 'pending',
  },
];

export default function EarningScreen() {
  const navigation = useNavigation<EarningScreenNavigationProp>();
  const totalEarnings = transactions.reduce((sum, t) => 
    t.status === 'completed' ? sum + t.amount : sum, 0);
  const pendingAmount = transactions.reduce((sum, t) => 
    t.status === 'pending' ? sum + t.amount : sum, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.earningsSummary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
            <Text style={styles.summaryAmount}>${totalEarnings}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryAmount, styles.pendingAmount]}>${pendingAmount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionService}>{transaction.service}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={[
                styles.amount,
                transaction.status === 'pending' && styles.pendingText
              ]}>
                ${transaction.amount}
              </Text>
              {transaction.status === 'pending' && (
                <Text style={styles.pendingStatus}>Pending</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
    borderBottomColor: '#f0f0f0',
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
  content: {
    flex: 1,
  },
  earningsSummary: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f8f8',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34c759',
  },
  pendingAmount: {
    color: '#ffa500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionService: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34c759',
  },
  pendingText: {
    color: '#ffa500',
  },
  pendingStatus: {
    fontSize: 12,
    color: '#ffa500',
    marginTop: 4,
  },
}); 