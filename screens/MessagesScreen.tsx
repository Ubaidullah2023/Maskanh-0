import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  Platform,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import BottomNavigation from '../components/BottomNavigation';

type MessageItemProps = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  serviceId?: string;
  serviceTitle?: string;
  serviceSubtitle?: string;
  onPress: () => void;
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const MessageItem = ({ name, message, time, unreadCount, onPress }: MessageItemProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.messageItem, 
        { 
          backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
          borderBottomColor: isDarkMode ? '#333' : '#EEEEEE',
          marginHorizontal: isTablet ? 16 : 0,
          borderRadius: isTablet ? 12 : 0,
          marginBottom: isTablet ? 8 : 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: isTablet ? 1 : 0,
          },
          shadowOpacity: isTablet ? 0.1 : 0,
          shadowRadius: isTablet ? 2 : 0,
          elevation: isTablet ? 2 : 0,
          borderBottomWidth: isTablet ? 0 : 1,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.avatarContainer,
        { backgroundColor: isDarkMode ? '#333' : '#E8F5E9' }
      ]}>
        <Text style={[
          styles.avatarText,
          { color: isDarkMode ? '#fff' : '#34A853' }
        ]}>{name[0]}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[
            styles.messageName,
            { color: isDarkMode ? '#fff' : '#222222' }
          ]}>{name}</Text>
          <Text style={[
            styles.messageTime,
            { color: isDarkMode ? '#999' : '#999999' }
          ]}>{time}</Text>
        </View>
        <Text 
          style={[
            styles.messageText, 
            { color: isDarkMode ? (unreadCount ? '#fff' : '#aaa') : (unreadCount ? '#222222' : '#666666') },
            unreadCount ? styles.unreadMessageText : null
          ]} 
          numberOfLines={1}
        >
          {message}
        </Text>
      </View>
      {unreadCount ? (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{unreadCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default function MessagesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChatScreen'>>();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

  const messages = [
    {
      id: '1',
      name: 'Imran Khan',
      message: 'I need your help with a plumbing issue...',
      time: '10:45 AM',
      unreadCount: 2,
      serviceId: '7',
      serviceTitle: 'Plumbing Pro',
      serviceSubtitle: 'Plumber • Multan'
    },
    {
      id: '2',
      name: 'Ayesha Ahmed',
      message: 'When can you come to fix the electrical wiring in my home?',
      time: 'Yesterday',
      serviceId: '1',
      serviceTitle: 'Muhammad Ali',
      serviceSubtitle: 'Electrician • Kamra'
    },
    {
      id: '3',
      name: 'Saad Ali',
      message: 'Thank you for your excellent carpentry service!',
      time: 'Mon',
      serviceId: '2',
      serviceTitle: 'Ahmad Workshop',
      serviceSubtitle: 'Carpenter • Islamabad'
    },
    {
      id: '4',
      name: 'Fatima Riaz',
      message: 'Can you provide a quote for the renovation project we discussed?',
      time: 'Sun',
      unreadCount: 1,
      serviceId: '8',
      serviceTitle: 'Color Masters',
      serviceSubtitle: 'Professional Painter • Faisalabad'
    },
    {
      id: '5',
      name: 'Hassan Malik',
      message: 'The AC is working perfectly now. Thank you for the prompt service!',
      time: 'Sat',
      serviceId: '4',
      serviceTitle: 'Modern Machinery',
      serviceSubtitle: 'Heavy Equipment • Lahore'
    },
    {
      id: '6',
      name: 'Mariam Asif',
      message: 'I would like to schedule another consultation for interior design.',
      time: 'Fri',
      serviceId: '5',
      serviceTitle: 'Design Masters',
      serviceSubtitle: 'Interior Designer • Karachi'
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMessages(messages);
      return;
    }

    const filtered = messages.filter(msg => 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredMessages(filtered);
  }, [searchQuery]);

  const handleMessagePress = (message: any) => {
    navigation.navigate('ChatScreen', {
      serviceId: message.serviceId || '',
      serviceTitle: message.serviceTitle || message.name,
      serviceSubtitle: message.serviceSubtitle || ''
    });
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F9FA' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { 
          backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF',
          borderBottomColor: isDarkMode ? '#333' : '#EEEEEE',
          paddingTop: Platform.OS === 'android' ? 20 : 10,
          marginTop: 10
        }
      ]}>
        <View style={styles.headerContent}>
          <Text style={[
            styles.headerTitle,
            { color: isDarkMode ? '#fff' : '#000000' }
          ]}>Messages</Text>
        </View>
        
        <View style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }
        ]}>
          <Ionicons 
            name="search" 
            size={20} 
            color={isDarkMode ? '#999' : '#999999'} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? '#fff' : '#000' }
            ]}
            placeholder="Search messages..."
            placeholderTextColor={isDarkMode ? '#999' : '#999999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={isDarkMode ? '#999' : '#999999'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.contentContainer}>
        {filteredMessages.length > 0 ? (
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              isTablet ? styles.tabletContent : null,
              { paddingBottom: 90 } // Add padding to account for bottom navigation
            ]}
          >
            {filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                id={message.id}
                name={message.name}
                message={message.message}
                time={message.time}
                unreadCount={message.unreadCount}
                serviceId={message.serviceId}
                serviceTitle={message.serviceTitle}
                serviceSubtitle={message.serviceSubtitle}
                onPress={() => handleMessagePress(message)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="chatbubble-ellipses-outline" 
              size={64} 
              color={isDarkMode ? '#333' : '#ddd'} 
            />
            <Text style={[
              styles.emptyTitle,
              { color: isDarkMode ? '#fff' : '#333' }
            ]}>No messages found</Text>
            <Text style={[
              styles.emptySubtext,
              { color: isDarkMode ? '#999' : '#666' }
            ]}>Try a different search term</Text>
          </View>
        )}
      </View>

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
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  tabletContent: {
    paddingVertical: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
  },
  messageContent: {
    flex: 1,
    marginRight: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 14,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  unreadMessageText: {
    fontWeight: '500',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 