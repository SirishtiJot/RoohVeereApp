// src/screens/GuestLoginScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function GuestLoginScreen({ navigation }) {

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoHome = () => {
  navigation.navigate('Home');
};

  return (
    <View style={styles.container}>

      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>👤</Text>
      </View>

      <Text style={styles.title}>Welcome, Guest!</Text>
      <Text style={styles.subtitle}>
        You're browsing as a guest. Some features may be limited.
        Create an account anytime to unlock the full experience.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={handleGoHome}>
        <Text style={styles.primaryButtonText}>Browse as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleGoBack}>
        <Text style={styles.secondaryButtonText}>← Back to Create Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0EAFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#6C3FCF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6C3FCF',
    fontSize: 15,
    fontWeight: '600',
  },
});