import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const doctorInfo = {
    name: 'Dr. John Smith',
    specialization: 'General Physician',
    experience: '15 years',
    email: 'dr.smith@clinic.com',
    phone: '+1 234-567-8900',
    clinicAddress: '123 Medical Center, Healthcare Street',
    clinicHours: '9:00 AM - 6:00 PM'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <FontAwesome5 name="user-md" size={50} color="#fff" />
        </View>
        <Text style={styles.name}>{doctorInfo.name}</Text>
        <Text style={styles.specialization}>{doctorInfo.specialization}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <FontAwesome5 name="briefcase" size={20} color="#0a7ea4" style={styles.icon} />
          <View>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>{doctorInfo.experience}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome5 name="envelope" size={20} color="#0a7ea4" style={styles.icon} />
          <View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{doctorInfo.email}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome5 name="phone" size={20} color="#0a7ea4" style={styles.icon} />
          <View>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{doctorInfo.phone}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome5 name="clinic-medical" size={20} color="#0a7ea4" style={styles.icon} />
          <View>
            <Text style={styles.infoLabel}>Clinic Address</Text>
            <Text style={styles.infoValue}>{doctorInfo.clinicAddress}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome5 name="clock" size={20} color="#0a7ea4" style={styles.icon} />
          <View>
            <Text style={styles.infoLabel}>Clinic Hours</Text>
            <Text style={styles.infoValue}>{doctorInfo.clinicHours}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <FontAwesome5 name="edit" size={16} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafd',
  },
  header: {
    backgroundColor: '#0a7ea4',
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
    width: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0a7ea4',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 