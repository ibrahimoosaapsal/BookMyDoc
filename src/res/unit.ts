import {Dimensions, Platform, StatusBar} from 'react-native';

const containerWidth = Dimensions.get('window').width;
const containerHeight = Dimensions.get('window').height;
const initialScale = Math.min(containerWidth, containerHeight) / 375;
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (containerWidth === X_WIDTH && containerHeight === X_HEIGHT) ||
      (containerWidth === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;
const unit: Unit = {
  scale: (multi?) => (multi ? initialScale * multi : initialScale),
  fontSize: (multi?) => (multi ? initialScale * 16 * multi : initialScale * 16),
  windowHeight: () => containerHeight,
  windowWidth: () => containerWidth,
  screenHeader: () => initialScale * 48,
  StatusBarHeight: Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
  }),
};

export interface Unit {
  scale: (multi?: number) => number;
  fontSize: (multi?: number) => number;
  windowHeight: () => number;
  windowWidth: () => number;
  screenHeader: (multi?: number) => number;
  StatusBarHeight: any;
}

export default unit;
