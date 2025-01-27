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
import Text from '../common/heading';
import R from '../../res/R';
import LottieView from 'lottie-react-native';

export interface IProps {
  label?: string;
  mode?:boolean
}

const EmptyData: React.FC<IProps> = React.memo(
  ({label,mode}) => {
    // Memoized style calculation to avoid recalculation on every render
    
    
    return (
     <View style={{
      justifyContent:'center',
      alignItems:'center'
     }}>
        <LottieView
            // ref={animation}
            style={styles.lottieIcon}
            source={require('../../res/LottieFile/empty.json')}
            autoPlay={true}
            loop={true}
            
          />
          <Text string={label} type="p" mode={mode} />
     </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to only re-render when necessary
    return (
      prevProps.label === nextProps.label
    );
  },
);

const styles = StyleSheet.create({
    lottieIcon: {
    width:R.unit.scale(200),
    height:R.unit.scale(200)
  },
});

export default EmptyData;
