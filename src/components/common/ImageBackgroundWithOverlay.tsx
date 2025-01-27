import React, {ReactNode} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import R from '../../res/R';

interface ImageBackgroundWithOverlayProps {
  source: ImageSourcePropType;
  gradientColors?: string[];
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  start?:any;
  end?:any
}

const ImageBackgroundWithOverlay: React.FC<ImageBackgroundWithOverlayProps> = ({
  source,
  gradientColors = [R.color.red, R.color.transparent],
  start={x: 0.4, y:0},
  end={x: 0.7, y: 0},
  style = {},
  overlayStyle = {},
  children,
}) => {
  return (
    <ImageBackground 
    resizeMode='stretch'
    source={source} style={[styles.imageBackground, style]}>
      <View style={[styles.overlay, overlayStyle]}>
        <LinearGradient
          start={start}
          end={end}
          colors={gradientColors}
          style={styles.gradient}
        />
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ImageBackgroundWithOverlay;
