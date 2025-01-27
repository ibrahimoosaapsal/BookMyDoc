import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import R from '../../res/R';
import ImageComponent from '../../components/common/Image';
import LottieView from 'lottie-react-native';

export interface IProps {
  navigation?: any;
  signInResponse?: any;
  registerProfileResponse?: any;
  userResponse?: any;
  authTokenResponse?: any;
  route?:any
}

const Splash: React.FC<IProps> = props => {

  useEffect(() => {
    setTimeout(() => {
      handleNavigation();
    }, 2000);
  }, []);

  const handleNavigation = () => {
    
      props.navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigation'}],
      });
    
  };

  return (
    <View style={styles.container}>
      <LottieView
          style={styles.image}
          source={require('../../res/LottieFile/logo.json')}
          autoPlay={true}
          loop={false}
        />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.color.primary,
  },
  image: {
    height: R.unit.scale(180),
    width: R.unit.scale(180),
  },
});
