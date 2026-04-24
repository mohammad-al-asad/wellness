import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

interface TrendRowProps {
  title: string;
  trend: string;
  colors: string[];
}

const TrendRow = ({ title, trend, colors }: TrendRowProps) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowTrend}>{trend}</Text>
      </View>
      <View style={styles.grid}>
        {colors.map((color: string, index: number) => (
          <View 
            key={index} 
            style={[styles.gridCell, { backgroundColor: color }]} 
          />
        ))}
      </View>
    </View>
  );
};

const BehaviorTrendGrid = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Behavior Trends</Text>
      <View style={styles.card}>
        <TrendRow 
          title="SLEEP QUALITY" 
          trend="Sleep consistency trend" 
          colors={['#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#0097A7', '#00838F']} 
        />
        <TrendRow 
          title="STRESS LEVELS" 
          trend="Low-Medium" 
          colors={['#FFCDD2', '#EF9A9A', '#FFF59D', '#A5D6A7', '#81C784', '#66BB6A', '#E8F5E9']} 
        />
        <TrendRow 
          title="DAILY ACTIVITY" 
          trend="Low-Medium" 
          colors={['#CBD5E1', '#94A3B8', '#CBD5E1', '#64748B', '#334155', '#1E293B', '#0F172A']} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.md,
    color: '#334155',
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    gap: 20,
  },
  rowContainer: {
    gap: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#64748B',
    letterSpacing: 0.5,
  },
  rowTrend: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
    color: '#334155',
  },
  grid: {
    flexDirection: 'row',
    gap: 4,
  },
  gridCell: {
    flex: 1,
    height: 12,
    borderRadius: 2,
  },
});

export default BehaviorTrendGrid;
