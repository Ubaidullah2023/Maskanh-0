import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;

type AuthTab = 'login' | 'register';

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');

  // Determine keyboard avoiding behavior based on platform
  const keyboardBehavior: KeyboardAvoidingViewProps['behavior'] = 
    Platform.OS === 'ios' ? 'padding' : 'height';

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -64 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        style={styles.keyboardView}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/maskanh-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Welcome to Maskanh</Text>
              <Text style={styles.subtitle}>Your Home Services Marketplace</Text>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'login' && styles.activeTab]}
                onPress={() => setActiveTab('login')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'login' && styles.activeTabText,
                  ]}
                >
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'register' && styles.activeTab]}
                onPress={() => setActiveTab('register')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'register' && styles.activeTabText,
                  ]}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 20 : 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  logo: {
    width: isSmallDevice ? width * 0.18 : width * 0.22,
    height: isSmallDevice ? width * 0.18 : width * 0.22,
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  title: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '600',
    color: '#139C58',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: height * 0.02,
  },
  tab: {
    flex: 1,
    paddingVertical: isSmallDevice ? 8 : 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#139C58',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
  },
}); 