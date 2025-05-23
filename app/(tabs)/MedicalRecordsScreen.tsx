import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MedicalRecordsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for medical records
  const [records] = useState([
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-03-15',
      type: 'Prescription',
      doctor: 'Dr. Smith',
      description: 'Regular checkup prescription',
      fileUrl: 'prescription_001.pdf'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      date: '2024-03-14',
      type: 'Lab Report',
      doctor: 'Dr. Johnson',
      description: 'Blood test results',
      fileUrl: 'lab_report_002.pdf'
    },
    {
      id: '3',
      patientName: 'Mike Wilson',
      date: '2024-03-13',
      type: 'X-Ray',
      doctor: 'Dr. Brown',
      description: 'Chest X-Ray scan',
      fileUrl: 'xray_003.pdf'
    }
  ]);

  const handleUpload = () => {
    // TODO: Implement document upload functionality
    console.log('Upload document');
  };

  const handlePrint = (record) => {
    // TODO: Implement print functionality
    console.log('Print record:', record);
  };

  const handleViewRecord = (record) => {
    // TODO: Implement view functionality
    console.log('View record:', record);
  };

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0a7ea4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={16} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search records..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.recordsList}>
        {filteredRecords.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <TouchableOpacity 
              style={styles.recordContent}
              onPress={() => handleViewRecord(record)}
            >
              <View style={styles.recordHeader}>
                <View style={styles.recordType}>
                  <FontAwesome5 
                    name={record.type === 'Prescription' ? 'file-medical' : 
                          record.type === 'Lab Report' ? 'flask' : 'x-ray'} 
                    size={16} 
                    color="#0a7ea4" 
                  />
                  <Text style={styles.recordTypeText}>{record.type}</Text>
                </View>
                <Text style={styles.recordDate}>{record.date}</Text>
              </View>
              
              <Text style={styles.patientName}>{record.patientName}</Text>
              <Text style={styles.doctorName}>{record.doctor}</Text>
              <Text style={styles.description}>{record.description}</Text>
            </TouchableOpacity>

            <View style={styles.recordActions}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleViewRecord(record)}
              >
                <FontAwesome5 name="eye" size={16} color="#0a7ea4" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handlePrint(record)}
              >
                <FontAwesome5 name="print" size={16} color="#0a7ea4" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#2d3748',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  recordsList: {
    flex: 1,
    padding: 16,
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  recordContent: {
    padding: 16,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordTypeText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  recordDate: {
    color: '#718096',
    fontSize: 14,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#718096',
  },
  recordActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 12,
  },
  actionButton: {
    padding: 8,
    marginRight: 16,
  },
});

export default MedicalRecordsScreen; 