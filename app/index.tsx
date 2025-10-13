import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FocusableCard } from '../components/FocusableCard';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  cardText: { fontSize: 18, padding: 10 },
});
