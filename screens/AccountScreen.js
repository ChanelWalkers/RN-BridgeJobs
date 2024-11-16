import React, { useState } from 'react';
import { View, Text, Pressable, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function AccountScreen({ navigation }) {
  const [isJobSearchEnabled, setJobSearchEnabled] = useState(false);
  const [isAutoApplyEnabled, setAutoApplyEnabled] = useState(false);

  function moveToLogin() {
    navigation.navigate('Login');
  }

  function moveToSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
        { }
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Về tôi</Text>
          <Text style={styles.welcomeText}>Chào mừng bạn tới </Text>
          <View style={styles.navigationContainer}>
            <Pressable onPress={moveToSignUp}>
              <Text style={styles.loginText}>ĐĂNG KÝ/</Text>
            </Pressable>
            <Pressable onPress={moveToLogin}>
              <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            </Pressable>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Tìm kiếm công việc</Text>
            <Switch
              value={isJobSearchEnabled}
              onValueChange={setJobSearchEnabled}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Ứng tuyển tự động</Text>
            <Switch
              value={isAutoApplyEnabled}
              onValueChange={setAutoApplyEnabled}
            />
          </View>
          <Text style={styles.noteText}>
            Kích hoạt trong vòng 30 ngày.  sẽ tự động giới thiệu bạn với Nhà Tuyển Dụng phù hợp trong 30 ngày.
          </Text>
        </View>

        { }
        <Pressable onPress={() => navigation.navigate('Tools')} style={styles.button}>
          <Text style={styles.buttonText}>Chuyển đến Công cụ</Text>
        </Pressable>

        <TouchableOpacity style={styles.button2} onPress={()=>{navigation.navigate('UserDetail')}}>
            <Text style={styles.buttonText}>Thông tin cá nhân</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: Colors.button,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  notificationIcon: { width: 24, height: 24, backgroundColor: '#fff', borderRadius: 12 },
  content: { padding: 20 },
  section: {
    backgroundColor: Colors.titleButton,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  welcomeText: { fontSize: 16, color: '#555' },
  loginText: { fontSize: 16, color: '#007bff', marginVertical: 5 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: { fontSize: 16, color: '#333' },
  noteText: { fontSize: 14, color: '#555', marginVertical: 5 },
  sectionDescription: { fontSize: 14, color: '#555', marginBottom: 10 },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    marginTop: 20,
    backgroundColor: Colors.button,
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
  navigationContainer:{
    flexDirection:'row',
  }
});

