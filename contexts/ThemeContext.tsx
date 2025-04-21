import React, { createContext, useContext, ReactNode } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;

// Define theme colors
export const colors = {
  primary: '#00A86B', // Main green color
  secondary: '#00A86B', // Secondary green color
  tertiary: '#FF8C00', // Orange accent
  background: '#FFFFFF',
  surface: '#F8F8F8',
  error: '#E53935',
  text: {
    primary: '#212121',
    secondary: '#666666',
    light: '#999999',
    onDark: '#FFFFFF',
    onDarkSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    dark: 'rgba(70, 70, 70, 0.75)',
    light: '#FFFFFF',
  },
  icon: {
    background: 'rgba(255, 255, 255, 0.1)',
    tint: '#00A86B',
  },
  border: '#E0E0E0',
  placeholder: '#9E9E9E',
  disabled: '#BDBDBD',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#03A9F4',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  // Additional shades
  primaryLight: '#6ECF9A',
  primaryDark: '#0B7C45',
};

// Define spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Define typography system
export const typography = {
  fontSizes: {
    xs: isSmallDevice ? 10 : 12,
    sm: isSmallDevice ? 12 : 14,
    md: isSmallDevice ? 14 : 16,
    lg: isSmallDevice ? 16 : 18,
    xl: isSmallDevice ? 20 : 22,
    xxl: isSmallDevice ? 24 : 26,
    xxxl: isSmallDevice ? 28 : 32,
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Define border radius system
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  circular: 999,
};

// Define responsive sizes
export const sizes = {
  screenWidth: width,
  screenHeight: height,
  maxWidth: 450, // Maximum width for components on large screens
  headerHeight: isSmallDevice ? 56 : 64,
  bottomTabHeight: isSmallDevice ? 56 : 64,
  buttonHeight: isSmallDevice ? 44 : 48,
  inputHeight: isSmallDevice ? 44 : 48,
  iconSizeSmall: isSmallDevice ? 16 : 18,
  iconSizeMedium: isSmallDevice ? 20 : 24,
  iconSizeLarge: isSmallDevice ? 24 : 28,
};

// Define shadow styles
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
};

// Define common styles
export const commonStyles = {
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.medium,
  },
};

// Define animation timings
export const animations = {
  fast: 200,
  medium: 350,
  slow: 500,
};

// Create the theme object that combines all design tokens
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  sizes,
  shadows,
  commonStyles,
  animations,
};

// Create context
type ThemeContextType = typeof theme;
const ThemeContext = createContext<ThemeContextType>(theme);

// Theme provider
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

// Theme hook
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext; 