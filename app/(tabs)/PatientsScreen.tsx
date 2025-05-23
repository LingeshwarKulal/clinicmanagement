import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PatientsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'date' | 'id'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'inactive'
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
    bloodGroup: '',
    allergies: '',
    medicalHistory: ''
  });

  // Dummy patient data
  const patients = [
    { id: 'P001', name: 'John Doe', age: 35, gender: 'Male', phone: '+91 98765 43210', lastVisit: '2024-03-15', status: 'active' },
    { id: 'P002', name: 'Jane Smith', age: 28, gender: 'Female', phone: '+91 98765 43211', lastVisit: '2024-03-18', status: 'active' },
    { id: 'P003', name: 'Mike Wilson', age: 45, gender: 'Male', phone: '+91 98765 43212', lastVisit: '2024-02-28', status: 'inactive' },
    { id: 'P004', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '+91 98765 43213', lastVisit: '2024-03-20', status: 'active' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    setShowAddModal(false);
    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      address: '',
      bloodGroup: '',
      allergies: '',
      medicalHistory: ''
    });
  };

  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.phone.includes(searchQuery);
      
      const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'id':
          return a.id.localeCompare(b.id);
        default:
          return 0;
      }
    });

  const renderSortButton = (type: string, label: string, iconName: string) => (
    <TouchableOpacity 
      style={[styles.filterButton, sortBy === type && styles.filterButtonActive]}
      onPress={() => setSortBy(type)}
    >
      <MaterialIcons name={iconName as any} size={16} color={sortBy === type ? '#fff' : '#64748b'} />
      <Text style={[styles.filterButtonText, sortBy === type && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterButton = (type: string, label: string) => (
    <TouchableOpacity 
      style={[styles.filterButton, filterStatus === type && styles.filterButtonActive]}
      onPress={() => setFilterStatus(type)}
    >
      <Text style={[styles.filterButtonText, filterStatus === type && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0a7ea4', '#075f7c']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Patients</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{patients.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {patients.filter(p => p.status === 'active').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, ID or phone"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {renderSortButton('name', 'Name', 'sort-by-alpha')}
          {renderSortButton('date', 'Last Visit', 'date-range')}
          {renderSortButton('id', 'ID', 'format-list-numbered')}
          <View style={styles.filterDivider} />
          {renderFilterButton('all', 'All Patients')}
          {renderFilterButton('active', 'Active')}
          {renderFilterButton('inactive', 'Inactive')}
        </ScrollView>
      </View>

      <ScrollView style={styles.patientsList}>
        {filteredPatients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            style={styles.patientCard}
            onPress={() => {/* Navigate to patient details */}}
          >
            <View style={styles.patientInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: patient.status === 'active' ? '#10b981' : '#94a3b8' }
                ]} />
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="person" size={16} color="#64748b" />
                  <Text style={styles.detailText}>{patient.gender}, {patient.age} yrs</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="phone" size={16} color="#64748b" />
                  <Text style={styles.detailText}>{patient.phone}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="badge" size={16} color="#64748b" />
                  <Text style={styles.detailText}>{patient.id}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="event" size={16} color="#64748b" />
                  <Text style={styles.detailText}>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <MaterialIcons name="person-add" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)} style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={20} color="#0a7ea4" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Patient</Text>
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter patient's full name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
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
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
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
              <Text style={styles.sectionTitle}>Medical Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Blood Group</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter blood group"
                  value={formData.bloodGroup}
                  onChangeText={(text) => handleInputChange('bloodGroup', text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Allergies</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="List any allergies"
                  multiline
                  numberOfLines={3}
                  value={formData.allergies}
                  onChangeText={(text) => handleInputChange('allergies', text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Medical History</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter medical history"
                  multiline
                  numberOfLines={4}
                  value={formData.medicalHistory}
                  onChangeText={(text) => handleInputChange('medicalHistory', text)}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Patient</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#e0f2fe',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: '#0a7ea4',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  filterDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  patientsList: {
    flex: 1,
    padding: 16,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: Platform.OS === 'ios' ? 32 : 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f6fafd',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a7ea4',
    marginLeft: 12,
  },
  formContainer: {
    flex: 1,
    padding: 16,
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
  backButton: {
    padding: 8,
  },
});

export default PatientsScreen; 