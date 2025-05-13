import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY_COLOR = '#00A86B';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const { name } = route.params;
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you?', sender: 'them' },
    { id: '2', text: 'Hi Imran, I have a plumbing issue.', sender: 'me' },
    { id: '3', text: 'Sure, can you describe the problem?', sender: 'them' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [
        ...prev,
        { id: String(Date.now()), text: input, sender: 'me' }
      ]);
      setInput('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + SCREEN_HEIGHT * 0.01, paddingBottom: SCREEN_HEIGHT * 0.01 }]}>
        <View style={styles.headerNameContainer}>
          <View style={styles.onlineDot} />
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.theirMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  headerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PRIMARY_COLOR,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH < 360 ? 18 : 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    flexShrink: 1,
  },
  messagesContainer: {
    padding: SCREEN_WIDTH * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.01,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingVertical: SCREEN_HEIGHT * 0.012,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  myMessage: {
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#222',
    fontSize: SCREEN_WIDTH < 360 ? 13 : 15,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SCREEN_WIDTH * 0.025,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontSize: SCREEN_WIDTH < 360 ? 13 : 15,
    marginRight: SCREEN_WIDTH * 0.025,
    color: '#222',
  },
  sendButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 20,
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
    minHeight: 36,
    maxWidth: 44,
    maxHeight: 44,
  },
}); 