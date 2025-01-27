import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '../../res/R';
import Animated, {FadeInRight} from 'react-native-reanimated';

export interface itemProps {
  id: string;
  name: string;
  colorCode: string;
}

 interface IProps {
  onPress?: (item: itemProps | undefined) => void;
  item?: itemProps;
  index?: number;
}

const ColorCard: React.FC<IProps> = React.memo(({onPress, item, index}) => {
  const delay = index != null && index < 6 ? 200 * index : 300;

  const handlePress = useCallback(() => {
    if (onPress) onPress(item);
  }, [onPress]);

  return (
    <Animated.View
      entering={FadeInRight.delay(delay).duration(300).springify()}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.card,
          {
            marginLeft: index === 0 ? R.unit.scale(10) : 0,
            marginRight: R.unit.scale(10),
            backgroundColor: item?.colorCode,
          },
        ]}
      />
    </Animated.View>
  );
});

export default ColorCard;

const styles = StyleSheet.create({
  card: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(10),
  },
});
