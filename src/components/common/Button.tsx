import React, {useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Text from './heading'; // assuming this is a custom Text component
import R from '../../res/R';

export interface IProps {
  onApply?: () => void;
  title?: string;
  component?: 'transparent' | 'fill' | 'outline';
  width?: 'full' | 'auto' | undefined;
  loading?: boolean;
  percentage?: any;
  style?: {
    button?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
    progressBar?: StyleProp<ViewStyle>;
  };
}

const Button: React.FC<IProps> = React.memo(
  ({onApply, title, component, width, loading, percentage, style}) => {
    // Memoized style calculation to avoid recalculation on every render
    const getButtonStyle = useCallback((): ViewStyle => {
      let buttonStyle: ViewStyle = {
        backgroundColor: loading ? R.color.primary2 : R.color.primary,
        ...styles.buttonBase,
      };

      switch (component) {
        case 'transparent':
          buttonStyle = {
            ...buttonStyle,
            ...styles.transparentButton,
            ...(style?.button as ViewStyle),
          };
          break;
        case 'fill':
          buttonStyle = {
            ...buttonStyle,
            ...styles.fillButton,
            ...(style?.button as ViewStyle),
          };
          break;
        case 'outline':
          buttonStyle = {
            ...buttonStyle,
            ...styles.outlineButton,
            ...(style?.button as ViewStyle),
          };
          break;
      }

      // Handle width dynamically
      if (width === 'full') {
        buttonStyle.width = '100%';
      } else if (width === 'auto') {
        buttonStyle.width = 'auto';
      } else if (typeof width === 'string') {
        buttonStyle.width = width;
      } else {
        buttonStyle.width = width;
      }

      return buttonStyle;
    }, [component, width, style?.button]);

    // Memoized callback for handling the press
    const handlePress = useCallback(() => {
      if (!loading && onApply) {
        onApply();
      }
    }, [loading, onApply]);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={getButtonStyle()}
        disabled={loading}>
        <View style={styles.innerContainer}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              string={percentage > 0 ? `${percentage}%` : title}
              type="p"
              mode={true}
              textStyle={{
                ...(style.text as TextStyle),
              }}
            />
          )}
        </View>
        {component === 'fill' && percentage > 0 && percentage < 100 && (
          <View
            style={[
              styles.progressBar,
              {width: `${percentage}%`},
              style?.progressBar as ViewStyle,
            ]}
          />
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to only re-render when necessary
    return (
      prevProps.title === nextProps.title &&
      prevProps.component === nextProps.component &&
      prevProps.width === nextProps.width &&
      prevProps.loading === nextProps.loading &&
      prevProps.percentage === nextProps.percentage &&
      prevProps.onApply === nextProps.onApply &&
      JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)
    );
  },
);

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: R.unit.scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  transparentButton: {
    backgroundColor: 'transparent',
  },
  fillButton: {
    backgroundColor: R.color.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: R.color.primary,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: '#fff',
  },
});

export default Button;
