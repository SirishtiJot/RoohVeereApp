import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const showAlert = (title, message, onConfirm) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    if (onConfirm) onConfirm();
  } else {
    Alert.alert(title, message, onConfirm ? [{ text: 'Continue', onPress: onConfirm }] : undefined);
  }
};

const getFirebaseError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { title: 'Email Already Registered', message: 'An account with this email already exists. Please sign in instead.' };
    case 'auth/invalid-email':
      return { title: 'Invalid Email', message: 'Please enter a valid email address.' };
    case 'auth/weak-password':
      return { title: 'Weak Password', message: 'Password must be at least 6 characters long.' };
    case 'auth/network-request-failed':
      return { title: 'No Internet', message: 'Please check your internet connection and try again.' };
    default:
      return { title: 'Registration Failed', message: 'Something went wrong. Please try again.' };
  }
};

export default function CreateAccountScreen({ navigation }) {
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleCreateAccount = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please fill in all fields before continuing.');
      return;
    }
    if (!email.includes('@')) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      showAlert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // Save display name to Firebase profile
      await updateProfile(userCredential.user, { displayName: name.trim() });
      
      showAlert(
        'Account Created!',
        `Welcome, ${name.trim()}! Your account has been created successfully.`,
        () => navigation.replace('Home')
      );
    } catch (error) {
      const { title, message } = getFirebaseError(error.code);
      showAlert(title, message);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.brandTagline}>CREATE YOUR ACCOUNT</Text>
        </View>

        {/* FULL NAME */}
        <View style={styles.inputWrapper}>
          <Icon name="person-outline" size={18} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputWrapper}>
          <Icon name="mail-outline" size={18} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>
          <Icon name="lock-closed-outline" size={18} color="#888" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password (min. 6 characters)"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
            <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color="#888" />
          </TouchableOpacity>
        </View>

        {/* CREATE BUTTON */}
        <TouchableOpacity
          style={[styles.createBtn, loading && styles.createBtnDisabled]}
          onPress={handleCreateAccount}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.createBtnText}>CREATE ACCOUNT</Text>
          }
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* GUEST */}
        <TouchableOpacity
          style={styles.guestBtn}
          onPress={() => navigation.navigate('GuestLogin')}
        >
          <Text style={styles.guestBtnText}>CONTINUE AS GUEST</Text>
        </TouchableOpacity>

        {/* ALREADY HAVE ACCOUNT */}
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
  inner: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 60 },
  backBtn: { position: 'absolute', top: 54, left: 20, padding: 4, zIndex: 10 },
  brandContainer: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  brandName: { fontSize: 26, fontWeight: '300', color: '#FFF', letterSpacing: 10, marginBottom: 10 },
  brandTagline: { fontSize: 10, color: '#888', letterSpacing: 4, textTransform: 'uppercase' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 14, paddingHorizontal: 14, height: 54,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#FFF', fontSize: 14, fontWeight: '300', letterSpacing: 0.5 },
  eyeBtn: { padding: 4 },
  createBtn: {
    backgroundColor: '#FFF', height: 54, justifyContent: 'center',
    alignItems: 'center', marginTop: 10, marginBottom: 24,
  },
  createBtnDisabled: { backgroundColor: '#555' },
  createBtnText: { color: '#000', fontSize: 13, fontWeight: '600', letterSpacing: 4 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#2A2A2A' },
  dividerText: { marginHorizontal: 12, color: '#555', fontSize: 13 },
  guestBtn: {
    borderWidth: 1, borderColor: '#333', height: 54,
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
  },
  guestBtnText: { color: '#888', fontSize: 12, letterSpacing: 3 },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: '#666', fontSize: 13 },
  loginLink: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});