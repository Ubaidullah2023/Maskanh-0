import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, TextStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 150;

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: any;
  onPress: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  subtitle,
  buttonText,
  backgroundImage,
  onPress,
}) => {
  const { colors, borderRadius, typography, spacing } = useTheme();
  
  // Animation values using standard Animated API
  const scale = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  // Handle press animations
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      friction: 8,
      tension: 200,
      useNativeDriver: true
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 8,
      tension: 200,
      useNativeDriver: true
    }).start();
  };
  
  // Function to animate the button pulse
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.08,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ).start();
  };
  
  // Start button pulsing animation on mount
  useEffect(() => {
    startPulseAnimation();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.container}
          imageStyle={{ borderRadius: borderRadius.md }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
            style={styles.overlay}
          >
            <View style={styles.contentContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: typography.fontSizes.lg,
                    fontWeight: typography.fontWeights.bold as TextStyle['fontWeight'],
                    color: colors.white,
                  },
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    fontSize: typography.fontSizes.sm,
                    color: colors.white,
                    opacity: 0.9,
                  },
                ]}
              >
                {subtitle}
              </Text>
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.white,
                      borderRadius: borderRadius.sm,
                      paddingVertical: spacing.sm,
                      paddingHorizontal: spacing.md,
                      marginTop: spacing.md,
                    },
                  ]}
                  onPress={onPress}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: colors.primary,
                        fontSize: typography.fontSizes.sm,
                        fontWeight: typography.fontWeights.semibold as TextStyle['fontWeight'],
                      },
                    ]}
                  >
                    {buttonText}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: BANNER_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  overlay: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default PromotionalBanner; 