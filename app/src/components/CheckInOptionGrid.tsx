import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

interface CheckInOptionGridProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const CheckInOptionGrid = ({
  question,
  options,
  selectedOption,
  onSelect
}: CheckInOptionGridProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.grid}>
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.optionButton, 
                isSelected && styles.selectedButton
              ]} 
              onPress={() => onSelect(option)}
            >
              <Text style={[
                styles.optionText, 
                isSelected && styles.selectedText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  question: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: '#334155',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 6,
    marginBottom: 12,
    minWidth: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#0D2B6E', // Navy from image
    borderColor: '#0D2B6E',
  },
  optionText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectedText: {
    color: '#1CC8B0', // Teal from image
  },
});

export default CheckInOptionGrid;
