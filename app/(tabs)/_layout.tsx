import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
      initialRouteName="DashboardScreen"
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="CalendarScreen"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="PatientsScreen"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="OPDVisitScreen"
        options={{
          title: 'Clinic',
          tabBarIcon: ({ color }) => <FontAwesome5 name="clinic-medical" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-md" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="IPDAdmissionScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="MedicalRecordsScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="BillingScreen"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
