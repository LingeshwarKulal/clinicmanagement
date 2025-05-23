import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Dummy appointments data
  const appointments = {
    '2024-03-20': [
      { id: 1, time: '10:00 AM', name: 'John Doe', type: 'Regular Checkup', status: 'confirmed' },
      { id: 2, time: '2:30 PM', name: 'Jane Smith', type: 'Follow-up', status: 'pending' },
    ],
    '2024-03-21': [
      { id: 3, time: '11:00 AM', name: 'Mike Wilson', type: 'Consultation', status: 'confirmed' },
    ],
  };

  // Memoize marked dates to prevent unnecessary recalculations
  const markedDates = useMemo(() => {
    const marked = {};
    Object.keys(appointments).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: '#0a7ea4',
        selected: date === selectedDate.toISOString().split('T')[0],
      };
    });
    return marked;
  }, [appointments, selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const onDateChange = (date) => {
    const selected = new Date(date.timestamp);
    setSelectedDate(selected);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const renderAppointments = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayAppointments = appointments[dateStr] || [];
    
    if (dayAppointments.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <FontAwesome5 name="calendar-check" size={48} color="#cbd5e1" />
          <Text style={styles.emptyStateText}>No appointments for this date</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <MaterialIcons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Appointment</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.appointmentsList}>
        {dayAppointments.map((appointment) => (
          <TouchableOpacity
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() => {/* Handle appointment details */}}
          >
            <View style={styles.timeContainer}>
              <MaterialIcons name="access-time" size={20} color="#0a7ea4" />
              <Text style={styles.timeText}>{appointment.time}</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.patientName}>{appointment.name}</Text>
              <View style={styles.typeAndStatus}>
                <Text style={styles.appointmentType}>{appointment.type}</Text>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(appointment.status) }]}>
                  <Text style={styles.statusText}>{appointment.status}</Text>
                </View>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const AddAppointmentModal = () => (
    <Modal
      visible={showAddModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Appointment</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          {/* Add appointment form components here */}
          <Text style={styles.modalText}>Appointment form coming soon...</Text>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setShowAddModal(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0a7ea4', '#075f7c']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Appointments Calendar</Text>
        <TouchableOpacity 
          style={styles.todayButton}
          onPress={() => setSelectedDate(new Date())}
        >
          <MaterialIcons name="today" size={20} color="#fff" />
          <Text style={styles.todayButtonText}>Today</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: '#fff',
          textSectionTitleColor: '#1e293b',
          selectedDayBackgroundColor: '#0a7ea4',
          selectedDayTextColor: '#fff',
          todayTextColor: '#0a7ea4',
          dayTextColor: '#1e293b',
          textDisabledColor: '#94a3b8',
          dotColor: '#0a7ea4',
          selectedDotColor: '#fff',
          arrowColor: '#0a7ea4',
          monthTextColor: '#1e293b',
          indicatorColor: '#0a7ea4',
        }}
        markedDates={markedDates}
        onDayPress={onDateChange}
        enableSwipeMonths={true}
        current={selectedDate.toISOString()}
      />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Tomorrow</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
      </View>

      <ScrollView style={styles.contentContainer}>
        {renderAppointments()}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <AddAppointmentModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  todayButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  calendar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  appointmentsList: {
    gap: 12,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 100,
  },
  timeText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  typeAndStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentType: {
    fontSize: 14,
    color: '#64748b',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  modalText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CalendarScreen; 