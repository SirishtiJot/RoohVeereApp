import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// ✅ All product data lives here — images use require() safely
const ALL_PRODUCTS = {
  '1': {
    id: '1',
    name: 'Smeksy',
    type: 'For Him',
    prices: { '50 ML': 'PKR 2,490', '100 ML': 'PKR 4,190' },
    image: require('../../assets/smeksy.png'),
    tagline: 'Bold. Daring. Unforgettable.',
    description:
      'Smeksy is a magnetic oriental fragrance crafted for the modern man who commands every room. A seductive blend of dark woods and spice that lingers long after you leave.',
    topNotes: ['Black Pepper', 'Bergamot', 'Cardamom'],
    heartNotes: ['Oud', 'Leather', 'Amber'],
    baseNotes: ['Sandalwood', 'Musk', 'Vetiver'],
    sillage: 'Heavy',
    longevity: '8–12 hrs',
    occasion: 'Evening · Date Night',
  },
  '2': {
    id: '2',
    name: 'Candy Crush',
    type: 'For Her',
    prices: { '50 ML': 'PKR 2,190', '100 ML': 'PKR 3,800' },
    image: require('../../assets/candy_crush.png'),
    tagline: 'Sweet. Playful. Irresistible.',
    description:
      'Candy Crush is a deliciously feminine gourmand fragrance that wraps you in warmth and sweetness. A flirtatious scent for the woman who loves to make an impression.',
    topNotes: ['Raspberry', 'Pink Pepper', 'Lychee'],
    heartNotes: ['Rose', 'Jasmine', 'Caramel'],
    baseNotes: ['Vanilla', 'White Musk', 'Praline'],
    sillage: 'Moderate',
    longevity: '6–8 hrs',
    occasion: 'Daytime · Casual',
  },
  '3': {
    id: '3',
    name: 'Desire',
    type: 'For Him',
    prices: { '50 ML': 'PKR 2,490', '100 ML': 'PKR 4,190' },
    image: require('../../assets/desire.png'),
    tagline: 'Power. Depth. Raw Desire.',
    description:
      'Desire is an intense, smoky aromatic for the man who lives by his own rules. Dark woods and smoky accords create a brooding, powerful aura that defines masculinity.',
    topNotes: ['Grapefruit', 'Ginger', 'Black Pepper'],
    heartNotes: ['Patchouli', 'Cedarwood', 'Smoke'],
    baseNotes: ['Oud', 'Dark Musk', 'Labdanum'],
    sillage: 'Heavy',
    longevity: '10–14 hrs',
    occasion: 'Evening · Formal',
  },
  '4': {
    id: '4',
    name: 'Luna Kiss',
    type: 'For Her',
    prices: { '50 ML': 'PKR 2,190', '100 ML': 'PKR 3,890' },
    image: require('../../assets/luna_kiss.png'),
    tagline: 'Soft. Romantic. Moonlit.',
    description:
      'Luna Kiss is a dreamy floral musk inspired by moonlit gardens. Delicate yet captivating, it traces the skin with petals and warmth, made for the woman who enchants effortlessly.',
    topNotes: ['Peach', 'Magnolia', 'Neroli'],
    heartNotes: ['Rose', 'Peony', 'Iris'],
    baseNotes: ['Sandalwood', 'Cashmere Musk', 'Vanilla'],
    sillage: 'Light',
    longevity: '5–7 hrs',
    occasion: 'All Day · Romantic',
  },
  '5': {
    id: '5',
    name: 'Evergreen',
    type: 'For Him',
    prices: { '50 ML': 'PKR 2,190', '100 ML': 'PKR 3,800' },
    image: require('../../assets/evergreen.png'),
    tagline: 'Fresh. Clean. Timeless.',
    description:
      'Evergreen is a crisp, invigorating aromatic fougère that captures the freshness of a pine forest after rain. A signature scent for the man who values understated elegance.',
    topNotes: ['Eucalyptus', 'Mint', 'Green Apple'],
    heartNotes: ['Pine', 'Geranium', 'Lavender'],
    baseNotes: ['Oakmoss', 'Musk', 'Amber'],
    sillage: 'Moderate',
    longevity: '6–9 hrs',
    occasion: 'Daily · Office',
  },
  '6': {
    id: '6',
    name: 'Florenza',
    type: 'For Her',
    prices: { '50 ML': 'PKR 2,590', '100 ML': 'PKR 4,690' },
    image: require('../../assets/florenza.png'),
    tagline: 'Floral. Lush. Feminine.',
    description:
      'Florenza is a rich, opulent floral bouquet inspired by the gardens of Florence. Layers of blooming roses and jasmine balanced by a warm woody base — elegance in a bottle.',
    topNotes: ['Bergamot', 'Green Leaves', 'Aldehydes'],
    heartNotes: ['Rose', 'Jasmine', 'Tuberose'],
    baseNotes: ['Cedarwood', 'Patchouli', 'Musk'],
    sillage: 'Heavy',
    longevity: '8–12 hrs',
    occasion: 'Evening · Formal',
  },
  '7': {
    id: '7',
    name: 'Crystela',
    type: 'For Her',
    prices: { '50 ML': 'PKR 2,199', '100 ML': 'PKR 3,790' },
    image: require('../../assets/crystela.png'),
    tagline: 'Sheer. Crystalline. Pure.',
    description:
      'Crystela is a luminous, transparent floral with a sparkling quality reminiscent of crystal-clear water. Light, airy and effortlessly refined — the scent of modern femininity.',
    topNotes: ['Citrus', 'Aquatic Notes', 'Freesia'],
    heartNotes: ['White Rose', 'Lily of the Valley', 'Cyclamen'],
    baseNotes: ['White Musk', 'Ambergris', 'Driftwood'],
    sillage: 'Light',
    longevity: '5–7 hrs',
    occasion: 'Daytime · Work',
  },
  '8': {
    id: '8',
    name: 'Waves',
    type: 'For Her',
    prices: { '50 ML': 'PKR 2,399', '100 ML': 'PKR 4,290' },
    image: require('../../assets/waves.png'),
    tagline: 'Aquatic. Free. Boundless.',
    description:
      'Waves captures the spirit of the open ocean — salty breezes, sun-warmed skin and sea spray. An energising, uplifting scent for the woman who moves through life with confidence.',
    topNotes: ['Sea Salt', 'Citrus', 'Ozone'],
    heartNotes: ['Aquatic Florals', 'Violet', 'Coconut'],
    baseNotes: ['Driftwood', 'Musk', 'Amber'],
    sillage: 'Moderate',
    longevity: '6–8 hrs',
    occasion: 'Daytime · Beach · Summer',
  },
};

export default function ProductDescriptionScreen({ route, navigation }) {
  // ✅ Only the id is passed via navigation — image is loaded from ALL_PRODUCTS here
  const { productId } = route.params;
  const product = ALL_PRODUCTS[productId];

  const [selectedSize, setSelectedSize] = useState('50 ML');
const { addToBag } = useCart();
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 40, textAlign: 'center', color: '#888' }}>Product not found.</Text>
      </View>
    );
  }

  const currentPrice = product.prices[selectedSize];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerLogo}>ROOH VEERE</Text>
        <TouchableOpacity style={styles.bagBtn}
        onPress={() => navigation.navigate('CartScreen')}
        >
          <Icon name="bag-handle-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* PRODUCT IMAGE */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image source={product.image} style={styles.productImage} resizeMode="contain" />
          </View>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{product.type.toUpperCase()}</Text>
          </View>
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.infoSection}>
          <Text style={styles.tagline}>{product.tagline}</Text>
          <Text style={styles.productName}>{product.name}</Text>

          {/* SIZE + PRICE */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{currentPrice}</Text>
            <View style={styles.sizeSelector}>
              {Object.keys(product.prices).map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeTab, selectedSize === size && styles.activeSizeTab]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeTabText, selectedSize === size && styles.activeSizeTabText]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* DESCRIPTION */}
          <Text style={styles.sectionLabel}>ABOUT THIS FRAGRANCE</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          {/* FRAGRANCE NOTES */}
          <Text style={styles.sectionLabel}>FRAGRANCE NOTES</Text>
          <View style={styles.notesContainer}>
            <NoteColumn label="TOP NOTES" notes={product.topNotes} icon="leaf-outline" />
            <View style={styles.notesDivider} />
            <NoteColumn label="HEART NOTES" notes={product.heartNotes} icon="flower-outline" />
            <View style={styles.notesDivider} />
            <NoteColumn label="BASE NOTES" notes={product.baseNotes} icon="earth-outline" />
          </View>

          <View style={styles.divider} />

          {/* DETAILS GRID */}
          <Text style={styles.sectionLabel}>DETAILS</Text>
          <View style={styles.detailsGrid}>
            <DetailItem icon="water-outline" label="Sillage" value={product.sillage} />
            <DetailItem icon="time-outline" label="Longevity" value={product.longevity} />
            <DetailItem icon="calendar-outline" label="Occasion" value={product.occasion} />
          </View>
        </View>
      </ScrollView>

 {/* STICKY ADD TO BAG */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity
          style={styles.addToBagBtn}
          activeOpacity={0.8}
          onPress={() => {
            addToBag(product, selectedSize); 
            alert(`${product.name} (${selectedSize}) added to your bag!`);
          }}
        >
          <Icon name="bag-handle-outline" size={16} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.addToBagText}>ADD TO BAG — {currentPrice}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function NoteColumn({ label, notes, icon }) {
  return (
    <View style={styles.noteColumn}>
      <Icon name={icon} size={18} color="#000" style={{ marginBottom: 6 }} />
      <Text style={styles.noteLabel}>{label}</Text>
      {notes.map((note, i) => (
        <Text key={i} style={styles.noteItem}>{note}</Text>
      ))}
    </View>
  );
}[]

function DetailItem({ icon, label, value }) {
  return (
    <View style={styles.detailItem}>
      <Icon name={icon} size={20} color="#000" />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    borderBottomWidth: 1, borderColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  bagBtn: { padding: 4 },
  headerLogo: { fontSize: 18, fontWeight: '300', color: '#000', letterSpacing: 5 },
  imageSection: {
    backgroundColor: '#FAFAFA', alignItems: 'center', paddingVertical: 30, position: 'relative',
  },
  imageWrapper: { width: width * 0.65, height: 260, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '100%', height: '100%' },
  typeBadge: {
    position: 'absolute', bottom: 20, right: 30, backgroundColor: '#000',
    paddingVertical: 4, paddingHorizontal: 12,
  },
  typeBadgeText: { color: '#FFF', fontSize: 9, letterSpacing: 2, fontWeight: '500' },
  infoSection: { paddingHorizontal: 24, paddingTop: 24 },
  tagline: { fontSize: 11, color: '#888', letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' },
  productName: { fontSize: 28, fontWeight: '300', color: '#000', letterSpacing: 2, marginBottom: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  price: { fontSize: 20, fontWeight: '600', color: '#000', letterSpacing: 1 },
  sizeSelector: { flexDirection: 'row', gap: 8 },
  sizeTab: { paddingVertical: 6, paddingHorizontal: 14, borderWidth: 1, borderColor: '#DDD' },
  activeSizeTab: { backgroundColor: '#000', borderColor: '#000' },
  sizeTabText: { fontSize: 11, color: '#666', fontWeight: '500', letterSpacing: 1 },
  activeSizeTabText: { color: '#FFF' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 24 },
  sectionLabel: { fontSize: 10, fontWeight: '600', color: '#000', letterSpacing: 3, marginBottom: 12 },
  description: { fontSize: 13, color: '#555', lineHeight: 22, fontWeight: '300', letterSpacing: 0.3 },
  notesContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#FAFAFA', padding: 20,
  },
  noteColumn: { flex: 1, alignItems: 'center' },
  notesDivider: { width: 1, backgroundColor: '#E8E8E8', marginVertical: 4 },
  noteLabel: { fontSize: 8, fontWeight: '700', color: '#000', letterSpacing: 1.5, marginBottom: 10, textAlign: 'center' },
  noteItem: { fontSize: 11, color: '#555', textAlign: 'center', marginBottom: 4, fontWeight: '300', letterSpacing: 0.3 },
  detailsGrid: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#FAFAFA', padding: 20, marginBottom: 10,
  },
  detailItem: { flex: 1, alignItems: 'center', gap: 6 },
  detailLabel: { fontSize: 9, color: '#888', letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'center', marginTop: 4 },
  detailValue: { fontSize: 11, color: '#000', fontWeight: '500', textAlign: 'center', letterSpacing: 0.3 },
  stickyFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 16,
    borderTopWidth: 1, borderColor: '#F0F0F0',
  },
  addToBagBtn: {
    backgroundColor: '#000', height: 52,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  addToBagText: { color: '#FFF', fontSize: 12, letterSpacing: 2, fontWeight: '500' },
});
