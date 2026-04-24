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
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import Colors from "../../src/constants/colors";
import { FontFamily } from "../../src/constants/typography";
import {
  useRegisterMutation,
  useForgotPasswordMutation,
} from "../../src/redux/rtk/authApi";
import { useAppDispatch } from "../../src/redux/reduxHooks";
import { setCredentials } from "../../src/redux/slices/authSlice";
import { ActivityIndicator, Alert } from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useForgotPasswordMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const payload = {
        name,
        email,
        password,
      };

      const result = await register(payload).unwrap();
      console.log("signup: ", result);

      if (result.success) {
        dispatch(
          setCredentials({
            user: result.data.user,
            access_token: result.data.access_token,
            refresh_token: result.data.refresh_token,
          }),
        );
        Alert.alert(
          "Success",
          "Account created successfully. Verification code sent to your email.",
        );
        router.push({
          pathname: "/(auth)/verify-identity",
          params: { email, type: "registration" },
        });
      }
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err.data?.message || "An error occurred during registration",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Please input your email address and password{"\n"}to signup to your
            system
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NAME</Text>
            <View style={styles.inputContainer}>
              <UserIcon color="#9CA3AF" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.inputContainer}>
              <Mail color="#9CA3AF" size={20} style={styles.icon} />
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputContainer}>
              <Lock color="#9CA3AF" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color="#9CA3AF" size={20} />
                ) : (
                  <Eye color="#9CA3AF" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.btnPrimary,
              (isRegistering || isSendingOtp) && { opacity: 0.7 },
            ]}
            onPress={handleRegister}
            disabled={isRegistering || isSendingOtp}
          >
            {isRegistering || isSendingOtp ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.btnPrimaryText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 80,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 24,
    tintColor: Colors.accent,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: "#2C3E50",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  form: {
    marginBottom: 40,
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
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#2C3E50",
    height: "100%",
  },
  footer: {
    marginTop: "auto",
  },
  btnPrimary: {
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnPrimaryText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
  footerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
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
