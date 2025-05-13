import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MessageItem = ({ name, message, time, unreadCount, onPress }: MessageItemProps & { onPress: () => void }) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress}>
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
            onPress={() => navigation.navigate('Chat', { name: message.name })}
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
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingVertical: SCREEN_HEIGHT * 0.03,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    width: '100%',
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 22 : 28,
    fontWeight: '700',
    color: '#000000',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: SCREEN_HEIGHT * 0.018,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    width: '100%',
  },
  avatarContainer: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_WIDTH * 0.13,
    borderRadius: (SCREEN_WIDTH * 0.13) / 2,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.04,
  },
  avatarText: {
    fontSize: SCREEN_WIDTH < 360 ? 16 : 20,
    fontWeight: '600',
    color: '#34A853',
  },
  messageContent: {
    flex: 1,
    marginRight: SCREEN_WIDTH * 0.03,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: SCREEN_WIDTH < 360 ? 13 : 16,
    fontWeight: '600',
    color: '#222222',
  },
  messageTime: {
    fontSize: SCREEN_WIDTH < 360 ? 11 : 14,
    color: '#999999',
  },
  messageText: {
    fontSize: SCREEN_WIDTH < 360 ? 11 : 14,
    color: '#666666',
    lineHeight: 20,
  },
  unreadBadge: {
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_WIDTH * 0.07,
    borderRadius: (SCREEN_WIDTH * 0.07) / 2,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: SCREEN_WIDTH < 360 ? 10 : 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 