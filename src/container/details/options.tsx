import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import R from '../../res/R';
import Text from '../../components/common/heading';
import Animated, {FadeInRight} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export interface Iprops {
  onLikePress: any;
  onSharePress: any;
  isLiked: boolean;
}

const Options: React.FC<Iprops> = React.memo(({onSharePress, isLiked, onLikePress}) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    if (animation.current) {
      if ( isLiked) {
        animation.current.play(2, 130);
      } else {
        animation.current.play(0, 1);
      }
    }
  }, [animation.current, isLiked]);
  console.log('isLiked', isLiked);
  return (
    <Animated.View
      entering={FadeInRight.delay(500).duration(300).springify()}
      style={styles.main}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => onLikePress()}>
        <LottieView
          duration={1500}
          ref={animation}
          style={styles.lottieIcon}
          source={require('../../res/LottieFile/likeheart.json')}
          autoPlay={false}
          loop={false}
        />
        <Text mode={true} string="Like" type="label" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSharePress}
        activeOpacity={0.8}
        style={styles.button}>
        <Ionicons
          name="arrow-redo"
          color={R.color.white}
          size={R.unit.fontSize(2.15)}
        />
        <Text mode={true} string="Share" type="label" />
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    right: R.unit.scale(10),
    bottom: Platform.OS == 'android' ? R.unit.scale(105) : R.unit.scale(150),
    zIndex: 1,
  },
  button: {
    width: R.unit.scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: R.unit.scale(30),
    shadowColor: R.color.black,
    ...R.commonStyle.shadow2,
  },
  lottieIcon: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    shadowColor: R.color.black,
    ...R.commonStyle.shadow2,
  },
});

export default Options;
