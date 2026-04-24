import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../src/constants/colors";
import {
  FontSize,
  LetterSpacing,
  FontFamily,
} from "../src/constants/typography";
import { store } from "../src/redux/store";

export default function SplashIndex() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.55)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(24)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo springs in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 55,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // 2. Brand text slides up
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 480,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 480,
          useNativeDriver: true,
        }),
      ]),
      // 3. Tagline fades
      Animated.timing(tagOpacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      // 4. Hold, then navigate
      Animated.delay(900),
    ]).start(() => {
      // Check auth state from Redux
      const state = store.getState();
      const { isAuthenticated, user } = state.auth;

      if (!isAuthenticated) {
        router.replace("/(auth)/login");
      } else if (user && !user.is_verified) {
        router.replace("/(auth)/verify-identity");
      } else if (user && !user.onboarding_completed) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(tabs)");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 280, height: 280, resizeMode: "contain" }}
        />
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
        Empowering Leaders, Elevating Teams, Igniting Purpose
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoWrap: {
    marginBottom: 10,
    alignItems: "center",
  },
  textWrap: {
    alignItems: "center",
    marginBottom: 14,
  },
  brandName: {
    color: Colors.white,
    fontSize: FontSize["4xl"],
    fontWeight: "700",
    letterSpacing: LetterSpacing.widest,
    textAlign: "center",
    marginBottom: 5,
  },
  brandSub: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: "400",
    letterSpacing: LetterSpacing.wider,
    textAlign: "center",
  },
  tagline: {
    color: Colors.accent,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
