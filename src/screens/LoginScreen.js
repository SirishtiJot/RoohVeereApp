import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.replace('Home');
    } else {
      alert('Please enter your email and password.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        
        {/* Top Minimalist Brand Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>ROOH VEERE</Text>
          <Text style={styles.subtitle}>Sign in to experience luxury</Text>
        </View>

        {/* Input Fields Container */}
        <View style={styles.formContainer}>
          
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={20} color="#969494" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Email Address" 
              placeholderTextColor="#cac8c8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#cac8c8"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Skip / Browse as Guest */}
          <TouchableOpacity style={styles.guestBtn} onPress={() => alert('Guest login feature.')}>
            <Text style={styles.guestText}>Login as Guest</Text>
          </TouchableOpacity>

        </View>

        {/* Footer Design Element */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? <Text style={styles.signupText}>Create One</Text></Text>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1A1A1A',
    letterSpacing: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#1A1A1A', 
    letterSpacing: 2,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', 
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 8,
    height: 55,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#888',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#1A1A1A', 
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#f7f5f5',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 3,
  },
  guestBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  guestText: {
    color: '#1A1A1A',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signupText: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
});