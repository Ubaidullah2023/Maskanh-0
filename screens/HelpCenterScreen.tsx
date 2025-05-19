import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ImageRequireSource,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type IconName = 
  | 'chevron-back'
  | 'chevron-forward'
  | 'search'
  | 'alert-circle-outline'
  | 'search-outline'
  | 'hand-right-outline'
  | 'card-outline'
  | 'shield-outline'
  | 'people-outline'
  | 'warning-outline'
  | 'calendar-outline'
  | 'bulb-outline'
  | 'laptop-outline'
  | 'grid-outline'
  | 'briefcase-outline';

type ExploreItem = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

type GuideItem = {
  id: string;
  title: string;
  icon: IconName;
};

type TopicItem = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  type: 'action' | 'quick';
};

type Category = {
  id: string;
  label: string;
  isSelected: boolean;
};

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('guest');

  const categories: Category[] = [
    { id: 'guest', label: 'Guest', isSelected: selectedCategory === 'guest' },
    { id: 'host', label: 'Host', isSelected: selectedCategory === 'host' },
    { id: 'experience', label: 'Experience Host', isSelected: selectedCategory === 'experience' },
    { id: 'admin', label: 'Travel admin', isSelected: selectedCategory === 'admin' },
  ];

  const recommendedTopics: TopicItem[] = [
    {
      id: '1',
      title: 'Your identity is not fully verified',
      description: 'Identity verification helps us check that you are really you. It is one of the ways we keep Maskanh secure.',
      icon: 'alert-circle-outline',
      type: 'action',
    },
    {
      id: '2',
      title: 'Finding reservation details',
      description: 'Your Trips tab has full details, receipts, and Host contact info for each of your reservations.',
      icon: 'search-outline',
      type: 'quick',
    }
  ];

  const hostRecommendedTopics: TopicItem[] = [
    {
      id: '1',
      title: 'How would you like to get paid?',
      description: 'You don\'t have an available payout method yet. Let\'s get one set up.',
      icon: 'card-outline',
      type: 'action',
    },
    {
      id: '2',
      title: 'Your identity needs verification',
      description: 'Identity verification helps build trust in our community.',
      icon: 'alert-circle-outline',
      type: 'action',
    }
  ];

  const experienceHostRecommendedTopics: TopicItem[] = [
    {
      id: '1',
      title: 'Set up your Experience payments',
      description: 'Choose how you want to receive your earnings from hosting experiences.',
      icon: 'card-outline',
      type: 'action',
    },
    {
      id: '2',
      title: 'Manage your Experience calendar',
      description: 'Update your availability and manage upcoming bookings.',
      icon: 'calendar-outline',
      type: 'quick',
    }
  ];

  const travelAdminRecommendedTopics: TopicItem[] = [
    {
      id: '1',
      title: 'Getting started with Maskanh for Work',
      description: 'Learn how to set up and manage your business travel program.',
      icon: 'laptop-outline',
      type: 'quick',
    },
    {
      id: '2',
      title: 'Dashboard setup required',
      description: 'Complete your Maskanh for Work dashboard setup to start managing business travel.',
      icon: 'alert-circle-outline',
      type: 'action',
    }
  ];

  const guides: GuideItem[] = [
    {
      id: '1',
      title: 'Getting started on Maskanh',
      icon: 'hand-right-outline',
    },
    {
      id: '2',
      title: 'Finding a stay that is right for you',
      icon: 'search-outline',
    },
    {
      id: '3',
      title: 'Paying for your trip',
      icon: 'card-outline',
    },
    {
      id: '4',
      title: 'MaskanhCover for guests',
      icon: 'shield-outline',
    }
  ];

  const hostGuides: GuideItem[] = [
    {
      id: '1',
      title: 'Getting paid',
      icon: 'card-outline',
    },
    {
      id: '2',
      title: 'Optimizing your listing',
      icon: 'search-outline',
    },
    {
      id: '3',
      title: 'Getting protected through MaskanhCover for Hosts',
      icon: 'shield-outline',
    },
    {
      id: '4',
      title: 'Changes, cancellations, and refunds for hosts',
      icon: 'warning-outline',
    }
  ];

  const experienceHostGuides: GuideItem[] = [
    {
      id: '1',
      title: 'Getting paid',
      icon: 'card-outline',
    },
    {
      id: '2',
      title: 'Managing your Experience',
      icon: 'calendar-outline',
    },
    {
      id: '3',
      title: 'Changes and cancellations',
      icon: 'warning-outline',
    },
    {
      id: '4',
      title: 'How co-hosting works',
      icon: 'people-outline',
    }
  ];

  const travelAdminGuides: GuideItem[] = [
    {
      id: '1',
      title: 'Links to help you get started with Maskanh for Work',
      icon: 'laptop-outline',
    },
    {
      id: '2',
      title: 'Links to help you get started using your Maskanh for Work dashboard',
      icon: 'grid-outline',
    },
    {
      id: '3',
      title: 'Links to help you navigate Maskanh for Work booking and reservations',
      icon: 'calendar-outline',
    },
    {
      id: '4',
      title: 'Help with billing',
      icon: 'card-outline',
    }
  ];

  const exploreMore: ExploreItem[] = [
    {
      id: '1',
      title: 'Our community policies',
      description: 'How we build a foundation of trust',
      icon: 'people-outline',
    },
    {
      id: '2',
      title: 'Safety tips and guidelines',
      description: 'Resources to help travel safely',
      icon: 'warning-outline',
    }
  ];

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const getRecommendedTopics = () => {
    switch (selectedCategory) {
      case 'host':
        return hostRecommendedTopics;
      case 'experience':
        return experienceHostRecommendedTopics;
      case 'admin':
        return travelAdminRecommendedTopics;
      default:
        return recommendedTopics;
    }
  };

  const getGuides = () => {
    switch (selectedCategory) {
      case 'host':
        return hostGuides;
      case 'experience':
        return experienceHostGuides;
      case 'admin':
        return travelAdminGuides;
      default:
        return guides;
    }
  };

  const getSectionTitle = () => {
    switch (selectedCategory) {
      case 'host':
        return 'Guides for Hosts';
      case 'experience':
        return 'Guides for Experience Hosts';
      case 'admin':
        return 'Guides for travel admins';
      default:
        return 'Guides for getting started';
    }
  };

  const getExploreMore = () => {
    if (selectedCategory === 'admin') {
      return [
        {
          id: '1',
          title: 'Our community policies',
          description: 'How we build a foundation of trust',
          icon: 'people-outline',
        },
        {
          id: '2',
          title: 'Business travel resources',
          description: 'Learn about managing corporate travel',
          icon: 'briefcase-outline',
        }
      ];
    }
    if (selectedCategory === 'experience') {
      return [
        {
          id: '1',
          title: 'Our community policies',
          description: 'How we build a foundation of trust',
          icon: 'people-outline',
        },
        {
          id: '2',
          title: 'Resources for Experience Hosts',
          description: 'Find tips and inspiration.',
          icon: 'bulb-outline',
        }
      ];
    }
    return exploreMore;
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name={'chevron-back' as IconName} size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Hi, how can we help?
        </Text>

        <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5' }]}>
          <Ionicons name={'search' as IconName} size={20} color={isDarkMode ? '#FFFFFF' : '#666666'} />
          <TextInput
            style={[styles.searchInput, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
            placeholder="Search help"
            placeholderTextColor={isDarkMode ? '#999999' : '#666666'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                category.isSelected && styles.selectedCategory,
                { backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5' }
              ]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={[
                styles.categoryText,
                category.isSelected && styles.selectedCategoryText,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Recommended for you
        </Text>

        {getRecommendedTopics().map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF' }]}
          >
            <View style={styles.topicHeader}>
              {topic.type === 'action' && (
                <View style={styles.actionRequired}>
                  <Text style={styles.actionText}>Action required</Text>
                </View>
              )}
              {topic.type === 'quick' && (
                <View style={styles.quickLink}>
                  <Text style={styles.quickLinkText}>Quick link</Text>
                </View>
              )}
            </View>
            <Text style={[styles.topicTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              {topic.title}
            </Text>
            <Text style={[styles.topicDescription, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
              {topic.description}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          {getSectionTitle()}
        </Text>

        {getGuides().map((guide) => (
          <TouchableOpacity
            key={guide.id}
            style={[styles.guideItem, { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }]}
          >
            <Ionicons name={guide.icon} size={24} color="#00A86B" />
            <Text style={[styles.guideText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              {guide.title}
            </Text>
            <Ionicons name={'chevron-forward' as IconName} size={24} color={isDarkMode ? '#FFFFFF' : '#666666'} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.browseTopics}>
          <Text style={[styles.browseTopicsText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Browse all topics
          </Text>
          <Ionicons name={'chevron-forward' as IconName} size={24} color={isDarkMode ? '#FFFFFF' : '#666666'} />
        </TouchableOpacity>

        <View style={[styles.exploreSection, { backgroundColor: isDarkMode ? '#000000' : '#F8F8F8' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Explore more
          </Text>
          {getExploreMore().map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.exploreCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF' }]}
            >
              <View style={styles.exploreContent}>
                <Text style={[styles.exploreTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.exploreDescription, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={[styles.contactTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Need to get in touch?
          </Text>
          <Text style={[styles.contactDescription, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
            We'll start with some questions and get you to the right place.
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF' }]}
          >
            <Text style={[styles.contactButtonText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              Contact us
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#00A86B',
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  topicCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicHeader: {
    marginBottom: 8,
  },
  actionRequired: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '600',
  },
  quickLink: {
    backgroundColor: '#E5F6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  quickLinkText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  guideText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  browseTopics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  browseTopicsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  exploreSection: {
    padding: 16,
    marginTop: 24,
  },
  exploreCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  exploreContent: {
    padding: 16,
  },
  exploreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exploreDescription: {
    fontSize: 14,
  },
  contactSection: {
    padding: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  contactButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 