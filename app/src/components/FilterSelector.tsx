import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

const FilterSelector = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.darkButton}>
        <Text style={styles.darkButtonText}>Last 30 Days</Text>
        <ChevronDown size={16} color={Colors.white} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.lightButton}>
        <Text style={styles.lightButtonText}>All Drivers</Text>
        <ChevronDown size={16} color={Colors.gray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  darkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D2B6E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  darkButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.white,
  },
  lightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  lightButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: '#64748B',
  },
});

export default FilterSelector;
