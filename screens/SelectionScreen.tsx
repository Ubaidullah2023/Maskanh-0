import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Video, ResizeMode } from 'expo-av';

type SelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Selection'>;

const { width, height } = Dimensions.get('window');

export default function SelectionScreen() {
  const navigation = useNavigation<SelectionScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/intro.mp4')}
        style={styles.backgroundVideo}
        resizeMode={ResizeMode.STRETCH}
        shouldPlay
        isLooping
        isMuted
      />
      <SafeAreaView style={styles.contentContainer}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.navigationArrow}> </Text>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Choose Your Role</Text>
              <View style={styles.headerUnderline} />
            </View>
            <View style={styles.backButton} />
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to Maskanh</Text>
            <Text style={styles.subtitle}>Choose how you want to use our platform</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option}
              onPress={() => navigation.navigate('FindService')}
            >
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Image 
                    source={require('../assets/icons/search.png')}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>I'm Looking for Services</Text>
                  <Text style={styles.optionDescription}>
                  Find skilled professional near you
                  </Text>
                </View>
                <Text style={styles.navigationArrow}>›</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.optionCard, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}
              onPress={() => navigation.navigate('ProviderVerification' as never)}
            >
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Image 
                    source={require('../assets/icons/briefcase.png')}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>I'm a Service Provider</Text>
                  <Text style={styles.optionDescription}>
                  Offer your skills and services
                  </Text>
                </View>
                <Text style={styles.navigationArrow}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  headerContainer: {
    backgroundColor: 'transparent',
    paddingTop: StatusBar.currentHeight || 16,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationArrow: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerUnderline: {
    height: 2,
    backgroundColor: '#00A67E',
    width: 30,
    marginTop: 4,
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  title: {
    fontSize: height * 0.040,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: height * 0.020,
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.23,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    gap: height * 0.02,
    alignItems: 'center',
  },
  option: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 12,
    width: '100%',
    maxWidth: Math.min(400, width * 0.9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.02,
    minHeight: height * 0.1,
  },
  iconContainer: {
    width: height * 0.06,
    height: height * 0.06,
    borderRadius: height * 0.03,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 36,
  },
  icon: {
    width: height * 0.04,
    height: height * 0.04,
    tintColor: '#00A67E',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  optionTitle: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'left',
  },
  optionDescription: {
    fontSize: height * 0.018,
    color: 'rgba(29, 26, 26, 0.8)',
    lineHeight: height * 0.022,
    textAlign: 'left',
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: '100%',
    maxWidth: Math.min(400, width * 0.9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});