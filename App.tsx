import 'react-native-url-polyfill/auto'; // This polyfill must be first
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './contexts/AuthContext';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while we initialize
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for a smoother experience
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Start animations when app is ready
      Animated.sequence([
        // First scale up slightly
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Then scale down and fade out
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(async () => {
        // When animations complete, hide the splash screen
        setSplashVisible(false);
        await SplashScreen.hideAsync();
      });
    }
  }, [appIsReady, fadeAnim, scaleAnim]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {splashVisible && (
        <Animated.View 
          style={[
            styles.splashContainer, 
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Animated.Image
            source={require('./assets/logo.png')}
            style={[
              styles.splashImage,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      )}
      
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  splashImage: {
    width: Dimensions.get('window').width * 0.6, // Make logo smaller (60% of screen width)
    height: Dimensions.get('window').width * 0.6,
  },
});
