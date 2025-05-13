import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ServiceNavigation from '../components/ServiceNavigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#00A86B';

type MessageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online?: boolean;
};

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    lastMessage: 'When can you come to fix the plumbing issue in my bathroom?',
    time: '5 min ago',
    unread: 2,
    avatar: '👨',
    online: true,
  },
  {
    id: '2',
    name: 'Fatima Ali',
    lastMessage: 'The AC repair was excellent. Thank you for your service!',
    time: '1 hour ago',
    unread: 0,
    avatar: '👩',
    online: false,
  },
  {
    id: '3',
    name: 'Usman Malik',
    lastMessage: 'Can you provide a quote for the renovation project?',
    time: '2 hours ago',
    unread: 1,
    avatar: '👨',
    online: true,
  },
  {
    id: '4',
    name: 'Ayesha Riaz',
    lastMessage: 'The electrical work is completed. Everything is working perfectly.',
    time: 'Yesterday',
    unread: 0,
    avatar: '👩',
    online: false,
  },
  {
    id: '5',
    name: 'Hassan Sheikh',
    lastMessage: 'I need an electrician for my new office setup in Gulberg.',
    time: 'Yesterday',
    unread: 3,
    avatar: '👨',
    online: true,
  }
];

export default function MessagesScreen() {
  const navigation = useNavigation<MessageScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filteredConversations = useMemo(() => {
    return conversations.filter(conversation => 
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: insets.top + SCREEN_HEIGHT * 0.02,
      paddingBottom: SCREEN_HEIGHT * 0.02,
      paddingHorizontal: SCREEN_WIDTH * 0.05,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      position: 'relative',
      backgroundColor: '#fff',
      marginBottom: SCREEN_HEIGHT * 0.01,
    },
    backButton: {
      position: 'absolute',
      left: SCREEN_WIDTH * 0.05,
      padding: SCREEN_WIDTH * 0.02,
      top: insets.top + SCREEN_HEIGHT * 0.025,
    },
    headerTitle: {
      fontSize: SCREEN_WIDTH < 360 ? 20 : 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: SCREEN_HEIGHT * 0.01,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: SCREEN_WIDTH * 0.04,
      paddingHorizontal: SCREEN_WIDTH * 0.04,
      backgroundColor: '#f5f5f5',
      borderRadius: 12,
      height: SCREEN_HEIGHT * 0.05,
    },
    searchIcon: {
      marginRight: SCREEN_WIDTH * 0.02,
    },
    searchInput: {
      flex: 1,
      fontSize: SCREEN_WIDTH < 360 ? 14 : 16,
      color: '#333',
      padding: 0,
    },
    listContainer: {
      paddingBottom: SCREEN_HEIGHT * 0.02,
    },
    conversationItem: {
      flexDirection: 'row',
      padding: SCREEN_WIDTH * 0.04,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: SCREEN_WIDTH * 0.04,
    },
    avatar: {
      fontSize: SCREEN_WIDTH * 0.08,
      backgroundColor: '#f0f0f0',
      width: SCREEN_WIDTH * 0.12,
      height: SCREEN_WIDTH * 0.12,
      borderRadius: SCREEN_WIDTH * 0.06,
      textAlign: 'center',
      lineHeight: SCREEN_WIDTH * 0.12,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: SCREEN_WIDTH * 0.03,
      height: SCREEN_WIDTH * 0.03,
      borderRadius: SCREEN_WIDTH * 0.015,
      backgroundColor: PRIMARY_COLOR,
      borderWidth: 2,
      borderColor: '#fff',
    },
    unreadBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    unreadText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    conversationContent: {
      flex: 1,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    name: {
      fontSize: SCREEN_WIDTH < 360 ? 15 : 17,
      fontWeight: '600',
      color: '#333',
    },
    time: {
      fontSize: SCREEN_WIDTH < 360 ? 11 : 13,
      color: '#999',
    },
    lastMessage: {
      fontSize: SCREEN_WIDTH < 360 ? 13 : 15,
      color: '#666',
    },
    unreadMessage: {
      color: '#333',
      fontWeight: '500',
    },
  });

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Chat', { name: item.name })}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.online && <View style={styles.onlineIndicator} />}
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage,
            item.unread > 0 && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <ServiceNavigation />
    </SafeAreaView>
  );
} 