import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useTVEventHandler } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText, Circle } from 'react-native-svg';
import { FocusableCard } from '../components/FocusableCard';
import { donutData } from '@/data/dummy_data';
const screenWidth = Dimensions.get('window').width;



export default function DonutChartScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  // TV remote handler
  const tvHandler = (evt: any) => {
    if (!evt) return;
    const t = evt.eventType;
    console.log('🎮 TV Event:', t);
    if (t === 'right') {
      setFocusedIndex(prev => Math.min(prev + 1, donutData.length - 1));
    } else if (t === 'left') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (t === 'select') {
      console.log('Selected Slice:', donutData[focusedIndex]);
    }
  };
  useTVEventHandler(tvHandler);

  const pieData = donutData.map((item, index) => ({
    value: item.value,
    svg: {
      fill: item.color,
      onPress: () => console.log(`Pressed ${item.label}`),
    },
    key: `slice-${index}`,
  }));

  const Labels = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid } = slice;
      const isFocused = index === focusedIndex;
      const r = isFocused ? 16 : 12; // larger font for focused
      return (
        <SvgText
          key={index}
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          fill={'#fff'}
          fontSize={r}
          fontWeight={isFocused ? 'bold' : 'normal'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {donutData[index].label}
        </SvgText>
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Feature Distribution (Donut Chart)</Text>

      <FocusableCard>
        <View style={styles.chartWrapper}>
          <PieChart
            style={{ height: 300 }}
            data={pieData}
            innerRadius={'50%'}
            outerRadius={'90%'}
          >
            <Labels />
          </PieChart>

          <Text style={styles.valueLabel}>
            🎯 Focused: {donutData[focusedIndex].label} → {donutData[focusedIndex].value}%
          </Text>
          <Text style={styles.hintText}>Use Left / Right / OK to navigate slices</Text>
        </View>
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
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#333',
    textAlign: 'center',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    minWidth: screenWidth - 100,
    alignSelf: 'center',
  },
  valueLabel: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 16,
    color: '#4f6cff',
    fontWeight: '600',
  },
  hintText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
});