import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, useTVEventHandler } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, G, Text as SvgText } from 'react-native-svg';
import * as shape from 'd3-shape';
import { lineData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function LineChartScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0); // default first point
  const data = lineData.map(item => item.duration);
  const labels = lineData.map(item => item.day);

  const Decorator = ({ x, y, data }: any) => {
    return data.map((value: number, index: number) => {
      const isFocused = index === focusedIndex;
      return (
        <G key={index}>
          <Circle
            cx={x(index)}
            cy={y(value)}
            r={isFocused ? 8 : 5} // bigger radius for focused
            stroke={isFocused ? '#FFD700' : '#ff6f61'}
            strokeWidth={2}
            fill={isFocused ? '#FFD700' : 'white'}
          />
          {isFocused && (
            <SvgText
              x={x(index)}
              y={y(value) - 15}
              fontSize={14}
              fill="#333"
              fontWeight="bold"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              {value}
            </SvgText>
          )}
        </G>
      );
    });
  };

  
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
  

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Session Duration (Line Chart)</Text>
      <View style={styles.chartWrapper}>
        <View style={{ height: 280, flexDirection: 'row', paddingVertical: 16 }}>
          <YAxis
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fill: '#333', fontSize: 10 }}
            numberOfTicks={5}
            formatLabel={(value: any) => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={data}
              svg={{ stroke: '#ff6f61', strokeWidth: 3 }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveNatural}
            >
              <Grid svg={{ stroke: '#e0e0e0', strokeWidth: 1 }} />
              <Decorator />
            </LineChart>
            <XAxis
              style={{ marginTop: 10 }}
              data={data}
              formatLabel={(value: any, index: any) => labels[index]}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 12, fill: '#333' }}
            />
          </View>
        </View>

        {/* Info & TV Navigation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.infoText}>
            {`${labels[focusedIndex]}: ${data[focusedIndex]} min`}
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
    textAlign: 'center',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minWidth: screenWidth - 100,
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