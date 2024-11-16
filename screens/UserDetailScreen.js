import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../constants/Colors';

export default function UserDetailScreen({ route, navigation }) {
  // Nhận thông tin người dùng từ route.params
  const userInfo = {
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phoneNumber: '0123456789',
  };
  


  const [userDetails, setUserDetails] = useState(userInfo);


  function handleUpdate(updatedUserInfo) {
    setUserDetails(updatedUserInfo);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Họ và tên:</Text> {userDetails.fullName}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Email:</Text> {userDetails.email}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>Số điện thoại:</Text> {userDetails.phoneNumber}
        </Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('EditUser', {
            userInfo: userDetails, 
            onSave: handleUpdate, 
          })
        }
      >
        <Text style={styles.editButtonText}>Chỉnh sửa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.primary },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  infoContainer: { backgroundColor: Colors.primary, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  infoText: { fontSize: 16, color: Colors.hr, marginBottom: 10 },
  boldText: { fontWeight: 'bold' },
  editButton: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
