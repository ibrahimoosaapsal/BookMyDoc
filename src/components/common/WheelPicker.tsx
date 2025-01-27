import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import R from '../../res/R';

const {width} = Dimensions.get('window');

// Updated item sizes and spacing
const ITEM_WIDTH = R.unit.scale(120);
const ITEM_HEIGHT = R.unit.scale(80);
const SPACING = R.unit.scale(5);


export function rangeArray(start:number, end:number) {
  // Ensure the start is less than or equal to the end
  if (start > end) {
    return [];
  }
  
  // Create an array of numbers from start to end
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WheelPicker = () => {
  const items = rangeArray(1,200)
  const [selectedItem, setSelectedItem] = useState(null);
  const flatListRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  // Update the selected item based on the current scroll position
  useEffect(() => {
    const listenerId = scrollX.addListener(({value}) => {
      const index = Math.round(value / (ITEM_WIDTH + SPACING)); // Round to the nearest index
      setSelectedItem(items[index]); // Update selected item based on index
    });

    return () => {
      scrollX.removeListener(listenerId); // Clean up the listener on unmount
    };
  }, [scrollX, items]);

  const onItemPress = (item :any)=> {
    const index = items.indexOf(item);
    flatListRef.current.scrollToIndex({index, animated: true});
    setSelectedItem(item);
  };

  const renderItem = ({item, index}:any) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    // Interpolating opacity from 0.1 (far left/right) to 1 (center) with a larger fade area
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5], // Start fading from 0.1 at the edges
      extrapolate: 'clamp',
    });

    // Scaling the items for a 3D effect
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1.2, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            marginHorizontal: SPACING / 2,
            transform: [{scale}],
            opacity, // Apply opacity change based on scroll position
          }}>
          <Text style={{fontSize: R.unit.scale(47)}}>{item}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>
        Selected Item: {selectedItem || 'None'}
      </Text>

      <AnimatedFlatList
        ref={flatListRef}
        data={rangeArray(1,200)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => index?.toString()}
        renderItem={renderItem}
        snapToInterval={ITEM_WIDTH + SPACING} // Updated to new ITEM_WIDTH and SPACING
        decelerationRate="normal"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingHorizontal: (width - ITEM_WIDTH) / 2}}
      />
      <View
        style={{
          width: (ITEM_WIDTH + SPACING),
          height: ITEM_HEIGHT,
          borderWidth: R.unit.scale(1),
          position:'absolute',
          top:R.unit.scale(45),
          borderRadius:R.unit.scale(5),
        }}
      />
    </View>
  );
};

export default WheelPicker;
