import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import Animated, {FadeInDown} from 'react-native-reanimated';
import ImageComponent from '../common/Image';
import ImageBackgroundWithOverlay from '../common/ImageBackgroundWithOverlay';
import Text from '../common/heading';

export interface IProps {
  onPress?: any;
  item: {
    id: string;
    name: string;
    thumbnail: string;
    color: string;
  };
  index?: any;
  mode?: boolean;
}

const HomeCategoryCard: React.FC<IProps> = React.memo(
  ({onPress, item, index, mode}) => {
    const delay = index < 6 ? 200 * index : 300;
    const handlePress = useCallback(() => {
      if (onPress) onPress();
    }, [onPress]);
    return (
      <Animated.View
        entering={FadeInDown.delay(delay).duration(300).springify()}
        style={[
          styles.card,
          {
            marginLeft: index % 2 == 0 ? R.unit.scale(10) : 0,
            marginRight: index % 2 == 1 ? R.unit.scale(10) : R.unit.scale(5),
          },
        ]}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <ImageBackgroundWithOverlay
            gradientColors={[item.color, R.color.transparent]}
            source={{uri: item?.thumbnail}}>
            <Text
              string={item?.name}
              type="label"
              mode={true}
              textStyle={{
                textTransform: 'uppercase',
                paddingLeft: R.unit.scale(10),
                paddingTop: R.unit.scale(4),
                width:'70%',
               
              }}
            />
          </ImageBackgroundWithOverlay>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

export default HomeCategoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1, // Ensure each item takes full width of its column
    height: R.unit.scale(80), // Fixed height for the items
    backgroundColor: R.color.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(5),
    marginBottom: R.unit.scale(5),
    overflow: 'hidden',
  },
});
