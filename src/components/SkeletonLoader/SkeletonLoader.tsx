import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';


const SkeletonLoader: React.FC<{ width: any; height: any, mode:any }> = ({
  width,
  height,
  mode
}) => {
  
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      }),
      Infinity,
      true
    );

    // Cleanup function
    return () => {
      animatedValue.value = 0; // Reset the animated value on unmount
    };
  }, [animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = animatedValue.value
      ? mode
        ? '#c0c0c0'
        : '#777'
      : mode
      ? '#e0e0e0'
      : '#555';

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height },
        animatedStyle, // Use the animated style
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 8,
    margin: 10,
  },
});

export default SkeletonLoader;
