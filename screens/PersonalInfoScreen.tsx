import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PersonalInfo'>;

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  value: string;
  label: string;
};

const EditModal = ({ visible, onClose, onSave, value, label }: EditModalProps) => {
  const [editedValue, setEditedValue] = useState(value);
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Edit {label}</Text>
          <TextInput
            style={[styles.input, { 
              color: colors.text,
              backgroundColor: colors.background,
              borderColor: colors.border
            }]}
            value={editedValue}
            onChangeText={setEditedValue}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, { borderColor: colors.border }]} 
              onPress={onClose}
            >
              <Text style={[styles.modalButtonText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                onSave(editedValue);
                onClose();
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function PersonalInfoScreen() {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const { colors } = useTheme();
  const [editModal, setEditModal] = useState<{
    visible: boolean;
    field: string;
    value: string;
    label: string;
  }>({
    visible: false,
    field: '',
    value: '',
    label: '',
  });

  const [personalInfo, setPersonalInfo] = useState({
    legalName: 'User',
    email: 'user@gmail.com',
    phone: '+92 ',
    address: '',
    city: 'Punjab',
    state: 'NY',
    zipCode: '10001',
  });

  const handleEdit = (field: string, value: string, label: string) => {
    setEditModal({
      visible: true,
      field,
      value,
      label,
    });
  };

  const handleSave = (value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [editModal.field]: value,
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { 
        backgroundColor: colors.card,
        borderBottomColor: colors.border 
      }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}></Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Personal Information</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          borderBottomColor: colors.border 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Basic Information</Text>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Legal Name</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('legalName', personalInfo.legalName, 'Legal Name')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.legalName}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
            <View style={styles.infoValue}>
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.email}</Text>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Phone Number</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('phone', personalInfo.phone, 'Phone Number')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.phone}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { 
          backgroundColor: colors.card,
          borderBottomColor: colors.border 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Address</Text>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Street Address</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('address', personalInfo.address, 'Street Address')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.address}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>City</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('city', personalInfo.city, 'City')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.city}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>State</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('state', personalInfo.state, 'State')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.state}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>ZIP Code</Text>
            <TouchableOpacity 
              style={styles.infoValue}
              onPress={() => handleEdit('zipCode', personalInfo.zipCode, 'ZIP Code')}
            >
              <Text style={[styles.infoText, { color: colors.text }]}>{personalInfo.zipCode}</Text>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <EditModal
        visible={editModal.visible}
        onClose={() => setEditModal(prev => ({ ...prev, visible: false }))}
        onSave={handleSave}
        value={editModal.value}
        label={editModal.label}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  editText: {
    fontSize: 14,
  },
  verifiedText: {
    fontSize: 14,
    color: '#34c759',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: '#00A86B',
  },
  modalButtonText: {
    fontSize: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});