import React, { useState } from 'react';
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
const BAR_WIDTH = 50; // width of each bar

export default function DynamicBarChart() {
  const data = barData.map(item => item.users);
  const labels = barData.map(item => item.day);
  const [focusedBar, setFocusedBar] = useState<number>(0);

  // 1️⃣ Normalize values for UI clarity (optional)
  const maxValue = Math.max(...data);
  const normalizedData = data.map(value => (value / maxValue) * maxValue);

  // TV Remote handler
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
        console.log(`Selected: ${labels[focusedBar]} → ${data[focusedBar]} users`);
        break;
      default:
        break;
    }
  };
  useTVEventHandler(tvEventHandler);

  // Dynamic chart width
  const chartWidth = Math.max(screenWidth - 100, data.length * BAR_WIDTH);

  // Labels above bars
  const Labels = ({ x, y, bandwidth, data }: any) =>
    data.map((value: number, index: number) => (
      <SvgText
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < maxValue / 4 ? y(value) - 12 : y(value) + 15}
        fontSize={14}
        fill={value >= maxValue / 4 ? 'white' : '#333'}
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {data[index]}
      </SvgText>
    ));

  // Highlight focused bar
  const FocusHighlight = ({ x, y, bandwidth, data }: any) => {
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Daily Users (Bar Chart)</Text>

      <View style={styles.chartWrapper}>
        <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
          {/* Y Axis */}
          <YAxis
            data={data}
            svg={{ fill: '#333', fontSize: 12 }}
            numberOfTicks={5}
            contentInset={{ top: 20, bottom: 20 }}
            formatLabel={(value: any) => `${value}`}
          />

          {/* Horizontal Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ width: chartWidth, marginLeft: 10 }}>
              <BarChart
                style={{ height: 300 }}
                data={normalizedData}
                svg={{ fill: '#4f6cff', fillOpacity: 0.9 }}
                contentInset={{ top: 20, bottom: 20 }}
                spacingInner={0.3}
                spacingOuter={0.2}
                gridMin={0}
              >
                <Grid svg={{ stroke: '#e0e0e0', strokeWidth: 1 }} />
                <FocusHighlight />
                <Labels data={data} />
              </BarChart>

              {/* X Axis */}
              <XAxis
                style={{ marginTop: 10 }}
                data={data}
                formatLabel={(value: any, index: any) => labels[index]}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 14, fill: '#333' }}
              />
            </View>
          </ScrollView>
        </View>

        {/* Info and Hint */}
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
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  contentContainer: { padding: 20, alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  chartWrapper: { backgroundColor: '#fff', borderRadius: 16, padding: 20, minWidth: screenWidth - 100, alignSelf: 'center' },
  navigationContainer: { marginTop: 20, alignItems: 'center' },
  infoText: { fontSize: 20, fontWeight: 'bold', color: '#4f6cff', marginBottom: 10 },
  hintText: { fontSize: 14, color: '#777' },
});
