import 'react-native-gesture-handler';  // This import must be first
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <LanguageProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
