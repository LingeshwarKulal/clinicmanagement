import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, TextInput } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const BankDetailsScreen = () => {
  const router = useRouter();
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    branchName: '',
    upiId: '',
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
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
          <Text style={styles.headerTitle}>Bank Details</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={20} color="#0a7ea4" />
            <Text style={styles.infoText}>
              Add your bank account details for receiving payments
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Account Holder Name</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.accountName}
              onChangeText={(text) => setBankDetails({ ...bankDetails, accountName: text })}
              placeholder="Enter account holder name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.accountNumber}
              onChangeText={(text) => setBankDetails({ ...bankDetails, accountNumber: text })}
              placeholder="Enter account number"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              secureTextEntry
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Bank Name</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.bankName}
              onChangeText={(text) => setBankDetails({ ...bankDetails, bankName: text })}
              placeholder="Enter bank name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>IFSC Code</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.ifscCode}
              onChangeText={(text) => setBankDetails({ ...bankDetails, ifscCode: text.toUpperCase() })}
              placeholder="Enter IFSC code"
              placeholderTextColor="#94a3b8"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Branch Name</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.branchName}
              onChangeText={(text) => setBankDetails({ ...bankDetails, branchName: text })}
              placeholder="Enter branch name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>UPI ID (Optional)</Text>
            <TextInput
              style={styles.input}
              value={bankDetails.upiId}
              onChangeText={(text) => setBankDetails({ ...bankDetails, upiId: text })}
              placeholder="Enter UPI ID"
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.note}>
            <MaterialIcons name="security" size={20} color="#f59e0b" />
            <Text style={styles.noteText}>
              Your bank details are securely encrypted and stored
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
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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

export default BankDetailsScreen; 