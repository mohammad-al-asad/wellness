import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Clock, ArrowRight } from "lucide-react-native";
import Colors from "../src/constants/colors";
import { FontFamily } from "../src/constants/typography";

const { width, height } = Dimensions.get("window");

export default function IntroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

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

      {/* Content Section */}
      <View style={styles.content}>
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

        <TouchableOpacity 
          style={styles.btnPrimary}
          onPress={() => router.push({
            pathname: "/personal-info",
            params: { ...params },
          })}
        >
          <Text style={styles.btnPrimaryText}>GET STARTED</Text>
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
    height: height * 0.4,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logo: {
    width: 65,
    height: 85,
    marginRight: 16,
    tintColor: Colors.accent,
  },
  logoTextWrap: {
    justifyContent: "center",
  },
  logoText: {
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 1.5,
  },
  tagline: {
    fontFamily: FontFamily.medium,
    color: Colors.accent,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  overline: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: "#00A896",
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 38,
    color: "#2C3E50",
    lineHeight: 46,
    marginBottom: 24,
  },
  titleAccent: {
    color: "#00A896",
  },
  paragraph: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 32,
  },
  timeInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginBottom: "auto",
  },
  timeText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
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
    fontSize: 16,
    color: "#6B7280",
  },
  btnPrimary: {
    flexDirection: "row",
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  btnPrimaryText: {
    fontFamily: FontFamily.bold,
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 8,
    letterSpacing: 1,
  },
});
