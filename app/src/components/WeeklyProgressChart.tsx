import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, G, Text as SvgText } from 'react-native-svg';
import { FontFamily, FontSize } from '../constants/typography';
import Colors from '../constants/colors';

import { ProgressDay } from '../redux/rtk/aiApi';

const { width: screenWidth } = Dimensions.get('window');

interface WeeklyProgressChartProps {
  data?: ProgressDay[];
}

const WeeklyProgressChart = ({ data: apiData }: WeeklyProgressChartProps) => {
  const chartWidth = screenWidth - 72; // Padding 16*2 + inner padding 20*2
  const chartHeight = 100;
  
  // Default data if none provided
  const defaultData = [0.4, 0.45, 0.42, 0.55, 0.6, 0.5, 0.65];
  const defaultDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const data = apiData && apiData.length > 0 
    ? apiData.map(d => (d.score_value || 0) / 100) 
    : defaultData;
    
  const days = apiData && apiData.length > 0 
    ? apiData.map(d => d.day_label.toUpperCase()) 
    : defaultDays;
  
  const stepX = chartWidth / (data.length - 1);
  const getPoints = () => {
    return data.map((val, i) => `${i * stepX},${chartHeight - val * chartHeight}`).join(' ');
  };

  const pathData = data.reduce((path, val, i) => {
    const x = i * stepX;
    const y = chartHeight - val * chartHeight;
    return path + `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, '');

  const areaData = pathData + ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 7 Days Progress</Text>
      <View style={styles.chartWrap}>
        <Svg height={chartHeight} width={chartWidth}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#1CC8B0" stopOpacity="0.3" />
              <Stop offset="1" stopColor="#1CC8B0" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path d={areaData} fill="url(#grad)" />
          <Path d={pathData} fill="none" stroke="#1CC8B0" strokeWidth="2" />
        </Svg>
        <View style={styles.daysRow}>
          {days.map((day, i) => (
            <Text key={i} style={styles.dayText}>{day}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: '#0D2B6E',
    marginBottom: 20,
  },
  chartWrap: {
    alignItems: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  dayText: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    color: '#94A3B8',
  },
});

export default WeeklyProgressChart;
