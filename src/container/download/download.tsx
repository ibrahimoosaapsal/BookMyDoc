import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
  Platform,
  NativeModules,
  ToastAndroid,
} from 'react-native';
import R from '../../res/R';
import {useThemeStore} from '../../store/reduxHooks';
import RNFS from 'react-native-fs';
import DownloadCard from '../../components/Card/DownloadCard';
import moment from 'moment-timezone';
import Header from '../../components/Header';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import EmptyData from '../../components/EmptyData';
import Text from '../../components/common/heading';

export interface IProps {
  navigation?: any;
}
type ImageInfo = {
  name: string;
  path: string;
  size: number;
  downloadedDate: string;
};
const {WallpaperApplyModule} = NativeModules;
const Download: React.FC<IProps> = ({navigation}) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {theme} = useThemeStore();

  const folderPath =
    Platform.OS == 'ios'
      ? `${RNFS.DocumentDirectoryPath}/Wallrealm`
      : `${RNFS.ExternalStorageDirectoryPath}/Pictures/Wallrealm`;

  console.log('folderPath', folderPath);

  // Ensure that the Wallrealme folder exists, if not, create it
  const ensureWallrealmeFolderExists = async () => {
    try {
      const folderExists = await RNFS.exists(folderPath);

      if (!folderExists) {
        await RNFS.mkdir(folderPath);
        console.log('Wallrealme folder created successfully.');
      } else {
        console.log('Wallrealme folder already exists.');
      }
    } catch (error) {
      console.error('Error ensuring Wallrealme folder exists:', error);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const permission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        console.log('Permission is granted');
        fetchImages();
      } else {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log('Permission granted after request');
          fetchImages();
        } else {
          console.log('Permission denied');
        }
      }
    } else {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

      switch (result) {
        case RESULTS.GRANTED:
          console.log('Photo library add access granted.');
          fetchImages();
          break;
        case RESULTS.DENIED:
          console.log('Photo library add access denied.');
          break;
        case RESULTS.BLOCKED:
          console.log('Photo library add access blocked.');
          break;
        case RESULTS.LIMITED:
          console.log('Photo library access limited.');
          break;
        default:
          console.log('Photo library permission status unknown.');
          break;
      }
      // Handle iOS permissions similarly
    }
  };

  useEffect(() => {
    // Fetch the images when the component mounts
    requestStoragePermission();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      // Ensure the folder exists
      await ensureWallrealmeFolderExists();

      // Read all files from the Wallrealme folder
      const files = (await RNFS.readDir(folderPath)) || [];
      console.log('files', files);

      const imageFiles = files?.filter(file => {
        // Filter to only include image files (e.g., jpg, png)
        return (
          file.isFile() &&
          (file?.name?.endsWith('.jpg') ||
            file?.name?.endsWith('.png') ||
            file?.name?.endsWith('.jpeg'))
        );
      });

      // Extract necessary details for each image
      const imageDetails = imageFiles?.map(file => ({
        name: file?.name,
        path: `file://${file.path}`, // Full path for Image source
        size: file?.size, // File size in bytes
        downloadedDate: moment(file?.mtime).format('DD MMM YYYY'), // Formatted download date
      }));

      setImages(imageDetails); // Update state with image details
      setLoading(false);
    } catch (err) {
      console.log('Error reading folder: ', err);
      setLoading(false);
    }
  };

  const deleteDownloadedImage = async (imageUri: any) => {
    try {
      const imagePath = `${folderPath}/${imageUri}`;
      console.log('imagePath', imagePath);
      const result = await WallpaperApplyModule.deleteDownloadedImage(
        imagePath,
      );
      console.log('result', result);
      ToastAndroid.show(result, 2000);
      fetchImages();
    } catch (error) {
      console.log('Failed to delete image:', error);
    }
  };

  const downloadAndSetWallpaper = (item: any) => {
    console.log('item', item);

    WallpaperApplyModule.downloadImageWithProgress(item)
      .then((message: string) => {
        console.log(message); // Success message
      })
      .catch((error: string) => {
        console.log('error--', error); // Handle errors
      });
  };

  const renderCategory = useCallback(
    ({item, index}: ListRenderItemInfo<any>) => (
      <DownloadCard
        onDelete={deleteDownloadedImage}
        onApply={downloadAndSetWallpaper}
        item={item}
        index={index}
        mode={theme.mode}
      />
    ),
    [theme.mode],
  );
  const renderEmpty = useCallback(
    () => <EmptyData mode={theme.mode} label="No data found" />,
    [theme.mode],
  );

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: theme.mode ? R.color.black : R.color.white,
        },
      ]}>
      <Header
        mode={theme.mode}
        navigation={navigation}
        title="Downloads"
        hideBackIcon
      />
      <FlatList
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: R.unit.windowHeight() / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                display: loading ? 'none' : 'flex',
              }}>
              {renderEmpty()}
            </View>
          );
        }}
        refreshing={loading}
        onRefresh={requestStoragePermission}
        contentContainerStyle={{paddingTop: R.unit.scale(0)}}
        // bounces={false}
        data={images}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategory}
        initialNumToRender={10}
        maxToRenderPerBatch={16}
        windowSize={10}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
