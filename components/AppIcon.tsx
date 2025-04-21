import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../contexts/ThemeContext';

type IconName = 
  | 'search' 
  | 'provider' 
  | 'home' 
  | 'profile' 
  | 'message' 
  | 'notification'
  | 'settings'
  | 'back'
  | 'more';

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

const iconMap: Record<IconName, string> = {
  search: 'search',
  provider: 'briefcase',
  home: 'home',
  profile: 'person',
  message: 'chatbubble',
  notification: 'notifications',
  settings: 'settings',
  back: 'chevron-back',
  more: 'ellipsis-vertical',
};

export default function AppIcon({ name, size = 24, color = colors.text.primary, style }: AppIconProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons 
        name={iconMap[name] as any} 
        size={size} 
        color={color} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 