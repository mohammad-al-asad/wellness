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
import { useRouter, useLocalSearchParams } from "expo-router";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react-native";
import Colors from "../../src/constants/colors";
import { FontFamily } from "../../src/constants/typography";
import { useResetPasswordMutation } from "../../src/redux/rtk/authApi";
import { ActivityIndicator, Alert } from "react-native";

export default function SetPasswordScreen() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const result = await resetPassword({
        email: email as string,
        code: code as string,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      if (result.success) {
        Alert.alert("Success", "Password updated successfully!", [
          { text: "Log In", onPress: () => router.replace("/(auth)/login") }
        ]);
      }
    } catch (err: any) {
      Alert.alert("Error", err.data?.message || "Failed to update password");
    }
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <Text style={styles.title}>Set new Password</Text>
          <Text style={styles.subtitle}>
            Protect your Dominion Wellness Solutions app{"\n"}with a high-Quality password.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NEW PASSWORD</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Securepass1014"
                placeholderTextColor="#9CA3AF"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? (
                  <EyeOff color="#9CA3AF" size={20} />
                ) : (
                  <Eye color="#9CA3AF" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <View style={[styles.inputContainer, passwordsMatch && styles.inputContainerSuccess]}>
              <TextInput
                style={styles.input}
                placeholder="Securepass1014"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              {passwordsMatch ? (
                <CheckCircle2 color={Colors.success || "#10B981"} size={20} />
              ) : (
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff color="#9CA3AF" size={20} />
                  ) : (
                    <Eye color="#9CA3AF" size={20} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.btnPrimary, (!passwordsMatch || isLoading) && styles.btnDisabled]} 
          onPress={handleUpdate}
          disabled={!passwordsMatch || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.btnPrimaryText}>Update Password</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Back to Log In</Text>
        </TouchableOpacity>

        <View style={styles.footerTerms}>
          <Text style={styles.termsText}>
            By setting a password, you agree to our <Text style={styles.termsLink}>Terms of Service</Text>{"\n"}and <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
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
    paddingTop: 120,
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerSuccess: {
    borderColor: Colors.success || "#10B981",
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#2C3E50",
    height: "100%",
  },
  btnPrimary: {
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnPrimaryText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
  backToLogin: {
    alignItems: "center",
    paddingVertical: 12,
  },
  backToLoginText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#2C3E50",
  },
  footerTerms: {
    marginTop: "auto",
    paddingTop: 40,
    alignItems: "center",
  },
  termsText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: FontFamily.medium,
    color: "#4B5563",
  },
});
