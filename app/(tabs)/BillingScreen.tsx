import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BillingScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for bills
  const [bills] = useState([
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-03-15',
      billNo: 'BILL001',
      amount: 1500,
      status: 'Paid',
      items: [
        { name: 'Consultation', amount: 500 },
        { name: 'Medicine', amount: 800 },
        { name: 'Lab Tests', amount: 200 }
      ]
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      date: '2024-03-14',
      billNo: 'BILL002',
      amount: 2500,
      status: 'Pending',
      items: [
        { name: 'Consultation', amount: 500 },
        { name: 'X-Ray', amount: 1500 },
        { name: 'Medicine', amount: 500 }
      ]
    },
    {
      id: '3',
      patientName: 'Mike Wilson',
      date: '2024-03-13',
      billNo: 'BILL003',
      amount: 1000,
      status: 'Paid',
      items: [
        { name: 'Consultation', amount: 500 },
        { name: 'Medicine', amount: 500 }
      ]
    }
  ]);

  const handleGenerateNewBill = () => {
    router.push('/(tabs)/NewBillScreen');
  };

  const handlePrint = (bill) => {
    // TODO: Implement print functionality
    console.log('Print bill:', bill);
  };

  const handleViewBill = (bill) => {
    // TODO: Implement view functionality
    console.log('View bill:', bill);
  };

  const filteredBills = bills.filter(bill =>
    bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0a7ea4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Billing</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={16} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateNewBill}>
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text style={styles.generateButtonText}>New Bill</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.billsList}>
        {filteredBills.map((bill) => (
          <View key={bill.id} style={styles.billCard}>
            <TouchableOpacity 
              style={styles.billContent}
              onPress={() => handleViewBill(bill)}
            >
              <View style={styles.billHeader}>
                <View style={styles.billInfo}>
                  <Text style={styles.billNo}>{bill.billNo}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: bill.status === 'Paid' ? '#e6fffa' : '#fff8e6' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: bill.status === 'Paid' ? '#0a9e88' : '#d97706' }
                    ]}>{bill.status}</Text>
                  </View>
                </View>
                <Text style={styles.billDate}>{bill.date}</Text>
              </View>
              
              <Text style={styles.patientName}>{bill.patientName}</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Total Amount:</Text>
                <Text style={styles.amount}>{formatAmount(bill.amount)}</Text>
              </View>

              <View style={styles.itemsList}>
                {bill.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemAmount}>{formatAmount(item.amount)}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>

            <View style={styles.billActions}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleViewBill(bill)}
              >
                <FontAwesome5 name="eye" size={16} color="#0a7ea4" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handlePrint(bill)}
              >
                <FontAwesome5 name="print" size={16} color="#0a7ea4" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a7ea4',
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#2d3748',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  billsList: {
    flex: 1,
    padding: 16,
  },
  billCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  billContent: {
    padding: 16,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  billNo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  billDate: {
    color: '#718096',
    fontSize: 14,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#4a5568',
    marginRight: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#4a5568',
  },
  itemAmount: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '500',
  },
  billActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 12,
  },
  actionButton: {
    padding: 8,
    marginRight: 16,
  },
});

export default BillingScreen; 