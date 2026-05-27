import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection,addDoc, serverTimestamp } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getCartTotal, setCartItems } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '' });

  const handlePlaceOrder = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      Alert.alert('Details Missing', 'Please fill all the fields to deliver your signature scent.');
      return;
    }
    try{
        const orderRef = await addDoc(collection(db ,"orders"), {
            customerName: form.name,
            customerPhone: form.phone,
            customerAddress: form.address,
            customerCity: form.city,
            cartItems: cartItems, // Aapki cart items ki array (perfumes jo khareede)
            totalAmount: getCartTotal(), // Total bill jo PKR mein bana
            status: "Pending", // Naya order hamesha pending hota hai
         createdAt: serverTimestamp()
        });
    
    
    // Success Dialog
    Alert.alert(
      'Order Confirmed! 👑',
      `Thank you ${form.name},\n\nYour ROOH VEERE order valued at PKR ${getCartTotal().toLocaleString()} has been successfully placed via Cash on Delivery.\n\nExpect delivery within 2-3 working days!`,
      [
        { 
          text: 'Great!', 
          onPress: () => {
            // Order place hone ke baad cart khali kar dein
            if (setCartItems) setCartItems([]); 
            navigation.navigate('Home');
          }
        }
      ]
    );
  }catch (error){
    console.error("Firebase Error: ", error);
    alert("Something went wrong while placing the order. Please try again.");
  }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DELIVERY DETAILS</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.sectionLabel}>SHIPPING ADDRESS</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          placeholderTextColor="#999"
          value={form.name}
          onChangeText={(val) => setForm({...form, name: val})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone Number (e.g., 03001234567)" 
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(val) => setForm({...form, phone: val})}
        />
        <TextInput 
          style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]} 
          placeholder="Complete Street Address, Apartment, Sector" 
          placeholderTextColor="#999"
          multiline
          value={form.address}
          onChangeText={(val) => setForm({...form, address: val})}
        />
        {/* Dynamic City Input Field */}
<TextInput 
  style={styles.input} 
  placeholder="City (e.g., Lahore, Islamabad, Karachi)" 
  placeholderTextColor="#999"
  value={form.city}
  onChangeText={(val) => setForm({...form, city: val})} // 👈 Ab yeh typeable ho gayi hai!
/>

        
        <Text style={[styles.sectionLabel, { marginTop: 25 }]}>PAYMENT METHOD</Text>
        <View style={styles.paymentBox}>
          <Icon name="cash-outline" size={20} color="#000" />
          <Text style={styles.paymentText}>Cash on Delivery (COD)</Text>
          <Icon name="checkmark-circle" size={20} color="#000" style={{ marginLeft: 'auto' }} />
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 30 }]}>FINAL SUMMARY</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLeft}>Total Items</Text>
            <Text style={styles.summaryRight}>{cartItems.length} Products</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLeft}>Delivery Charges</Text>
            <Text style={[styles.summaryRight, { color: 'green', fontWeight: '600' }]}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 12, borderTopWidth: 1, borderColor: '#EEE', paddingTop: 12 }]}>
            <Text style={styles.totalLeft}>Amount to Pay</Text>
            <Text style={styles.totalRight}>PKR {getCartTotal().toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

       
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handlePlaceOrder}>
          <Text style={styles.confirmBtnText}>PLACE ORDER (COD)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 11, fontWeight: '600', letterSpacing: 3, color: '#000' },
  scrollContainer: { padding: 24, paddingBottom: 120 },
  sectionLabel: { fontSize: 9, fontWeight: '600', color: '#000', letterSpacing: 2, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', height: 48, paddingHorizontal: 15, fontSize: 13, color: '#000', marginBottom: 15, borderRadius: 0 },
  paymentBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#000', padding: 15, marginTop: 5 },
  paymentText: { fontSize: 13, fontWeight: '500', marginLeft: 10, letterSpacing: 0.5 },
  summaryBox: { backgroundColor: '#FAFAFA', padding: 15, borderWidth: 1, borderColor: '#F0F0F0' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLeft: { fontSize: 12, color: '#666', fontWeight: '300' },
  summaryRight: { fontSize: 12, color: '#000', fontWeight: '500' },
  totalLeft: { fontSize: 13, color: '#000', fontWeight: '600' },
  totalRight: { fontSize: 16, color: '#000', fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 16, borderTopWidth: 1, borderColor: '#F0F0F0' },
  confirmBtn: { backgroundColor: '#000', height: 50, justifyContent: 'center', alignItems: 'center' },
  confirmBtnText: { color: '#FFF', fontSize: 11, fontWeight: '600', letterSpacing: 2 }
});