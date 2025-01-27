import React, {useEffect, useRef, useMemo, useCallback} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import {scrollHeight} from '../../utils/constant';
import LottieView from 'lottie-react-native';
import Text from '../common/heading';

export interface IProps {
  mode?: boolean;
  navigation?: any;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  title?: string;
  titlePosition?: 'center' | 'left' | 'right';
  onLeftPress?: () => void;
  onCenterPress?: () => void;
  onRightPress?: () => void;
  titleStyle?: object;
  containerStyle?: object;
  onThemeChange?: () => void;
  scrollY?: any;

  
}

const ScrollHideHeader: React.FC<IProps> = React.memo(
  ({containerStyle, mode, onThemeChange, scrollY}) => {
    const animation = useRef<LottieView>(null);
    const diffClamp = useMemo(() => Animated.diffClamp(scrollY, 0, scrollHeight), [scrollY]);

    const translateY = useMemo(() => 
      diffClamp.interpolate({
        inputRange: [0, scrollHeight],
        outputRange: [0, -scrollHeight],
      }), [diffClamp]
    );

    useEffect(() => {
      if (animation.current) {
        if (mode) {
          animation.current.play(0, 120);
        } else {
          animation.current.play(120, 250);
        }
      }
    }, [mode, animation.current]);
    

    const themeStyle = useMemo(() => ({
      backgroundColor: mode ? R.color.blacktransparent0 : R.color.whitetransparent0,
    }), [mode]);

   

    return (
      <Animated.View
    
        style={[
          styles.header,
          containerStyle,
          {transform: [{translateY}], ...themeStyle},
        ]}>
        <Text string={'Wall Realm'} mode={mode} type="h3" />
        <TouchableOpacity activeOpacity={0.9} onPress={onThemeChange}>
          <LottieView
            duration={1500}
            ref={animation}
            style={styles.lottieIcon}
            source={require('../../res/LottieFile/dm.json')}
            autoPlay={false}
            loop={false}
            
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

export default ScrollHideHeader;

const styles = StyleSheet.create({
  header: {
    height: R.unit.scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(10),
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  lottieIcon: {
    width: R.unit.scale(30),
    height: R.unit.scale(30),
  },
});
