import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontFamily } from "../src/constants/typography";
import { TrendingUp, Sparkles, CheckCircle2 } from "lucide-react-native";
export default function AiAnalysisScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Analysis</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            {/* Visual combo imitating the AI sparkling connected-dots graph */}
            <TrendingUp size={36} color="#00A896" strokeWidth={2.5} />
            <Sparkles size={16} color="#00A896" style={styles.sparkleTrailing} />
          </View>

          <Text style={styles.title}>Your Performance{"\n"}Profile is Ready</Text>
          
          <Text style={styles.description}>
            Dominion Wellness Solutions is finalizing your custom health baseline based on your recent assessment.
          </Text>

          <View style={styles.statusRow}>
            <CheckCircle2 size={16} color="#00A896" />
            <Text style={styles.statusText}>Assessment Analyzed</Text>
          </View>

          <TouchableOpacity
            style={styles.btnHome}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.btnHomeText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: "#2C3E50",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#00A896",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  sparkleTrailing: {
    position: "absolute",
    top: 24,
    right: 20,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: "#2C3E50",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 16,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  statusText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#00A896",
  },
  btnHome: {
    backgroundColor: "#003049",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnHomeText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
