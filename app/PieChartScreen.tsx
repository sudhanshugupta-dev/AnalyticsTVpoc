import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useTVEventHandler } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { pieData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function PieChartScreen() {
  const [focusedSlice, setFocusedSlice] = useState(0);

  const colors = ['#4f6cff', '#ff6f61', '#ffa500', '#00c851', '#33b5e5'];

  // 🔹 FIXED: Build pie chart data with PROPER focus effect
  const data = pieData.map((item, index) => ({
    value: item.y,
    svg: {
      fill: colors[index % colors.length],
      // ✅ CORRECT: Use numbers (not %) - focused slice grows 20% larger
      outerRadius: focusedSlice === index ? '110' : '90',
      innerRadius: focusedSlice === index ? '25' : '35',
      // ✅ Add stroke for better focus visibility
      stroke: focusedSlice === index ? '#FFD700' : 'transparent',
      strokeWidth: focusedSlice === index ? 3 : 0,
    },
    key: `pie-${index}`,
    label: item.x,
  }));

  // 🔹 Labels inside the pie chart
  const Labels = ({ slices }: any) =>
    slices.map((slice: any, index: number) => {
      const { labelCentroid, data } = slice;
      const isFocused = index === focusedSlice;
      return (
        <SvgText
          key={index}
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          fill={isFocused ? '#FFD700' : '#333'}
          fontSize={isFocused ? 18 : 14}
          fontWeight={isFocused ? 'bold' : 'normal'}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {data.label}
        </SvgText>
      );
    });

  // 🔹 Handle TV remote input
  const tvEventHandler = (evt: any) => {
    if (!evt) return;

    switch (evt.eventType) {
      case 'right':
        setFocusedSlice(prev => (prev + 1) % data.length);
        break;
      case 'left':
        setFocusedSlice(prev => (prev - 1 + data.length) % data.length);
        break;
      case 'select':
        console.log(`✅ Selected: ${data[focusedSlice].label} = ${data[focusedSlice].value}`);
        break;
      default:
        break;
    }
  };

  useTVEventHandler(tvEventHandler);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Feature Usage (Pie Chart)</Text>

      <View style={styles.chartWrapper}>
        {/* ✅ FIXED: Remove conflicting innerRadius & labelRadius props */}
        <PieChart
          style={{ height: 280, width: screenWidth - 100 }}
          data={data}
          // Let each slice control its own radius via svg props
        >
          <Labels />
        </PieChart>

        <View style={styles.navigationContainer}>
          <Text style={styles.infoText}>
            {`${data[focusedSlice].label}: ${data[focusedSlice].value}`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#f0f2f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  chartWrapper: {
  
    borderRadius: 20,
    padding: 25,
    minWidth: screenWidth - 100,
    minHeight: 360,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  navigationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f6cff',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#888',
  },
});