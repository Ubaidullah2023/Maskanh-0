import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import BottomNavigation from '../components/BottomNavigation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: any;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Modern Home Design Trends 2024',
    excerpt: 'Discover the latest trends in home design and architecture that are shaping modern living spaces.',
    image: require('../assets/services/Interior-Designer.jpeg'),
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    category: 'Design'
  },
  {
    id: '2',
    title: 'Essential Tools for Home Renovation',
    excerpt: 'A comprehensive guide to the must-have tools for your next home renovation project.',
    image: require('../assets/services/carpenter.png'),
    date: 'Mar 14, 2024',
    readTime: '4 min read',
    category: 'DIY'
  },
  {
    id: '3',
    title: 'Sustainable Building Materials',
    excerpt: 'Explore eco-friendly building materials that are both sustainable and stylish.',
    image: require('../assets/services/Solar-Panel.png'),
    date: 'Mar 13, 2024',
    readTime: '6 min read',
    category: 'Sustainability'
  },
  {
    id: '4',
    title: 'Electrical Safety at Home',
    excerpt: 'Learn about essential electrical safety tips to protect your home and family.',
    image: require('../assets/services/electrician.png'),
    date: 'Mar 12, 2024',
    readTime: '5 min read',
    category: 'Safety'
  },
  {
    id: '5',
    title: 'Professional Painting Tips',
    excerpt: 'Expert tips and techniques for achieving a professional paint finish in your home.',
    image: require('../assets/services/Professional-Painter.png'),
    date: 'Mar 11, 2024',
    readTime: '4 min read',
    category: 'DIY'
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.blogCard,
        { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF' }
      ]}
    >
      <Image source={post.image} style={styles.blogImage} />
      <View style={styles.blogContent}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{post.category}</Text>
        </View>
        <Text style={[
          styles.blogTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {post.title}
        </Text>
        <Text style={[
          styles.blogExcerpt,
          { color: isDarkMode ? '#CCCCCC' : '#666666' }
        ]}>
          {post.excerpt}
        </Text>
        <View style={styles.blogMeta}>
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
      </View>
    </TouchableOpacity>
  );
};

export default function BlogScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation();

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
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Blog
        </Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons 
            name={isDarkMode ? 'sunny' : 'moon'} 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {blogPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  blogCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  blogImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    color: '#00A86B',
    fontSize: 14,
    fontWeight: '600',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  blogExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginRight: 8,
  },
}); 