import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type AddPhotosScreenRouteProp = RouteProp<RootStackParamList, 'AddPhotos'>;

type PhotoType = {
  uri: string;
  type: 'image';
};

export default function AddPhotosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AddPhotosScreenRouteProp>();
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Sorry, we need camera roll permissions to upload photos!'
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Sorry, we need camera permissions to take photos!'
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const handleAddPhotos = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newPhotos = result.assets.map(asset => ({
        uri: asset.uri,
        type: 'image' as const,
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleTakePhotos = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = {
        uri: result.assets[0].uri,
        type: 'image' as const,
      };
      setPhotos(prev => [...prev, newPhoto]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAndExit = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleQuestions = () => {
    // TODO: Navigate to help/questions screen
  };

  const handleNext = () => {
    if (photos.length >= 5) {
      navigation.navigate('Title', {
        placeType: route.params.placeType,
        guestCount: route.params.guestCount,
        bedroomCount: route.params.bedroomCount,
        bedCount: route.params.bedCount,
        hasLock: route.params.hasLock,
        amenities: route.params.amenities,
        photos: photos.map(photo => ({
          uri: photo.uri,
          type: 'image' as const
        }))
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleSaveAndExit}>
          <Text style={styles.headerButtonText}>Save & exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleQuestions}>
          <Text style={styles.headerButtonText}>Questions?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Add some photos of your apartment</Text>
        <Text style={styles.subtitle}>
          You'll need 5 photos to get started. You can add more or make changes later.
        </Text>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={photo.uri} style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePhoto(index)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={handleAddPhotos}>
          <Ionicons name="add" size={24} color="#222222" />
          <Text style={styles.uploadButtonText}>Add photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={handleTakePhotos}>
          <Ionicons name="camera" size={24} color="#222222" />
          <Text style={styles.uploadButtonText}>Take new photos</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, photos.length < 5 && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={photos.length < 5}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#222222',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 32,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  photoContainer: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  uploadButtonText: {
    fontSize: 18,
    color: '#222222',
    marginLeft: 12,
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
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#DDDDDD',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 