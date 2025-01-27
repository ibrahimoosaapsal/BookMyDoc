import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import Animated, {FadeInRight} from 'react-native-reanimated';
import ImageComponent from '../common/Image';
import ImageBackgroundWithOverlay from '../common/ImageBackgroundWithOverlay';
import Text from '../common/heading';

export interface IProps {
  onPress?: () => void;
  item: any; // Ensure item has an id and uri
  index: number;
  mode: boolean;
}

const SubCategoryCard: React.FC<IProps> = React.memo(
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
          <ImageBackgroundWithOverlay
           start={{x: 0.5, y:0}}
           end={{x: 0.6, y: 0}}
            gradientColors={[item?.color, R.color.transparent]}
            source={{uri: item?.thumbnail}}>
              <Text
              string={item?.name}
              type="h3"
              mode={true}
              textStyle={{
                textTransform: 'capitalize',
                paddingLeft: R.unit.scale(10),
                paddingTop: R.unit.scale(4),
                // fontWeight:'700',
                width:'60%',
               
              }}
            />
            </ImageBackgroundWithOverlay>
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

export default SubCategoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1, // Ensure each item takes full width of its column
    height: R.unit.scale(130), // Fixed height for the items
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(5),
    marginBottom: R.unit.scale(10),
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
