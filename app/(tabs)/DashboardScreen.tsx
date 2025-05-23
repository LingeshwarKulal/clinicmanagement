import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, ImageBackground, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, Fontisto, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isSmallScreen = width < 500;

  // Placeholder stats
  const totalPatients = 0;
  const opdToday = 0;
  const ipdInpatients = 0;

  const upcomingAppointments = [
    { id: 1, name: 'John Doe', date: '2024-06-10', time: '10:00 AM' },
    { id: 2, name: 'Jane Smith', date: '2024-06-10', time: '11:30 AM' },
  ];

  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = "Good Morning";
  if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17) {
    greeting = "Good Evening";
  }

  const currentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0a7ea4', '#075f7c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <View style={styles.avatarCircle}>
                <FontAwesome5 name="user-md" size={28} color="#0a7ea4" />
              </View>
              <View style={styles.greetingText}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.welcomeText}>Dr. Smith</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push("/screens/notification")}
            >
              <View style={styles.notificationDot} />
              <Feather name="bell" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={16} color="#e0f2fe" />
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>

          <Text style={styles.subText}>Your Clinic at a Glance</Text>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#e6f6ff' }]}>
            <Ionicons name="people" size={24} color="#0a7ea4" />
          </View>
          <Text style={styles.statNumber}>{totalPatients}</Text>
          <Text style={styles.statLabel}>Total Patients</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#e6fff6' }]}>
            <Fontisto name="doctor" size={24} color="#0a9e88" />
          </View>
          <Text style={styles.statNumber}>{opdToday}</Text>
          <Text style={styles.statLabel}>OPD Today</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#fff5e6' }]}>
            <MaterialIcons name="hotel" size={24} color="#d97706" />
          </View>
          <Text style={styles.statNumber}>{ipdInpatients}</Text>
          <Text style={styles.statLabel}>IPD Inpatients</Text>
        </View>
      </View>

      <View style={styles.appointmentsSection}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.appointmentsCard}>
          {upcomingAppointments.length === 0 ? (
            <View style={styles.noAppointmentsContainer}>
              <FontAwesome5 name="calendar-check" size={40} color="#cbd5e1" />
              <Text style={styles.noAppointments}>No upcoming appointments</Text>
            </View>
          ) : (
            upcomingAppointments.map((appt) => (
              <View key={appt.id} style={styles.appointmentRow}>
                <View style={styles.timeContainer}>
                  <Text style={styles.appointmentTime}>{appt.time}</Text>
                  <Text style={styles.appointmentDate}>{appt.date}</Text>
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentName}>{appt.name}</Text>
                  <Text style={styles.appointmentType}>Regular Checkup</Text>
                </View>
                <TouchableOpacity style={styles.appointmentStatus}>
                  <FontAwesome5 name="chevron-right" size={16} color="#0a7ea4" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/(tabs)/PatientsScreen")}
        >
          <LinearGradient
            colors={['#0a7ea4', '#075f7c']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="person-add" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Add Patient</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/(tabs)/CalendarScreen")}
        >
          <LinearGradient
            colors={['#0a9e88', '#077a68']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <FontAwesome5 name="calendar-check" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Book Appointment</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/(tabs)/IPDAdmissionScreen")}
        >
          <LinearGradient
            colors={['#d97706', '#a35a05']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name="meeting-room" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Admit Patient</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/(tabs)/MedicalRecordsScreen")}
        >
          <LinearGradient
            colors={['#7c3aed', '#5b21b6']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <FontAwesome5 name="file-medical" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Upload Prescription</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/screens/new-bill")}
        >
          <LinearGradient
            colors={['#059669', '#047857']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <FontAwesome5 name="file-invoice" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Generate Bill</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => router.push("/screens/virtual-clinic")}
        >
          <LinearGradient
            colors={['#4f46e5', '#3730a3']}
            style={styles.actionGradient}
          >
            <View style={styles.actionIcon}>
              <FontAwesome5 name="clinic-medical" size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Virtual Clinic</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerGradient: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 30,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingText: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 14,
    color: '#e0f2fe',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbbf24',
    top: 10,
    right: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 14,
    color: '#e0f2fe',
    marginLeft: 8,
  },
  subText: {
    fontSize: 14,
    color: '#e0f2fe',
    marginTop: 16,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 90,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
  },
  appointmentsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  appointmentsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noAppointmentsContainer: {
    alignItems: 'center',
    padding: 24,
  },
  noAppointments: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 12,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  timeContainer: {
    width: 80,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  appointmentDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  appointmentType: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  appointmentStatus: {
    padding: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen; 