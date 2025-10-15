// ScatterChartScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useTVEventHandler } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Circle, G, Text as TextSvg } from 'react-native-svg';
import * as shape from 'd3-shape';
import { FocusableCard } from '../components/FocusableCard';
import { scatterData } from '@/data/dummy_data';

const screenWidth = Dimensions.get('window').width;

// Dummy scatter data (x = label/day, y = value)

export default function ScatterChartScreen() {
  // focused index for TV navigation
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Build numeric array for the LineChart (y-values only)
  const yValues = scatterData.map(d => d.y);
  const xLabels = scatterData.map(d => d.x);

  // TV remote handler
  const tvHandler = (evt: any) => {
    if (!evt) return;
    const t = evt.eventType;
    console.log('🎮 TV Event:', t);
    if (t === 'right') {
      setFocusedIndex(prev => Math.min(prev + 1, scatterData.length - 1));
    } else if (t === 'left') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (t === 'select') {
      console.log('Selected point:', scatterData[focusedIndex]);
      // call any action here for the selected point
    }
  };
  useTVEventHandler(tvHandler);

  // Decorator: renders points, highlights the focused one
  const Decorator = ({ x, y, data }: any) => (
    <>
      {data.map((value: number, index: number) => {
        const isFocused = index === focusedIndex;
        return (
          <G key={index}>
            <Circle
              cx={x(index)}
              cy={y(value)}
              r={isFocused ? 8 : 5}
              stroke={isFocused ? '#4f6cff' : '#999'}
              strokeWidth={2}
              fill={isFocused ? '#4f6cff' : '#fff'}
            />
            {isFocused && (
              <TextSvg
                x={x(index)}
                y={y(value) - 14}
                fontSize={12}
                fill="#222"
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {String(value)}
              </TextSvg>
            )}
          </G>
        );
      })}
    </>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Engagement Scatter Plot</Text>

      <FocusableCard>
        <View style={styles.chartWrapper}>
          <View style={{ height: 300, flexDirection: 'row', paddingVertical: 16 }}>
            <YAxis
              data={yValues}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fill: '#555', fontSize: 10 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={yValues}
                // hide the connecting line by making it transparent
                svg={{ stroke: 'transparent', strokeWidth: 0 }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={shape.curveLinear}
              >
                <Grid svg={{ stroke: '#e0e0e0' }} />
                <Decorator />
              </LineChart>

              <XAxis
                style={{ marginTop: 10 }}
                data={yValues}
                formatLabel={(value, index) => xLabels[index]}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: '#333' }}
              />
            </View>
          </View>

          <Text style={styles.valueLabel}>
            🎯 Focused: {xLabels[focusedIndex]} → {yValues[focusedIndex]}
          </Text>
          <Text style={styles.hintText}>Use Left / Right on remote to move, OK to select</Text>
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
    marginTop: 12,
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