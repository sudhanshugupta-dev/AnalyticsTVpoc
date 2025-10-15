import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useTVEventHandler } from 'react-native';
import { AreaChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as shape from 'd3-shape';
import { FocusableCard } from '../components/FocusableCard';
import { lineData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function AreaChartScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const data = lineData.map(item => item.duration);
  const labels = lineData.map(item => item.day);

  // ✅ Modern TV event hook
  const tvEventHandler = (evt: any) => {
    if (!evt) return;

    console.log('🎮 TV Event fired:', evt.eventType);

    switch (evt.eventType) {
      case 'right':
        setFocusedIndex(prev => (prev + 1) % data.length);
        break;
      case 'left':
        setFocusedIndex(prev => (prev - 1 + data.length) % data.length);
        break;
      case 'select':
        console.log(`✅ Selected: ${labels[focusedIndex]} → ${data[focusedIndex]}`);
        break;
      default:
        console.log('Other event:', evt.eventType);
        break;
    }
  };

  // Attach event handler
  useTVEventHandler(tvEventHandler);

  const Decorator = ({ x, y, data }: any) =>
    data.map((value: number, index: number) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={index === focusedIndex ? 7 : 4}
        stroke={index === focusedIndex ? '#ff6f61' : '#999'}
        strokeWidth={2}
        fill={index === focusedIndex ? '#ff6f61' : '#fff'}
      />
    ));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Active Users (Area Chart)</Text>
      <FocusableCard>
        <View style={styles.chartWrapper}>
          <View style={{ height: 280, flexDirection: 'row', paddingVertical: 16 }}>
            <YAxis
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fill: '#555', fontSize: 10 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AreaChart
                style={{ flex: 1 }}
                data={data}
                svg={{
                  fill: 'url(#gradient)',
                  stroke: '#ff6f61',
                  strokeWidth: 2,
                }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={shape.curveNatural}>
                <Grid svg={{ stroke: '#e0e0e0' }} />
                <Decorator />
                <Defs key={'gradient'}>
                  <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                    <Stop offset={'0%'} stopColor={'#ff6f61'} stopOpacity={0.8} />
                    <Stop offset={'100%'} stopColor={'#ff6f61'} stopOpacity={0.1} />
                  </LinearGradient>
                </Defs>
              </AreaChart>
              <XAxis
                style={{ marginTop: 10 }}
                data={data}
                formatLabel={(value, index) => labels[index]}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: '#333' }}
              />
            </View>
          </View>
          <Text style={styles.valueLabel}>
            ▶ Focused: {labels[focusedIndex]} → {data[focusedIndex]}
          </Text>
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
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minWidth: screenWidth - 100,
    alignSelf: 'center',
  },
  valueLabel: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#ff6f61',
    fontWeight: '600',
  },
});