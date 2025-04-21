export const colors = {
  primary: '#00A86B',
  secondary: '#00A86B',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
  },
  border: '#dddddd',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#00A86B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.text.secondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xl: 16,
  round: 999,
};

export default {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
}; 