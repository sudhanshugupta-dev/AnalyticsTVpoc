import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart as SVCLineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Circle, G, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

interface ScatterData {
  x: string | number;
  y: number;
}

interface ScatterChartProps {
  data: ScatterData[];
  focusedIndex: number;
  onFocusChange: (index: number) => void;
  onSelect?: (index: number) => void;
  pointColor?: string;
  highlightColor?: string;
  height?: number;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  focusedIndex,
  onFocusChange,
  onSelect,
  pointColor = '#999',
  highlightColor = '#4f6cff',
  height = 300,
}) => {
  const yValues = data.map(d => d.y);
  const xLabels = data.map(d => d.x.toString());
  const chartWidth = Math.max(screenWidth - 100, data.length * 60);

  const Decorator = ({ x, y, data: chartData }: any) => (
    <>
      {chartData.map((value: number, index: number) => {
        const isFocused = index === focusedIndex;
        return (
          <G key={index}>
            <Circle
              cx={x(index)}
              cy={y(value)}
              r={isFocused ? 8 : 5}
              stroke={isFocused ? highlightColor : pointColor}
              strokeWidth={2}
              fill={isFocused ? highlightColor : '#fff'}
            />
            {isFocused && (
              <SvgText
                x={x(index)}
                y={y(value) - 14}
                fontSize={12}
                fill="#222"
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {String(value)}
              </SvgText>
            )}
          </G>
        );
      })}
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ height, flexDirection: 'row', paddingVertical: 16, width: chartWidth }}>
          <YAxis
            data={yValues}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fill: '#555', fontSize: 10 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <SVCLineChart
              style={{ flex: 1 }}
              data={yValues}
              svg={{ stroke: 'transparent', strokeWidth: 0 }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid svg={{ stroke: '#e0e0e0' }} />
              <Decorator />
            </SVCLineChart>

            <XAxis
              style={{ marginTop: 10 }}
              data={yValues}
              formatLabel={(value, index) => xLabels[index]}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fontSize: 12, fill: '#333' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ScatterChart;
