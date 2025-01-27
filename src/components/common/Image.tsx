import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageStyle, ViewStyle} from 'react-native';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import R from '../../res/R';

interface ImageItemProps {
  url?: string;
  source?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  mode?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'; // Optional prop
}

const ImageComponent: React.FC<ImageItemProps> = React.memo(
  ({
    source = '',
    url = '',
    style,
    mode,
    resizeMode = 'cover',
    containerStyle,
  }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Check if the source is valid
    const isValidSource = false;

    const handleLoadEnd = () => setLoading(false);
    const handleError = () => {
      setLoading(false);
      setError(true);
    };
    const data: any = source ? source : {uri: url};
    // console.log("source",source)

    return (
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: mode ? R.color.black15 : R.color.white2,
          },
          containerStyle,
        ]}>
        <Image
          source={data}
          style={[styles.image, style]}
          resizeMode={resizeMode}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      </View>
    );
  }
); // Prevent re-rendering if the source is the same

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageComponent;
