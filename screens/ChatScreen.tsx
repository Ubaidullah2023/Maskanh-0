import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const PRIMARY_COLOR = '#00A86B';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type Message = {
  id: string;
  text?: string;
  image?: string;
  sender: 'me' | 'them';
  time: string;
};

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const { name } = route.params;
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [welcomeSent, setWelcomeSent] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Camera functionality
  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is required to send images.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  // Send message (text or image)
  const sendMessage = () => {
    if (input.trim() || capturedImage) {
      const newMessage: Message = {
        id: String(Date.now()),
        text: input.trim(),
        image: capturedImage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setCapturedImage(null);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Show welcome message only after first user message
      if (!welcomeSent) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: String(Date.now() + 1),
              text: 'Welcome to Maskanh! How can I help you today?',
              sender: 'them',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          setWelcomeSent(true);
        }, 600);
      }
    }
  };

  // Cancel captured image
  const cancelImage = () => {
    setCapturedImage(null);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessageContainer : styles.theirMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.theirMessage
      ]}>
        {item.text ? (
          <Text style={[
            styles.messageText,
            item.sender === 'me' ? styles.myMessageText : styles.theirMessageText
          ]}>
            {item.text}
          </Text>
        ) : null}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        ) : null}
        <Text style={[
          styles.messageTime,
          item.sender === 'me' ? styles.myMessageTime : styles.theirMessageTime
        ]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>{name}</Text>
              <View style={styles.onlineIndicator}>
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {capturedImage && (
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: capturedImage }} 
              style={styles.previewImage} 
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={styles.cancelImageButton}
              onPress={cancelImage}
            >
              <Ionicons name="close-circle" size={24} color="#FF0000" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
            <Ionicons name="camera" size={26} color={PRIMARY_COLOR} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
            />
          </View>
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              !input.trim() && !capturedImage && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!input.trim() && !capturedImage}
          >
            <Ionicons 
              name="send" 
              size={22} 
              color={(input.trim() || capturedImage) ? "#fff" : "#bdbdbd"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FCF9',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
    paddingBottom: SCREEN_HEIGHT * 0.02,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SCREEN_WIDTH * 0.02,
  },
  headerName: {
    fontSize: SCREEN_WIDTH < 360 ? 16 : 19,
    fontWeight: '700',
    color: '#000000',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineText: {
    fontSize: SCREEN_WIDTH < 360 ? 11 : 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  messagesContainer: {
    padding: SCREEN_WIDTH * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.01,
  },
  messageContainer: {
    marginBottom: SCREEN_HEIGHT * 0.012,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    paddingVertical: SCREEN_HEIGHT * 0.012,
    paddingHorizontal: SCREEN_WIDTH * 0.045,
    maxWidth: '100%',
    elevation: 1,
  },
  myMessage: {
    backgroundColor: PRIMARY_COLOR,
    borderTopRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E0F2EF',
  },
  messageText: {
    fontSize: SCREEN_WIDTH < 360 ? 13 : 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#222',
  },
  messageImage: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'center',
  },
  messageTime: {
    fontSize: SCREEN_WIDTH < 360 ? 10 : 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  myMessageTime: {
    color: '#C8F2E0',
  },
  theirMessageTime: {
    color: '#A0A0A0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.03,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cameraButton: {
    padding: SCREEN_WIDTH * 0.02,
    marginRight: SCREEN_WIDTH * 0.01,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6FCF9',
    borderRadius: 20,
    marginHorizontal: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  input: {
    flex: 1,
    fontSize: SCREEN_WIDTH < 360 ? 14 : 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: SCREEN_HEIGHT * 0.01,
  },
  sendButton: {
    backgroundColor: PRIMARY_COLOR,
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SCREEN_WIDTH * 0.01,
  },
  sendButtonDisabled: {
    backgroundColor: '#E0F2EF',
  },
  previewContainer: {
    padding: SCREEN_WIDTH * 0.03,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  previewImage: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  cancelImageButton: {
    position: 'absolute',
    top: SCREEN_WIDTH * 0.02,
    right: SCREEN_WIDTH * 0.02,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
}); 