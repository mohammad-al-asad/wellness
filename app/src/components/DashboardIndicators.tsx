import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontFamily } from '../constants/typography';
import Colors from '../constants/colors';
import { DashboardIndicator } from '../redux/rtk/aiApi';

interface DashboardIndicatorsProps {
  indicators?: DashboardIndicator[];
}

const DashboardIndicators = ({ indicators }: DashboardIndicatorsProps) => {
  if (!indicators || indicators.length === 0) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'success': return '#1CC8B0';
      default: return '#94A3B8';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Key Indicators</Text>
      <View style={styles.grid}>
        {indicators.map((indicator, index) => (
          <View key={index} style={styles.indicatorCard}>
            <Text style={styles.indicatorLabel}>{indicator.label.toUpperCase()}</Text>
            <Text style={[styles.indicatorValue, { color: getStatusColor(indicator.status) }]}>
              {indicator.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
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
    marginHorizontal: -6,
  },
  indicatorCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    width: '46.5%', // Slightly less than 50% to account for margins
    marginHorizontal: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F1F5F9',
  },
  indicatorLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  indicatorValue: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: '#0D2B6E',
  },
});

export default DashboardIndicators;
