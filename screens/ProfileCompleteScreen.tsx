import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import * as ProfileService from '../services/ProfileService';

type ProfileCompleteScreenRouteProp = RouteProp<RootStackParamList, 'ProfileComplete'>;

export default function ProfileCompleteScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ProfileCompleteScreenRouteProp>();
  const [loading, setLoading] = React.useState(false);
  
  const handleBack = () => {
    navigation.goBack();
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session?.session?.user) {
        const dummyUserId = 'temp-user-' + Math.random().toString(36).substring(2, 9);
        
        const profileData = {
          firstName: 'Demo',
          lastName: 'User',
          age: '30',
          phoneNumber: '03001234567',
          province: 'Punjab',
          city: 'Islamabad',
          profession: 'Electrician',
          photos: route.params.photos,
          title: route.params.title,
          highlights: route.params.highlights,
          description: route.params.description,
          coordinates: { latitude: 33.6844, longitude: 72.7329 },
        };
        
        console.log('Saving service provider profile:', profileData);
        
        // In a real app we would save to Supabase here
        // const { error } = await ProfileService.saveServiceProvider(dummyUserId, profileData);
        // if (error) throw error;
        
        navigation.navigate('Analytics');
      } else {
        const userId = session.session.user.id;
        
        const profileData = {
          firstName: 'Logged',
          lastName: 'User',
          age: '30',
          phoneNumber: '03001234567',
          province: 'Punjab',
          city: 'Islamabad',
          profession: 'Electrician',
          photos: route.params.photos,
          title: route.params.title,
          highlights: route.params.highlights,
          description: route.params.description,
          coordinates: { latitude: 33.6844, longitude: 72.7329 },
        };
        
        console.log('Saving service provider profile for user', userId, profileData);
        
        // In a real app we would save to Supabase here
        // const { error } = await ProfileService.saveServiceProvider(userId, profileData);
        // if (error) throw error;
        
        navigation.navigate('Analytics');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'There was an error saving your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#00A86B" />
        </View>
        
        <Text style={styles.title}>All Set!</Text>
        <Text style={styles.subtitle}>
          Your profile setup is complete. You're just a click away from offering your services on Maskanh.
        </Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color="#00A86B" style={styles.infoIcon} />
            <Text style={styles.infoText}>Your profile will be reviewed by our team</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color="#00A86B" style={styles.infoIcon} />
            <Text style={styles.infoText}>You'll receive notifications about client inquiries</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color="#00A86B" style={styles.infoIcon} />
            <Text style={styles.infoText}>Start earning by providing your services</Text>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={saveProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.createButtonText}>Create Profile</Text>
          )}
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
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#444444',
    flex: 1,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#222222',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 180,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 