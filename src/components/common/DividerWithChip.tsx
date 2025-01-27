import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import R from '../../res/R';

// Define the types for the DividerWithChip props
interface DividerWithChipProps {
  title?: string;
  size?: 'small' | 'normal' | 'big';
  lineColor?: string;
  chipColor?: string;
  mode?: boolean;
}

// Custom Divider with Center Chip
const DividerWithChip: React.FC<DividerWithChipProps> = ({
  title,
  size = 'normal',
  lineColor,
  chipColor = R.color.primary,
  mode,
}) => {
  // Determine chip style based on size
  const chipStyles: Record<string, ViewStyle> = {
    small: styles.chipSmall,
    normal: styles.chipNormal,
    big: styles.chipBig,
  };

  return (
    <View style={styles.container}>
      {/* Left Divider Line */}
      <View
        style={[
          styles.line,
          {
            backgroundColor: lineColor
              ? lineColor
              : mode
              ? R.color.gray3
              : R.color.gray11,
          },
        ]}
      />

      {/* Center Chip */}
      {title && (
        <View
          style={[styles.chip, chipStyles[size], {backgroundColor: chipColor}]}>
          <Text style={styles.chipText}>{title}</Text>
        </View>
      )}

      {/* Right Divider Line */}
      <View
        style={[
          styles.line,
          {
            backgroundColor: lineColor
              ? lineColor
              : mode
              ? R.color.gray3
              : R.color.gray11,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  line: {
    flex: 1,
    height: 1,
    backgroundColor: R.color.gray6,
  } as ViewStyle,
  chip: {
    paddingVertical: R.unit.scale(4),
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(16),
    marginHorizontal: R.unit.scale(8),
  } as ViewStyle,
  chipText: {
    color: R.color.white,
    fontWeight: 'bold',
  } as TextStyle,
  chipSmall: {
    paddingVertical: R.unit.scale(2),
    paddingHorizontal: R.unit.scale(6),
    borderRadius: R.unit.scale(12),
    fontSize: R.unit.scale(12),
  } as ViewStyle,
  chipNormal: {
    paddingVertical: R.unit.scale(4),
    paddingHorizontal: R.unit.scale(10),
    borderRadius: R.unit.scale(16),
    fontSize: R.unit.scale(14),
  } as ViewStyle,
  chipBig: {
    paddingVertical: R.unit.scale(8),
    paddingHorizontal: R.unit.scale(16),
    borderRadius: R.unit.scale(20),
    fontSize: R.unit.scale(16),
  } as ViewStyle,
});

export default DividerWithChip;
