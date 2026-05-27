import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartCard}>
      <View style={styles.imageBox}>
        <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      </View>
      
      <View style={styles.infoBox}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.pName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id, item.size)}>
            <Icon name="close-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <Text style={styles.pDetails}>{item.type} · {item.size}</Text>
        
        <View style={styles.cardFooterRow}>
          {/* Quantity Selectors */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.size, 'decrease')}>
              <Icon name="remove" size={14} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.size, 'increase')}>
              <Icon name="add" size={14} color="#000" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.pPrice}>PKR {(item.price * item.quantity).toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR BAG ({cartItems.length})</Text>
        <View style={{ width: 22 }} /> 
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 15, paddingBottom: 150 }}
            showsVerticalScrollIndicator={false}
          />

          {/* TOTAL & BILLING FOOTER */}
          <View style={styles.footer}>
            <View style={styles.priceSummaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>PKR {getCartTotal().toLocaleString()}</Text>
            </View>
            <View style={styles.priceSummaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>FREE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceSummaryRow}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalValue}>PKR {getCartTotal().toLocaleString()}</Text>
            </View>

            <TouchableOpacity 
              style={styles.checkoutBtn} 
              onPress={() => navigation.navigate('CheckoutScreen')}
            >
              <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
              <Icon name="arrow-forward" size={16} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="bag-handle-outline" size={60} color="#CCC" />
          <Text style={styles.emptyText}>Your shopping bag is empty.</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopBtnText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 12, fontWeight: '600', letterSpacing: 3, color: '#000' },
  
  cartCard: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#F5F5F5', alignItems: 'center' },
  imageBox: { width: 80, height: 95, backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', padding: 5 },
  cardImage: { width: '100%', height: '100%' },
  infoBox: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pName: { fontSize: 16, fontWeight: '400', color: '#000', letterSpacing: 0.5 },
  pDetails: { fontSize: 11, color: '#888', marginTop: 2, letterSpacing: 0.5 },
  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  
  quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  qtyBtn: { width: 28, height: 26, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  qtyText: { fontSize: 12, fontWeight: '500', paddingHorizontal: 10 },
  pPrice: { fontSize: 14, fontWeight: '600', color: '#000' },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontSize: 14, color: '#888', marginTop: 15, marginBottom: 25, letterSpacing: 0.5, fontWeight: '300' },
  shopBtn: { backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 30 },
  shopBtnText: { color: '#FFF', fontSize: 11, fontWeight: '600', letterSpacing: 2 },
  
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 20, borderTopWidth: 1, borderColor: '#F0F0F0', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 5 },
  priceSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 12, color: '#666', fontWeight: '300' },
  summaryValue: { fontSize: 12, color: '#000', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  totalLabel: { fontSize: 13, color: '#000', fontWeight: '600', letterSpacing: 0.5 },
  totalValue: { fontSize: 16, color: '#000', fontWeight: '700' },
  checkoutBtn: { backgroundColor: '#000', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  checkoutText: { color: '#FFF', fontSize: 11, fontWeight: '600', letterSpacing: 2 }
});