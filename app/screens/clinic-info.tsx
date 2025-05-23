import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ClinicInfoScreen = () => {
  const router = useRouter();
  const [clinicInfo, setClinicInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    specialties: '',
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0a7ea4', '#075f7c']}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Clinic Information</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.formSection}>
            <Text style={styles.label}>Clinic Name</Text>
            <TextInput
              style={styles.input}
              value={clinicInfo.name}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, name: text })}
              placeholder="Enter clinic name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={clinicInfo.address}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, address: text })}
              placeholder="Enter clinic address"
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={clinicInfo.phone}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, phone: text })}
              placeholder="Enter phone number"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={clinicInfo.email}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, email: text })}
              placeholder="Enter email address"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Specialties</Text>
            <TextInput
              style={styles.input}
              value={clinicInfo.specialties}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, specialties: text })}
              placeholder="Enter specialties (comma separated)"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={clinicInfo.description}
              onChangeText={(text) => setClinicInfo({ ...clinicInfo, description: text })}
              placeholder="Enter clinic description"
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default ClinicInfoScreen; 