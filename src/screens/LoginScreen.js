import React, { useState, useEffect } from 'react';
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
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

const SAVED_EMAIL_KEY    = '@roohveere_saved_email';
const SAVED_PASSWORD_KEY = '@roohveere_saved_password';

const showAlert = (title, message, onConfirm) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    if (onConfirm) onConfirm();
  } else {
    Alert.alert(title, message, onConfirm ? [{ text: 'OK', onPress: onConfirm }] : undefined);
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const savedEmail    = await AsyncStorage.getItem(SAVED_EMAIL_KEY);
        const savedPassword = await AsyncStorage.getItem(SAVED_PASSWORD_KEY);
        if (savedEmail)    setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch (_) {}
    };
    loadSaved();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      // Direct Sign In (Firebase email/password dono khud check kar lega)
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // Save credentials on success
      await AsyncStorage.setItem(SAVED_EMAIL_KEY, email.trim());
      await AsyncStorage.setItem(SAVED_PASSWORD_KEY, password);

      navigation.replace('Home');

    } catch (error) {
      console.log('Firebase auth error:', error.code, error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          showAlert('Account Not Found', 'No account exists with this email. Please create an account first.');
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          showAlert('Wrong Password', 'The email or password you entered is incorrect. Please try again.');
          break;
        case 'auth/invalid-email':
          showAlert('Invalid Email', 'Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          showAlert('Too Many Attempts', 'Account temporarily locked due to too many failed attempts. Reset your password or try again later.');
          break;
        case 'auth/network-request-failed':
          showAlert('No Internet', 'Please check your internet connection and try again.');
          break;
        default:
          showAlert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showAlert('Enter Email', 'Type your email address above first, then tap Forgot Password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      showAlert('Email Sent', `A password reset link has been sent to ${email.trim()}.`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        showAlert('Account Not Found', 'No account exists with this email address.');
      } else {
        showAlert('Error', 'Could not send reset email. Please try again.');
      }
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
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>ROOH VEERE</Text>
          <Text style={styles.brandTagline}>SIGN IN TO EXPERIENCE LUXURY</Text>
        </View>

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

        <View style={styles.inputWrapper}>
          <Icon name="lock-closed-outline" size={18} color="#888" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
            <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotBtn} onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.loginBtnText}>LOGIN</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestBtn} onPress={() => navigation.navigate('GuestLogin')}>
          <Text style={styles.guestText}>Login as Guest</Text>
        </TouchableOpacity>

        <View style={styles.createRow}>
          <Text style={styles.createText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.createLink}>Create One</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  inner: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 60 },
  brandContainer: { alignItems: 'center', marginBottom: 50 },
  brandName: { fontSize: 28, fontWeight: '300', color: '#FFF', letterSpacing: 10, marginBottom: 10 },
  brandTagline: { fontSize: 10, color: '#888', letterSpacing: 4, textTransform: 'uppercase' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 14, paddingHorizontal: 14, height: 54,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#FFF', fontSize: 14, fontWeight: '300', letterSpacing: 0.5 },
  eyeBtn: { padding: 4 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#888', fontSize: 12, letterSpacing: 1 },
  loginBtn: { backgroundColor: '#FFF', height: 54, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  loginBtnDisabled: { backgroundColor: '#555' },
  loginBtnText: { color: '#000', fontSize: 13, fontWeight: '600', letterSpacing: 4 },
  guestBtn: { alignItems: 'center', marginBottom: 30 },
  guestText: { color: '#FFF', fontSize: 13, letterSpacing: 1, textDecorationLine: 'underline' },
  createRow: { flexDirection: 'row', justifyContent: 'center' },
  createText: { color: '#666', fontSize: 13 },
  createLink: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});