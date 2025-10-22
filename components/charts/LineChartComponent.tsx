import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { LineChart as SVCLineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, G, Text as SvgText } from 'react-native-svg';
import * as shape from 'd3-shape';

// Extend ViewStyle to include width as string or number
type CustomViewStyle = ViewStyle & {
  width?: string | number;
  height?: string | number;
};

interface LineChartProps {
  data: number[];
  labels: string[];
  focusedIndex: number;
  onFocusChange: (index: number) => void;
  onSelect?: (index: number) => void;
  lineColor?: string;
  highlightColor?: string;
  width?: number | string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  focusedIndex,
  onFocusChange,
  onSelect,
  lineColor = '#ff6f61',
  highlightColor = '#FFD700',
  width = '100%',
  height = 300,
}) => {
  const Decorator = ({ x, y, data }: any) =>
    data.map((value: number, index: number) => {
      const isFocused = index === focusedIndex;
      return (
        <G key={index}>
          <Circle
            cx={x(index)}
            cy={y(value)}
            r={isFocused ? 8 : 5}
            stroke={isFocused ? highlightColor : lineColor}
            strokeWidth={2}
            fill={isFocused ? highlightColor : 'white'}
          />
          {isFocused && (
            <SvgText
              x={x(index)}
              y={y(value) - 20}
              fontSize={14}
              fill="#333"
              fontWeight="bold"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              {data[index]}
            </SvgText>
          )}
        </G>
      );
    });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingVertical: 16, width: '100%' }}>
        <YAxis
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ fill: '#333', fontSize: 12 }}
          numberOfTicks={5}
          formatLabel={(value: any) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <SVCLineChart
            style={{ height, width: '100%' }}
            data={data}
            svg={{ stroke: lineColor, strokeWidth: 3 }}
            contentInset={{ top: 30, bottom: 30, left: 20, right: 20 }}
            curve={shape.curveNatural}
          >
            <Grid svg={{ stroke: '#e0e0e0', strokeWidth: 1 }} />
            <Decorator />
          </SVCLineChart>

          <XAxis
            style={{ marginTop: 10, height: 20 }}
            data={labels}
            formatLabel={(value: number) => labels[value]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 12, fill: '#333' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default LineChart;
