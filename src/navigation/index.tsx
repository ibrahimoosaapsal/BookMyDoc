import React, {useEffect, useMemo} from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '../screens/splashscreen/SplashScreen';
import R from '../res/R';
import BottomTabNavigation from './BottomTabNavigation';
import {useThemeStore} from '../store/reduxHooks';
import {NativeModules, Platform} from 'react-native';
import DetailsScreen from '../screens/detailsscreen'; // Your Details screen with shared elements
import SubCategoryScreen from '../screens/subcategoryscreen';
import WalllistScreen from '../screens/walllistscreen';
import AddWallScreen from '../screens/dashboard/addwallscreen';
import LikedScreen from '../screens/likedscreen/indedx';

const Stack = createStackNavigator();

export default function Navigation() {
  return <RootNavigator />;
}

function RootNavigator() {
  const {theme} = useThemeStore();
  const {NavigationBarModule} = NativeModules;

  const navigationBarColor = useMemo(() => {
    return theme.mode ? R.color.black : R.color.white;
  }, [theme.mode]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBarModule.setNavigationBarColor(navigationBarColor);
    }
  }, [navigationBarColor]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: navigationBarColor,
        },
      }}>
      <Stack.Screen name="Root" component={SplashScreen} />
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
      <Stack.Screen name="Walllist" component={WalllistScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddWall" component={AddWallScreen} />
      <Stack.Screen name="Liked" component={LikedScreen} />
    </Stack.Navigator>
  );
}
