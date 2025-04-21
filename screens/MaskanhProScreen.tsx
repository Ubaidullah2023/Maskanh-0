import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type MaskanhProScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function MaskanhProScreen({ navigation }: MaskanhProScreenProps) {
  const handleGetStarted = () => {
    navigation.navigate('ServiceProviderStep1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>It's easy to get started on Maskanh</Text>

        {/* Step 1 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Tell us about your service</Text>
            <Text style={styles.stepDescription}>
              Share some basic info, like your service type and location.
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="information-circle-outline" size={40} color="#00A86B" />
          </View>
        </View>

        {/* Step 2 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Make it stand out</Text>
            <Text style={styles.stepDescription}>
              Add 5 or more photos plus a title and description—we'll help you out.
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="images-outline" size={40} color="#00A86B" />
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Finish up and publish</Text>
            <Text style={styles.stepDescription}>
              Choose a starting price, verify your details, then publish your service.
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle-outline" size={40} color="#00A86B" />
          </View>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000000',
    marginTop: 15,
    marginBottom: 18,
    lineHeight: 38,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
    paddingRight: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  getStartedButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  }
});