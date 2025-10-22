import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface GaugeChartProps {
  value: number; // 0-100
  maxValue?: number;
  radius?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showValue?: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue = 100,
  radius = 100,
  strokeWidth = 20,
  color = '#4f6cff',
  backgroundColor = '#e0e0e0',
  showValue = true,
}) => {
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;
  const svgSize = radius * 2 + strokeWidth + 20;

  return (
    <View style={styles.container}>
      <Svg width={svgSize} height={svgSize}>
        <G rotation="-90" origin={`${svgSize / 2}, ${svgSize / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Arc */}
          <Circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${progress}, ${circumference}`}
            strokeLinecap="round"
          />
        </G>
        {/* Value Label */}
        {showValue && (
          <SvgText
            x={svgSize / 2}
            y={svgSize / 2 + 10}
            fontSize={32}
            fontWeight="bold"
            fill={color}
            textAnchor="middle"
          >
            {Math.round(value)}%
          </SvgText>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GaugeChart;
