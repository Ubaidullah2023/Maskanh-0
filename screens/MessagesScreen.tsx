import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';

type MessageItemProps = {
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
};

const MessageItem = ({ name, message, time, unreadCount }: MessageItemProps) => (
  <TouchableOpacity style={styles.messageItem}>
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{name[0]}</Text>
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageName}>{name}</Text>
        <Text style={styles.messageTime}>{time}</Text>
      </View>
      <Text style={styles.messageText} numberOfLines={1}>
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

export default function MessagesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const messages = [
    {
      name: 'Imran Khan',
      message: 'I need your help with a plumbing issue...',
      time: '10:45 AM',
      unreadCount: 2
    },
    {
      name: 'Ayesha Ahmed',
      message: 'When can you come to fix the electric...',
      time: 'Yesterday'
    },
    {
      name: 'Saad Ali',
      message: 'Thank you for your service!',
      time: 'Mon'
    },
    {
      name: 'Fatima Riaz',
      message: 'Can you provide a quote for the renov...',
      time: 'Sun',
      unreadCount: 1
    },
    {
      name: 'Hassan Malik',
      message: 'The AC is working perfectly now. Tha...',
      time: 'Sat'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            name={message.name}
            message={message.message}
            time={message.time}
            unreadCount={message.unreadCount}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 26,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34A853',
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
    color: '#222222',
  },
  messageTime: {
    fontSize: 14,
    color: '#999999',
  },
  messageText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
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
}); 