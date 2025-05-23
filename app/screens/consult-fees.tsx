import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, TextInput } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ConsultFeesScreen = () => {
  const router = useRouter();
  const [fees, setFees] = useState([
    { id: '1', type: 'New Consultation', amount: '', duration: '30' },
    { id: '2', type: 'Follow-up', amount: '', duration: '15' },
    { id: '3', type: 'Video Consultation', amount: '', duration: '20' },
    { id: '4', type: 'Emergency', amount: '', duration: '45' },
  ]);

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  const handleUpdateFee = (id: string, amount: string) => {
    setFees(fees.map(fee => 
      fee.id === id ? { ...fee, amount } : fee
    ));
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
          <Text style={styles.headerTitle}>Consultation Fees</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={20} color="#0a7ea4" />
            <Text style={styles.infoText}>
              Set your consultation fees for different types of appointments
            </Text>
          </View>

          {fees.map((fee) => (
            <View key={fee.id} style={styles.feeCard}>
              <View style={styles.feeHeader}>
                <Text style={styles.feeType}>{fee.type}</Text>
                <View style={styles.durationTag}>
                  <MaterialIcons name="access-time" size={14} color="#0a7ea4" />
                  <Text style={styles.durationText}>{fee.duration} mins</Text>
                </View>
              </View>
              
              <View style={styles.feeInput}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  value={fee.amount}
                  onChangeText={(text) => handleUpdateFee(fee.id, text)}
                  placeholder="Enter amount"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                />
              </View>
            </View>
          ))}

          <View style={styles.note}>
            <MaterialIcons name="lightbulb" size={20} color="#f59e0b" />
            <Text style={styles.noteText}>
              Tip: Consider your experience, specialization, and local market rates when setting fees
            </Text>
          </View>
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
  feeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  feeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  feeType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  feeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#64748b',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: '#1e293b',
    padding: 12,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
});

export default ConsultFeesScreen; 