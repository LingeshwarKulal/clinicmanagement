import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Switch } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const ConsultTimingsScreen = () => {
  const router = useRouter();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  
  const [schedule, setSchedule] = useState([
    { 
      day: 'Monday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
    { 
      day: 'Tuesday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
    { 
      day: 'Wednesday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
    { 
      day: 'Thursday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
    { 
      day: 'Friday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
    { 
      day: 'Saturday',
      isActive: true,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '19:00' },
    },
    { 
      day: 'Sunday',
      isActive: false,
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '20:00' },
    },
  ]);

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  const toggleDay = (day) => {
    setSchedule(schedule.map(item => 
      item.day === day ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime && selectedDay && selectedField) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      setSchedule(schedule.map(item => {
        if (item.day === selectedDay) {
          const [shift, field] = selectedField.split('.');
          return {
            ...item,
            [shift]: {
              ...item[shift],
              [field]: timeString,
            },
          };
        }
        return item;
      }));
    }
  };

  const showTimePickerModal = (day, field) => {
    setSelectedDay(day);
    setSelectedField(field);
    setShowTimePicker(true);
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
          <Text style={styles.headerTitle}>Consultation Hours</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={20} color="#0a7ea4" />
            <Text style={styles.infoText}>
              Set your availability for each day of the week
            </Text>
          </View>

          {schedule.map((item) => (
            <View key={item.day} style={[styles.dayCard, !item.isActive && styles.inactiveCard]}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayName}>{item.day}</Text>
                <Switch
                  value={item.isActive}
                  onValueChange={() => toggleDay(item.day)}
                  trackColor={{ false: '#e2e8f0', true: '#0a7ea4' }}
                  thumbColor="#fff"
                />
              </View>

              {item.isActive && (
                <View style={styles.timings}>
                  <View style={styles.shiftContainer}>
                    <Text style={styles.shiftLabel}>Morning</Text>
                    <View style={styles.timeRow}>
                      <TouchableOpacity 
                        style={styles.timeButton}
                        onPress={() => showTimePickerModal(item.day, 'morning.start')}
                      >
                        <Text style={styles.timeText}>{item.morning.start}</Text>
                      </TouchableOpacity>
                      <Text style={styles.toText}>to</Text>
                      <TouchableOpacity 
                        style={styles.timeButton}
                        onPress={() => showTimePickerModal(item.day, 'morning.end')}
                      >
                        <Text style={styles.timeText}>{item.morning.end}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.shiftContainer}>
                    <Text style={styles.shiftLabel}>Evening</Text>
                    <View style={styles.timeRow}>
                      <TouchableOpacity 
                        style={styles.timeButton}
                        onPress={() => showTimePickerModal(item.day, 'evening.start')}
                      >
                        <Text style={styles.timeText}>{item.evening.start}</Text>
                      </TouchableOpacity>
                      <Text style={styles.toText}>to</Text>
                      <TouchableOpacity 
                        style={styles.timeButton}
                        onPress={() => showTimePickerModal(item.day, 'evening.end')}
                      >
                        <Text style={styles.timeText}>{item.evening.end}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#0a7ea4',
    lineHeight: 20,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inactiveCard: {
    opacity: 0.6,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  timings: {
    gap: 16,
  },
  shiftContainer: {
    gap: 8,
  },
  shiftLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  toText: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default ConsultTimingsScreen; 