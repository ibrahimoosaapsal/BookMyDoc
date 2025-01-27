import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import MasonryCard from '../../components/Card/MasonryCard';
import {categories} from '../../utils/test';
import R from '../../res/R';
import {useThemeStore} from '../../store/reduxHooks';
import ScrollMoveHeader from '../../components/Header/ScrollMoveHeader';
import SubCategoryCard from '../../components/Card/SubCategoryCard';

const HEADER_MAX_HEIGHT = R.unit.scale(110);
const HEADER_MIN_HEIGHT = R.unit.scale(50);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SubCategory: React.FC = ({navigation, route}: any) => {
  const data = route.params;
  const list = route.params?.subCategory ||[];
  const {theme} = useThemeStore();
  const [iconName, setIconName] = useState('close'); // Manage icon name in React state

  // Shared value to track scroll position
  const scrollY = useSharedValue(0);

  // Scroll handler to update scroll position and icon state
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y > HEADER_SCROLL_DISTANCE) {
        runOnJS(setIconName)('arrow-back');
      } else {
        runOnJS(setIconName)('close');
      }
    },
  });

  // Memoized renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <SubCategoryCard
        item={item}
        mode={true}
        index={index}
        onPress={() => {
          navigation.navigate('Walllist', data);
        }}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <ScrollMoveHeader
        onPress={() => navigation.goBack()}
        HEADER_SCROLL_DISTANCE={HEADER_SCROLL_DISTANCE}
        scrollY={scrollY}
        mode={theme.mode}
        iconName={iconName}
        Heading={data?.name}
        HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
        HEADER_MIN_HEIGHT={HEADER_MIN_HEIGHT}
      />

      {/* FlatList */}
      <Animated.FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        initialNumToRender={10}
        maxToRenderPerBatch={16}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: R.unit.scale(130),
    marginHorizontal: R.unit.scale(10),
  },
});

export default SubCategory;
