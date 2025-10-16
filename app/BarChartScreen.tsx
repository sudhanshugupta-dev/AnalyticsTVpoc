import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  useTVEventHandler,
} from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Text as SvgText, Rect } from 'react-native-svg';
import { barData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function BarChartScreen() {
  // Extract chart data
  const data = barData.map(item => item.users);
  const labels = barData.map(item => item.day);

  // Track focused bar index
  const [focusedBar, setFocusedBar] = useState<number>(0);

  const CUT_OFF = 20;

  // Label above bars
  const Labels = ({ x, y, bandwidth, data }: any) =>
    data.map((value: number, index: number) => (
      <SvgText
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? 'white' : '#333'}
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {value}
      </SvgText>
    ));

  // Highlight the currently focused bar
  const FocusHighlight = ({ x, y, bandwidth, data }: any) => {
    if (focusedBar == null) return null;
    return (
      <Rect
        x={x(focusedBar)}
        y={y(data[focusedBar])}
        width={bandwidth}
        height={y(0) - y(data[focusedBar])}
        fill="rgba(255, 215, 0, 0.25)"
        stroke="#FFD700"
        strokeWidth={3}
        rx={6}
        ry={6}
      />
    );
  };

  // ✅ TV Remote event handler
  const tvEventHandler = (evt: any) => {
    if (!evt) return;

    switch (evt.eventType) {
      case 'right':
        setFocusedBar(prev => (prev + 1) % data.length);
        break;
      case 'left':
        setFocusedBar(prev => (prev - 1 + data.length) % data.length);
        break;
      case 'select':
        console.log(`✅ Selected: ${labels[focusedBar]} → ${data[focusedBar]} users`);
        break;
      default:
        break;
    }
  };

  // Attach the handler to the TV event system
  useTVEventHandler(tvEventHandler);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Daily Users (Bar Chart)</Text>

      <View style={styles.chartWrapper}>
        <View style={{ height: 300, flexDirection: 'row', paddingVertical: 16 }}>
          {/* Y Axis */}
          <YAxis
            data={data}
            svg={{ fill: '#333', fontSize: 12 }}
            numberOfTicks={5}
            formatLabel={(value: any) => `${value}`}
          />

          {/* Bar Chart with focus highlight */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1 }}
              data={data}
              svg={{ fill: '#4f6cff', fillOpacity: 0.9 }}
              contentInset={{ top: 20, bottom: 20 }}
              spacingInner={0.3}
              spacingOuter={0.2}
              gridMin={0}
            >
              <Grid svg={{ stroke: '#e0e0e0', strokeWidth: 1 }} />
              <FocusHighlight />
              <Labels />
            </BarChart>

            {/* X Axis Labels */}
            <XAxis
              style={{ marginTop: 10 }}
              data={data}
              formatLabel={(value: any, index: any) => labels[index]}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 14, fill: '#333' }}
            />
          </View>
        </View>

        {/* Info Display */}
        <View style={styles.navigationContainer}>
          <Text style={styles.infoText}>
            {`${labels[focusedBar]}: ${data[focusedBar]} users`}
          </Text>
          <Text style={styles.hintText}>
            Use ← → on remote to change focus | OK to select
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
    fontSize: 28,
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
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f6cff',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#777',
  },
});
