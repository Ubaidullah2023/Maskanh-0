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
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SecurityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Security'>;

const { width } = Dimensions.get('window');

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
          borderBottomColor: isDarkMode ? '#333333' : '#E5E5E5' 
        }
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
        style={[
          styles.content,
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#F8F9FA' }
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Security Status Banner */}
        <View style={[
          styles.securityBanner,
          { 
            backgroundColor: isDarkMode ? '#2a2a2a' : '#E8F5E9',
          }
        ]}>
          <View style={styles.securityBannerIcon}>
            <Ionicons name="shield-checkmark" size={28} color="#00A86B" />
          </View>
          <View style={styles.securityBannerTextContainer}>
            <Text style={[
              styles.securityBannerTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>Security Status: Good</Text>
            <Text style={[
              styles.securityBannerSubtitle,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>Your account is secure</Text>
          </View>
        </View>

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
              { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
                borderColor: isDarkMode ? '#333333' : '#E5E5E5' 
              }
            ]}
            onPress={() => navigation.navigate('UpdatePassword')}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <View style={[
                  styles.iconBackground,
                  { backgroundColor: isDarkMode ? '#333' : '#E8F5E9' }
                ]}>
                  <Ionicons 
                    name="key-outline" 
                    size={22} 
                    color="#00A86B" 
                  />
                </View>
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
              <View style={styles.updateButton}>
                <Text style={styles.updateText}>Update</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.menuItem,
              { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
                borderColor: isDarkMode ? '#333333' : '#E5E5E5',
                marginTop: 12
              }
            ]}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <View style={[
                  styles.iconBackground,
                  { backgroundColor: isDarkMode ? '#333' : '#E8F5E9' }
                ]}>
                  <Ionicons 
                    name="phone-portrait-outline" 
                    size={22} 
                    color="#00A86B" 
                  />
                </View>
                <View>
                  <Text style={[
                    styles.menuLabel,
                    { color: isDarkMode ? '#FFFFFF' : '#000000' }
                  ]}>
                    Phone Number
                  </Text>
                  <Text style={[
                    styles.menuValue,
                    { color: isDarkMode ? '#CCCCCC' : '#666666' }
                  ]}>
                    +92 ••• ••• 4587
                  </Text>
                </View>
              </View>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#00A86B" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
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
            <View style={styles.shieldIconBackground}>
              <Ionicons name="shield-checkmark" size={30} color="#FFFFFF" />
            </View>
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
            We regularly review accounts to ensure maximum security. Maskanh prioritizes the protection of both property owners and service providers on our platform.
          </Text>
          <View style={styles.linksContainer}>
            <Text style={[
              styles.cardDescription,
              { color: isDarkMode ? '#CCCCCC' : '#666666' }
            ]}>
              Learn about safety tips for{' '}
              <Text style={styles.link}>property owners</Text>
              {' '}and{' '}
              <Text style={styles.link}>service providers</Text>
              .
            </Text>
          </View>
        </View>

        <View style={[
          styles.section,
          { marginTop: 10 }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Account
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.menuItem,
              { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
                borderColor: isDarkMode ? '#333333' : '#E5E5E5' 
              }
            ]}
            onPress={handleDeactivate}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <View style={styles.warningIconBackground}>
                  <Ionicons 
                    name="warning-outline" 
                    size={22} 
                    color="#FFFFFF" 
                  />
                </View>
                <Text style={[
                  styles.menuLabel,
                  { color: isDarkMode ? '#FFC7C7' : '#FF3B30' }
                ]}>
                  Deactivate your account
                </Text>
              </View>
              <TouchableOpacity style={styles.deactivateButton}>
                <Text style={styles.deactivateButtonText}>
                  Deactivate
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.securityTipsContainer}>
          <Text style={[
            styles.securityTipsTitle,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}>
            Security Tips
          </Text>
          
          <View style={[
            styles.securityTipCard,
            { backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF' }
          ]}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.tipTextContainer}>
              <Text style={[
                styles.tipTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>
                Use a strong password
              </Text>
              <Text style={[
                styles.tipDescription,
                { color: isDarkMode ? '#CCCCCC' : '#666666' }
              ]}>
                Create a unique password with at least 12 characters including numbers, symbols and uppercase letters.
              </Text>
            </View>
          </View>
          
          <View style={[
            styles.securityTipCard,
            { backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF' }
          ]}>
            <View style={[styles.tipIconContainer, { backgroundColor: '#5856D6' }]}>
              <Ionicons name="sync" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.tipTextContainer}>
              <Text style={[
                styles.tipTitle,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>
                Update regularly
              </Text>
              <Text style={[
                styles.tipDescription,
                { color: isDarkMode ? '#CCCCCC' : '#666666' }
              ]}>
                Change your password every 3 months to maintain high security on your Maskanh account.
              </Text>
            </View>
          </View>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 16,
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
    paddingBottom: 30,
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 5,
    borderRadius: 12,
  },
  securityBannerIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 168, 107, 0.15)',
    marginRight: 16,
  },
  securityBannerTextContainer: {
    flex: 1,
  },
  securityBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  securityBannerSubtitle: {
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  menuItem: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
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
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  warningIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FF3B30',
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
  updateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
  },
  updateText: {
    color: '#00A86B',
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  verifiedText: {
    marginLeft: 4,
    color: '#00A86B',
    fontWeight: '500',
    fontSize: 14,
  },
  securityCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  shieldIconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  linksContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  link: {
    color: '#00A86B',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  deactivateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  deactivateButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    minWidth: 100,
    alignItems: 'center',
  },
  deactivateButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  securityTipsContainer: {
    padding: 16,
    marginBottom: 16,
  },
  securityTipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  securityTipCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 