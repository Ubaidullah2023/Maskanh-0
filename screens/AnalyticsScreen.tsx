import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';

export default function AnalyticsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Dummy data
  const stats = [
    { label: 'Total Profile Views', value: '1,234', isPercent: false },
    { label: 'Total Inquiries', value: '56', isPercent: false },
    { label: 'Impressions', value: '2,345', isPercent: false },
    { label: 'Profile Completion', value: '92%', isPercent: true },
    { label: 'Last Activity', value: '2 hours ago', isPercent: false },
    { label: 'Service Posted', value: '2024-05-01', isPercent: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.greenDot} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsOuterContainer}>
          <View style={styles.statsContainer}>
            {stats.map((stat, idx) => (
              <View style={styles.statCard} key={idx}>
                <Text style={styles.statValue}>
                  <Text style={styles.statValueGreen}>{stat.value}</Text>
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={32} color="#00A86B" />
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
  header: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'left',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PRIMARY_COLOR,
    marginLeft: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.04,
    minHeight: SCREEN_HEIGHT * 0.85,
  },
  statsOuterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '95%',
    maxWidth: 500,
  },
  statCard: {
    width: SCREEN_WIDTH < 400 ? '90%' : '45%',
    minWidth: 150,
    maxWidth: 220,
    backgroundColor: '#F8F8F8',
    paddingVertical: SCREEN_HEIGHT * 0.035,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    borderRadius: 16,
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statValue: {
    fontSize: SCREEN_WIDTH < 360 ? 20 : 28,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 6,
    textAlign: 'center',
  },
  statValueGreen: {
    color: PRIMARY_COLOR,
    fontWeight: '700',
    fontSize: SCREEN_WIDTH < 360 ? 20 : 28,
  },
  statLabel: {
    fontSize: SCREEN_WIDTH < 360 ? 13 : 16,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 15 : 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: SCREEN_HEIGHT * 0.012,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingLeft: SCREEN_WIDTH * 0.03,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
}); 