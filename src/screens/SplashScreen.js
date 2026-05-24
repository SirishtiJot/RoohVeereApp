import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

// Droplets helper
const createPerfumeDroplets = (numDroplets) => {
  let droplets = [];
  for (let i = 0; i < numDroplets; i++) {
    const size = Math.random() * 8 + 2.8;
    droplets.push(
      <View
        key={i}
        style={[
          styles.droplet,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            top: Math.random() * 110 - 10,
            left: Math.random() * 200 - 100,
            opacity: Math.random() * 0.7 + 0.2
          }
        ]}
      />
    );
  }
  return droplets;
};

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  
  const sprayOpacity = useRef(new Animated.Value(0)).current;
  const sprayY = useRef(new Animated.Value(-100)).current; 
  const sprayScale = useRef(new Animated.Value(0.7)).current;
  
  const textOpacity = useRef(new Animated.Value(0)).current;

  // Sound Object Reference hold karne ke liye
  const playbackInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    // 1. AUDIO PRE-LOAD: App khulte hi background mein sound load kar lo
    async function setupAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/spray.m4a')
        );
        playbackInstance.current = sound;
      } catch (e) {
        console.log("Audio load error:", e);
      }
    }

    setupAudio();

    // 2. LOGO ANIMATION: Logo smoothly fade-in hoga
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 900, useNativeDriver: true }),
    ]).start();

    // 3. SYNCHRONIZED SPRAY & SOUND: 1.2 seconds par dono SAATH CHALENGE
    setTimeout(async () => {
      if (!isMounted) return;

      // Sound play karo (Pre-loaded hai toh bina delay ke turant chalega)
      if (playbackInstance.current) {
        try {
          await playbackInstance.current.playAsync();
        } catch (err) {
          console.log(err);
        }
      }
      
      // Droplets Drop Animation (Sound ke exact sath start)
      Animated.parallel([
        Animated.timing(sprayOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(sprayY, { toValue: 70, duration: 800, useNativeDriver: true }), 
        Animated.timing(sprayScale, { toValue: 1.3, duration: 900, useNativeDriver: true }), 
      ]).start(() => {
        Animated.timing(sprayOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start();
      });

      // 🔥 STRICT AUDIO CROP: 1.1 seconds baad sound har haal mein stop ho jaye
      setTimeout(async () => {
        if (playbackInstance.current) {
          try {
            await playbackInstance.current.stopAsync();
          } catch (e) {}
        }
      }, 1100);

    }, 1200);

    // 4. TEXT SEQUENCE: Spray ginte hi brand name chamkega
    setTimeout(() => {
      if (isMounted) {
        Animated.timing(textOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
      }
    }, 1900);

    // 5. AUTO-NAVIGATION: 4.8 seconds baad smoothly login par jao
    setTimeout(async () => {
      if (isMounted && navigation) {
        // Safe check: Login screen par jaane se pehle sound ko completely unload kar do
        if (playbackInstance.current) {
          try {
            await playbackInstance.current.unloadAsync();
          } catch (e) {}
        }
        navigation.replace('Login');
      }
    }, 4800);

    return () => {
      isMounted = false;
      if (playbackInstance.current) {
        playbackInstance.current.unloadAsync();
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      {/* 1. REAL BRAND LOGO */}
      <Animated.View style={[styles.logoWrapper, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.realLogoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* 2. DROPLET SPRAY */}
      <Animated.View style={[
        styles.sprayContainer, 
        { opacity: sprayOpacity, transform: [{ translateY: sprayY }, { scale: sprayScale }] }
      ]}>
        {createPerfumeDroplets(60)}
      </Animated.View>

      {/* 3. BRAND TYPOGRAPHY */}
      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.brandName}>ROOH VEERE</Text>
        <Text style={styles.tagline}>by Srishti Chhabria</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' },
  logoWrapper: { position: 'absolute', top: height * 0.28, alignItems: 'center', zIndex: 10 },
  realLogoImage: { width: width * 0.45, height: width * 0.45 },
  sprayContainer: { position: 'absolute', top: height * 0.20, alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  droplet: { position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.45)' },
  textContainer: { position: 'absolute', bottom: height * 0.20, alignItems: 'center' },
  brandName: { fontSize: 34, fontWeight: '300', color: '#FFF', letterSpacing: 10 },
  tagline: { fontSize: 11, color: '#fcfcfc', letterSpacing: 4, marginTop: 12, textTransform: 'uppercase' },
});