import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import R from '../../res/R';
import Animated, { FadeInRight } from 'react-native-reanimated';

import ImageComponent from '../common/Image';

export interface IProps {
  onPress?: () => void;
  item:any; // Ensure item has an id and uri
  index: number;
  mode: boolean;
}

const TrendingWallCard: React.FC<IProps> = React.memo(
  ({ onPress, item, index, mode }) => {
    const delay = index < 6 ? 200 * index : 300;

    return (
      <Animated.View
        entering={FadeInRight.delay(delay).duration(300).springify()}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.card,
            {
              marginLeft: index === 0 ? R.unit.scale(10) : 0,
              marginRight: R.unit.scale(10),
            },
          ]}>
          {/* Ensure the SharedElement ID is unique */}
         
            <ImageComponent url={item} mode={mode} style={styles.image} />
          
        </TouchableOpacity>
      </Animated.View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.index === nextProps.index &&
    prevProps.mode === nextProps.mode &&
    prevProps.item === nextProps.item &&
    prevProps.onPress === nextProps.onPress
);

export default TrendingWallCard;

const styles = StyleSheet.create({
  card: {
    width: R.unit.scale(120),
    height: R.unit.scale(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(10),
    overflow:'hidden'
  },
  sharedElement: {
    width: R.unit.scale(140),
    height: R.unit.scale(200),
    borderRadius: R.unit.scale(10),
    
  },
image:{
  resizeMode:'cover',
  borderRadius: R.unit.scale(10),
}
});
