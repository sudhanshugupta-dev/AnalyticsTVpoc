import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FocusableCard } from '../components/FocusableCard';
import { barData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function BarChartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Users (Bar Chart)</Text>
      <FocusableCard>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#f0f2f5',
            backgroundGradientTo: '#f0f2f5',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(79,108,255,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            style: { borderRadius: 12 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#4f6cff' },
          }}
          style={{ borderRadius: 12 }}
          fromZero
          showValuesOnTopOfBars
        />
      </FocusableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
