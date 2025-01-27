import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  Pressable,
  Alert,
} from 'react-native';
import ImageComponent from '../common/Image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import R from '../../res/R';
import {launchImageLibrary} from 'react-native-image-picker';

export interface Iprops {
  onSetImage: (data: {uri: string; fileSize: number,fileName:string}) => void;
  value: string;
  mode: any;
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const ImagePicker: React.FC<Iprops> = React.memo(
  ({
    value = '',
    onSetImage,
    mode,
    containerStyle,
    imageContainerStyle,
    imageStyle,
  }) => {
    const [selectImage, setSelectImage] = useState<any>('');
    const pickeImage = useCallback(() => {
      launchImageLibrary({mediaType: 'photo'}, (response: any) => {
        if (response.assets) {
          console.log('first', response.assets[0]);
          const data: any = {
            uri: response.assets[0]?.uri,
            fileSize: response.assets[0]?.fileSize,
            fileName: response.assets[0]?.fileName,
          };

          onSetImage(data);
          setSelectImage(response.assets[0]);
        }
      });
    }, []);

   

    return (
      <View style={[styles.container, containerStyle]}>
        {/* select section */}
        <Pressable
          onPress={pickeImage}
          style={[
            styles.imageContainerStyle,
            {
              display: value || selectImage ? 'none' : 'flex',
            },
            imageContainerStyle,
          ]}>
          <Ionicons
            size={R.unit.fontSize(1)}
            name="cloud-upload-outline"
            color={mode ? R.color.gray13 : R.color.gray6}
          />
        </Pressable>
        {/* image section */}
        <Pressable
          onPress={pickeImage}
          style={[
            styles.imageContainerStyle,
            {
              display: value || selectImage ? 'flex' : 'none',
            },
            imageContainerStyle,
          ]}>
          <ImageComponent
            url={selectImage}
            source={selectImage}
            mode={mode}
            style={imageStyle}
            resizeMode="stretch"
          />
          <Ionicons
            size={R.unit.fontSize(1)}
            name="cloud-upload-outline"
            color={R.color.white}
            style={styles.uploadImageIcon}
          />
        </Pressable>
      </View>
    );
  },
);

export default ImagePicker;

const styles = StyleSheet.create({
  container: {},
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadImageIcon: {
    position: 'absolute',
    right: R.unit.scale(10),
    bottom: R.unit.scale(10),
  },
});
