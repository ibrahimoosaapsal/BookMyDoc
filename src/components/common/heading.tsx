import React from 'react';
import {
  View,
  Text as TextR,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import R from '../../res/R';

export interface IProps {
  string: string | number | undefined;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  mode?: boolean;
  requierd?: boolean;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'p2' | 'p3' | 'p4' | 'label';
  colorTone?: 'normal' | 'light';
  numberOfLines?: number;
  visible?:boolean
}

const Text: React.FC<IProps> = ({
  string,
  containerStyle,
  textStyle,
  mode,
  type,
  numberOfLines,
  colorTone,
  visible=true
}) => {
  // Function to determine text styles based on type
  const getTextStyle = () => {
    switch (type) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'h6':
        return styles.h6;
      case 'p':
        return styles.p;
      case 'p2':
        return styles.p2;
      case 'p3':
        return styles.p3;
      case 'p4':
        return styles.p4;
      case 'label':
        return styles.label;
      default:
        return styles.p; // Default to paragraph style
    }
  };

  const getColorTone = () => {
    switch (colorTone) {
      case 'light':
        return mode ? R.color.gray8 : R.color.gray8;
      case 'normal':
        return mode ? R.color.white : R.color.black;
      default:
        return mode ? R.color.white : R.color.black;
    }
  };

  return (
    <View style={[styles.container, containerStyle,{
      display:visible?'flex':'none'
    }]}>
      <TextR
        numberOfLines={numberOfLines}
        style={[
          getTextStyle(),
          
          {
            color: getColorTone(), // Example color handling based on mode
          },
          textStyle
        ]}>
        {string}
      </TextR>
    </View>
  );
};

export default Text;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
  },
  h1: {
    fontSize: R.unit.fontSize(2.07),
    fontWeight: 'bold',
  },
  h2: {
    fontSize: R.unit.fontSize(1.82),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: R.unit.fontSize(1.55),
    fontWeight: 'bold',
  },
  h4: {
    fontSize: R.unit.fontSize(1.19),
    fontWeight: '500',
  },
  h5: {
    fontSize: R.unit.fontSize(1.08),
    fontWeight: '600',
  },
  h6: {
    fontSize: R.unit.fontSize(0.95),
    fontWeight: '500',
  },
  p: {
    fontSize: R.unit.fontSize(0.84),
    fontWeight: '400',
  },
  p2: {
    fontSize: R.unit.fontSize(0.88),
    fontWeight: '400',
  },
  p3: {
    fontSize: R.unit.fontSize(0.92),
    fontWeight: '400',
  },
  p4: {
    fontSize: R.unit.fontSize(0.95),
    fontWeight: '400',
  },
  label: {
    fontSize: R.unit.fontSize(0.75),
    fontWeight: '500',
  },
});
