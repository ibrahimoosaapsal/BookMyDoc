import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  Animated,
  ViewStyle,
  TextStyle,
  Easing,
} from 'react-native';
import R from '../../res/R';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  type?: 'outlined' | 'filled' | 'standard';
  required?: boolean;
  validationMode?: 'text' | 'email' | 'password' | 'number';
  multiline?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  animation?: boolean;
  animationDuration?: number;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  mode?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  type = 'standard',
  required = false,
  validationMode,
  multiline = false,
  value,
  onChangeText,
  animation = false,
  animationDuration = 200,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  mode,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: focused || value ? 1 : 0,
      useNativeDriver: false,
      duration: 60,
    }).start();
  }, [focused, value]);

  const handleChangeText = (text: string) => {
    onChangeText(text);

    // Validation logic
    if (required && !text) {
      setError('This field is required');
    } else if (
      validationMode === 'email' &&
      text &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
    ) {
      setError('Please enter a valid email address');
    } else if (validationMode === 'password' && text && text.length < 6) {
      setError('Password must be at least 6 characters');
    } else if (validationMode === 'number' && text && !/^\d+$/.test(text)) {
      setError('Only numeric values are allowed');
    } else {
      setError(null);
    }
  };

  const getInputStyle = () => {
    switch (type) {
      case 'outlined':
        return styles.outlinedInput;
      case 'filled':
        return {
          backgroundColor: mode ? R.color.black15 : R.color.grayE,
        };
      default:
        return styles.standardInput;
    }
  };

  const labelPosition = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [13, -7],
  });

  const labelSize = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 11],
  });

  const labelColorMode = mode ? R.color.white : R.color.gray6;

  const labelColor = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [R.color.gray6, labelColorMode],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && animation ? (
        <Animated.Text
          onPress={() => inputRef.current?.focus()}
          style={[
            styles.animatedLabel,
            {
              top: labelPosition,
              fontSize: labelSize,
              color: labelColor,
              backgroundColor:
                type == 'filled'
                  ? mode
                    ? R.color.black15
                    : R.color.grayE
                  : mode
                  ? R.color.black
                  : R.color.white,
            },
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
      ) : (
        label && <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          getInputStyle(),
          multiline && styles.multiline,
          inputStyle,
          {
            color: mode ? R.color.white : R.color.black,
          },
        ]}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={handleChangeText}
        secureTextEntry={validationMode === 'password'}
        keyboardType={
          validationMode === 'email'
            ? 'email-address'
            : validationMode === 'number'
            ? 'numeric'
            : 'default'
        }
        multiline={multiline}
        {...props}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    fontSize: R.unit.fontSize(0.8),
    color: R.color.gray8,
    marginBottom: R.unit.scale(5),
  },
  animatedLabel: {
    position: 'absolute',
    left: R.unit.scale(12),
    backgroundColor: 'white',
    paddingHorizontal: R.unit.scale(8),
    borderRadius: R.unit.scale(5),
    zIndex: 2,
  },
  input: {
    height: R.unit.scale(50),
    paddingHorizontal: R.unit.scale(12),
    borderRadius: R.unit.scale(4),
    fontSize: R.unit.fontSize(0.88),
  },
  outlinedInput: {
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray5,
  },
  filledInput: {},
  standardInput: {
    borderBottomWidth: R.unit.scale(1),
    borderBottomColor: R.color.gray5,
  },
  multiline: {
    height: R.unit.scale(100),
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: R.unit.fontSize(0.72),
    marginTop: R.unit.scale(5),
  },
});

export default CustomTextInput;
