import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart as SVCBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Rect, Text as SvgText } from 'react-native-svg';

interface BarChartProps {
  data: number[];
  labels: string[];
  focusedIndex: number;
  onFocusChange: (index: number) => void;
  onSelect?: (index: number) => void;
  barColor?: string;
  highlightColor?: string;
  width?: number | string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  labels,
  focusedIndex,
  onFocusChange,
  onSelect,
  barColor = '#ff6f61',
  highlightColor = '#FFD700',
  width = '100%',
  height = 300,
}) => {
  const maxValue = Math.max(...data);
  const barWidth = 40;

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

  const FocusHighlight = ({ x, y, bandwidth, data }: any) => {
    return (
      <Rect
        x={x(focusedIndex)}
        y={y(data[focusedIndex])}
        width={bandwidth}
        height={y(0) - y(data[focusedIndex])}
        fill={`rgba(255, 215, 0, 0.15)`}
        stroke={highlightColor}
        strokeWidth={2}
        rx={6}
        ry={6}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingVertical: 16, width: '100%' }}>
        <YAxis
          data={data}
          svg={{ fill: '#333', fontSize: 12 }}
          numberOfTicks={5}
          contentInset={{ top: 20, bottom: 20 }}
          formatLabel={(value: any) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <SVCBarChart
            style={{ height, width: '100%' }}
            data={data}
            svg={{ fill: barColor }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
            spacingInner={0.4}
            spacingOuter={0.2}
            gridMin={0}
          >
            <Grid />
            <Labels />
            <FocusHighlight />
          </SVCBarChart>

          <XAxis
            style={{ marginTop: 10, height: 20 }}
            data={labels}
            formatLabel={(value: number) => labels[value]}
            contentInset={{ left: 10, right: 10 }}
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

export default BarChart;
