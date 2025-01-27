import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useThemeStore} from '../../store/reduxHooks';
import Avtar from '../../components/common/Avtar';
import Text from '../../components/common/heading';
import R from '../../res/R';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FullScreenLoading from '../../components/common/FullScreenLoading';

export interface IProps {
  navigation: any;
}
const Profile: React.FC<IProps> = props => {
  const {theme} = useThemeStore();

  const listItem = (
    title: string,
    iconName: string,
    color: string,
    style?: any,
    onPress?: () => void,
  ) => {
    return (
      <View style={styles.listContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={R.unit.fontSize(1.7)}
          color={color}
        />
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={[
            styles.listButton,
            {
              borderBottomColor: theme.mode ? R.color.black : R.color.white,
              ...style,
            },
          ]}>
          <Text string={title} type="p" mode={theme.mode} />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name={'chevron-right'}
          size={R.unit.fontSize(1.7)}
          color={theme.mode ? R.color.gray4 : R.color.grayB}
        />
      </View>
    );
  };

  return (
    <ScrollView
      bounces={false}
      style={[
        styles.main,
        {
          backgroundColor: theme.mode ? R.color.black : R.color.white,
        },
      ]}>
      <View style={styles.avtraContainer}>
        <Avtar
          mode={theme.mode}
          size="big"
          url="https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg"
        />
        <Text
          mode={theme.mode}
          string={'Atul Bhuriya'}
          containerStyle={[R.commonStyle.mt10]}
          type="h6"
        />
      </View>
      {/* section */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black15 : R.color.white2,
          },
        ]}></View>
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black15 : R.color.white2,
          },
        ]}>
        {listItem('Liked', 'heart-circle', R.color.red, {}, () => {
          props.navigation.navigate('Liked');
        })}
        {listItem(
          'Downloads',
          'arrow-down-circle',
          R.color.blue1,
          {
            borderBottomWidth: 0,
          },
          () => {
            props.navigation.navigate('BottomTabNavigation', {
              screen: 'download',
            });
          },
        )}
      </View>
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black15 : R.color.white2,
          },
        ]}>
        {listItem('Help & Feedback', 'pencil-circle', R.color.green2)}
        {listItem('Rate app', 'star-circle', R.color.orange3, {
          borderBottomWidth: 0,
        })}
      </View>
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black15 : R.color.white2,
          },
        ]}>
        {listItem('Share App', 'share-circle', R.color.purple2, {
          borderBottomWidth: 0,
        })}
      </View>
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black15 : R.color.white2,
          },
        ]}>
        {listItem('Privacy Policy', 'incognito-circle', R.color.pink2, {
          borderBottomWidth: 0,
        })}
        {listItem(
          'Add Wallpaper',
          'pencil-circle',
          R.color.primary,
          {
            borderBottomWidth: 0,
          },
          () => {
            props.navigation.navigate('AddWall');
          },
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  avtraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: R.unit.scale(50),
    columnGap: R.unit.scale(10),
  },
  section: {
    backgroundColor: R.color.black15,
    paddingHorizontal: R.unit.scale(20),
    marginHorizontal: R.unit.scale(10),
    marginTop: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: R.unit.scale(10),
  },
  listButton: {
    // backgroundColor:R.color.red,
    flex: 1,
    paddingVertical: R.unit.scale(25),
    justifyContent: 'center',
    borderBottomWidth: R.unit.scale(1),
  },
});
