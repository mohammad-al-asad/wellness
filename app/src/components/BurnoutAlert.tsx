import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { FontFamily } from '../constants/typography';
import Colors from '../constants/colors';

interface BurnoutAlertProps {
  alert?: {
    status: string;
    message: string;
  } | null;
}

const BurnoutAlert = ({ alert }: BurnoutAlertProps) => {
  if (!alert) return null;

  const isHighRisk = alert.status?.toLowerCase() === 'high' || alert.status?.toLowerCase() === 'critical';

  return (
    <View style={[styles.container, isHighRisk ? styles.highRiskBg : styles.warningBg]}>
      <View style={styles.header}>
        <AlertTriangle size={20} color={isHighRisk ? '#EF4444' : '#F59E0B'} />
        <Text style={[styles.title, { color: isHighRisk ? '#EF4444' : '#B45309' }]}>
          WELLNESS ALERT: {alert.status?.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.message}>{alert.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  highRiskBg: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  warningBg: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    marginLeft: 10,
    letterSpacing: 1,
  },
  message: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});

export default BurnoutAlert;
