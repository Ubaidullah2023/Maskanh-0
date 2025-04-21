import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Dimensions, 
  TextStyle,
  Keyboard,
  Platform,
  Animated,
  ViewStyle
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const SEARCH_BAR_WIDTH = width - 32;

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (query: string) => void;
  onSearch?: (query: string) => void;
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for services...',
  value,
  onChangeText,
  onSearch,
  containerStyle
}) => {
  const { colors, borderRadius, shadows, spacing, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  // Animation values with standard Animated API
  const focusAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonWidth = useRef(new Animated.Value(0)).current;

  // Update local state if value prop is provided
  useEffect(() => {
    if (value !== undefined) {
      setSearchQuery(value);
    }
  }, [value]);
  
  // Animated interpolations
  const elevation = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3],
    extrapolate: 'clamp'
  });
  
  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.2],
    extrapolate: 'clamp'
  });
  
  const translateY = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    const query = value !== undefined ? value : searchQuery;
    if (query.length > 0) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start();
      Animated.timing(buttonWidth, {
        toValue: 70,
        duration: 200,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
      Animated.timing(buttonWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  }, [searchQuery, value]);

  const handleSearchInput = (text: string) => {
    setSearchQuery(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSearch = () => {
    const query = value !== undefined ? value : searchQuery;
    if (query.trim() && onSearch) {
      onSearch(query);
      Keyboard.dismiss();
    }
  };

  const handleClear = () => {
    handleSearchInput('');
    inputRef.current?.focus();
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
          borderRadius: borderRadius.md,
          ...shadows.small,
          elevation,
          shadowOpacity,
          transform: [{ translateY }]
        },
        containerStyle
      ]}
    >
      <View style={styles.inputContainer}>
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={isFocused ? colors.primary : colors.placeholder} 
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: typography.fontSizes.md,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value !== undefined ? value : searchQuery}
          onChangeText={handleSearchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {(value || searchQuery).length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="close-circle" size={18} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={{ width: buttonWidth, opacity: buttonOpacity }}>
        <TouchableOpacity
          style={[
            styles.searchButton,
            {
              backgroundColor: colors.primary,
              borderTopRightRadius: borderRadius.md,
              borderBottomRightRadius: borderRadius.md,
            },
          ]}
          onPress={handleSearch}
        >
          <Text
            style={[
              styles.searchButtonText,
              {
                color: colors.white,
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.medium as TextStyle['fontWeight'],
              },
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SEARCH_BAR_WIDTH,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    overflow: 'hidden',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});

export default SearchBar; 