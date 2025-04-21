import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SelectionScreen from '../screens/SelectionScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
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
import HelpCenterScreen from '../screens/HelpCenterScreen';
import LanguageScreen from '../screens/LanguageScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import CertifiedCarsScreen from '../screens/CertifiedCarsScreen';
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
import ServiceProviderStep1Screen from '../screens/ServiceProviderStep1Screen';
import ServiceProviderStep2Screen from '../screens/ServiceProviderStep2Screen';
import ServiceProviderStep3Screen from '../screens/ServiceProviderStep3Screen';
import PropertyTypeScreen from '../screens/PropertyTypeScreen';
import ServiceMapScreen from '../screens/ServiceMapScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Selection: undefined;
  Home: undefined;
  Checkout: {
    title: string;
    price: number;
  };
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
  HelpCenter: undefined;
  Language: undefined;
  MyAds: undefined;
  CertifiedCars: undefined;
  PostAd: undefined;
  TopUp: undefined;
  FindService: undefined;
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
  ProviderVerification: undefined;
  MaskanhPro: undefined;
  Messages: undefined;
  Search: undefined;
  Profile: undefined;
  ServiceProviderStep1: undefined;
  ServiceProviderStep2: undefined;
  ServiceProviderStep3: undefined;
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Selection" component={SelectionScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
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
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="MyAds" component={MyAdsScreen} />
      <Stack.Screen name="CertifiedCars" component={CertifiedCarsScreen} />
      <Stack.Screen name="PostAd" component={PostAdScreen} />
      <Stack.Screen name="TopUp" component={TopUpScreen} />
      <Stack.Screen name="FindService" component={FindServiceScreen} />
      <Stack.Screen name="AdPreview" component={AdPreviewScreen} />
      <Stack.Screen name="AllServices" component={AllServicesScreen} />
      <Stack.Screen name="ProviderVerification" component={ProviderVerificationScreen} />
      <Stack.Screen 
        name="MaskanhPro" 
        component={MaskanhProScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ServiceProviderStep1" component={ServiceProviderStep1Screen} />
      <Stack.Screen name="ServiceProviderStep2" component={ServiceProviderStep2Screen} />
      <Stack.Screen name="ServiceProviderStep3" component={ServiceProviderStep3Screen} />
      <Stack.Screen 
        name="PropertyType" 
        component={PropertyTypeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceMap"
        component={ServiceMapScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetailsScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
} 