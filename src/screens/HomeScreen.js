import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  FlatList,
  TextInput,
  Image 
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Card Width Calculation (Responsive for 2 columns)
const CARD_WIDTH = (width - 50) / 2;

// 📸 LOCAL HERO SLIDES IMAGES
const HERO_SLIDES = [
  { id: '1', subtitle: 'EXCLUSIVELY ELEGANT', title: 'FOR HER\nCollection', image: require('../../assets/slide1.jpg') }, 
  { id: '2', subtitle: 'BOLD & INTENSE', title: 'FOR HIM\nCollection', image: require('../../assets/slide2.jpg') }, 
  { id: '3', subtitle: 'JUST DROPPED', title: 'NEW ARRIVALS\nFresh Scents', image: require('../../assets/slide3.png') }, 
  { id: '4', subtitle: 'LIMITED TIME OFFERS', title: 'THE DEAL BOX\nExclusive Bundles', image: require('../../assets/slide4.jpg') },
];

// 📸 LOCAL PRODUCT IMAGES
const LUXURY_PRODUCTS = [
  { id: '1', name: 'Smeksy', type: 'For Him', prices: { '50 ML': 'PKR 2,490', '100 ML': 'PKR 4,190' }, image: require('../../assets/smeksy.png') },
  { id: '2', name: 'Candy Crush', type: 'For Her', prices: { '50 ML': 'PKR 2,190', '100 ML': 'PKR 3,800' }, image: require('../../assets/candy_crush.png') },
  { id: '3', name: 'Desire', type: 'For Him', prices: { '50 ML': 'PKR 2,490', '100 ML': 'PKR 4,190' }, image: require('../../assets/desire.png') },
  { id: '4', name: 'Luna Kiss', type: 'For Her', prices: { '50 ML': 'PKR 2,190 ', '100 ML': 'PKR 3,890' }, image: require('../../assets/luna_kiss.png') },
  { id: '5', name: 'Evergreen', type: 'For Him', prices: { '50 ML': 'PKR 2,190', '100 ML': 'PKR 3,800' }, image: require('../../assets/evergreen.png') },
  { id: '6', name: 'Florenza', type: 'For Her', prices: { '50 ML': 'PKR 2,590', '100 ML': 'PKR 4,690' }, image: require('../../assets/florenza.png') }, 
  { id: '7', name: 'Crystela', type: 'For Her', prices: { '50 ML': 'PKR 2,199 ', '100 ML': 'PKR 3,790' }, image: require('../../assets/crystela.png') },
  { id: '8', name: 'Waves', type: 'For Her', prices: { '50 ML': 'PKR 2,399', '100 ML': 'PKR 4,290' }, image: require('../../assets/waves.png') }, 
];

// ✅ Added `navigation` prop
export default function HomeScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');   
  const { addToBag } = useCart();
  const [productSizes, setProductSizes] = useState({
    '1': '50 ML', '2': '50 ML', '3': '50 ML', '4': '50 ML',
    '5': '50 ML', '6': '50 ML', '7': '50 ML', '8': '50 ML'
  });

  const flatListRef = useRef(null); 
  const indexRef = useRef(0);       

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < HERO_SLIDES.length - 1) { indexRef.current += 1; } 
      else { indexRef.current = 0; }
      flatListRef.current?.scrollToIndex({ index: indexRef.current, animated: true });
      setActiveIndex(indexRef.current);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
    indexRef.current = index; 
  };

  const changeSize = (productId, size) => {
    setProductSizes(prev => ({ ...prev, [productId]: size }));
  };

  const filteredProducts = LUXURY_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SLIDESHOW CARD RENDER
  const renderHeroSlide = ({ item }) => (
    <View style={styles.heroSlide}>
      <View style={styles.heroCard}>
        <Image source={item.image} style={styles.heroImageStyle} resizeMode="cover" />
        <View style={styles.heroTextOverlay}>
          <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>EXPLORE NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // PRODUCT CARD RENDER
  const renderProductItem = ({ item }) => {
    const currentSize = productSizes[item.id]; 
    const currentPrice = item.prices[currentSize]; 

    return (
      // ✅ Wrap entire card in TouchableOpacity to navigate on tap
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProductDescription', { productId: item.id })}
      >
        {/* 🛠️ Safe Physical Image Container */}
        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.productImage} 
            resizeMode="contain" 
          />
        </View>

        <Text style={styles.pType}>{item.type}</Text>
        <Text style={styles.pName}>{item.name}</Text>
        <Text style={styles.pPrice}>{currentPrice}</Text>

        <View style={styles.sizeSelectorContainer}>
          <TouchableOpacity 
            style={[styles.sizeTab, currentSize === '50 ML' && styles.activeSizeTab]} 
            onPress={(e) => { e.stopPropagation(); changeSize(item.id, '50 ML'); }}
          >
            <Text style={[styles.sizeTabText, currentSize === '50 ML' && styles.activeSizeTabText]}>50ML</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.sizeTab, currentSize === '100 ML' && styles.activeSizeTab]} 
            onPress={(e) => { e.stopPropagation(); changeSize(item.id, '100 ML'); }}
          >
            <Text style={[styles.sizeTabText, currentSize === '100 ML' && styles.activeSizeTabText]}>100ML</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
  style={styles.addBtn} 
  onPress={() => {
    addToBag(item, currentSize); // 👈 Real add function
    alert(`${item.name} (${currentSize}) added to bag!`);
  }}
>
  <Text style={styles.addBtnText}>ADD TO BAG</Text>
</TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     {/* HEADER */}
      <View style={styles.headerBar}>
        <TouchableOpacity>
          <Icon name="menu-sharp" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerLogo}>ROOH VEERE</Text>
        
        <View style={styles.headerRightIcons}>
          {/* Search Button */}
          <TouchableOpacity 
            onPress={() => { setShowSearch(!showSearch); setSearchQuery(''); }} 
            style={{ marginRight: 15 }}
          >
            <Icon name={showSearch ? "close-sharp" : "search-sharp"} size={23} color="#000" />
          </TouchableOpacity>
          
          {/* Bag / Cart Button */}
          <TouchableOpacity
            style={styles.bagBtn}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <Icon name="bag-handle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

      </View>
      {/* SEARCH BAR */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search our luxury scents..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            autoFocus={true}
          />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HERO SLIDESHOW */}
        <View style={styles.sliderContainer}>
          <FlatList 
            ref={flatListRef} 
            data={HERO_SLIDES}
            renderItem={renderHeroSlide}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.pagination}>
            {HERO_SLIDES.map((_, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: i === activeIndex ? '#000' : '#DDD', width: i === activeIndex ? 16 : 8 }]} />
            ))}
          </View>
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>SELECT COLLECTION</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.catCardBlack}>
            <Icon name="man-outline" size={24} color="#FFF" />
            <Text style={styles.catTextWhite}>FOR HIM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.catCardWhite}>
            <Icon name="woman-outline" size={24} color="#000" />
            <Text style={styles.catTextBlack}>FOR HER</Text>
          </TouchableOpacity>
        </View>

        {/* PRODUCT GRID */}
        <Text style={styles.sectionTitle}>
          {searchQuery ? `SEARCH RESULTS (${filteredProducts.length})` : `EXCLUSIVES (${LUXURY_PRODUCTS.length})`}
        </Text>
        
        {filteredProducts.length > 0 ? (
          <FlatList 
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false} 
            columnWrapperStyle={styles.gridRow}
            style={styles.listWrapper}
          />
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No fragrances match your search.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  headerLogo: { fontSize: 20, fontWeight: '300', color: '#000', letterSpacing: 5, marginLeft: 25 },
  headerRightIcons: { flexDirection: 'row', alignItems: 'center' },
  searchBarContainer: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F5F5F5' },
  searchInput: { height: 40, borderWidth: 1, borderColor: '#000', paddingHorizontal: 15, fontSize: 13, color: '#000', letterSpacing: 1, fontWeight: '300' },
  noResultContainer: { alignItems: 'center', paddingVertical: 40 },
  noResultText: { color: '#888', fontSize: 13, letterSpacing: 1 },
  
  sliderContainer: { marginTop: 10 },
  heroSlide: { width: width, alignItems: 'center' },
  heroCard: { backgroundColor: '#111', width: width - 40, height: 160, position: 'relative', overflow: 'hidden' },
  heroImageStyle: { position: 'absolute', width: '100%', height: '100%', opacity: 0.6 }, 
  heroTextOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 2, padding: 20 },
  heroSubtitle: { fontSize: 10, color: '#DDD', letterSpacing: 3, marginBottom: 8 },
  heroTitle: { fontSize: 22, fontWeight: '300', color: '#FFF', letterSpacing: 2, marginBottom: 20, textAlign: 'center', lineHeight: 30 },
  heroBtn: { borderWidth: 1, borderColor: '#FFF', paddingVertical: 10, paddingHorizontal: 20 },
  heroBtnText: { color: '#FFF', fontSize: 11, letterSpacing: 2 },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  dot: { height: 8, borderRadius: 4, marginHorizontal: 4 },
  
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#000', letterSpacing: 3, marginLeft: 20, marginTop: 25, marginBottom: 15 },
   categoryContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 25 },
  catCardBlack: { width: CARD_WIDTH, height: 90, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  catCardWhite: { width: CARD_WIDTH, height: 90, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' },
  catTextWhite: { color: '#FFF', fontSize: 12, fontWeight: '500', letterSpacing: 2, marginTop: 6 },
  catTextBlack: { color: '#000', fontSize: 12, fontWeight: '500', letterSpacing: 2, marginTop: 6 },
  listWrapper: { paddingHorizontal: 10 },
  gridRow: { justifyContent: 'space-between', paddingHorizontal: 10 },
  
  /* 🛠️ UPDATED CRITICAL STYLING FOR PRODUCT IMAGES */
  productCard: { backgroundColor: '#FFF', width: CARD_WIDTH, marginBottom: 25, padding: 10, borderWidth: 1, borderColor: '#F0F0F0' },
  imageContainer: { width: '100%', height: 140, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  productImage: { width: CARD_WIDTH - 20, height: 140 },

  pType: { fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: 1 },
  pName: { fontSize: 14, color: '#000', fontWeight: '400', marginTop: 2, marginBottom: 4 },
  pPrice: { fontSize: 13, color: '#000', fontWeight: '600', marginBottom: 10 },
  sizeSelectorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sizeTab: { flex: 1, height: 26, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginHorizontal: 2 },
  activeSizeTab: { backgroundColor: '#000', borderColor: '#000' }, 
  sizeTabText: { fontSize: 9, color: '#666', fontWeight: '500' },
  activeSizeTabText: { color: '#FFF' }, 
  addBtn: { backgroundColor: '#000', height: 38, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#FFF', fontSize: 10, letterSpacing: 1.5, fontWeight: '500' },
});
