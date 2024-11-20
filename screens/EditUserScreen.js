import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { useUser } from '../store/context/user-context';
import { auth, db } from '../config/firebase'; // Đảm bảo đường dẫn đúng
import { doc, updateDoc } from 'firebase/firestore';
export default function EditUserScreen({ route, navigation }) {
  // Nhận dữ liệu từ route.params
  const { userInfo, onSave } = route.params;
  const {user, login} = useUser()
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);


  async function handleSave() {
    const updatedUserInfo = { name: fullName, email: email, phone: phone };
    setIsSaving(true);
    login(updatedUserInfo)
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Người dùng chưa đăng nhập.');
      }

      // Tham chiếu đến tài liệu người dùng trong Firestore
      const userDocRef = doc(db, 'users', user.uid);

      // Cập nhật dữ liệu người dùng trong Firestore
      await updateDoc(userDocRef, updatedUserInfo);

      Alert.alert('Thành công', 'Thông tin đã được cập nhật thành công.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error updating user info:', error);
      Alert.alert('Lỗi', error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>

      <Text style={styles.label}>Họ và tên:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ và tên"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
        editable={false}
      />

      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.primary},
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
