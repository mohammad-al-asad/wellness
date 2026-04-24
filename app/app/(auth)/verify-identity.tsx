import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Clock } from "lucide-react-native";
import { FontFamily } from "../../src/constants/typography";
import { useVerifyResetCodeMutation, useForgotPasswordMutation } from "../../src/redux/rtk/authApi";
import { useAppDispatch } from "../../src/redux/reduxHooks";
import { verifyUser } from "../../src/redux/slices/authSlice";
import { ActivityIndicator, Alert } from "react-native";

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const { email, type } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  
  const [verifyCode, { isLoading: isVerifying }] = useVerifyResetCodeMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(45);
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    // Automatically send code on mount
    if (email) {
      resendOtp({ email: email as string });
    }
  }, [email]);

  React.useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      const result = await resendOtp({ email: email as string }).unwrap();
      if (result.success) {
        Alert.alert("Success", "A new code has been sent to your email.");
        setTimer(45);
      }
    } catch (err: any) {
      Alert.alert("Error", err.data?.message || "Failed to resend code");
    }
  };

  const handleConfirm = async () => {
    if (code.length !== 4) return;

    try {
      const result = await verifyCode({
        email: email as string,
        code,
      }).unwrap();

      if (result.success) {
        if (type === "registration") {
          dispatch(verifyUser());
          Alert.alert("Success", "Email verified successfully!");
          router.replace("/intro");
        } else {
          // Password reset flow
          router.push({
            pathname: "/(auth)/set-password",
            params: { email, code },
          });
        }
      }
    } catch (err: any) {
      Alert.alert("Verification Failed", err.data?.message || "Invalid code");
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      const char = code[i];
      const isFocused = code.length === i;
      const isFilled = !!char;
      cells.push(
        <View 
          key={i} 
          style={[
            styles.cell, 
            isFilled ? styles.cellFilled : null,
            isFocused ? styles.cellFocused : null
          ]}
        >
          <Text style={[styles.cellText, isFilled ? styles.cellTextFilled : null]}>
            {char || "-"}
          </Text>
        </View>
      );
    }
    return cells;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Verify Identity</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to your email
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.codeContainer} 
            activeOpacity={1} 
            onPress={() => inputRef.current?.focus()}
          >
            {renderCells()}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={code}
              onChangeText={(text) => {
                if (text.length <= 4) setCode(text.replace(/[^0-9]/g, ''));
              }}
              keyboardType="number-pad"
              maxLength={4}
            />
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Clock color="#6B7280" size={16} style={styles.clockIcon} />
            <Text style={styles.timerText}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0 || isResending}>
              <Text style={[styles.resendText, (timer > 0 || isResending) && { opacity: 0.5 }]}>
                {isResending ? "Sending..." : "Resend code again"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.btnPrimary, (code.length !== 4 || isVerifying) && styles.btnDisabled]} 
            onPress={handleConfirm}
            disabled={code.length !== 4 || isVerifying}
          >
            {isVerifying ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.btnPrimaryText}>Confirm</Text>
            )}
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  inner: {
    paddingHorizontal: 24,
    paddingTop: 160,
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: "#2C3E50",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  cell: {
    width: 64,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cellFilled: {
    backgroundColor: "#003049",
  },
  cellFocused: {
    borderColor: "#003049",
  },
  cellText: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: "#9CA3AF",
  },
  cellTextFilled: {
    color: "#FFFFFF",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  clockIcon: {
    marginRight: 6,
  },
  timerText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: "#6B7280",
    marginRight: 8,
  },
  resendText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#003049",
  },
  btnPrimary: {
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnPrimaryText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
});
