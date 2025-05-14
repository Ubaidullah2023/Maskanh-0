import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';

const CARD_ICONS = [
  'eye-outline',         // Profile Views
  'chatbubble-ellipses', // Inquiries
  'trending-up',         // Impressions
  'checkmark-done',      // Profile Completion
  'time-outline',        // Last Activity
  'construct-outline',   // Service Posted
];

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
        <Ionicons name="grid-outline" size={28} color={PRIMARY_COLOR} style={{ marginRight: 10 }} />
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <View style={styles.statCard} key={idx}>
              <View style={styles.iconCircle}>
                <Ionicons name={CARD_ICONS[idx]} size={28} color={PRIMARY_COLOR} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <ServiceNavigation /> */}
    </SafeAreaView>
  );
}

const CARD_WIDTH = (SCREEN_WIDTH - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SCREEN_HEIGHT * 0.045,
    paddingBottom: SCREEN_HEIGHT * 0.025,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 22 : 28,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.04,
    minHeight: SCREEN_HEIGHT * 0.85,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 500,
  },
  statCard: {
    width: CARD_WIDTH,
    minWidth: 150,
    maxWidth: 220,
    backgroundColor: '#fff',
    paddingVertical: SCREEN_HEIGHT * 0.035,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    borderRadius: 18,
    alignItems: 'center',
    margin: 8,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#E0F2EF',
  },
  iconCircle: {
    backgroundColor: '#E6F9F1',
    borderRadius: 32,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: SCREEN_WIDTH < 360 ? 22 : 28,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  statLabel: {
    fontSize: SCREEN_WIDTH < 360 ? 13 : 16,
    color: '#222',
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.85,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
}); 