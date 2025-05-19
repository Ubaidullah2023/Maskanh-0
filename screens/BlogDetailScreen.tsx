import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type BlogDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'BlogDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'BlogDetail'>;
};

const { width } = Dimensions.get('window');

const BlogDetailScreen: React.FC<BlogDetailScreenProps> = ({ route, navigation }) => {
  const { post } = route.params;
  const { isDarkMode } = useTheme();
  
  const paragraphs = post.content?.split('\n\n') || [];

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#EEEEEE' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons 
              name="share-outline" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons 
              name="bookmark-outline" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={post.image} 
          style={styles.heroImage} 
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{post.category}</Text>
          </View>
          
          <Text style={[
            styles.title,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            {post.title}
          </Text>
          
          <View style={styles.metaContainer}>
            <Text style={[
              styles.metaText,
              { color: isDarkMode ? '#999999' : '#666666' }
            ]}>
              {post.date}
            </Text>
            <Text style={[
              styles.metaText,
              { color: isDarkMode ? '#999999' : '#666666' }
            ]}>
              • {post.readTime}
            </Text>
          </View>
          
          <View style={styles.articleBody}>
            {paragraphs.map((paragraph, index) => (
              <Text 
                key={`p-${index}`}
                style={[
                  styles.paragraph,
                  { color: isDarkMode ? '#CCCCCC' : '#333333' }
                ]}
              >
                {paragraph}
              </Text>
            ))}
          </View>
          
          <View style={styles.tagsContainer}>
            <Text style={[styles.tagTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              Related Topics
            </Text>
            <View style={styles.tags}>
              <TouchableOpacity style={[
                styles.tag,
                { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' }
              ]}>
                <Text style={[styles.tagText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>
                  Home Improvement
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.tag,
                { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' }
              ]}>
                <Text style={[styles.tagText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>
                  {post.category}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.tag,
                { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' }
              ]}>
                <Text style={[styles.tagText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>
                  Tips & Tricks
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: 16,
    padding: 4,
  },
  bookmarkButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: width,
    height: width * 0.6,
  },
  contentContainer: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  category: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  metaText: {
    fontSize: 14,
    marginRight: 8,
  },
  articleBody: {
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
  },
  tagsContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  tagTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BlogDetailScreen; 