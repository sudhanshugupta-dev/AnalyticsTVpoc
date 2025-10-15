


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
      <Text style={styles.header}>Analytics or Maps Dashboard (TV + Mobile)</Text>
      <FocusableCard onPress={() => router.push('/MainScreen')}>
        <Text style={styles.cardText}>Analytics</Text>
      </FocusableCard>
      <FocusableCard onPress={() => router.push('/PieChartScreen')}>
        <Text style={styles.cardText}>Maps</Text>
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