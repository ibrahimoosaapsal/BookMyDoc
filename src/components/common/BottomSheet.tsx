import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from 'react-native-gesture-handler';
import R from '../../res/R';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mode: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  mode,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const [sheetHeight, setSheetHeight] = useState(0);
  const sheetRef = useRef<View | null>(null);

  // Handle visibility changes with animations
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {damping: 27, stiffness: 200});
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, {damping: 27, stiffness: 200}, () => {
        runOnJS(onClose)();
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateY.value = Math.max(event.translationY, 0);
    })
    .onEnd(event => {
      const shouldClose = event.translationY > 30;

      if (shouldClose) {
        translateY.value = withSpring(SCREEN_HEIGHT, {duration: 100}, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, {damping: 30, stiffness: 100});
      }
    });

  // Function to handle backdrop click
  const onBackdropPress = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, {duration: 100}, () => {
      runOnJS(onClose)();
    });
  };

  const onLayout = () => {
    if (sheetRef.current) {
      sheetRef.current.measure((_, __, width, height) => {
        setSheetHeight(height);
      });
    }
  };

  return (
    <Modal
      onRequestClose={onBackdropPress}
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      visible={visible}
      animationType="fade">
      <GestureHandlerRootView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.fullScreenContainer, animatedStyle]}>
            <View
              ref={sheetRef}
              style={[
                styles.bottomSheetContainer,
                {height: sheetHeight || 'auto'},
                {
                  backgroundColor: mode ? R.color.black19 : R.color.white3,
                },
              ]}
              onLayout={onLayout}>
              <View style={styles.sheetHeader} />
              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  sheetHeader: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: R.color.blacktransparent5,
  },
});

export default BottomSheet;
