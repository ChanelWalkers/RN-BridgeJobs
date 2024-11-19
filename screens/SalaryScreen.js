import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

export default function SalaryConverter() {
  const [grossIncome, setGrossIncome] = useState('');
  const [dependents, setDependents] = useState('');
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND');
  };

  const calculatePersonalIncomeTax = (taxableIncome) => {
    if (taxableIncome <= 0) {
      return 0; // Không có thu nhập chịu thuế
    }

    const taxBrackets = [
      { limit: 5000000, rate: 0.05 },
      { limit: 5000000, rate: 0.10 },
      { limit: 8000000, rate: 0.15 },
      { limit: 14000000, rate: 0.20 },
      { limit: 20000000, rate: 0.25 },
      { limit: 28000000, rate: 0.30 },
      { limit: Infinity, rate: 0.35 },
    ];

    let tax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome > 0) {
        const incomeForThisBracket = Math.min(taxableIncome, bracket.limit);
        tax += incomeForThisBracket * bracket.rate;
        taxableIncome -= incomeForThisBracket;
      } else {
        break;
      }
    }
    return tax;
  };


  const calculateNetIncome = () => {
    const gross = parseFloat(grossIncome);
    if (isNaN(gross) || gross <= 0) {
      alert('Vui lòng nhập thu nhập gộp hợp lệ!');
      return;
    }

    const validDependents = Math.max(0, dependents); // Không cho phép số phụ thuộc âm
    const si = gross * 0.08;
    const hi = gross * 0.015;
    const ui = gross * 0.01;
    const incomeBeforeTax = gross - si - hi - ui;

    const individualDeduction = 11000000;
    const dependentsDeduction = validDependents * 4400000;

    const taxableIncome = Math.max(0, incomeBeforeTax - individualDeduction - dependentsDeduction);
    const personalIncomeTax = calculatePersonalIncomeTax(taxableIncome);
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
      <Text style={styles.label}>Thu nhập gộp:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập thu nhập gộp (VND)"
        keyboardType="numeric"
        value={grossIncome}
        onChangeText={setGrossIncome}
      />
      <Text style={styles.label}>Số người phụ thuộc:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số người phụ thuộc"
        keyboardType="numeric"
        value={dependents.toString()}
        onChangeText={(text) => setDependents(parseInt(text) || 0)}
      />
      <Pressable onPress={() => setShowDetails(!showDetails)} style={styles.termsContainer}>
        <Text style={styles.termsText}>
          Nhấn vào ngay để xem chi tiết về cách tính lương.
        </Text>
      </Pressable>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Bảo hiểm xã hội: 8%</Text>
          <Text style={styles.detailText}>Bảo hiểm y tế: 1.5%</Text>
          <Text style={styles.detailText}>Bảo hiểm thất nghiệp: 1%</Text>
          <Text style={styles.detailText}>Giảm trừ cá nhân: 11,000,000 VND</Text>
          <Text style={styles.detailText}>Giảm trừ người phụ thuộc: 4,400,000 VND/người</Text>
          <Text style={styles.detailHeader}>Công thức tính lương Net:</Text>
          <Text style={styles.detailText}>
            Lương Net = Lương Gross - (BHXH + BHYT + BHTN + Thuế TNCN)
          </Text>
          <Text style={styles.detailHeader}>Cách tính thuế TNCN:</Text>
          <Text style={styles.detailText}>
            Thu nhập chịu thuế = Lương Gross - (BHXH + BHYT + BHTN) - Các khoản giảm trừ
          </Text>
          <Text style={styles.detailText}>
            Thuế TNCN = Thu nhập chịu thuế × Thuế suất theo bậc
          </Text>
        </View>
      )}

      <Pressable onPress={calculateNetIncome} style={styles.button}>
        <Text style={styles.buttonText}>Gross to Net</Text>
      </Pressable>
      {result && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Kết Quả Tính Toán</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Thu nhập gộp: {formatCurrency(result.grossIncome || 0)}
            </Text>
            <Text style={styles.cardText}>
              Bảo hiểm xã hội (8%): {formatCurrency(result.si || 0)}
            </Text>
            <Text style={styles.cardText}>
              Bảo hiểm y tế (1.5%): {formatCurrency(result.hi || 0)}
            </Text>
            <Text style={styles.cardText}>
              Bảo hiểm thất nghiệp (1%): {formatCurrency(result.ui || 0)}
            </Text>
            <Text style={styles.cardText}>
              Thu nhập trước thuế: {formatCurrency(result.incomeBeforeTax || 0)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Giảm trừ cá nhân: {formatCurrency(result.individualDeduction || 0)}
            </Text>
            <Text style={styles.cardText}>
              Giảm trừ người phụ thuộc: {formatCurrency(result.dependentsDeduction || 0)}
            </Text>
            <Text style={styles.cardText}>
              Thu nhập chịu thuế: {formatCurrency(result.taxableIncome || 0)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Thuế thu nhập cá nhân: {formatCurrency(result.personalIncomeTax || 0)}
            </Text>
            <Text style={styles.cardText}>
              Thu nhập ròng: {formatCurrency(result.netIncome || 0)}
            </Text>
          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.button,
  },
  detailHeader: {
    fontSize: 16,
    color: Colors.txt,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.background,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.primary,
  },
  termsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    color: Colors.button,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  detailsContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: Colors.txt,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
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
    borderColor: Colors.backgroundChat,
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
    color: Colors.txt,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: Colors.txt,
    marginBottom: 5,
    fontWeight: '600',
  },
});
