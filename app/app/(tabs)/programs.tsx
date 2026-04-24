import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Menu, Bell, Clock, TrendingUp, Activity } from "lucide-react-native";
import { FontFamily } from "../../src/constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Data Arrays for Rendering ───
const CORE_DRIVERS = [
  {
    id: 1,
    title: "Physical Capacity",
    short: "PC",
    desc: "Your physical activity habits support strong daily energy levels.",
    score: 92,
    tag: "STRONG",
    tagColor: "#166534",
    tagBg: "#DCFCE7",
    borderColor: "#22C55E",
  },
  {
    id: 2,
    title: "Mental Resilience",
    short: "MR",
    desc: "Your focus and stress management patterns remain stable",
    score: 85,
    tag: "STABLE",
    tagColor: "#0F766E",
    tagBg: "#CCFBF1",
    borderColor: "#0ea5e9", // A vivid cyan/teal
  },
  {
    id: 3,
    title: "Morale & Cohesion",
    short: "MC",
    desc: "Your sense of connection and recognition within your environment remains stable",
    score: 88,
    tag: "STABLE",
    tagColor: "#A16207",
    tagBg: "#FEF9C3",
    borderColor: "#EAB308",
  },
  {
    id: 4,
    title: "Purpose Alignment",
    short: "PA",
    desc: "Connection to long-term goals is fluctuating",
    score: 75,
    tag: "DEVELOPING",
    tagColor: "#374151",
    tagBg: "#F3F4F6",
    borderColor: "#9CA3AF",
  },
  {
    id: 5,
    title: "Recovery Capacity",
    short: "RC",
    desc: "Your recovery patterns suggest inconsistent sleep or rest.",
    score: 58,
    tag: "NEEDS ATTENTION",
    tagColor: "#991B1B",
    tagBg: "#FEE2E2",
    borderColor: "#EF4444",
  },
];

const RECOMMENDED_ACTIONS = [
  {
    id: 1,
    title: "Sleep Recovery",
    desc: "Aim for 7-8 hours of sleep tonight",
    bgColor: "#00A896", // Teal
  },
  {
    id: 2,
    title: "Recovery Break",
    desc: "Take a short 10-minute recovery break today",
    bgColor: "#00A896", // Teal
  },
  {
    id: 3,
    title: "Light Movement",
    desc: "A short walk or stretch can help restore focus",
    bgColor: "#00A896", // Teal
  },
  {
    id: 4,
    title: "Recovery Reset",
    desc: "Take a short break to reset your energy and focus.",
    bgColor: "#001F3F", // Dark Blue
  },
];

export default function InsightScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 20) + 16, paddingBottom: 100 }, // extra padding bottom for tabs
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ─── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <Menu size={24} color="#D1D5DB" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Insight</Text>
          <TouchableOpacity style={styles.bellBtn}>
            <Bell size={20} color="#1E3A5F" strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* ─── OPS Analysis Header ─── */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionTitle}>OPS Analysis</Text>
          <Text style={styles.liveSyncText}>LIVE SYNC</Text>
        </View>

        {/* ─── Top Cards (Overall & Status) ─── */}
        <View style={styles.opsCardsRow}>
          {/* OVERALL SCORE */}
          <View style={styles.scoreCard}>
            <Text style={styles.cardSmallTitle}>OVERALL SCORE</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.hugeScore}>88</Text>
              <Text style={styles.scoreDelta}>+5%</Text>
            </View>
            {/* Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: "88%" }]} />
            </View>
          </View>

          {/* STATUS */}
          <View style={styles.statusCard}>
            <Text style={styles.cardSmallTitle}>STATUS</Text>
            <Text style={styles.statusText}>Optimal</Text>
            <View style={styles.updatedRow}>
              <Clock size={12} color="#9CA3AF" />
              <Text style={styles.updatedText}>Updated 2m ago</Text>
            </View>
          </View>
        </View>

        {/* ─── AI Insight Dashed Box ─── */}
        <View style={styles.dashedInsightBox}>
          <View style={styles.insightHeaderRow}>
            <TrendingUp size={16} color="#1E3A5F" strokeWidth={2.5} />
            <Text style={styles.insightTitle}>AI INSIGHT</Text>
          </View>
          <Text style={styles.insightBodyText}>
            Good morning! Your recovery capacity is improving, but your focus
            levels have declined slightly over the past few days.
          </Text>
          <Text style={[styles.insightBodyText, { marginTop: 12 }]}>
            Based on these patterns, improving sleep consistency and daily
            recovery habits may help maintain stronger focus.
          </Text>
        </View>

        {/* ─── Core Drivers ─── */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
          Core Drivers
        </Text>
        <View style={styles.driversList}>
          {CORE_DRIVERS.map((item) => (
            <View key={item.id} style={styles.driverCard}>
              <View
                style={[styles.driverLeftBorder, { backgroundColor: item.borderColor }]}
              />
              <View style={styles.driverContent}>
                <View style={styles.driverHeader}>
                  <Text style={styles.driverTitle}>
                    {item.title}{" "}
                    <Text style={styles.driverShort}>[{item.short}]</Text>
                  </Text>
                  <View style={[styles.driverTag, { backgroundColor: item.tagBg }]}>
                    <Text style={[styles.driverTagText, { color: item.tagColor }]}>
                      {item.tag}
                    </Text>
                  </View>
                </View>
                <Text style={styles.driverDesc}>{item.desc}</Text>
              </View>
              <View style={styles.driverScoreWrap}>
                <Text style={styles.driverScore}>{item.score}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ─── Recommended Actions ─── */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>
          Recommended Actions
        </Text>
        <View style={styles.actionsList}>
          {RECOMMENDED_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: action.bgColor }]}
              activeOpacity={0.9}
            >
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDesc}>{action.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Trend Insight Dashed Box ─── */}
        <View style={[styles.dashedInsightBox, { marginTop: 24, marginBottom: 16 }]}>
          <View style={styles.insightHeaderRow}>
            <Activity size={16} color="#1E3A5F" strokeWidth={2.5} />
            <Text style={styles.insightTitle}>TREND INSIGHT</Text>
          </View>
          <Text style={styles.insightBodyText}>
            Your recent responses suggest stronger performance earlier in the day.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FAF9", // Very light greenish-white background
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: "#1E3A5F", // Dark slate
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F0F2", // Faint blue-grey bg for bell
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00A896", // Teal dot
    borderWidth: 1,
    borderColor: "#E8F0F2",
  },
  sectionHeaderWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: "#1E3A5F",
  },
  liveSyncText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: "#00A896",
    letterSpacing: 0.5,
  },
  opsCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardSmallTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: "#8A9BA8",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 12,
  },
  hugeScore: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: "#1E3A5F",
    lineHeight: 36,
  },
  scoreDelta: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: "#00A896",
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00A896",
    borderRadius: 2,
  },
  statusText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: "#1E3A5F",
    marginBottom: 12,
  },
  updatedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  updatedText: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: "#9CA3AF",
  },
  dashedInsightBox: {
    backgroundColor: "#F4F9FB", // Very faint blue
    borderWidth: 1,
    borderColor: "#D1E3EC", // Dashed border color
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 16,
  },
  insightHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  insightTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: "#1E3A5F",
    letterSpacing: 0.5,
  },
  insightBodyText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },
  driversList: {
    gap: 12,
  },
  driverCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  driverLeftBorder: {
    width: 4,
    height: "100%",
  },
  driverContent: {
    flex: 1,
    padding: 14,
  },
  driverHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
  },
  driverTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#1E3A5F",
  },
  driverShort: {
    fontFamily: FontFamily.regular,
    color: "#9CA3AF",
    fontSize: 12,
  },
  driverTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  driverTagText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  driverDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    paddingRight: 8,
  },
  driverScoreWrap: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  driverScore: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: "#1E3A5F",
  },
  actionsList: {
    gap: 12,
  },
  actionCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  actionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  actionDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
