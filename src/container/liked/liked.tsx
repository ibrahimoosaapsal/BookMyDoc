import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import R from '../../res/R';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import ScrollMoveHeader from '../../components/Header/ScrollMoveHeader';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import MasonryCard from '../../components/Card/MasonryCard';
import {useLikeStore, useThemeStore} from '../../store/reduxHooks';
import firestore from '@react-native-firebase/firestore';
import EmptyData from '../../components/EmptyData';

interface LikedProps {
  navigation: NavigationProp<any>;
  route: any;
}
const HEADER_MAX_HEIGHT = R.unit.scale(110);
const HEADER_MIN_HEIGHT = R.unit.scale(50);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Liked: React.FC<LikedProps> = ({route, navigation}) => {
  const category = route?.params?.cat;
  const color = route?.params?.color;
  const {likeList, likeLoading, setLike} = useLikeStore();

  const [loading, setLoading] = useState(false);
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
      <MasonryCard
        item={item}
        mode={true}
        index={index}
        onPress={() => {
          navigation.navigate('Details', item);
        }}
      />
    ),
    [],
  );
  const renderEmpty = useCallback(
    () => <EmptyData mode={theme.mode} label="No data found" />,
    [theme.mode],
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
        Heading={'Liked'}
        HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
        HEADER_MIN_HEIGHT={HEADER_MIN_HEIGHT}
      />

      {/* FlatList */}
      <Animated.FlatList
        data={likeList || []}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: R.unit.windowHeight() / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                display: loading ? 'none' : 'flex',
              }}>
              {renderEmpty()}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        numColumns={3}
        columnWrapperStyle={{
          gap: R.unit.scale(5),
          justifyContent: 'center',
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={16}
        windowSize={10}
      />
      <FullScreenLoading visible={loading} label="Loading..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: R.unit.scale(120),
    justifyContent: 'center',
  },
});

export default Liked;
