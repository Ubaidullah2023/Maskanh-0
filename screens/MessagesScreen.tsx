import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { useNavigation } from '@react-navigation/native';

interface Message {
  id: string;
  sender: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Muhammad Ali',
    lastMessage: 'Is the property still available?',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Ahmad Workshop',
    lastMessage: 'I would like to schedule a viewing',
    time: '1h ago',
    unread: false,
  },
  {
    id: '3',
    sender: 'Sarah Khan',
    lastMessage: 'Thank you for your response',
    time: '2h ago',
    unread: true,
  },
  {
    id: '4',
    sender: 'Omar Properties',
    lastMessage: 'The viewing is confirmed for tomorrow',
    time: '1d ago',
    unread: false,
  }
];

export default function MessagesScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(mockMessages);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = mockMessages.filter(message =>
      message.sender.toLowerCase().includes(text.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      style={styles.messageItem}
      onPress={() => {
        // Navigate to chat detail screen (to be implemented)
        console.log('Navigate to chat with:', item.sender);
      }}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, item.unread && styles.unreadAvatar]}>
          <Text style={styles.avatarText}>
            {item.sender.split(' ').map((n: string) => n[0]).join('')}
          </Text>
        </View>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[styles.senderName, item.unread && styles.unreadSenderName]}>
            {item.sender}
          </Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage,
            item.unread && styles.unreadMessage
          ]}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

      </View>

      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={48} color={colors.text.light} />
            <Text style={styles.emptyText}>No messages found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerButton: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  listContent: {
    flexGrow: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadAvatar: {
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.white,
    ...typography.h3,
    fontWeight: '600',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: colors.white,
  },
  messageContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  senderName: {
    ...typography.body,
    fontSize: 16,
    color: colors.text.primary,
  },
  unreadSenderName: {
    fontWeight: '600',
  },
  messageTime: {
    ...typography.caption,
    color: colors.text.light,
  },
  lastMessage: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  unreadMessage: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl * 2,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.light,
    marginTop: spacing.md,
  },
}); 