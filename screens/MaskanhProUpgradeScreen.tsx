import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';

type MaskanhProUpgradeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MaskanhProUpgrade'>;
type MaskanhProUpgradeScreenRouteProp = RouteProp<RootStackParamList, 'MaskanhProUpgrade'>;

const PRO_FEATURES = [
  { icon: 'analytics-outline' as const, title: 'AI Powered Data Analytics', desc: 'Get insights and trends for your services.' },
  { icon: 'star-outline' as const, title: 'Priority Listing', desc: 'Appear at the top of search results.' },
  { icon: 'cash-outline' as const, title: 'Lower Commission', desc: 'Keep more of your earnings.' },
  { icon: 'shield-checkmark-outline' as const, title: 'Premium Support', desc: '24/7 support for Pro members.' },
];

export default function MaskanhProUpgradeScreen() {
  const navigation = useNavigation<MaskanhProUpgradeScreenNavigationProp>();
  const route = useRoute<MaskanhProUpgradeScreenRouteProp>();

  const showComingSoon = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('This feature is coming soon!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Coming soon!', 'This feature is coming soon!');
    }
  };

  const handleNotNow = () => {
    navigation.navigate('Selection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="rocket-outline"
            size={SCREEN_WIDTH < 360 ? 48 : 56}
            color={PRIMARY_COLOR}
            style={styles.rocketIcon}
          />
          <Text style={styles.title}>Unleash Your Potential with Maskanh Pro</Text>
          <Text style={styles.subtitle}>Unlock exclusive features and grow your business faster.</Text>
        </View>
        <View style={styles.featuresSection}>
          {PRO_FEATURES.map((feature, idx) => (
            <View key={idx} style={styles.featureCard}>
              <Ionicons name={feature.icon} size={SCREEN_WIDTH < 360 ? 28 : 32} color={PRIMARY_COLOR} style={styles.featureIcon} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.upgradeButton} onPress={showComingSoon}>
            <Text style={styles.upgradeButtonText}>Upgrade to Maskanh Pro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notNowButton}
            onPress={handleNotNow}
          >
            <Text style={styles.notNowText}>
              Not right now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingTop: SCREEN_HEIGHT * 0.08, // More top padding for rocket
    paddingBottom: SCREEN_HEIGHT * 0.04,
    minHeight: SCREEN_HEIGHT * 1.05, // Ensures content is always centered and not cut off
  },
  header: {
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.03,
    width: '100%',
  },
  rocketIcon: {
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  title: {
    fontSize: SCREEN_WIDTH < 360 ? 20 : SCREEN_WIDTH < 400 ? 22 : 26,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginTop: SCREEN_HEIGHT * 0.01,
    textAlign: 'center',
    lineHeight: SCREEN_WIDTH < 360 ? 26 : 32,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH < 360 ? 13 : 15,
    color: '#444',
    marginTop: SCREEN_HEIGHT * 0.01,
    textAlign: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
    lineHeight: SCREEN_WIDTH < 360 ? 18 : 22,
  },
  featuresSection: { width: '100%', marginBottom: SCREEN_HEIGHT * 0.04 },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FFFA',
    borderRadius: 12,
    paddingVertical: SCREEN_HEIGHT * 0.018,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.018,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: { marginRight: SCREEN_WIDTH * 0.04 },
  featureText: { flex: 1 },
  featureTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 14 : 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: SCREEN_WIDTH < 360 ? 11 : 13,
    color: '#666',
  },
  buttonSection: { width: '100%', alignItems: 'center' },
  upgradeButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: SCREEN_HEIGHT * 0.018,
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    marginBottom: SCREEN_HEIGHT * 0.012,
    width: '100%',
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH < 360 ? 14 : 16,
    fontWeight: '700',
  },
  notNowButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: SCREEN_HEIGHT * 0.018,
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    width: '100%',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  notNowText: {
    color: PRIMARY_COLOR,
    fontSize: SCREEN_WIDTH < 360 ? 14 : 16,
    fontWeight: '700',
  },
}); 