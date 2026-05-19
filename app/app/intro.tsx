import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Clock, ArrowRight } from "lucide-react-native";
import Colors from "../src/constants/colors";
import { FontFamily } from "../src/constants/typography";

const { width, height } = Dimensions.get("window");

export default function IntroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const handlePressNext = () => {
    if (activeIndex === 0) {
      flatListRef.current?.scrollToIndex({ index: 1, animated: true });
      setActiveIndex(1);
    } else {
      if (agreed) {
        router.push({
          pathname: "/personal-info",
          params: { ...params },
        });
      }
    }
  };

  const onMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  const slides = [
    {
      key: "step1",
      content: (
        <View style={styles.slide}>
          <Text style={styles.overline}>ENGINEERED RESILIENCE</Text>

          <Text style={styles.title}>
            Peak <Text style={styles.titleAccent}>Human</Text>
            {"\n"}Output.
          </Text>

          <Text style={styles.paragraph}>
            Harness high-precision data to strengthen your health, fortify your
            resilience, and unlock elite performance metrics.
          </Text>

          <View style={styles.timeInfoContainer}>
            <Text style={styles.timeText}>
              To calculate we need information{"\n"}from you it will take
            </Text>
            <View style={styles.timeBadge}>
              <Clock color="#6B7280" size={16} style={styles.clockIcon} />
              <Text style={styles.timeBadgeText}>4 min</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      key: "step2",
      content: (
        <View style={styles.slide}>
          <Text style={styles.overline}>IMPORTANT NOTICE</Text>

          <Text style={styles.title}>
            Health <Text style={styles.titleAccent}>Disclaimer</Text>
          </Text>

          <Text style={styles.paragraph}>
            Dominion Wellness Solutions is a performance optimization and general wellness tracking application. It is NOT a medical device, does not provide medical diagnostics, clinical advice, or treatment, and should not be used as a substitute for professional medical judgment.{"\n\n"}
            Always consult a physician or qualified healthcare provider before initiating any new health, fitness, or nutritional regimens.
          </Text>

          <View style={styles.consentRow}>
            <TouchableOpacity 
              style={[styles.checkbox, agreed && styles.checkboxChecked]} 
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.8}
            >
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.consentTextContainer}>
              <Text style={styles.consentText}>
                I agree to the{" "}
                <Text style={styles.linkText} onPress={() => router.push("/terms")}>Terms</Text>
                {" & "}
                <Text style={styles.linkText} onPress={() => router.push("/privacy")}>Privacy Policy</Text>
                {" and acknowledge this health disclaimer."}
              </Text>
            </View>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header Section */}
      <View style={styles.headerBlock}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/singleLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.logoTextWrap}>
            <Text style={styles.logoText}>DOMINION</Text>
            <Text style={styles.logoText}>WELLNESS</Text>
            <Text style={styles.logoText}>SOLUTIONS</Text>
          </View>
        </View>

        <Text style={styles.tagline}>
          Empowering Leaders. Elevating Teams. Igniting Purpose.
        </Text>
      </View>

      {/* Content Section (FlatList with onboarding slides) */}
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={({ item }) => (
            <View style={styles.slideWrapper}>{item.content}</View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          keyExtractor={(item) => item.key}
        />
      </View>

      {/* Persistent Footer with dots indicator and main action button */}
      <View style={styles.footerContainer}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
          <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
        </View>

        <TouchableOpacity 
          style={[
            styles.btnPrimary, 
            activeIndex === 1 && !agreed && styles.btnDisabled
          ]}
          onPress={handlePressNext}
          disabled={activeIndex === 1 && !agreed}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>
            {activeIndex === 0 ? "CONTINUE" : "AGREE & START"}
          </Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  headerBlock: {
    backgroundColor: Colors.primary,
    height: height * 0.35,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logo: {
    width: 55,
    height: 75,
    marginRight: 16,
    tintColor: Colors.accent,
  },
  logoTextWrap: {
    justifyContent: "center",
  },
  logoText: {
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: 1.5,
  },
  tagline: {
    fontFamily: FontFamily.medium,
    color: Colors.accent,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  slideWrapper: {
    width: width,
    paddingHorizontal: 24,
  },
  slide: {
    flex: 1,
  },
  overline: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: "#00A896",
    letterSpacing: 1.5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: "#2C3E50",
    lineHeight: 38,
    marginBottom: 16,
  },
  titleAccent: {
    color: "#00A896",
  },
  paragraph: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 24,
  },
  timeInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: 8,
  },
  timeText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    marginBottom: 2,
  },
  clockIcon: {
    marginRight: 6,
  },
  timeBadgeText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: "#6B7280",
  },
  
  // Disclaimer Styles
  disclaimerContainer: {
    height: height * 0.16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    padding: 12,
    marginBottom: 16,
  },
  disclaimerScroll: {
    flex: 1,
  },
  disclaimerText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },
  
  // Consent Row Styles
  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#00A896",
    borderColor: "#00A896",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  consentTextContainer: {
    flex: 1,
  },
  consentText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
  },
  linkText: {
    color: "#00A896",
    fontFamily: FontFamily.medium,
    textDecorationLine: "underline",
  },

  // Footer Styles
  footerContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
    transition: "all 0.3s ease",
  },
  activeDot: {
    backgroundColor: "#003049",
    width: 20,
  },
  btnPrimary: {
    flexDirection: "row",
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 8,
    letterSpacing: 1,
  },
  btnDisabled: {
    backgroundColor: "#94A3B8",
  },
});
