import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FocusableCard } from '../components/FocusableCard';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Analytics Dashboard (TV + Mobile)</Text>
      <FocusableCard onPress={() => router.push('/BarChartScreen')}>
        <Text style={styles.cardText}>Bar Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/PieChartScreen')}>
        <Text style={styles.cardText}>Pie Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/LineChartScreen')}>
        <Text style={styles.cardText}>Line Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/AreaChartScreen')}>
        <Text style={styles.cardText}>Stacked Area Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/ScatterChartScreen')}>
        <Text style={styles.cardText}>Scatter Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/BubbleChartScreen')}>
        <Text style={styles.cardText}>Bubble Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/DonutChartScreen')}>
        <Text style={styles.cardText}>Donut Chart</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/GaugeChartScreen')}>
        <Text style={styles.cardText}>Gauge Chart</Text>
      </FocusableCard>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
});
