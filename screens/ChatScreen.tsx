import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  ActionSheetIOS,
  ToastAndroid,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';

type ChatScreenProps = {
  route: RouteProp<RootStackParamList, 'ChatScreen'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatScreen'>;
};

type Message = {
  id: string;
  text: string;
  sent: boolean;
  timestamp: Date;
  isLoading?: boolean;
  image?: string;
};

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const ChatScreen = ({ route, navigation }: ChatScreenProps) => {
  const { serviceId, serviceTitle, serviceSubtitle } = route.params || {};
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sent: false,
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages.length]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    // Check if the date is today
    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

    if (isToday) {
      return 'Today';
    }

    // Check if the date is yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() &&
                        date.getMonth() === yesterday.getMonth() &&
                        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      return 'Yesterday';
    }

    // Return the formatted date
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message, [{ text: 'OK' }], { cancelable: true });
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Sorry, we need camera roll permissions to upload photos!'
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Sorry, we need camera permissions to take photos!'
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageMessage: Message = {
          id: Date.now().toString(),
          text: '',
          sent: true,
          timestamp: new Date(),
          image: result.assets[0].uri,
        };
        
        setMessages([...messages, imageMessage]);

        // Simulate response
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: "I received your photo. I'll take a look at it.",
              sent: false,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, responseMessage]);
          }, 2000);
        }, 1000);
      }
    } catch (error) {
      showToast("Error taking photo. Please try again.");
      console.error("Error taking photo:", error);
    }
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageMessage: Message = {
          id: Date.now().toString(),
          text: '',
          sent: true,
          timestamp: new Date(),
          image: result.assets[0].uri,
        };
        
        setMessages([...messages, imageMessage]);

        // Simulate response
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: "Thanks for sharing this image. I'll analyze it and get back to you.",
              sent: false,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, responseMessage]);
          }, 2000);
        }, 1000);
      }
    } catch (error) {
      showToast("Error choosing photo. Please try again.");
      console.error("Error choosing photo:", error);
    }
  };

  const handlePhotoButton = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            // Take Photo
            handleTakePhoto();
          } else if (buttonIndex === 2) {
            // Choose from Library
            handleChoosePhoto();
          }
        }
      );
    } else {
      // For Android, we'll show a simple alert with options
      Alert.alert(
        'Upload Photo',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: handleTakePhoto },
          { text: 'Choose from Library', onPress: handleChoosePhoto },
        ],
        { cancelable: true }
      );
    }
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sent: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I'll get back to you shortly with more details about our services.",
        sent: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const toggleOptionsMenu = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleDeleteChat = () => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this conversation? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            // Navigate back to MessageScreen
            // In a real app, you would also update the chat list to remove this chat
            navigation.goBack();
          }
        }
      ]
    );
    setIsOptionsVisible(false);
  };

  const handleClearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all messages? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            // Clear all messages but keep the chat
            setMessages([]);
          }
        }
      ]
    );
    setIsOptionsVisible(false);
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    // Check if we need to show a date separator
    const showDateSeparator = index === 0 || 
      (index > 0 && 
        new Date(messages[index-1].timestamp).getDate() !== new Date(item.timestamp).getDate());

    return (
      <>
        {showDateSeparator && (
          <View style={styles.dateSeparator}>
            <Text style={[
              styles.dateSeparatorText,
              { color: isDarkMode ? '#999' : '#999' }
            ]}>
              {formatDate(item.timestamp)}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            item.sent ? styles.sentMessage : styles.receivedMessage,
            {
              backgroundColor: item.sent
                ? isDarkMode ? '#00A86B' : '#00A86B'
                : isDarkMode ? '#2A2A2A' : '#f0f0f0',
            },
            item.image ? styles.imageMessage : {},
          ]}
        >
          {item.image && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.messageImage}
                resizeMode="cover"
              />
            </View>
          )}
          {item.text.length > 0 && (
            <Text
              style={[
                styles.messageText,
                {
                  color: item.sent ? '#fff' : isDarkMode ? '#fff' : '#000',
                },
              ]}
            >
              {item.text}
            </Text>
          )}
          <Text
            style={[
              styles.messageTime,
              {
                color: item.sent ? 'rgba(255,255,255,0.7)' : isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              },
            ]}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#fff'}
        translucent={true}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderBottomColor: isDarkMode ? '#333' : '#e5e5e5',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 5 : 5,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.providerAvatarContainer}>
            <View style={[
              styles.providerAvatar,
              { backgroundColor: isDarkMode ? '#333' : '#E8F5E9' }
            ]}>
              <Text style={[
                styles.providerAvatarText,
                { color: isDarkMode ? '#fff' : '#34A853' }
              ]}>
                {serviceTitle ? serviceTitle[0] : 'S'}
              </Text>
            </View>
            <View style={styles.providerStatus} />
          </View>
          <View style={styles.providerDetails}>
            <Text
              style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}
              numberOfLines={1}
            >
              {serviceTitle || 'Service Provider'}
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: isDarkMode ? '#999' : '#666' },
              ]}
              numberOfLines={1}
            >
              {serviceSubtitle || 'Service Category'}
            </Text>
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="call-outline"
              size={22}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={toggleOptionsMenu}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Options Menu */}
      {isOptionsVisible && (
        <View style={[
          styles.optionsMenu,
          { backgroundColor: isDarkMode ? '#2A2A2A' : '#fff' }
        ]}>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={handleDeleteChat}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#FF3B30"
              style={styles.optionIcon}
            />
            <Text style={[
              styles.optionText,
              { color: "#FF3B30" }
            ]}>
              Delete Chat
            </Text>
          </TouchableOpacity>
          <View style={[
            styles.optionDivider,
            { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }
          ]} />
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={handleClearChat}
          >
            <Ionicons
              name="refresh-outline"
              size={20}
              color={isDarkMode ? '#fff' : '#000'}
              style={styles.optionIcon}
            />
            <Text style={[
              styles.optionText,
              { color: isDarkMode ? '#fff' : '#000' }
            ]}>
              Clear Chat
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted={false}
      />

      {/* Typing indicator */}
      {isTyping && (
        <View style={[
          styles.typingContainer,
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
        ]}>
          <View style={[
            styles.typingBubble,
            { backgroundColor: isDarkMode ? '#2A2A2A' : '#f0f0f0' }
          ]}>
            <Text style={[
              styles.typingText,
              { color: isDarkMode ? '#999' : '#666' }
            ]}>
              {serviceTitle || 'Service Provider'} is typing
            </Text>
            <ActivityIndicator size="small" color="#00A86B" style={styles.typingIndicator} />
          </View>
        </View>
      )}

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode ? '#2A2A2A' : '#f5f5f5',
            borderTopColor: isDarkMode ? '#333' : '#e0e0e0',
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.photoButton}
          onPress={handlePhotoButton}
        >
          <Ionicons 
            name="camera" 
            size={24} 
            color={isDarkMode ? '#999' : '#666'} 
          />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
          placeholder="Type a message..."
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: message.trim() ? '#00A86B' : isDarkMode ? '#333' : '#ccc',
            },
          ]}
          onPress={sendMessage}
          disabled={message.trim() === ''}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    minHeight: 60,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerAvatarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  providerStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34A853',
    borderWidth: 2,
    borderColor: '#fff',
  },
  providerDetails: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  optionsMenu: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 65 : 65,
    right: 16,
    width: 180,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  optionDivider: {
    height: 1,
    width: '100%',
  },
  messagesContainer: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateSeparatorText: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  messageBubble: {
    maxWidth: isTablet ? '60%' : '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  imageMessage: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  imageContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 6,
  },
  messageImage: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
  },
  imagePlaceholder: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  imagePlaceholderText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    maxWidth: '80%',
  },
  typingText: {
    fontSize: 12,
    marginRight: 8,
  },
  typingIndicator: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  photoButton: {
    marginRight: 8,
    padding: 4,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatScreen; 