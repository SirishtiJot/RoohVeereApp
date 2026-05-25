import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import GuestLoginScreen from './src/screens/GuestLoginScreen';
import ProductDescriptionScreen from './src/screens/ProductDescriptionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Create Account Screen */}
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="GuestLogin" component={GuestLoginScreen} />

        {/* Product Description Screen */}
        <Stack.Screen name="ProductDescription" component={ProductDescriptionScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}