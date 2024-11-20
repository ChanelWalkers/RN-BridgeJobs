// store/context/user-context.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo Context với giá trị mặc định
const UserContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// Provider cho UserContext
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm đăng nhập
  const login = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  // Tải dữ liệu người dùng từ AsyncStorage khi component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng UserContext
export const useUser = () => useContext(UserContext);

// Export mặc định cho Provider
export default UserContextProvider;
