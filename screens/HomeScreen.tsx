import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Maskanh</Text>
        
        {/* Main action buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MaskanhPro')}
          >
            <Ionicons name="star" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Become a Pro</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('FindService')}
          >
            <Ionicons name="search" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Find Services</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick access options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person" size={24} color="#00A86B" />
            <Text style={styles.optionText}>My Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="notifications" size={24} color="#00A86B" />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="settings" size={24} color="#00A86B" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="help-circle" size={24} color="#00A86B" />
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  welcomeText: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  actionButton: {
    backgroundColor: '#00A86B',
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
}); 