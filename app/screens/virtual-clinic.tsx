import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const VirtualClinicScreen = () => {
  const router = useRouter();

  const menuItems = [
    {
      id: 'clinic-info',
      title: 'Clinic Info',
      icon: <FontAwesome5 name="hospital-user" size={24} color="#0a7ea4" />,
      route: '/screens/clinic-info',
    },
    {
      id: 'consult-fees',
      title: 'Consult Fees',
      icon: <FontAwesome5 name="rupee-sign" size={24} color="#0a7ea4" />,
      route: '/screens/consult-fees',
    },
    {
      id: 'consult-timings',
      title: 'Consult Timings',
      icon: <MaterialIcons name="access-time" size={24} color="#0a7ea4" />,
      route: '/screens/consult-timings',
    },
    {
      id: 'bank-details',
      title: 'Bank Details',
      icon: <FontAwesome5 name="university" size={24} color="#0a7ea4" />,
      route: '/screens/bank-details',
    },
  ];

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
          <Text style={styles.headerTitle}>Virtual Clinic Management</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
  },
  menuItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center',
  },
});

export default VirtualClinicScreen; 