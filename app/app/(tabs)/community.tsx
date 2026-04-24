import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { X, Mic, ArrowUp } from "lucide-react-native";
import { FontFamily } from "../../src/constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {/* ─── Floating Header Card ─── */}
      <View style={[styles.headerCard, { marginTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <Text style={styles.headerIconText}>✜</Text> 
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>DWS AI Assistant</Text>
            <View style={styles.onlineWrap}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.closeBtn}>
          <X size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Message 1: AI */}
        <View style={styles.msgContainerLeft}>
          <View style={[styles.msgBubbleLeft, styles.cornerSharpTopLeft]}>
            <Text style={styles.msgTextLeft}>
              Hello! I'm your DWS AI Assistant. How can I help improve your performance today?
            </Text>
          </View>
          <Text style={styles.msgTimeLeft}>10:00 AM</Text>
        </View>

        {/* Message 2: User */}
        <View style={styles.msgContainerRight}>
          <View style={[styles.msgBubbleRight, styles.cornerSharpBottomRight]}>
            <Text style={styles.msgTextRight}>
              Why is my recovery capacity lower this week?
            </Text>
          </View>
          <Text style={styles.msgTimeRight}>09:42 AM</Text>
        </View>

        {/* Message 3: AI */}
        <View style={styles.msgContainerLeft}>
          <View style={[styles.msgBubbleLeft, styles.cornerSharpTopLeft]}>
            <Text style={styles.msgTextLeft}>
              Based on your recent check-ins, your sleep consistency has decreased slightly over the past few days. Lower sleep quality can reduce recovery capacity and overall performance. Improving sleep consistency and taking short recovery breaks may help stabilize your recovery score.
            </Text>
          </View>
          <Text style={styles.msgTimeLeft}>10:03 AM</Text>
        </View>

        {/* Typing indicator */}
        <View style={styles.msgContainerLeft}>
          <View style={styles.typingBubble}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
          </View>
        </View>

        {/* Spacer to push suggestions to bottom if screen is tall */}
        <View style={{ flex: 1, minHeight: 40 }} />

        {/* Suggested Queries */}
        <View style={styles.suggestionsContainer}>
          <TouchableOpacity style={styles.suggestionPill}>
            <Text style={styles.suggestionText}>Why is my recovery score low?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill}>
            <Text style={styles.suggestionText}>How can I improve sleep?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill}>
            <Text style={styles.suggestionText}>What affects my OPS score?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.micBtn}>
            <Mic size={22} color="#6B7280" />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.textInput, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            underlineColorAndroid="transparent"
          />
          
          <TouchableOpacity style={styles.sendBtn}>
            <ArrowUp size={20} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB", // Very light tint matching Dominion theme
  },
  headerCard: {
    backgroundColor: "#001F3F", // Deep dark blue card
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0D4A52", // Dark teal background for logo
    alignItems: "center",
    justifyContent: "center",
  },
  headerIconText: {
    color: "#00A896",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTextWrap: {
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontFamily: FontFamily.bold,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  onlineWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00A896", // Bright teal online indicator
  },
  onlineText: {
    color: "#9CA3AF",
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#112B4B", // Slightly lighter overlay for close button
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
  msgContainerLeft: {
    alignItems: "flex-start",
    marginBottom: 16,
    maxWidth: "85%",
  },
  msgContainerRight: {
    alignItems: "flex-end",
    marginBottom: 16,
    maxWidth: "85%",
    alignSelf: "flex-end",
  },
  msgBubbleLeft: {
    backgroundColor: "#F3F5F7", // Very light grayish blue
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  msgBubbleRight: {
    backgroundColor: "#00A896", // Teal user bubble
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  cornerSharpTopLeft: {
    borderTopLeftRadius: 4,
  },
  cornerSharpBottomRight: {
    borderBottomRightRadius: 4,
  },
  msgTextLeft: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 22,
  },
  msgTextRight: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 22,
  },
  msgTimeLeft: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 6,
  },
  msgTimeRight: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 6,
  },
  typingBubble: {
    backgroundColor: "#F3F5F7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#9CA3AF",
  },
  suggestionsContainer: {
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  suggestionPill: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B4E4DF", // Very faint teal border
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: "#00A896",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  micBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: "#2C3E50",
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00A896", // Teal arrow button
    alignItems: "center",
    justifyContent: "center",
  },
});
