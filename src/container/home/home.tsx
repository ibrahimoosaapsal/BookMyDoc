import React, {useCallback, useMemo} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
} from 'react-native';
import R from '../../res/R';
import ScrollHideHeader from '../../components/Header/ScrollHideHeader';
import TrendingWallCard from '../../components/Card/TrendingWallCard';
import ColorCard, { itemProps } from '../../components/Card/ColorCard';
import HomeCategoryCard from '../../components/Card/HomeCategoryCard';
import Text from '../../components/common/heading';
import {useThemeStore} from '../../store/reduxHooks';
import HomeHeaderComponent from './HomeHeaderComponent';
import {categories} from '../../utils/test';
import {WallCategoryList} from '../../utils/wall.category';
import {colorList} from '../../utils/color.help';

export interface IProps {
  navigation?: any;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Home: React.FC<IProps> = ({navigation}) => {
  const {theme, setTheme} = useThemeStore();
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const renderHorizontalItem = useCallback(
    ({item, index}: ListRenderItemInfo<string>) => (
      <TrendingWallCard
        item={item}
        index={index}
        mode={theme.mode}
        onPress={() => navigation.navigate('Details', {item})}
      />
    ),
    [theme.mode],
  );
  const handleColorNavigation = useCallback((item:itemProps) => {
    navigation.navigate('Walllist', {
      color: {
        id: item?.colorCode,
        name: item?.name,
      },
    })
  }, []);

  const renderColorCircle = useCallback(
    ({item, index}: ListRenderItemInfo<string>) => (
      <ColorCard item={item} index={index} onPress={handleColorNavigation} />
    ),
    [],
  );

  const renderCategory = useCallback(
    ({item, index}: ListRenderItemInfo<any>) => (
      <HomeCategoryCard
        onPress={() =>
          navigation.navigate('Walllist', {
            cat: {
              id: item?.id,
              name: item?.name,
            },
          })
        }
        item={item}
        index={index}
        mode={theme.mode}
      />
    ),
    [theme.mode],
  );

  const handleThemeChange = useCallback(() => {
    setTheme(!theme.mode);
  }, [setTheme]);
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: theme.mode ? R.color.black : R.color.white,
        },
      ]}>
      {/* Animated Header */}
      <ScrollHideHeader
        onThemeChange={handleThemeChange}
        mode={theme.mode}
        navigation={navigation}
        scrollY={scrollY}
      />
      <AnimatedFlatList
        contentContainerStyle={{paddingTop: R.unit.scale(70)}}
        bounces={false}
        ListHeaderComponent={useMemo(
          () => (
            <HomeHeaderComponent
              theme={theme}
              items={categories}
              colors={colorList}
              renderHorizontalItem={renderHorizontalItem}
              renderColorCircle={renderColorCircle}
            />
          ),
          [theme, categories, colorList],
        )}
        data={WallCategoryList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategory}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={16}
        windowSize={10}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  section: {
    marginBottom: R.unit.scale(30),
  },
});
