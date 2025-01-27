import React, { useState, useCallback, useMemo } from "react";
import { Image, StyleSheet, View, ImageSourcePropType, StyleProp, ImageStyle, ViewStyle } from "react-native";
import R from "../../res/R";

export interface IProps {
  url: string; // URL to load the image
  defaultUrl?: string; // Fallback URL if the main image fails to load
  source?: ImageSourcePropType; // Local image source
  size?: "small" | "normal" | "big"; // Avatar size
  containerStyle?: StyleProp<ViewStyle>; // Optional container style
  imageStyle?: StyleProp<ImageStyle>; // Optional image style
  mode?: boolean; // Optional mode prop
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center"; // Optional image resizeMode
}

const Avtar: React.FC<IProps> = React.memo(
  ({mode,
    url,
    defaultUrl,
    source,
    size,
    containerStyle,
    imageStyle,
    resizeMode = "cover",
  }) => {
    const [imageUri, setImageUri] = useState<any>(url);

    // Fallback to default image if loading from URL fails
    const handleImageError = useCallback(() => {
      setImageUri(defaultUrl);
    }, [defaultUrl]);

    // Memoize the avatar size to avoid recalculating on every render
    const avatarSize = useMemo(() => {
      switch (size) {
        case "small":
          return styles.small;
        case "normal":
          return styles.normal;
        case "big":
          return styles.big;
        default:
          return styles.normal;
      }
    }, [size]);

    // Memoize the final source (local or remote) to avoid unnecessary rerenders
    const imageSource = useMemo(() => {
      return imageUri ? { uri: imageUri } : source;
    }, [imageUri, source]);

    return (
      <View style={[avatarSize, containerStyle,{
        backgroundColor:mode?R.color.black15:R.color.white2
      }]}>
        <Image
          source={imageSource}
          onError={handleImageError}
          style={[styles.image, imageStyle]}
          resizeMode={resizeMode}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Deep comparison to avoid re-rendering if props didn't change
    return (
      prevProps.url === nextProps.url &&
      prevProps.defaultUrl === nextProps.defaultUrl &&
      prevProps.size === nextProps.size &&
      prevProps.containerStyle === nextProps.containerStyle &&
      prevProps.imageStyle === nextProps.imageStyle &&
      prevProps.resizeMode === nextProps.resizeMode
    );
  }
);

export default Avtar;

const styles = StyleSheet.create({
  small: {
    width: R.unit.scale(40),
    height: R.unit.scale(40),
    borderRadius: R.unit.scale(20),
  },
  normal: {
    width: R.unit.scale(60),
    height: R.unit.scale(60),
    borderRadius: R.unit.scale(30)
  },
  big: {
    width: R.unit.scale(100),
    height:  R.unit.scale(100),
    borderRadius: R.unit.scale(50),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: R.unit.scale(50), // Ensures it's always a circle
  },
});
