import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Check, Flame } from 'lucide-react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

interface SuccessStateProps {
  onReturn: () => void;
}

const SuccessState = ({ onReturn }: SuccessStateProps) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [0, 1, 2, 3]; // M, T, W, T

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <View style={styles.ripple1}>
          <View style={styles.ripple2}>
            <View style={styles.checkBg}>
              <Check size={40} color={Colors.white} strokeWidth={3} />
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Check-in Complete</Text>
      <Text style={styles.subtitle}>Small daily actions build strong performance.</Text>

      <View style={styles.streakCard}>
        <Text style={styles.streakLabel}>REFLECTION STREAK</Text>
        <View style={styles.streakRow}>
          <Text style={styles.streakValue}>4</Text>
          <Flame size={24} color="#FF5A5A" style={styles.flameIcon} />
          <Text style={styles.streakDays}>Days</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>

        <Text style={styles.streakQuote}>
          You're on a roll! Keep it up to reach your weekly goal.
        </Text>
      </View>

      <View style={styles.calendarRow}>
        {days.map((day, index) => {
          const isCompleted = completedDays.includes(index);
          const isCurrent = index === 3; // Second 'T' is currently selected in image
          return (
            <View key={index} style={[
              styles.dayCircle, 
              isCompleted && styles.completedDay,
              isCurrent && styles.currentDay
            ]}>
              <Text style={[
                styles.dayText, 
                isCompleted && styles.completedDayText
              ]}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.returnButton} onPress={onReturn}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FCFB',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple1: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(28, 200, 176, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple2: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(28, 200, 176, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1CC8B0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1CC8B0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: '#0D2B6E',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
  },
  streakCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 32,
  },
  streakLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 2,
    marginBottom: 16,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  streakValue: {
    fontFamily: FontFamily.bold,
    fontSize: 64,
    color: '#0D2B6E',
  },
  flameIcon: {
    marginHorizontal: 8,
  },
  streakDays: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: '#0D2B6E',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#1CC8B0',
    borderRadius: 4,
  },
  streakQuote: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 60,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedDay: {
    backgroundColor: '#1CC8B0',
  },
  currentDay: {
    borderWidth: 2,
    borderColor: 'rgba(28, 200, 176, 0.3)',
    shadowColor: '#1CC8B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  dayText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: '#94A3B8',
  },
  completedDayText: {
    color: Colors.white,
  },
  returnButton: {
    backgroundColor: '#0D2B6E',
    height: 56,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
});

export default SuccessState;
