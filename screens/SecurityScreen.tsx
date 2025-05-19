import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SecurityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Security'>;

export default function SecurityScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<SecurityScreenNavigationProp>();

  const handleDeactivate = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: () => {
            // Add deactivation logic here
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#FFFFFF'}
      />
      
      <View style={[
        styles.header,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          Login & Security
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Login
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.menuItem,
              { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
            ]}
            onPress={() => navigation.navigate('UpdatePassword')}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name="key-outline" 
                  size={24} 
                  color="#00A86B" 
                  style={styles.menuIcon}
                />
                <View>
                  <Text style={[
                    styles.menuLabel,
                    { color: isDarkMode ? '#FFFFFF' : '#000000' }
                  ]}>
                    Password
                  </Text>
                  <Text style={[
                    styles.menuValue,
                    { color: isDarkMode ? '#CCCCCC' : '#666666' }
                  ]}>
                    Last updated a month ago
                  </Text>
                </View>
              </View>
              <Text style={styles.updateText}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[
          styles.securityCard,
          { 
            backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
            borderColor: isDarkMode ? '#333333' : '#E5E5E5'
          }
        ]}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark" size={40} color="#00A86B" />
          </View>
          <Text style={[
            styles.cardTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Keeping your account secure
          </Text>
          <Text style={[
            styles.cardDescription,
            { color: isDarkMode ? '#CCCCCC' : '#666666' }
          ]}>
            We regularly review accounts to make sure they're secure as possible. We'll also let you know if there's more we can do to increase the security of your account.
          </Text>
          <View style={styles.linksContainer}>
            <Text style={[
              styles.cardDescription,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              Learn about safety tips for{' '}
              <Text style={styles.link}>guests</Text>
              {' '}and{' '}
              <Text style={styles.link}>hosts</Text>
              .
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Account
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.menuItem,
              { borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' }
            ]}
            onPress={handleDeactivate}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name="warning-outline" 
                  size={24} 
                  color="#FF3B30" 
                  style={styles.menuIcon}
                />
                <Text style={[
                  styles.menuLabel,
                  styles.deactivateText,
                  { color: isDarkMode ? '#CCCCCC' : '#666666' }
                ]}>
                  Deactivate your account
                </Text>
              </View>
              <Text style={styles.deactivateButton}>
                Deactivate
              </Text>
            </View>
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
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  menuValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  updateText: {
    color: '#00A86B',
    fontSize: 16,
    fontWeight: '600',
  },
  securityCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  linksContainer: {
    marginTop: 8,
  },
  link: {
    color: '#00A86B',
    textDecorationLine: 'underline',
  },
  deactivateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  deactivateButton: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
}); 