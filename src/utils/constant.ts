import {Platform} from 'react-native';
import R from '../res/R';

export const WallApplyOption = {
  home: 'home',
  lock: 'lock',
  both: 'both',
  scrollable: 'scrollable',
  system:'system'
};

export const WallType = {
  MOBILE: 'MOBILE',
  TABLET_POTRAIT: 'TABLET_POTRAIT',
  TABLET_LANDSCAP: 'TABLET_LANDSCAP',
};



// scroll height for animated hide and show header
export const scrollHeight =
  Platform.OS == 'ios'
    ? R.unit.StatusBarHeight + R.unit.scale(50)
    : R.unit.scale(50);
