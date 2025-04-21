import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');
const THUMB_SIZE = (width - 48) / 3;

type MediaItem = {
  uri: string;
  type: 'image' | 'video';
  thumbnail?: string;
};

type PostAdScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PostAdScreen() {
  const navigation = useNavigation<PostAdScreenNavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  
  const categories = [
    'Apartment', 'House', 'Villa', 'Land', 'Office', 'Shop', 'Warehouse', 'Other'
  ];

  const pickImage = async () => {
    const photoCount = mediaItems.filter(item => item.type === 'image').length;
    if (photoCount >= 10) {
      alert('You can only add up to 10 photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setMediaItems(prev => [...prev, { uri: result.assets[0].uri, type: 'image' }]);
    }
  };

  const pickVideo = async () => {
    const videoCount = mediaItems.filter(item => item.type === 'video').length;
    if (videoCount >= 5) {
      alert('You can only add up to 5 videos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      try {
        const thumbnail = await VideoThumbnails.getThumbnailAsync(result.assets[0].uri, {
          time: 0,
        });
        setMediaItems(prev => [...prev, { 
          uri: result.assets[0].uri, 
          type: 'video',
          thumbnail: thumbnail.uri 
        }]);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const removeMedia = (index: number) => {
    setMediaItems(prev => prev.filter((_, i) => i !== index));
  };

  const renderMediaItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <View style={styles.mediaItem}>
      <Image 
        source={{ uri: item.type === 'video' ? item.thumbnail : item.uri }} 
        style={styles.mediaThumbnail} 
      />
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeMedia(index)}
      >
        <Icon name="times-circle" size={20} color="#FF3B30" />
      </TouchableOpacity>
      {item.type === 'video' && (
        <View style={styles.videoIndicator}>
          <Icon name="play-circle" size={20} color="#fff" />
        </View>
      )}
    </View>
  );
  
  const handlePostAd = () => {
    if (!title || !description || !price || !location || !category) {
      alert('Please fill in all required fields');
      return;
    }

    navigation.navigate('AdPreview', {
      title,
      description,
      price,
      location,
      category,
      mediaItems,
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post an Ad</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content}>
          <View style={styles.mediaSection}>
            <View style={styles.mediaButtons}>
              <TouchableOpacity 
                style={styles.mediaButton} 
                onPress={pickImage}
              >
                <Icon name="camera" size={24} color="#00A86B" />
                <Text style={styles.mediaButtonText}>
                  Add Photos ({mediaItems.filter(i => i.type === 'image').length}/10)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.mediaButton} 
                onPress={pickVideo}
              >
                <Icon name="video-camera" size={24} color="#00A86B" />
                <Text style={styles.mediaButtonText}>
                  Add Videos ({mediaItems.filter(i => i.type === 'video').length}/5)
                </Text>
              </TouchableOpacity>
            </View>
            
            {mediaItems.length > 0 && (
              <FlatList
                data={mediaItems}
                renderItem={renderMediaItem}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                style={styles.mediaGrid}
                columnWrapperStyle={styles.mediaRow}
              />
            )}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a descriptive title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your property in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.selectedCategoryButton
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      category === cat && styles.selectedCategoryButtonText
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity style={styles.postButton} onPress={handlePostAd}>
            <Text style={styles.postButtonText}>Post Ad</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mediaSection: {
    marginBottom: 16,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mediaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  mediaButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#00A86B',
  },
  mediaGrid: {
    marginTop: 8,
  },
  mediaRow: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  mediaItem: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  videoIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 