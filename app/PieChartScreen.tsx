import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { FocusableCard } from '../components/FocusableCard';
import { pieData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function PieChartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feature Usage (Pie Chart)</Text>
      <FocusableCard>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#f0f2f5',
            backgroundGradientFrom: '#f0f2f5',
            backgroundGradientTo: '#f0f2f5',
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </FocusableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
