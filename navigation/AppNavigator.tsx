import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SelectionScreen from '../screens/SelectionScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';;
import NotificationScreen from '../screens/NotificationScreen';
import LoginSecurityScreen from '../screens/LoginSecurityScreen';
import FilterInboxScreen from '../screens/FilterInboxScreen';
import ManageOrdersScreen from '../screens/ManageOrdersScreen';
import MaskanhProSettingScreen from '../screens/MaskanhProSettingScreen';
import AccountNotificationScreen from '../screens/AccountNotificationScreen';
import EarningScreen from '../screens/EarningScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import LegalNameScreen from '../screens/LegalNameScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsPrivacyScreen from '../screens/TermsPrivacyScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import LanguageScreen from '../screens/LanguageScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import PostAdScreen from '../screens/PostAdScreen';
import TopUpScreen from '../screens/TopUpScreen';
import FindServiceScreen from '../screens/FindServiceScreen';
import AdPreviewScreen from '../screens/AdPreviewScreen';
import AllServicesScreen from '../screens/AllServicesScreen';
import ProviderVerificationScreen from '../screens/ProviderVerificationScreen';
import MaskanhProScreen from '../screens/MaskanhProScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ServiceProviderStep1Screen from '../screens/ServiceProviderStep1Screen';
import ServiceProviderStep2Screen from '../screens/ServiceProviderStep2Screen';
import ServiceProviderStep3Screen from '../screens/ServiceProviderStep3Screen';
import PropertyTypeScreen from '../screens/PropertyTypeScreen';
import ServiceMapScreen from '../screens/ServiceMapScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SecurityScreen from '../screens/SecurityScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import BlogScreen from '../screens/BlogScreen';
import PlaceTypeScreen from '../screens/PlaceTypeScreen';
import LocationScreen from '../screens/LocationScreen';
import AddressSearchScreen from '../screens/AddressSearchScreen';
import ConfirmAddressScreen from '../screens/ConfirmAddressScreen';
import AddPhotosScreen from '../screens/AddPhotosScreen';
import TitleScreen from '../screens/TitleScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import ListingScreen from '../screens/ListingScreen';
import TodayScreen from '../screens/TodayScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileCompleteScreen from '../screens/ProfileCompleteScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ChatScreen from '../screens/ChatScreen';
import ServiceProfileScreen from '../screens/ServiceProfileScreen';
import ServiceEditProfileScreen from '../screens/ServiceEditProfileScreen';
import ServicePersonalInfoScreen from '../screens/ServicePersonalInfoScreen';
import ServiceSecurityScreen from '../screens/ServiceSecurityScreen';
import ServiceNotificationSettingsScreen from '../screens/ServiceNotificationSettingsScreen';
import ServiceLanguageScreen from '../screens/ServiceLanguageScreen';
import ServiceHelpCenterScreen from '../screens/ServiceHelpCenterScreen';
import ServiceTermsPrivacyScreen from '../screens/ServiceTermsPrivacyScreen';
import ServiceFeedbackScreen from '../screens/ServiceFeedbackScreen';
import ServiceLoginScreen from '../screens/ServiceLoginScreen';
import ServiceTabNavigator from './ServiceTabNavigator';
import MaskanhProUpgradeScreen from '../screens/MaskanhProUpgradeScreen';
import ServiceSettingsScreen from '../screens/ServiceSettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Selection: undefined;
  Home: undefined;
  Security: undefined;
  UpdatePassword: undefined;
  MainTabs: { 
    screen: string;
    params?: {
      placeType: 'entire' | 'room' | 'shared';
      guestCount: number;
      bedroomCount: number;
      bedCount: number;
      hasLock: boolean;
      amenities: string[];
      photos: { uri: string; type: 'image' }[];
      title: string;
      highlights: string[];
      description: string;
      guestType: 'any_guest' | 'experienced_guest';
      basePrice: number;    
    };
  };
  PlaceType: undefined;
  Notification: undefined;
  LoginSecurity: undefined;
  FilterInbox: undefined;
  ManageOrders: undefined;
  MaskanhProSetting: undefined;
  AccountNotification: undefined;
  Earning: undefined;
  PersonalInfo: undefined;
  LegalName: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  TermsPrivacy: undefined;
  HelpCenter: undefined;
  Language: undefined;
  MyAds: undefined;
  PostAd: undefined;
  TopUp: undefined;
  FindService: undefined;
  Blog: undefined;
  AllServices: {
    type: 'featured' | 'recommended';
  };
  AdPreview: {
    title: string;
    description: string;
    price: string;
    location: string;
    category: string;
    mediaItems: Array<{
      uri: string;
      type: 'image' | 'video';
      thumbnail?: string;
    }>;
  };
  Location: {
    placeType: 'entire' | 'room' | 'shared';
    serviceTypes?: string[];
    address?: string;
    selectedAddress?: any;
    selectedCoordinates?: { latitude: number; longitude: number };
  };
  AddressSearch: {
    placeType?: 'entire' | 'room' | 'shared';
  };
  ProviderVerification: {
    placeType: 'entire' | 'room' | 'shared';
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    guestCount?: number;
    bedroomCount?: number;
    bedCount?: number;
    hasLock?: boolean;
  };
  MaskanhPro: undefined;
  Messages: undefined;
  Search: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ServiceProviderStep1: undefined;
  ServiceProviderStep2: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    photos: Array<{
      uri: string;
      type: 'image';
    }>;
    title: string;
    highlights: string[];
    description: string;
    guestType: 'any_guest' | 'experienced_guest';
    basePrice: number;
  };
  ServiceProviderStep3: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
  };
  PropertyType: undefined;
  ServiceMap: undefined;
  Registration: undefined;
  ServiceDetails: {
    id: string;
    images: any[];
    title: string;
    subtitle: string;
    rating: number;
    views: number;
    postedTime: string;
  };
  NotificationSettings: undefined;
  Feedback: undefined;
  ConfirmAddress: {
    placeType: 'entire' | 'room' | 'shared';
    street?: string;
    city?: string;
    province?: string;
  };
  AddPhotos: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  Title: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    photos: Array<{
      uri: string;
      type: 'image';
    }>;
  };
  Description: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    photos: Array<{
      uri: string;
      type: 'image';
    }>;
    title: string;
  };
  Listing: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    photos: { uri: string; type: 'image' }[];
    title: string;
    highlights: string[];
    description: string;
    guestType: 'any_guest' | 'experienced_guest';
    basePrice: number;
  };
  Today: undefined;
  Menu: undefined;
  Analytics: undefined;
  Articles: undefined;
  Notifications: undefined;
  ProfileComplete: {
    placeType: 'entire' | 'room' | 'shared';
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    hasLock: boolean;
    amenities: string[];
    photos: Array<{
      uri: string;
      type: 'image';
    }>;
    title: string;
    highlights: string[];
    description: string;
    guestType: 'any_guest' | 'experienced_guest';
  };
  Chat: { name: string };
  ServiceProfile: undefined;
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
  ServiceTabs: undefined;
  MaskanhProUpgrade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ServiceTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Selection" component={SelectionScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="LoginSecurity" component={LoginSecurityScreen} />
      <Stack.Screen name="FilterInbox" component={FilterInboxScreen} />
      <Stack.Screen name="ManageOrders" component={ManageOrdersScreen} />
      <Stack.Screen name="MaskanhProSetting" component={MaskanhProSettingScreen} />
      <Stack.Screen name="AccountNotification" component={AccountNotificationScreen} />
      <Stack.Screen name="Earning" component={EarningScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="LegalName" component={LegalNameScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsPrivacy" component={TermsPrivacyScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="MyAds" component={MyAdsScreen} />
      <Stack.Screen name="PostAd" component={PostAdScreen} />
      <Stack.Screen name="TopUp" component={TopUpScreen} />
      <Stack.Screen name="FindService" component={FindServiceScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="AdPreview" component={AdPreviewScreen} />
      <Stack.Screen name="AllServices" component={AllServicesScreen} />
      <Stack.Screen name="ProviderVerification" component={ProviderVerificationScreen} />
      <Stack.Screen name="MaskanhPro" component={MaskanhProScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ServiceProviderStep1" component={ServiceProviderStep1Screen} />
      <Stack.Screen name="ServiceProviderStep2" component={ServiceProviderStep2Screen} />
      <Stack.Screen name="ServiceProviderStep3" component={ServiceProviderStep3Screen} />
      <Stack.Screen name="PropertyType" component={PropertyTypeScreen} />
      <Stack.Screen name="ServiceMap" component={ServiceMapScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="PlaceType" component={PlaceTypeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="AddressSearch" component={AddressSearchScreen} />
      <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} />
      <Stack.Screen name="AddPhotos" component={AddPhotosScreen} />
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="Description" component={DescriptionScreen} />
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="Today" component={TodayScreen} />
      <Stack.Screen name="Articles" component={ArticlesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ProfileComplete" component={ProfileCompleteScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ServiceProfile" component={ServiceProfileScreen} />
      <Stack.Screen name="ServiceEditProfile" component={ServiceEditProfileScreen} />
      <Stack.Screen name="ServicePersonalInfo" component={ServicePersonalInfoScreen} />
      <Stack.Screen name="ServiceSecurity" component={ServiceSecurityScreen} />
      <Stack.Screen name="ServiceNotificationSettings" component={ServiceNotificationSettingsScreen} />
      <Stack.Screen name="ServiceLanguage" component={ServiceLanguageScreen} />
      <Stack.Screen name="ServiceHelpCenter" component={ServiceHelpCenterScreen} />
      <Stack.Screen name="ServiceTermsPrivacy" component={ServiceTermsPrivacyScreen} />
      <Stack.Screen name="ServiceFeedback" component={ServiceFeedbackScreen} />
      <Stack.Screen name="ServiceLogin" component={ServiceLoginScreen} />
      <Stack.Screen name="ServiceSettings" component={ServiceSettingsScreen} />
      <Stack.Screen name="ServiceTabs" component={ServiceTabNavigator} />
      <Stack.Screen name="MaskanhProUpgrade" component={MaskanhProUpgradeScreen} />
    </Stack.Navigator>
  );
} 