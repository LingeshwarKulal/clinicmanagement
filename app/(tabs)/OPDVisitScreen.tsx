import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const OPDVisitScreen = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const clinicStats = {
    totalPatients: 1250,
    avgRating: 4.8,
    experience: '15+ Years',
    successRate: '98%'
  };

  const timeSlots = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: false },
    { id: 3, time: '11:00 AM', available: true },
    { id: 4, time: '12:00 PM', available: true },
    { id: 5, time: '02:00 PM', available: true },
    { id: 6, time: '03:00 PM', available: false },
    { id: 7, time: '04:00 PM', available: true },
    { id: 8, time: '05:00 PM', available: true },
  ];

  const services = [
    { id: 1, name: 'General Checkup', icon: 'stethoscope', price: '₹500' },
    { id: 2, name: 'Lab Tests', icon: 'flask', price: '₹800' },
    { id: 3, name: 'Vaccination', icon: 'syringe', price: '₹1000' },
    { id: 4, name: 'ECG', icon: 'heartbeat', price: '₹1200' },
    { id: 5, name: 'X-Ray', icon: 'x-ray', price: '₹1500' },
    { id: 6, name: 'Ultrasound', icon: 'wave-square', price: '₹2000' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Clinic Header */}
      <View style={styles.header}>
        <View style={styles.clinicIconContainer}>
          <FontAwesome5 name="clinic-medical" size={32} color="#fff" />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.clinicName}>HealthCare Plus Clinic</Text>
          <Text style={styles.clinicAddress}>123 Medical Center, Healthcare Street</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome5 name="star" solid size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{clinicStats.avgRating} Rating</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <FontAwesome5 name="users" size={24} color="#0a7ea4" />
          <Text style={styles.statNumber}>{clinicStats.totalPatients}+</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome5 name="award" size={24} color="#0a7ea4" />
          <Text style={styles.statNumber}>{clinicStats.experience}</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome5 name="check-circle" size={24} color="#0a7ea4" />
          <Text style={styles.statNumber}>{clinicStats.successRate}</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
      </View>

      {/* Services Section */}
      <Text style={styles.sectionTitle}>Our Services</Text>
      <View style={styles.servicesGrid}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <FontAwesome5 name={service.icon} size={24} color="#0a7ea4" />
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Available Time Slots */}
      <Text style={styles.sectionTitle}>Today's Available Slots</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlot,
              !slot.available && styles.timeSlotUnavailable,
              selectedTimeSlot === slot.id && styles.timeSlotSelected
            ]}
            disabled={!slot.available}
            onPress={() => setSelectedTimeSlot(slot.id)}
          >
            <Text style={[
              styles.timeSlotText,
              !slot.available && styles.timeSlotTextUnavailable,
              selectedTimeSlot === slot.id && styles.timeSlotTextSelected
            ]}>
              {slot.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <FontAwesome5 name="phone-alt" size={20} color="#0a7ea4" />
          <Text style={styles.contactText}>+91 98765 43210</Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialIcons name="email" size={20} color="#0a7ea4" />
          <Text style={styles.contactText}>contact@healthcareplus.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="time-outline" size={20} color="#0a7ea4" />
          <Text style={styles.contactText}>Mon-Sat: 9:00 AM - 6:00 PM</Text>
        </View>
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
  },
  clinicIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  clinicName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 14,
    color: '#e0f7fa',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3748',
    marginTop: 10,
    textAlign: 'center',
  },
  servicePrice: {
    fontSize: 14,
    color: '#0a7ea4',
    marginTop: 5,
    fontWeight: '500',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'flex-start',
  },
  timeSlot: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  timeSlotSelected: {
    backgroundColor: '#0a7ea4',
  },
  timeSlotUnavailable: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  timeSlotText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  timeSlotTextUnavailable: {
    color: '#9ca3af',
  },
  contactSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4a5568',
  },
  bookButton: {
    backgroundColor: '#0a7ea4',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OPDVisitScreen; 