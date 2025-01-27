import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import Animated, {FadeInRight} from 'react-native-reanimated';
import ImageComponent from '../common/Image';

export interface IProps {
  onPress?: () => void;
  item: any; // Ensure item has an id and uri
  index: number;
  mode: boolean;
}

const MasonryCard: React.FC<IProps> = React.memo(
  ({onPress, item, index, mode}) => {
    const delay = index < 6 ? (index % 2 === 0 ? 200 : 400) : 300;
    return (
      <Animated.View
        style={[styles.card]}
        entering={FadeInRight.delay(delay).duration(300).springify(2000)}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: '100%',
          }}>
          <ImageComponent
            containerStyle={styles.image}
            url={item?.imageUrl || ''}
            mode={mode}
            style={styles.image}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.index === nextProps.index &&
    prevProps.mode === nextProps.mode &&
    prevProps.item === nextProps.item &&
    prevProps.onPress === nextProps.onPress,
);

export default MasonryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1, // Ensure each item takes full width of its column
    height: R.unit.scale(180), // Fixed height for the items
    maxWidth: R.unit.scale(110),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(5),
    marginBottom: R.unit.scale(5),
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
