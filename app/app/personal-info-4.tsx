import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontFamily } from "../src/constants/typography";
import { useGetQuestionsQuery } from "../src/redux/rtk/questionsApi";
import { ActivityIndicator } from "react-native";

export default function PersonalInfoStep4Screen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { data, isLoading, isError } = useGetQuestionsQuery({ page: 3, size: 5 });
  const questions = data?.data?.questions || [];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Personal Information</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>4/6</Text>
          <Text style={styles.progressText}>Step 4</Text>
        </View>

        <View style={styles.formContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00A896" style={{ marginTop: 50 }} />
          ) : isError ? (
            <Text style={{ textAlign: "center", marginTop: 50, color: "red" }}>Failed to load questions.</Text>
          ) : (
            questions.map((q) => (
              <View key={q.id} style={styles.questionBlock}>
                <Text style={styles.questionText}>{q.text}</Text>
              <View style={styles.optionsWrap}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.pill,
                        isSelected ? styles.pillSelected : styles.pillUnselected,
                      ]}
                      onPress={() => handleSelect(q.id, opt)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => router.back()}
          >
            <Text style={styles.btnBackText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnNext, (isLoading || Object.keys(answers).length < questions.length) && { opacity: 0.5 }]}
            disabled={isLoading || Object.keys(answers).length < questions.length}
            onPress={() => router.push({
              pathname: "/personal-info-5",
              params: { ...params, ...answers }
            })}
          >
            <Text style={styles.btnNextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#F6FCFB",
  },
  headerTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
    color: "#2C3E50",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 8,
  },
  progressText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: "#6B7280",
  },
  formContainer: {
    marginBottom: 24,
  },
  questionBlock: {
    marginBottom: 32,
  },
  questionText: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: "#2C3E50",
    lineHeight: 22,
    marginBottom: 16,
  },
  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  pill: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  pillUnselected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pillSelected: {
    backgroundColor: "#2C3E50",
    borderWidth: 1,
    borderColor: "#2C3E50",
  },
  pillText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    letterSpacing: 1.0,
  },
  pillTextUnselected: {
    color: "#9CA3AF",
  },
  pillTextSelected: {
    color: "#00A896",
  },
  footer: {
    flexDirection: "row",
    gap: 16,
    marginTop: "auto",
    paddingTop: 12,
  },
  btnBack: {
    flex: 1,
    backgroundColor: "#9CA3AF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnBackText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
  btnNext: {
    flex: 1,
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnNextText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
});
