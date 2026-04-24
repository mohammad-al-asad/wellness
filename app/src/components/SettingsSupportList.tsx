import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Settings, HelpCircle, Headphones, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

const SettingsSupportList = () => {
  const router = useRouter();
  const items = [
    { icon: Settings, label: 'Settings', onPress: () => router.push('/settings') },
    { icon: HelpCircle, label: 'Help Center', onPress: () => router.push('/help-center') },
    { icon: Headphones, label: 'Contact Support', onPress: () => router.push('/contact-support') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>SETTINGS & SUPPORT</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.item} onPress={item.onPress}>
              <View style={styles.leftContent}>
                <item.icon size={20} color="#64748B" />
                <Text style={styles.label}>{item.label}</Text>
              </View>
              <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>
            {index < items.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    color: '#94A3B8',
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.base,
    color: '#1E293B',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
});

export default SettingsSupportList;
