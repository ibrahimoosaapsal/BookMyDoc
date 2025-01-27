import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import R from '../../res/R';
import Animated, {FadeInLeft} from 'react-native-reanimated';

export interface IProps {
  mode: boolean;
  onPress: any;
}

const BackPopupButton: React.FC<IProps> = React.memo(({mode, onPress}) => {
  return (
    <Animated.View
      entering={FadeInLeft.delay(500).duration(600).springify()}
      style={styles.main}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons
          name={'arrow-back'}
          color={R.color.white}
          size={R.unit.scale(24)}
        />
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: R.unit.scale(10),
    left: R.unit.scale(10),
    zIndex: 1,
  },
  button: {
    width: R.unit.scale(40),
    height: R.unit.scale(40),
    borderRadius: R.unit.scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.color.black+'30',
  },
});

export default BackPopupButton;
