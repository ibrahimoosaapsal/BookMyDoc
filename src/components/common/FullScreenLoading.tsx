import React, {useCallback} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import R from '../../res/R';
import LottieView from 'lottie-react-native';
import Text from './heading';

export interface Iprops {
  visible: boolean;
  onClose?: () => void;
  label:string
}

const FullScreenLoading: React.FC<Iprops> = ({visible, onClose,label}) => {

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      needsOffscreenAlphaCompositing
      onRequestClose={onClose}>
      <View style={styles.container}>
        <LottieView
          // ref={animation}
          style={styles.lottieIcon}
          source={require('../../res/LottieFile/load.json')}
          autoPlay={true}
          loop={true}
          speed={3}
        />
        <Text string={label?label:'Loading...'} type='p' mode/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: R.color.blacktransparent1,
  },
  lottieIcon: {
    width: R.unit.scale(150),
    height: R.unit.scale(150),
  },
  container: {
    width: R.unit.windowWidth(),
    height: R.unit.windowHeight(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:R.color.blacktransparent1
  },
  textContainer: {
    padding: R.unit.scale(25),
  },
  alertBox: {
    minWidth: R.unit.scale(200),
    width: '100%',
    maxWidth: R.unit.scale(280),

    backgroundColor: 'white',
    borderRadius: R.unit.scale(15),
  },

  okBtn: {
    backgroundColor: 'transparent',
    padding: R.unit.scale(16),
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    padding: R.unit.scale(16),
  },
});

export default FullScreenLoading;
