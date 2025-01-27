import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homescreen';
import ProfileScreen from '../screens/profilescreen';
import DownloadScreen from '../screens/downloadscreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeStore } from '../store/reduxHooks';
import R from '../res/R';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  const { theme } = useThemeStore();

  // Memoized tabBarStyle and screenOptions for performance
  const tabBarStyle = useMemo(() => ({
    backgroundColor: theme.mode ? R.color.black : R.color.white,
    borderTopWidth: 0,
  }), [theme.mode]);

  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle,
  }), [tabBarStyle]);

  const renderTabIcon = (focused: boolean, iconName: string) => {
    return (
      <Ionicons
        name={focused ? `${iconName}` : `${iconName}-outline`}
        size={R.unit.fontSize(1.5)}
        color={focused ? R.color.primary : R.color.gray7}
      />
    );
  };

  return (
    <Tab.Navigator
     
      screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          
          tabBarIcon: ({ focused }) => renderTabIcon(focused, 'grid'),
        }}
      />
      <Tab.Screen
        name="download"
        component={DownloadScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(focused, 'download'),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(focused, 'person'),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
