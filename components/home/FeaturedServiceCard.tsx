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
  Animated 
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(220, width * 0.6);

interface FeaturedServiceCardProps {
  provider: {
    id: string;
    name: string;
    image: ImageSourcePropType;
    rating: number;
    category: string;
    price: string;
    distance: string;
  };
  onPress: () => void;
  style?: ViewStyle;
}

export const FeaturedServiceCard: React.FC<FeaturedServiceCardProps> = ({
  provider,
  onPress,
  style,
}) => {
  const { colors, borderRadius, spacing, typography, shadows } = useTheme();
  
  // Animation values using standard Animated API
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Handle press animations
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Text key={`full-${i}`} style={[styles.starIcon, { color: colors.warning }]}>★</Text>
        ))}
        {halfStar && <Text style={[styles.starIcon, { color: colors.warning }]}>★</Text>}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty-${i}`} style={[styles.starIcon, { color: colors.disabled }]}>★</Text>
        ))}
        <Text style={[styles.ratingText, { color: colors.textSecondary, fontSize: typography.fontSizes.xs }]}>
          {rating.toFixed(1)}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            borderRadius: borderRadius.md,
            ...shadows.medium,
            width: CARD_WIDTH,
          },
          style,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.imageContainer}>
          <Image source={provider.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageGradient}
          >
            <View style={styles.categoryContainer}>
              <Text style={[styles.categoryText, {
                color: colors.white,
                fontSize: typography.fontSizes.xs,
                backgroundColor: colors.primary,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs / 2,
                borderRadius: borderRadius.xs,
                overflow: 'hidden',
              }]}>
                {provider.category}
              </Text>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.contentContainer}>
          <Text 
            style={[styles.name, { 
              color: colors.text, 
              fontSize: typography.fontSizes.md,
              fontWeight: typography.fontWeights.semibold as TextStyle['fontWeight']
            }]}
            numberOfLines={1}
          >
            {provider.name}
          </Text>
          
          {renderStars(provider.rating)}
          
          <View style={styles.detailsRow}>
            <Text style={[styles.price, { 
              color: colors.primary, 
              fontWeight: typography.fontWeights.semibold as TextStyle['fontWeight'],
              fontSize: typography.fontSizes.sm
            }]}>
              {provider.price}
            </Text>
            <Text style={[styles.distance, { 
              color: colors.textSecondary,
              fontSize: typography.fontSizes.xs
            }]}>
              {provider.distance}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    overflow: 'hidden',
    borderRadius: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontWeight: '600',
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 1,
  },
  ratingText: {
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
  },
  distance: {
    fontSize: 12,
  },
});

export default FeaturedServiceCard; 