import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type Article = {
  id: string;
  title: string;
  description: string;
  image: any;
  date: string;
  readTime: string;
};

const articles: Article[] = [
  {
    id: '1',
    title: 'How to Improve Your Service Quality',
    description: 'Learn the best practices for delivering exceptional service to your clients.',
    image: require('../assets/services/Professional-Painter.png'),
    date: 'Mar 15, 2024',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Building Trust with Your Clients',
    description: 'Essential tips for building long-lasting relationships with your clients.',
    image: require('../assets/services/Plumber.png'),
    date: 'Mar 14, 2024',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Marketing Strategies for Service Providers',
    description: 'Effective ways to market your services and grow your business.',
    image: require('../assets/services/Interior-Designer.jpeg'),
    date: 'Mar 13, 2024',
    readTime: '6 min read',
  },
];

export default function ArticlesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const ArticleCard = ({ article }: { article: Article }) => (
    <TouchableOpacity style={styles.articleCard}>
      <Image 
        source={article.image}
        style={styles.articleImage}
        resizeMode="cover"
      />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {article.description}
        </Text>
        <View style={styles.articleMeta}>
          <Text style={styles.articleDate}>{article.date}</Text>
          <Text style={styles.articleReadTime}>{article.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#222222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Articles</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.articlesContainer}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
  },
  headerRight: {
    width: 24,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  articlesContainer: {
    padding: 16,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleDate: {
    fontSize: 12,
    color: '#999999',
  },
  articleReadTime: {
    fontSize: 12,
    color: '#00A86B',
    fontWeight: '500',
  },
}); 