import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Dimensions, Image, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

// Define a separate param list for service provider screens
export type ServiceStackParamList = {
  ServiceEditProfile: undefined;
  ServicePersonalInfo: undefined;
  ServiceSecurity: undefined;
  ServiceNotificationSettings: undefined;
  ServiceLanguage: undefined;
  ServiceHelpCenter: undefined;
  ServiceTermsPrivacy: undefined;
  ServiceFeedback: undefined;
  ServiceLogin: undefined;
};

export default function ServiceProfileScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'serviceuser@gmail.com',
    contactNumber: '+1 234 567 8900',
    profileImage: require('../assets/images/construction.png'),
    role: 'Electrician',
    age: '35',
    city: 'Karachi',
    cnic: '42101-1234567-8',
    experience: '8 years',
  });

  const [editedData, setEditedData] = useState({...profileData});

  const pickImage = async () => {
    // Request permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setEditedData({
        ...editedData,
        profileImage: { uri: result.assets[0].uri }
      });
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedData({...profileData});
  };

  const handleSaveProfile = () => {
    setProfileData({...editedData});
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({...profileData});
  };

  const handlePersonalInfo = () => {
    navigation.navigate('ServicePersonalInfo');
  };

  const handleSecurity = () => {
    navigation.navigate('ServiceSecurity');
  };

  const handleNotifications = () => {
    navigation.navigate('ServiceNotificationSettings');
  };

  const handleLanguage = () => {
    navigation.navigate('ServiceLanguage');
  };

  const handleHelpCenter = () => {
    navigation.navigate('ServiceHelpCenter');
  };

  const handleTermsPrivacy = () => {
    navigation.navigate('ServiceTermsPrivacy');
  };

  const handleAbout = () => {
    navigation.navigate('ServiceFeedback');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ServiceLogin' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditDetails = () => {
    setIsEditingDetails(true);
    setEditedData({...profileData});
  };

  const handleSaveDetails = () => {
    setProfileData({...editedData});
    setIsEditingDetails(false);
  };

  const handleCancelDetails = () => {
    setIsEditingDetails(false);
    setEditedData({...profileData});
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const getSettingsButtonStyle = () => ({
    position: 'absolute' as const,
    top: insets.top + 8, // Small padding from top
    right: 16,
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {
        paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: '4%',
        minHeight: 56,
        maxHeight: 80,
        width: '100%',
      }]}> 
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Profile
        </Text>
        <TouchableOpacity 
          style={getSettingsButtonStyle()}
          onPress={() => navigation.navigate('ServiceNotificationSettings')}
        >
          <Ionicons name="settings-outline" size={18} color="#00A86B" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={[styles.profileCard, { marginTop: SCREEN_HEIGHT * 0.04 }]}>
          <TouchableOpacity 
            style={styles.editIconContainer}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={18} color="#00A86B" />
          </TouchableOpacity>
          
          <View style={styles.profileImageWrapper}>
            <View style={styles.profileImageContainer}>
              <Image
                source={isEditing ? editedData.profileImage : profileData.profileImage}
                style={styles.profileImage}
              />
            </View>
            {isEditing && (
              <TouchableOpacity 
                style={styles.changePhotoButton}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={editedData.name}
                onChangeText={(text) => setEditedData({...editedData, name: text})}
                placeholder="Name"
                placeholderTextColor="#999999"
              />
              <TextInput
                style={styles.input}
                value={editedData.email}
                onChangeText={(text) => setEditedData({...editedData, email: text})}
                placeholder="Email"
                placeholderTextColor="#999999"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                value={editedData.contactNumber}
                onChangeText={(text) => setEditedData({...editedData, contactNumber: text})}
                placeholder="Contact Number"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
              <View style={styles.editButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.editButton, styles.saveButton]}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={handleCancelEdit}
                >
                  <Text style={[styles.editButtonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.name}>{profileData.name}</Text>
              <Text style={styles.email}>{profileData.email}</Text>
              <Text style={styles.contactNumber}>{profileData.contactNumber}</Text>
            </>
          )}
        </View>

        <View style={[styles.detailsCard, { marginTop: 16 }]}>
          <TouchableOpacity 
            style={styles.editIconContainer}
            onPress={handleEditDetails}
          >
            <Ionicons name="pencil" size={18} color="#00A86B" />
          </TouchableOpacity>

          {isEditingDetails ? (
            <>
              <TextInput
                style={styles.input}
                value={editedData.role}
                onChangeText={(text) => setEditedData({...editedData, role: text})}
                placeholder="Role"
                placeholderTextColor="#999999"
              />
              <TextInput
                style={styles.input}
                value={editedData.age}
                onChangeText={(text) => setEditedData({...editedData, age: text})}
                placeholder="Age"
                placeholderTextColor="#999999"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={editedData.city}
                onChangeText={(text) => setEditedData({...editedData, city: text})}
                placeholder="City"
                placeholderTextColor="#999999"
              />
              <TextInput
                style={styles.input}
                value={editedData.cnic}
                onChangeText={(text) => setEditedData({...editedData, cnic: text})}
                placeholder="CNIC"
                placeholderTextColor="#999999"
              />
              <TextInput
                style={styles.input}
                value={editedData.experience}
                onChangeText={(text) => setEditedData({...editedData, experience: text})}
                placeholder="Experience"
                placeholderTextColor="#999999"
              />
              <View style={styles.editButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.editButton, styles.saveButton]}
                  onPress={handleSaveDetails}
                >
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={handleCancelDetails}
                >
                  <Text style={[styles.editButtonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="briefcase-outline" size={20} color="#00A86B" />
                  <Text style={styles.detailLabel}>Role</Text>
                </View>
                <Text style={styles.detailValue}>{profileData.role}</Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#00A86B" />
                  <Text style={styles.detailLabel}>Age</Text>
                </View>
                <Text style={styles.detailValue}>{profileData.age}</Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="location-outline" size={20} color="#00A86B" />
                  <Text style={styles.detailLabel}>City</Text>
                </View>
                <Text style={styles.detailValue}>{profileData.city}</Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="card-outline" size={20} color="#00A86B" />
                  <Text style={styles.detailLabel}>CNIC</Text>
                </View>
                <Text style={styles.detailValue}>{profileData.cnic}</Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Ionicons name="time-outline" size={20} color="#00A86B" />
                  <Text style={styles.detailLabel}>Experience</Text>
                </View>
                <Text style={styles.detailValue}>{profileData.experience}</Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute' as const,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#F0FFF4',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2F3E5',
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#00A86B',
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A86B',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 24,
  },
  editButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#00A86B',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00A86B',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#00A86B',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 6,
  },
  contactNumber: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 8,
  },
  settingsContainer: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A86B',
    marginTop: 24,
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#222222',
    marginLeft: 16,
  },
  detailsCard: {
    backgroundColor: '#F0FFF4',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2F3E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2F3E5',
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '500',
    marginLeft: 12,
  },
  detailValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
}); 