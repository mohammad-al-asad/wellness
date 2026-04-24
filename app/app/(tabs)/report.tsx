import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { FontFamily } from "../../src/constants/typography";
import Colors from "../../src/constants/colors";

import ReportHeader from "../../src/components/ReportHeader";
import FilterSelector from "../../src/components/FilterSelector";
import OpsSummaryCard from "../../src/components/OpsSummaryCard";
import OpsTrendChart from "../../src/components/OpsTrendChart";
import DriverTrendSection from "../../src/components/DriverTrendSection";
import BehaviorTrendGrid from "../../src/components/BehaviorTrendGrid";
import PerformanceSummary from "../../src/components/PerformanceSummary";

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ReportHeader />
        <FilterSelector />
        <OpsSummaryCard />
        <OpsTrendChart />
        <DriverTrendSection />
        <BehaviorTrendGrid />
        <PerformanceSummary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
