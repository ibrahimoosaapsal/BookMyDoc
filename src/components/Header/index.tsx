import React, {useState, useEffect, useRef, useCallback} from 'react';
import R from '../../res/R';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export interface IProps {
  title: string;
  navigation?: any;
  containerStyle?: any;
  onBack?: any;
  rightComponent?: any;
  titleStyle?: any;
  iconColor?: any;
  mode?: boolean;
  hideBackIcon?: boolean;
}

const Header: React.FC<IProps> = props => {
  const onBackPress = useCallback(() => {
    if (props.onBack) {
      props.onBack();
    } else if (!props.hideBackIcon) {
      props.navigation.goBack();
    }
  }, []);
  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        {
          borderBottomColor: props.mode ? R.color.gray2 : R.color.grayE,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={onBackPress}>
        {!props.hideBackIcon && (
          <Icon
            name="chevron-back"
            size={R.unit.fontSize(1.5)}
            color={props.mode ? R.color.white : R.color.black}
          />
        )}
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {color: props.mode ? R.color.white : R.color.black},
            props.titleStyle,
          ]}>
          {props.title}
        </Text>
      </TouchableOpacity>
      {props.rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    // backgroundColor:R.color.red,
    borderBottomWidth: R.unit.scale(1),
  },
  btn: {
    // backgroundColor: 'red',

    paddingHorizontal: R.unit.scale(5),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    resizeMode: 'contain',
    height: R.unit.scale(25),
    width: R.unit.scale(25),
  },
  title: {
    color: R.color.gray29,
    fontFamily: R.font.Semibold,
    fontSize: R.unit.fontSize(1.1),
    marginStart: R.unit.scale(2),
    width: '70%',
  },
});

export default Header;
