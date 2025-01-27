import React, {memo} from 'react';
import R from '../../../res/R';

// components
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  ViewStyle,
} from 'react-native';
import {useThemeStore} from '../../../store/reduxHooks';

export interface PropsI {
  navigation?: any;
  statusBarColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  rootStyles?: ViewStyle;
  bodyStyles?: ViewStyle;
  children?: any;
  translucent?: boolean;
}

const BaseLayout: React.FC<PropsI> = ({
  bodyStyles,
  rootStyles,
  children,
  statusBarColor,
  translucent = false,
}) => {
  const {theme} = useThemeStore();

  return (
    <View style={[styles.container, rootStyles]}>
      <StatusBar
        translucent={translucent}
        animated
        barStyle={
          statusBarColor
            ? 'light-content'
            : theme.mode
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={
          statusBarColor
            ? statusBarColor
            : theme.mode
            ? R.color.black
            : R.color.white
        }
      />

      <View style={[styles.body, bodyStyles, bodyStyles]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

// Memoizing BaseLayout to prevent unnecessary re-renders
export default memo(BaseLayout);
