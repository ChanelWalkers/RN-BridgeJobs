import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './navigation/MainNavigator';
import FavoritesContextProvider from './store/context/favorite-context';


export default function App() {
  return (
    <FavoritesContextProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </FavoritesContextProvider>
  );
}
