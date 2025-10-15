import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useTVEventHandler } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Circle, G } from 'react-native-svg';
import * as shape from 'd3-shape';
import { FocusableCard } from '../components/FocusableCard';
import { bubbleData } from '@/data/dummy_data';
// Bubble data: each bubble has x, y, and size

const screenWidth = Dimensions.get('window').width;

export default function BubbleChartScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const yValues = bubbleData.map(d => d.y);
  const xLabels = bubbleData.map(d => d.x);

  // TV remote handler
  const tvHandler = (evt: any) => {
    if (!evt) return;
    const t = evt.eventType;
    console.log('🎮 TV Event:', t);
    if (t === 'right') {
      setFocusedIndex(prev => Math.min(prev + 1, bubbleData.length - 1));
    } else if (t === 'left') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (t === 'select') {
      console.log('Selected Bubble:', bubbleData[focusedIndex]);
    }
  };
  useTVEventHandler(tvHandler);

  const { Text: TextSvg } = require('react-native-svg');

  // Decorator for Bubbles
  const Decorator = ({ x, y, data }: any) => (
    <>
      {data.map((value: number, index: number) => {
        const bubble = bubbleData[index];
        const isFocused = index === focusedIndex;
        const bubbleColor = isFocused ? '#4f6cff' : '#8aa4ff';
        const bubbleSize = bubble.size * (isFocused ? 2.0 : 1.4);

        return (
          <G key={index}>
            <Circle
              cx={x(index)}
              cy={y(value)}
              r={bubbleSize}
              fill={bubbleColor}
              stroke="#fff"
              strokeWidth={2}
            />
            {isFocused && (
              <TextSvg
                x={x(index)}
                y={y(value) - bubbleSize - 8}
                fontSize={12}
                fill="#333"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {`Y: ${bubble.y}`}
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
      <Text style={styles.header}>Performance Bubble Chart</Text>

      <FocusableCard>
        <View style={styles.chartWrapper}>
          <View style={{ height: 320, flexDirection: 'row', paddingVertical: 16 }}>
            <YAxis
              data={yValues}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fill: '#555', fontSize: 10 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={yValues}
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
            🎯 Focused: {xLabels[focusedIndex]} → {yValues[focusedIndex]} | Size:{' '}
            {bubbleData[focusedIndex].size}
          </Text>
          <Text style={styles.hintText}>Use Left / Right / OK to navigate bubbles</Text>
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