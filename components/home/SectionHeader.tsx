import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAllPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showViewAll = true,
  onViewAllPress,
}) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  // Animation values using standard Animated API
  const viewAllScale = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(viewAllScale, {
      toValue: 0.95,
      friction: 5,
      tension: 200,
      useNativeDriver: true
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(viewAllScale, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={[styles.titleDecoration, { backgroundColor: colors.primary }]} />
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.fontSizes.lg,
              fontWeight: typography.fontWeights.semibold as TextStyle['fontWeight'],
            },
          ]}
        >
          {title}
        </Text>
      </View>
      
      {showViewAll && (
        <Animated.View style={[{ transform: [{ scale: viewAllScale }] }]}>
          <TouchableOpacity 
            style={[styles.viewAllButton, { borderRadius: borderRadius.sm }]}
            onPress={onViewAllPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.viewAllText,
                {
                  color: colors.primary,
                  fontSize: typography.fontSizes.sm,
                  fontWeight: typography.fontWeights.medium as TextStyle['fontWeight'],
                  marginRight: spacing.xs,
                },
              ]}
            >
              View All
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleDecoration: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  title: {
    flex: 1,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {},
});

export default SectionHeader; 