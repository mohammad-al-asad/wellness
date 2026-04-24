import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

interface ActionItem {
  title: string;
  description: string;
}

interface ActionPlanSectionProps {
  title: string;
  icon: LucideIcon;
  items: ActionItem[];
  backgroundColor: string;
}

const ActionPlanSection = ({
  title,
  icon: Icon,
  items,
  backgroundColor
}: ActionPlanSectionProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Icon size={20} color="#1CC8B0" />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {items.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardIndicator} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: '#0D2B6E',
    marginLeft: 10,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  cardIndicator: {
    width: 4,
    backgroundColor: '#0D2B6E',
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  cardTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: '#0D2B6E',
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
});

export default ActionPlanSection;
