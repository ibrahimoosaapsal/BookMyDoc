import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  ReduceMotion,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface IProps {
  mode?: boolean;
  scrollY?: any;
  iconName?: any;
  HEADER_MIN_HEIGHT: any;
  HEADER_MAX_HEIGHT: any;
  HEADER_SCROLL_DISTANCE: any;
  onPress: any;
  Heading: string;
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ScrollMoveHeader: React.FC<IProps> = React.memo(
  ({
    mode,
    scrollY,
    iconName,
    HEADER_MIN_HEIGHT,
    HEADER_MAX_HEIGHT,
    HEADER_SCROLL_DISTANCE,
    onPress,
    Heading,
  }) => {
    const bgHeader = mode
      ? R.color.blacktransparent0
      : R.color.whitetransparent0;

    // Animated header style that adjusts height and background color
    const headerStyle = useAnimatedStyle(() => {
      const height = withSpring(
        Math.max(HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT - scrollY.value),
        {duration: 10},
      );

      const backgroundColor = interpolateColor(
        scrollY.value,
        [0, HEADER_SCROLL_DISTANCE],
        [R.color.transparent, bgHeader],
      );

      return {
        height,
        backgroundColor,
      };
    });

    // Animated title style that adjusts scale, translateY, and marginLeft
    const titleStyle = useAnimatedStyle(() => {
      const scale = withSpring(
        scrollY.value > HEADER_SCROLL_DISTANCE ? 0.65 : 1,
        {
          duration: 150,
          dampingRatio: 1.8,
          stiffness: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
          reduceMotion: ReduceMotion.System,
        },
      );
      const translateY = withSpring(
        scrollY.value > HEADER_SCROLL_DISTANCE ? 0 : 30,
        {
          duration: 150,
          dampingRatio: 1.8,
          stiffness: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
          reduceMotion: ReduceMotion.System,
        },
      );
      const marginLeft = withSpring(
        scrollY.value > HEADER_SCROLL_DISTANCE ? 35 : 20,
        {
          duration: 150,
          dampingRatio: 1.8,
          stiffness: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
          reduceMotion: ReduceMotion.System,
        },
      );

      return {
        transform: [{scale}, {translateY}],
        marginLeft,
      };
    });

    // Animated icon style: transition from right to left
    const iconStyle = useAnimatedStyle(() => {
      const left = withSpring(
        scrollY.value > HEADER_SCROLL_DISTANCE ? 10 : SCREEN_WIDTH - 55,
        {damping: 17},
      );

      return {
        left,
      };
    });

    const handlePress = useCallback(() => {
      if (onPress) onPress();
    }, [onPress]);

    return (
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text
          style={[
            styles.headerTitle,
            titleStyle,
            {
              color: mode ? R.color.white : R.color.black15,
            },
          ]}>
          {Heading}
        </Animated.Text>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: R.unit.scale(4),
              alignSelf: 'center',
              zIndex: 2,
            },
            iconStyle,
          ]}>
          <TouchableOpacity
            style={{
              padding: R.unit.scale(10),
            }}
            onPress={handlePress}>
            <Ionicons
              name={iconName}
              color={mode ? R.color.white : R.color.black}
              size={R.unit.scale(24)}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  },
);

export default ScrollMoveHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerTitle: {
    ...R.commonStyle.h2,
    fontWeight: '400',
    zIndex: 3,
  },
});
