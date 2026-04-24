import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import Colors from "../../src/constants/colors";
import { FontFamily } from "../../src/constants/typography";
import { useForgotPasswordMutation } from "../../src/redux/rtk/authApi";
import { ActivityIndicator, Alert } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      const result = await forgotPassword({ email }).unwrap();
      if (result.success) {
        Alert.alert("Success", result.message);
        router.push({
          pathname: "/(auth)/verify-identity",
          params: { email, type: "reset" },
        });
      }
    } catch (err: any) {
      Alert.alert("Error", err.data?.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address to receive a 4-digit{"\n"}verification code to reset your password.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="anthony@gmail.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.btnPrimary, isLoading && styles.btnDisabled]} 
          onPress={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.btnPrimaryText}>Send Verification Code</Text>
          )}
          {!isLoading && <Send color="#FFFFFF" size={20} style={styles.btnIcon} />}
        </TouchableOpacity>

        <View style={styles.footerLinkContainer}>
          <Text style={styles.footerText}>Remember your password? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.footerLink}>Back to Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 160,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: "#4B5563",
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#2C3E50",
    height: "100%",
  },
  btnPrimary: {
    flexDirection: "row",
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  btnPrimaryText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  btnIcon: {
    marginLeft: 4,
  },
  footerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#003049",
  },
});
