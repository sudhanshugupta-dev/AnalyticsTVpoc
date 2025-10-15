import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, useTVEventHandler } from 'react-native';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';
import { FocusableCard } from '../components/FocusableCard';

const screenWidth = Dimensions.get('window').width;
const radius = 100; // radius of gauge
const strokeWidth = 20; // thickness of gauge

export default function GaugeChartScreen() {
  const [value, setValue] = useState(50); // initial value 0-100

  const tvHandler = (evt: any) => {
    if (!evt) return;
    const t = evt.eventType;
    if (t === 'right') setValue(prev => Math.min(prev + 5, 100));
    else if (t === 'left') setValue(prev => Math.max(prev - 5, 0));
    else if (t === 'select') console.log('Selected value:', value);
  };
  useTVEventHandler(tvHandler);

  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Progress / Gauge Chart</Text>
      <FocusableCard>
        <View style={styles.chartWrapper}>
          <Svg width={radius * 2 + 40} height={radius * 2 + 40}>
            <G rotation="-90" origin={`${radius + 20}, ${radius + 20}`}>
              {/* Background Circle */}
              <Circle
                cx={radius + 20}
                cy={radius + 20}
                r={radius}
                stroke="#e0e0e0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Arc */}
              <Circle
                cx={radius + 20}
                cy={radius + 20}
                r={radius}
                stroke="#4f6cff"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${progress}, ${circumference}`}
                strokeLinecap="round"
              />
            </G>
            {/* Value Label */}
            <SvgText
              x={radius + 20}
              y={radius + 30}
              fontSize={28}
              fontWeight="bold"
              fill="#4f6cff"
              textAnchor="middle"
            >
              {value}%
            </SvgText>
          </Svg>

          <Text style={styles.hintText}>Use Left / Right to adjust, OK to select</Text>
        </View>
      </FocusableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 16,
    padding: 18,
    minWidth: screenWidth - 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
});
