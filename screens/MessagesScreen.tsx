import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

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
];

export default function MessagesScreen() {
  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.sender.split(' ').map((n: string) => n[0]).join('')}
          </Text>
        </View>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage,
            item.unread && styles.unreadMessage
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
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
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
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  listContent: {
    flexGrow: 1,
  },
  messageItem: {
    flexDirection: 'row',
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    ...typography.h3,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  senderName: {
    ...typography.body,
    fontWeight: '500' as const,
    color: colors.text.primary,
  },
  messageTime: {
    ...typography.caption,
    color: colors.text.light,
  },
  lastMessage: {
    ...typography.body,
    color: colors.text.secondary,
  },
  unreadMessage: {
    color: colors.text.primary,
    fontWeight: '500' as const,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.light,
  },
}); 