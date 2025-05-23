import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const IPDAdmissionScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    admissionDate: '',
    roomType: '',
    roomNumber: '',
    diagnosis: '',
    attendantName: '',
    attendantContact: '',
    emergencyContact: '',
    insuranceDetails: '',
    specialInstructions: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log('IPD Admission Form submitted:', formData);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0a7ea4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IPD Admission Form</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter patient's full name"
              value={formData.patientName}
              onChangeText={(text) => handleInputChange('patientName', text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(text) => handleInputChange('age', text)}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={formData.gender}
                onChangeText={(text) => handleInputChange('gender', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
              value={formData.contact}
              onChangeText={(text) => handleInputChange('contact', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter full address"
              multiline
              numberOfLines={3}
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Admission Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Admission Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter admission date"
              value={formData.admissionDate}
              onChangeText={(text) => handleInputChange('admissionDate', text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Room Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Select room type"
                value={formData.roomType}
                onChangeText={(text) => handleInputChange('roomType', text)}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Room Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter room number"
                value={formData.roomNumber}
                onChangeText={(text) => handleInputChange('roomNumber', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Provisional Diagnosis</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter diagnosis details"
              multiline
              numberOfLines={3}
              value={formData.diagnosis}
              onChangeText={(text) => handleInputChange('diagnosis', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Emergency Contact Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Attendant Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter attendant's name"
              value={formData.attendantName}
              onChangeText={(text) => handleInputChange('attendantName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Attendant Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter attendant's contact"
              keyboardType="phone-pad"
              value={formData.attendantContact}
              onChangeText={(text) => handleInputChange('attendantContact', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter emergency contact number"
              keyboardType="phone-pad"
              value={formData.emergencyContact}
              onChangeText={(text) => handleInputChange('emergencyContact', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Insurance Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter insurance information"
              multiline
              numberOfLines={3}
              value={formData.insuranceDetails}
              onChangeText={(text) => handleInputChange('insuranceDetails', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter any special instructions or notes"
              multiline
              numberOfLines={4}
              value={formData.specialInstructions}
              onChangeText={(text) => handleInputChange('specialInstructions', text)}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.submitButton]} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Admit Patient</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a7ea4',
    marginLeft: 12,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    marginTop: 12,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a7ea4',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2d3748',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  submitButton: {
    backgroundColor: '#0a7ea4',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IPDAdmissionScreen; 