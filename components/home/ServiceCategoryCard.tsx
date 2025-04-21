import React, { useRef } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  View, 
  Image, 
  ImageSourcePropType, 
  ViewStyle, 
  TextStyle,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Responsive card width calculation
const COLUMN_COUNT = 3; // Number of cards per row
const HORIZONTAL_PADDING = 32; // Total horizontal padding (16 on each side)
const CARD_MARGIN = 8; // Margin between cards (4 on each side)
const CARD_WIDTH = (width - HORIZONTAL_PADDING - (COLUMN_COUNT - 1) * CARD_MARGIN) / COLUMN_COUNT;

interface ServiceCategoryCardProps {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  title,
  icon,
  onPress,
  style,
}) => {
  const { colors, borderRadius, spacing, typography, shadows } = useTheme();
  
  // Animation values using standard Animated API
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Handle press animations
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 200,
      useNativeDriver: true
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            borderRadius: borderRadius.md,
            ...shadows.small,
          },
          style,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.iconContainer}>
          <Image 
            source={icon} 
            style={styles.icon} 
            resizeMode="contain" 
          />
        </View>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.fontSizes.xs,
              fontWeight: typography.fontWeights.medium as TextStyle['fontWeight'],
            },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 4,
    overflow: 'hidden',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: '60%',
    height: '60%',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 2,
  },
});

export default ServiceCategoryCard; 