import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { CheckInOptionGrid, SuccessState } from '../src/components';
import { FontFamily, FontSize } from '../src/constants/typography';
import Colors from '../src/constants/colors';

const DailyCheckInScreen = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const step1Questions = [
    { id: 'energy', question: 'How is your energy today?', options: ['VERY LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY HIGH'] },
    { id: 'focus', question: 'How well can you focus today?', options: ['VERY LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY HIGH'] },
    { id: 'stress', question: 'How stressed do you feel right now?', options: ['VERY LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY HIGH'] },
    { id: 'motivation', question: 'How motivated do you feel today?', options: ['VERY LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY HIGH'] },
  ];

  const step2Questions = [
    { id: 'sleep', question: 'How many hours did you sleep last night?', options: ['<4H', '4-5H', '6-7H', '7-8H', '8H+'] },
    { id: 'rested', question: 'Do you feel rested today?', options: ['NOT AT ALL', 'A LITTLE', 'SOMEWHAT', 'VERY', 'COMPLETELY'] },
    { id: 'activity', question: 'Did you do any physical activity yesterday?', options: ['NONE', 'LIGHT ACTIVITY', 'MODERATE ACTIVITY', 'HARD ACTIVITY'] },
    { id: 'meals', question: 'How were your meals yesterday?', options: ['SKIPPED MEALS', 'MOSTLY QUICK OR PROCESSED FOOD', 'A MIX OF HEALTHY AND QUICK MEALS', 'MOSTLY BALANCED MEALS'] },
  ];

  const handleSelect = (id: string, option: string) => {
    setSelections(prev => ({ ...prev, [id]: option }));
  };

  const isStep1Complete = step1Questions.every(q => selections[q.id]);
  const isStep2Complete = step2Questions.every(q => selections[q.id]);

  if (step === 3) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FCFB' }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#0D2B6E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Checking</Text>
          <View style={{ width: 24 }} />
        </View>
        <SuccessState onReturn={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#0D2B6E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Checking</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>{step}/2</Text>
        <Text style={styles.stepText}>Step {step}</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {(step === 1 ? step1Questions : step2Questions).map((q) => (
          <CheckInOptionGrid 
            key={q.id}
            question={q.question}
            options={q.options}
            selectedOption={selections[q.id] || null}
            onSelect={(option) => handleSelect(q.id, option)}
          />
        ))}

        {step === 1 ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, !isStep1Complete && styles.disabledButton]} 
              onPress={() => setStep(2)}
              disabled={!isStep1Complete}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.doneButton, !isStep2Complete && styles.disabledButton]} 
            onPress={() => setStep(3)}
            disabled={!isStep2Complete}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6FCFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: '#1E293B',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: '#94A3B8',
  },
  stepText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: '#94A3B8',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
  nextButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0D2B6E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
  doneButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0D2B6E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DailyCheckInScreen;
