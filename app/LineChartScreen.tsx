import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FocusableCard } from '../components/FocusableCard';
import { lineData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function LineChartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Session Duration (Line Chart)</Text>
      <FocusableCard>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#f0f2f5',
            backgroundGradientTo: '#f0f2f5',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255,111,97,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            style: { borderRadius: 12 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#ff6f61' },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </FocusableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
