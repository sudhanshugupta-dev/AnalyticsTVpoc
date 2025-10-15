import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { pieData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function PieChartScreen() {
  const [focusedSlice, setFocusedSlice] = useState<number>(0); // default first slice
  const colors = ['#4f6cff', '#ff6f61', '#ffa500', '#00c851', '#33b5e5'];

  const data = pieData.map((item, index) => ({
    value: item.y,
    svg: {
      fill: colors[index % colors.length],
      outerRadius: focusedSlice === index ? '105%' : '90%', // focus effect
    },
    key: `pie-${index}`,
    label: item.x,
  }));

  const Labels = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, data } = slice;
      const isFocused = index === focusedSlice;
      return (
        <SvgText
          key={index}
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          fill={isFocused ? '#FFD700' : '#333'}
          fontSize={isFocused ? 18 : 14}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {data.label}
        </SvgText>
      );
    });
  };

  // TV navigation handlers (fixed logic)
  const movePrev = () => setFocusedSlice(prev => (prev > 0 ? prev - 1 : prev));
  const moveNext = () => setFocusedSlice(prev => (prev < data.length - 1 ? prev + 1 : prev));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Feature Usage (Pie Chart)</Text>
      <View style={styles.chartWrapper}>
        <PieChart
          style={{ height: 250, width: screenWidth - 120 }} // smaller chart
          data={data}
          innerRadius={'35%'}
          labelRadius={'100%'}
        >
          <Labels />
        </PieChart>

        {/* Info & TV Navigation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.infoText}>
            {`${data[focusedSlice].label}: ${data[focusedSlice].value}`}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.navButton} onPress={movePrev}>
              <Text style={styles.navButtonText}>◀ Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={moveNext}>
              <Text style={styles.navButtonText}>Next ▶</Text>
            </TouchableOpacity>
          </View>
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
    textAlign: 'center',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minWidth: screenWidth - 100,
    minHeight: 350,
    alignSelf: 'center',
  },
  navigationContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f6cff',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#4f6cff',
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});