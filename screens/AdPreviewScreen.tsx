import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const THUMB_SIZE = (width - 48) / 3;

type AdPreviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdPreview'>;
type AdPreviewScreenRouteProp = RouteProp<RootStackParamList, 'AdPreview'>;

type MediaItem = {
  uri: string;
  type: 'image' | 'video';
  thumbnail?: string;
};

export default function AdPreviewScreen() {
  const navigation = useNavigation<AdPreviewScreenNavigationProp>();
  const route = useRoute<AdPreviewScreenRouteProp>();
  const { title, description, price, location, category, mediaItems } = route.params;

  const renderMediaItem = ({ item }: { item: MediaItem }) => (
    <View style={styles.mediaItem}>
      <Image 
        source={{ uri: item.type === 'video' ? item.thumbnail : item.uri }} 
        style={styles.mediaThumbnail} 
      />
      {item.type === 'video' && (
        <View style={styles.videoIndicator}>
          <Icon name="play-circle" size={20} color="#fff" />
        </View>
      )}
    </View>
  );

  const handleConfirmPost = () => {
    // TODO: Implement actual posting logic here
    console.log('Confirming post:', { title, description, price, location, category, mediaItems });
    // Navigate back to main screen or success screen after posting
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Ad</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {mediaItems.length > 0 && (
          <View style={styles.mediaSection}>
            <Text style={styles.sectionTitle}>Media</Text>
            <FlatList
              data={mediaItems}
              renderItem={renderMediaItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
              style={styles.mediaGrid}
              columnWrapperStyle={styles.mediaRow}
            />
            <View style={styles.mediaCount}>
              <Text style={styles.mediaCountText}>
                {mediaItems.filter(i => i.type === 'image').length} Photos, {' '}
                {mediaItems.filter(i => i.type === 'video').length} Videos
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Title</Text>
            <Text style={styles.detailValue}>{title}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{category}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>${price}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{location}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmPost}
        >
          <Text style={styles.confirmButtonText}>Confirm & Post</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  mediaSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
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
  videoIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  mediaCount: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  mediaCountText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  editButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00A86B',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 2,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#00A86B',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 