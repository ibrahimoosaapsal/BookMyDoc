import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  NativeModules,
} from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Text from './heading';
import R from '../../res/R';
import Button from './Button';
import DividerWithChip from './DividerWithChip';

interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  onAction:()=> void;
  title: string;
  message?: string;
  cancelText?: string;
  okText?: string;
  mode: boolean;
}

const Alert: React.FC<CustomAlertProps> = ({
  visible,
  onClose,
  onAction,
  title,
  message,
  mode,
  cancelText,
  okText,
}) => {
  const {NavigationBarModule} = NativeModules;
 
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBarModule.setNavigationBarColor(mode ? R.color.black : R.color.black);
    }
  }, [mode]);
  const [isVisible, setIsVisible] = useState(visible);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  // Helper function to close the modal after animation
  const closeAfterAnimation = () => {
    setIsVisible(false);
    onClose();
  };

  // Trigger animations when visibility changes
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
      scale.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    } else {
      opacity.value = withTiming(
        0,
        {duration: 100, easing: Easing.in(Easing.exp)},
        finished => {
          if (finished) {
            // Use runOnJS to call closeAfterAnimation on the JavaScript thread
            runOnJS(closeAfterAnimation)();
          }
        },
      );
      scale.value = withTiming(0.8, {
        duration: 100,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [visible]);

  const handleBackdropPress = useCallback(() => {
    if (visible) {
      onClose();
    }
  }, [visible, onClose]);




  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Reanimated.View
          style={[
            styles.alertBox,
            animatedStyle,
            {
              backgroundColor: mode ? R.color.gray2 : R.color.white,
            },
          ]}>
          <View style={styles.textContainer}>
            {title && (
              <Text
                type="h4"
                string={title}
                mode={mode}
                textStyle={{textAlign: 'center'}}
              />
            )}
            {message && (
              <Text
                type="p"
                containerStyle={{
                  marginTop: title ? R.unit.scale(5) : 0,
                }}
                textStyle={{textAlign: 'center'}}
                string={message}
                mode={mode}
              />
            )}
          </View>
          <DividerWithChip mode={mode} />
          <Button
            title={okText || 'Ok'}
            onApply={onAction}
            component="fill"
            width="auto"
            style={{
              button: styles.okBtn,
              text: {
                color: R.color.blue,
                fontWeight: '600',
                fontSize: R.unit.fontSize(0.88),
              },
            }}
          />
          <DividerWithChip mode={mode} />
          <Button
            title={cancelText || 'Cancel'}
            onApply={onClose}
            component="fill"
            width="auto"
            style={{
              button: styles.cancelBtn,
              text: {
                color: mode ? R.color.white : R.color.black15,
                fontWeight: '600',
                fontSize: R.unit.fontSize(0.88),
              },
            }}
          />
        </Reanimated.View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
