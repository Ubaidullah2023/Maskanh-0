import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ServiceStackParamList } from './ServiceProfileScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ServicePersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Service User');
  const [email, setEmail] = useState('service@example.com');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {
        paddingTop: insets.top + SCREEN_HEIGHT * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.01,
        paddingHorizontal: '4%',
        minHeight: 56,
        maxHeight: 80,
        width: '100%',
      }]}> 
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={Math.max(24, SCREEN_WIDTH * 0.06)} color="#00A86B" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: SCREEN_WIDTH < 360 ? 20 : 24 }]}>
          Personal Information
        </Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>Email</Text>
          <TextInput
            style={[styles.input, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>Phone</Text>
          <TextInput
            style={[styles.input, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { fontSize: SCREEN_WIDTH < 360 ? 16 : 18 }]}>Address</Text>
          <TextInput
            style={[styles.input, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            multiline
          />
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={[styles.saveButtonText, { fontSize: SCREEN_WIDTH < 360 ? 14 : 16 }]}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#222',
    marginLeft: 16,
    flex: 1,
    textAlign: 'left',
  },
  content: {
    flex: 1,
    padding: '4%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    color: '#222',
    backgroundColor: '#fafafa',
  },
  saveButton: {
    backgroundColor: '#00A86B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
}); 