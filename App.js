import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './screens/AccountScreen';
import ToolsScreen from './screens/ToolScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ff5a00',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        }}
      >
        <Tab.Screen
          name="Profile"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color: color, fontSize: size }}>👤</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Tools"
          component={ToolsScreen}
          options={{
            tabBarLabel: 'Công cụ',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color: color, fontSize: size }}>🛠️</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
