import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ServiceStackParamList } from './ServiceProfileScreen';

export default function ServiceEditProfileScreen() {
  const navigation = useNavigation<NavigationProp<ServiceStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#00A86B" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Service Profile</Text>
      </View>
      <View style={styles.content}>
        <Text>Edit profile form goes here...</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: '700', color: '#222', marginLeft: 16 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
}); 