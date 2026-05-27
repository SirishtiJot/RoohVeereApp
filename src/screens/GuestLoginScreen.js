// src/screens/GuestLoginScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

export default function GuestLoginScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        {/* BRAND */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>ROOH VEERE</Text>
          <Text style={styles.brandTagline}>GUEST ACCESS</Text>
        </View>

        {/* ICON */}
        <View style={styles.iconWrapper}>
          <Icon name="person-outline" size={38} color="#888" />
        </View>

        {/* HEADING */}
        <Text style={styles.title}>Welcome, Guest</Text>
        <Text style={styles.subtitle}>
          You're browsing as a guest. Some features may be limited.
          Create an account anytime to unlock the full experience.
        </Text>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>continue</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* PRIMARY BUTTON */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryBtnText}>BROWSE AS GUEST</Text>
        </TouchableOpacity>

        {/* SECONDARY BUTTON */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.secondaryBtnText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>

        {/* SIGN IN LINK */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },

  backBtn: { position: 'absolute', top: 54, left: 20, padding: 4, zIndex: 10 },

  brandContainer: { alignItems: 'center', marginBottom: 36, marginTop: 20 },
  brandName: { fontSize: 26, fontWeight: '300', color: '#FFF', letterSpacing: 10, marginBottom: 10 },
  brandTagline: { fontSize: 10, color: '#888', letterSpacing: 4, textTransform: 'uppercase' },

  iconWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#1E1E1E',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FFF',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.4,
    marginBottom: 32,
    fontWeight: '300',
  },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#2A2A2A' },
  dividerText: { marginHorizontal: 12, color: '#555', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },

  primaryBtn: {
    backgroundColor: '#FFF',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryBtnText: { color: '#000', fontSize: 13, fontWeight: '600', letterSpacing: 4 },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#333',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  secondaryBtnText: { color: '#888', fontSize: 12, letterSpacing: 3 },

  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: '#666', fontSize: 13 },
  loginLink: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});
