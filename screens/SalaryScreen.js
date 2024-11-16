import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

export default function SalaryConverter() {
  const [grossIncome, setGrossIncome] = useState('');
  const [dependents, setDependents] = useState(0);
  const [result, setResult] = useState(null);
  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND');
  };
  

  const calculateNetIncome = () => {
    const gross = parseFloat(grossIncome);
    const si = gross * 0.08;
    const hi = gross * 0.015;
    const ui = gross * 0.01;
    const incomeBeforeTax = gross - si - hi - ui;
  
    const individualDeduction = 11000000;
    const dependentsDeduction = dependents * 4400000;
    // Cập nhật công thức tính taxableIncome để đảm bảo không âm
    const taxableIncome = Math.max(0, incomeBeforeTax - individualDeduction - dependentsDeduction);
  
    const personalIncomeTax = taxableIncome > 0 ? taxableIncome * 0.07 : 0;
    const netIncome = incomeBeforeTax - personalIncomeTax;

    setResult({
      grossIncome: gross,
      si,
      hi,
      ui,
      incomeBeforeTax,
      individualDeduction,
      dependentsDeduction,
      taxableIncome,
      personalIncomeTax,
      netIncome,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bộ Chuyển Đổi Lương</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập thu nhập gộp (VND)"
        keyboardType="numeric"
        value={grossIncome}
        onChangeText={setGrossIncome}
      />
      <TextInput
        style={styles.input}
        placeholder="Số người phụ thuộc"
        keyboardType="numeric"
        value={dependents.toString()}
        onChangeText={(text) => setDependents(parseInt(text) || 0)}
      />
      <Pressable onPress={calculateNetIncome} style={styles.button}>
        <Text style={styles.buttonText}>Gross to ness</Text>
      </Pressable>
      {result && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Kết Quả Tính Toán</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Thu nhập gộp: {formatCurrency(result.grossIncome)}</Text>
            <Text style={styles.cardText}>Bảo hiểm xã hội (8%): {formatCurrency(result.si)}</Text>
            <Text style={styles.cardText}>Bảo hiểm y tế (1.5%): {formatCurrency(result.hi)}</Text>
            <Text style={styles.cardText}>Bảo hiểm thất nghiệp (1%): {formatCurrency(result.ui)}</Text>
            <Text style={styles.cardText}>Thu nhập trước thuế: {formatCurrency(result.incomeBeforeTax)}</Text>
            </View>
            <View style={styles.card}>
            <Text style={styles.cardText}>Giảm trừ cá nhân: {formatCurrency(result.individualDeduction)}</Text>
            <Text style={styles.cardText}>Giảm trừ người phụ thuộc: {formatCurrency(result.dependentsDeduction)}</Text>
            <Text style={styles.cardText}>Thu nhập chịu thuế: {formatCurrency(result.taxableIncome)}</Text>
            </View>
            <View style={styles.card}>
            <Text style={styles.cardText}>Thuế thu nhập cá nhân: {formatCurrency(result.personalIncomeTax)}</Text>
            <Text style={styles.cardText}>Thu nhập ròng: {formatCurrency(result.netIncome)}</Text>
            </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.button,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    color: Colors.button,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.button,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
