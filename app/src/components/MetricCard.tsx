import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

interface MetricCardProps {
  title: string;
  status: string;
  description: string;
  score: number;
  leftBorderColor: string;
  statusBgColor: string;
  statusTextColor: string;
}

const MetricCard = ({
  title,
  status,
  description,
  score,
  leftBorderColor,
  statusBgColor,
  statusTextColor
}: MetricCardProps) => {
  return (
    <View style={[styles.card, { borderLeftColor: leftBorderColor }]}>
      <View style={styles.content}>
        <View style={styles.mainInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
              <Text style={[styles.statusText, { color: statusTextColor }]}>{status}</Text>
            </View>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <Text style={styles.score}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainInfo: {
    flex: 1,
    marginRight: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: '#0D2B6E',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  score: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: '#0D2B6E',
  },
});

export default MetricCard;
