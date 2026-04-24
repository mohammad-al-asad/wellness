import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moon, Move, Droplets, UserCircle } from 'lucide-react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

import { BehaviorStreak } from '../redux/rtk/aiApi';

interface StreakCardProps {
  icon: any;
  label: string;
  value: string;
}

const StreakCard = ({ icon: Icon, label, value }: StreakCardProps) => (
  <View style={styles.card}>
    <Icon size={20} color="#1CC8B0" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

interface BehaviorStreakGridProps {
  data?: BehaviorStreak[];
}

const BehaviorStreakGrid = ({ data }: BehaviorStreakGridProps) => {
  const getIcon = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'SLEEP': return Moon;
      case 'MOVEMENT': return Move;
      case 'RECOVERY': return Droplets;
      case 'REFLECTION': return UserCircle;
      default: return Move;
    }
  };

  const streaks = data && data.length > 0 
    ? data.map(s => ({
        icon: getIcon(s.type),
        label: s.type.toUpperCase(),
        value: `${s.current_days} Days`
      }))
    : [
        { icon: Moon, label: 'SLEEP', value: '0 Days' },
        { icon: Move, label: 'MOVEMENT', value: '0 Days' },
        { icon: Droplets, label: 'RECOVERY', value: '0 Days' },
        { icon: UserCircle, label: 'REFLECTION', value: '0 Days' },
      ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Behavior Streaks</Text>
      <View style={styles.grid}>
        {streaks.map((streak, index) => (
          <View key={index} style={styles.gridItem}>
            <StreakCard {...streak} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: '#0D2B6E',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#1CC8B0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: '#0D2B6E',
  },
});

export default BehaviorStreakGrid;
