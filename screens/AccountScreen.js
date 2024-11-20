// screens/AccountScreen.js
import React, { useState } from 'react';
import { View, Text, Pressable, Switch, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { useUser } from "../store/context/user-context";

export default function AccountScreen({ navigation }) {
  const [isJobSearchEnabled, setJobSearchEnabled] = useState(false);
  const [isAutoApplyEnabled, setAutoApplyEnabled] = useState(false);
  const { user, logout } = useUser(); // Sử dụng logout từ context

  // Hàm điều hướng đến màn hình Login
  const moveToLogin = () => {
    navigation.navigate('Login');
  };

  // Hàm điều hướng đến màn hình SignUp
  const moveToSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              await logout(); // Gọi hàm logout từ context
              navigation.navigate('Login'); // Điều hướng đến màn hình Login sau khi đăng xuất
            } catch (error) {
              console.error("Error during logout:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Welcome</Text>
  
          {!user ? (
            <View style={styles.navigationContainer}>
              <Pressable onPress={moveToSignUp}>
                <Text style={styles.loginText}>SIGN UP/</Text>
              </Pressable>
              <Pressable onPress={moveToLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoText}>{user.name}</Text>
              {/* Add additional user information if needed */}
            </View>
          )}
  
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Job Search</Text>
            <Switch
              value={isJobSearchEnabled}
              onValueChange={setJobSearchEnabled}
              trackColor={{ false: "#767577", true: Colors.button }}
              thumbColor={isJobSearchEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Auto Apply</Text>
            <Switch
              value={isAutoApplyEnabled}
              onValueChange={setAutoApplyEnabled}
              trackColor={{ false: "#767577", true: Colors.button }}
              thumbColor={isAutoApplyEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>
          <Text style={styles.noteText}>
            Activate for 30 days. You will be automatically introduced to suitable employers for 30 days.
          </Text>
        </View>
  
        <Pressable onPress={() => navigation.navigate('Tools')} style={styles.button}>
          <Text style={styles.buttonText}>Go to Tools</Text>
        </Pressable>
  
        {user && (
          <>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('UserDetail')}>
              <Text style={styles.buttonText}>Personal Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  section: {
    backgroundColor: Colors.titleButton,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  welcomeText: { fontSize: 16, color: '#555', marginBottom: 10 },
  loginText: { fontSize: 16, color: '#007bff', marginVertical: 5 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: { fontSize: 16, color: '#333' },
  noteText: { fontSize: 14, color: '#555', marginVertical: 5 },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  button2: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  userInfoContainer: {
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
