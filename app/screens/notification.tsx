import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationScreen = () => {
  const router = useRouter();

  // Dummy notifications data
  const notifications = [
    {
      id: '1',
      title: 'New Appointment',
      message: 'John Doe scheduled an appointment for tomorrow at 10:00 AM',
      time: '2 hours ago',
      type: 'appointment',
      isRead: false,
    },
    {
      id: '2',
      title: 'Lab Results Ready',
      message: 'Lab results for patient Jane Smith are now available',
      time: '5 hours ago',
      type: 'lab',
      isRead: false,
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment of ₹1500 received from Mike Wilson',
      time: '1 day ago',
      type: 'payment',
      isRead: true,
    },
    {
      id: '4',
      title: 'Appointment Cancelled',
      message: 'Sarah Johnson cancelled her appointment for today',
      time: '2 days ago',
      type: 'appointment',
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <FontAwesome5 name="calendar-check" size={24} color="#0a7ea4" />;
      case 'lab':
        return <FontAwesome5 name="flask" size={24} color="#7c3aed" />;
      case 'payment':
        return <FontAwesome5 name="money-bill-wave" size={24} color="#059669" />;
      default:
        return <Feather name="bell" size={24} color="#0a7ea4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return '#e6f6ff';
      case 'lab':
        return '#f3e8ff';
      case 'payment':
        return '#ecfdf5';
      default:
        return '#f0f9ff';
    }
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
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.clearButton}>
            <MaterialIcons name="clear-all" size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.notificationsList}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                { backgroundColor: getNotificationColor(notification.type) }
              ]}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  clearButton: {
    padding: 8,
  },
  notificationsList: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0a7ea4',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default NotificationScreen; 