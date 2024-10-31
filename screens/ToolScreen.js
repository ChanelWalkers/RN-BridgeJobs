import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ToolsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tools</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CV / Cover Letter</Text>
          <Text style={styles.sectionDescription}>
            Would you like you to have a job that suits you. Create cv on , we will suggest you the most suitable jobs
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>UPLOAD/CREATE NEW CV +</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workplace Personality Test</Text>
          <Text style={styles.sectionDescription}>
            Analyze your personal characteristics and abilities to determine whether you suitable for IT jobs on the market.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>TAKE THE TEST +</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salary Converter</Text>
          <Text style={styles.sectionDescription}>
            Avoid unnecessary misunderstandings and protect your own rights when signing a labor contract by understanding Gross & Net salary.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CALCULATE YOUR SALARY +</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#ff5a00',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  section: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  sectionDescription: { fontSize: 14, color: '#555', marginBottom: 10 },
  button: {
    backgroundColor: '#ff5a00',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: { fontSize: 14, color: '#888' },
  activeNavItem: { color: '#ff5a00' },
});