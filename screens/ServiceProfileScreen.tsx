import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Dimensions, Image, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

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
  ServiceSettings: undefined;
};

export default function ServiceProfileScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingServices, setIsEditingServices] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
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
  const [editedAbout, setEditedAbout] = useState('Experienced service provider with a passion for delivering exceptional quality. Specialized in providing top-notch services with attention to detail and customer satisfaction.');
  const [editedServices, setEditedServices] = useState(['Cleaning', 'Plumbing', 'Electrical', 'Carpentry']);
  const [newService, setNewService] = useState('');
  const [editedContact, setEditedContact] = useState({...profileData});

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

  const handleSettings = () => {
    navigation.navigate('ServiceSettings');
  };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
  };

  const handleCancelAbout = () => {
    setEditedAbout('Experienced service provider with a passion for delivering exceptional quality. Specialized in providing top-notch services with attention to detail and customer satisfaction.');
    setIsEditingAbout(false);
  };

  const handleSaveServices = () => {
    setIsEditingServices(false);
  };

  const handleCancelServices = () => {
    setEditedServices(['Cleaning', 'Plumbing', 'Electrical', 'Carpentry']);
    setIsEditingServices(false);
  };

  const handleSaveContact = () => {
    setProfileData({...editedContact});
    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setEditedContact({...profileData});
    setIsEditingContact(false);
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setEditedServices([...editedServices, newService.trim()]);
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...editedServices];
    updatedServices.splice(index, 1);
    setEditedServices(updatedServices);
  };

  const renderStatItem = (icon: string, value: string, label: string) => (
    <View style={styles.statItem}>
      <LinearGradient
        colors={['#E8F5E9', '#F1F8E9']}
        style={styles.statIconContainer}
      >
        <Ionicons name={icon as any} size={24} color="#00A86B" />
      </LinearGradient>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#00A86B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#00A86B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={isEditing ? editedData.profileImage : profileData.profileImage}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfoContainer}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.profileInput}
                  value={editedData.name}
                  onChangeText={(text) => setEditedData({...editedData, name: text})}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.profileInput}
                  value={editedData.role}
                  onChangeText={(text) => setEditedData({...editedData, role: text})}
                  placeholder="Role"
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
                <Text style={styles.profileName}>{profileData.name}</Text>
                <Text style={styles.profileRole}>{profileData.role}</Text>
              </>
            )}
          </View>
          {!isEditing && (
            <TouchableOpacity 
              style={styles.editIconButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color="#00A86B" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.statsContainer}>
          {renderStatItem('star', '4.8', 'Rating')}
          {renderStatItem('calendar', '156', 'Bookings')}
          {renderStatItem('heart', '89%', 'Satisfaction')}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <TouchableOpacity 
              style={styles.editIconButton}
              onPress={() => setIsEditingAbout(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color="#00A86B" />
            </TouchableOpacity>
          </View>
          <View style={styles.aboutCard}>
            {isEditingAbout ? (
              <>
                <TextInput
                  style={styles.aboutInput}
                  multiline
                  value={editedAbout}
                  onChangeText={setEditedAbout}
                  textAlignVertical="top"
                />
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleSaveAbout}
                  >
                    <Text style={styles.editButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton]}
                    onPress={handleCancelAbout}
                  >
                    <Text style={[styles.editButtonText, styles.cancelButtonText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={styles.aboutText}>{editedAbout}</Text>
            )}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity 
              style={styles.editIconButton}
              onPress={() => setIsEditingServices(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color="#00A86B" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.servicesScroll}
          >
            {editedServices.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <LinearGradient
                  colors={['#E8F5E9', '#F1F8E9']}
                  style={styles.serviceIconContainer}
                >
                  <Ionicons name="construct-outline" size={24} color="#00A86B" />
                </LinearGradient>
                <Text style={styles.serviceName}>{service}</Text>
                {isEditingServices && (
                  <TouchableOpacity 
                    style={styles.removeServiceButton}
                    onPress={() => handleRemoveService(index)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
          {isEditingServices && (
            <View style={styles.addServiceContainer}>
              <TextInput
                style={styles.addServiceInput}
                value={newService}
                onChangeText={setNewService}
                placeholder="Add new service"
                placeholderTextColor="#6C757D"
              />
              <TouchableOpacity 
                style={styles.addServiceButton}
                onPress={handleAddService}
                activeOpacity={0.7}
              >
                <Ionicons name="add-circle" size={24} color="#00A86B" />
              </TouchableOpacity>
            </View>
          )}
          {isEditingServices && (
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity 
                style={[styles.editButton, styles.saveButton]}
                onPress={handleSaveServices}
              >
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.editButton, styles.cancelButton]}
                onPress={handleCancelServices}
              >
                <Text style={[styles.editButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity 
              style={styles.editIconButton}
              onPress={() => setIsEditingContact(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color="#00A86B" />
            </TouchableOpacity>
          </View>
          <View style={styles.contactCard}>
            {isEditingContact ? (
              <>
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={20} color="#00A86B" />
                  <TextInput
                    style={styles.contactInput}
                    value={editedContact.email}
                    onChangeText={(text) => setEditedContact({...editedContact, email: text})}
                    placeholder="Email"
                  />
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="call-outline" size={20} color="#00A86B" />
                  <TextInput
                    style={styles.contactInput}
                    value={editedContact.contactNumber}
                    onChangeText={(text) => setEditedContact({...editedContact, contactNumber: text})}
                    placeholder="Phone Number"
                  />
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="location-outline" size={20} color="#00A86B" />
                  <TextInput
                    style={styles.contactInput}
                    value={editedContact.city}
                    onChangeText={(text) => setEditedContact({...editedContact, city: text})}
                    placeholder="City"
                  />
                </View>
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleSaveContact}
                  >
                    <Text style={styles.editButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton]}
                    onPress={handleCancelContact}
                  >
                    <Text style={[styles.editButtonText, styles.cancelButtonText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={20} color="#00A86B" />
                  <Text style={styles.contactText}>{profileData.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="call-outline" size={20} color="#00A86B" />
                  <Text style={styles.contactText}>{profileData.contactNumber}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="location-outline" size={20} color="#00A86B" />
                  <Text style={styles.contactText}>{profileData.city}</Text>
                </View>
              </>
            )}
          </View>
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
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingVertical: 16,
  },
  backButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F0FFF4',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00A86B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#6C757D',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  servicesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  serviceCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginRight: 8,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#495057',
    marginLeft: 12,
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
  editIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0FFF4',
  },
  aboutInput: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#495057',
    minHeight: 100,
    marginBottom: 16,
  },
  contactInput: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
    marginLeft: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 8,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#00A86B',
  },
  profileInput: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#495057',
    width: '100%',
    marginBottom: 8,
    textAlign: 'center',
  },
  removeServiceButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
  },
  addServiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  addServiceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#495057',
    marginRight: 12,
  },
  addServiceButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0FFF4',
  },
}); 