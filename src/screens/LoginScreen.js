import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const showAlert = (title, message, onConfirm) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    if (onConfirm) onConfirm();
  } else {
    Alert.alert(title, message, onConfirm ? [{ text: 'OK', onPress: onConfirm }] : undefined);
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    navigation.replace('Home');
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

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
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
  loginBtnText: { color: '#000', fontSize: 13, fontWeight: '600', letterSpacing: 4 },
  guestBtn: { alignItems: 'center', marginBottom: 30 },
  guestText: { color: '#FFF', fontSize: 13, letterSpacing: 1, textDecorationLine: 'underline' },
  createRow: { flexDirection: 'row', justifyContent: 'center' },
  createText: { color: '#666', fontSize: 13 },
  createLink: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});
