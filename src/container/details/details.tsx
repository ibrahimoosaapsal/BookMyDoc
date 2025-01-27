import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import R from '../../res/R';
import {useLikeStore, useThemeStore} from '../../store/reduxHooks';

import ImageComponent from '../../components/common/Image';
import BackPopupButton from '../../components/common/BackPopupButton';
import Options from './options';
import Button from '../../components/common/Button';
import Share from 'react-native-share';
import Animated, {FadeIn} from 'react-native-reanimated';
import BottomSheet from '../../components/common/BottomSheet';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {TapGestureHandler} from 'react-native-gesture-handler';
import WallOptionComp from './WallOptionComp';
import {WallApplyOption} from '../../utils/constant';
import {isIdInList} from '../../utils/utils.helper';

export interface IProps {
  navigation?: any;
  route: any;
}
const {WallpaperApplyModule, WallpaperModule} = NativeModules;

const Details: React.FC<IProps> = ({navigation, route}) => {
  const {likeList, likeLoading, setLike} = useLikeStore();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const doubleTapRef = React.useRef<TapGestureHandler>(null); // Reference for double-tap gesture

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(WallpaperApplyModule);
    const subscription = eventEmitter.addListener('DownloadProgress', event => {
      setDownloadProgress(event.progress);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const item = route?.params;
  const {theme} = useThemeStore();

  const handleNavigation = useCallback(() => navigation.goBack(), []);
  const isLiked = useMemo(() => {
    return isIdInList(likeList, item?.id); // Directly use the function since it's synchronous
  }, [likeList, item?.id]); // Recalculate when either likeList or item.id changes

  const handleDoubleTap = useCallback(() => {
    setLike(item);
  }, [item,likeList]);

  const handleShare = async () => {
    const shareOptions = {
      title: 'title',
      message: `Check out this image from ${R.strings.appName}: ${'title'}`,
      url: item?.imageUrl,
      failOnCancel: false,
      subject: R.strings.appName,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const requestStoragePermission = async () => {
    setIsVisible(false);
    if (Platform.OS === 'android') {
      const permission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        return downloadAndSetWallpaper();
      } else {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          return await WallpaperApplyModule.downloadImageWithProgress(
            item?.imageUrl,
          );
        }
      }
    } else {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

      switch (result) {
        case RESULTS.GRANTED:
          applyWallpaper(item?.imageUrl);
          break;
      }
    }
  };

  async function applyWallpaper(imageUrl: string) {
    try {
      const result = await WallpaperApplyModule.downloadImageWithProgress(
        imageUrl,
      );
    } catch (error) {
      console.error('Error applying wallpaper:', error);
    }
  }

  const downloadAndSetWallpaper = () => {
    WallpaperApplyModule.downloadImageWithProgress(item?.imageUrl)
      .then((message: string) => {
        console.log(message);
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  console.log('likeList', likeList);

  return (
    <TapGestureHandler
      ref={doubleTapRef}
      onActivated={handleDoubleTap}
      numberOfTaps={2} // Sets it to respond to double-tap
    >
      <View
        style={[
          styles.container,
          {backgroundColor: theme.mode ? R.color.black : R.color.white},
        ]}>
        <BackPopupButton mode={theme.mode} onPress={handleNavigation} />
        <ImageComponent
          url={item?.imageUrl}
          style={styles.image}
          mode={theme.mode}
        />
        <Options
          onLikePress={handleDoubleTap}
          onSharePress={handleShare}
          isLiked={isLiked}
        />
        <Animated.View entering={FadeIn.delay(500).duration(300)}>
          <Button
            onApply={requestStoragePermission}
            title="Apply"
            component="fill"
            width="55%"
            loading={false}
            percentage={downloadProgress}
            style={{
              button: styles.applyButton,
              text: {fontWeight: '700'},
            }}
          />
        </Animated.View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  applyButton: {
    position: 'absolute',
    bottom: R.unit.scale(40),
    alignSelf: 'center',
    height: R.unit.scale(45),
    borderRadius: R.unit.scale(25),
    shadowColor: R.color.black,
    ...R.commonStyle.shadow24,
    backgroundColor: R.color.red,
  },
});

export default Details;
