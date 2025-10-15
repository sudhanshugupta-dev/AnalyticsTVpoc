import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Text as SvgText, Rect } from 'react-native-svg';
import { barData } from '../data/dummy_data';

const screenWidth = Dimensions.get('window').width;

export default function BarChartScreen() {
  const data = barData.map(item => item.users);
  const labels = barData.map(item => item.day);

  // Default first bar selected
  const [focusedBar, setFocusedBar] = useState<number>(0);

  const CUT_OFF = 20;

  const Labels = ({ x, y, bandwidth, data }: any) => (
    data.map((value: number, index: number) => (
      <SvgText
        key={index}
        x={x(index) + (bandwidth / 2)}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? 'white' : '#333'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
      >
        {value}
      </SvgText>
    ))
  );

  const FocusHighlight = ({ x, y, bandwidth, data }: any) => (
    focusedBar !== null ? (
      <Rect
        x={x(focusedBar)}
        y={y(data[focusedBar])}
        width={bandwidth}
        height={y(0) - y(data[focusedBar])}
        fill="rgba(255, 215, 0, 0.3)"
        stroke="#FFD700"
        strokeWidth={3}
      />
    ) : null
  );

  // TV Remote navigation handlers
  const moveNext = () => setFocusedBar(prev => (prev < data.length - 1 ? prev + 1 : prev));
  const movePrev = () => setFocusedBar(prev => (prev > 0 ? prev - 1 : prev));

  useEffect(() => {
    // Optional: Add TV remote key event listeners if needed
    // e.g., using react-native-tv-event-handler
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Daily Users (Bar Chart)</Text>
      <View style={styles.chartWrapper}>
        <View style={{ height: 300, flexDirection: 'row', paddingVertical: 16 }}>
          <YAxis
            data={data}
            svg={{
              fill: '#333',
              fontSize: 12,
            }}
            numberOfTicks={5}
            formatLabel={(value: any) => `${value}`}
          />
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
            <XAxis
              style={{ marginTop: 10 }}
              data={data}
              formatLabel={(value: any, index: any) => labels[index]}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 14, fill: '#333' }}
            />
          </View>
        </View>

        {/* Navigation Buttons for TV Remote Simulation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.infoText}>
            {focusedBar !== null
              ? `${labels[focusedBar]}: ${data[focusedBar]} users`
              : 'Use remote to select a bar'}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={movePrev}
            >
              <Text style={styles.navButtonText}>◀ Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={moveNext}
            >
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  chartWrapper: {
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
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  navButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#4f6cff',
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});