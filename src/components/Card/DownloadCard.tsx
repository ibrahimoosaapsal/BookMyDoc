import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import R from '../../res/R';
import Animated, {FadeInRight} from 'react-native-reanimated';
import ImageComponent from '../common/Image';
import Text from '../common/heading';
import Button from '../common/Button';
import {formatFileSize} from '../../utils/number.helper';

export interface IProps {
  onDelete?: (imageName: string) => void;
  onApply?: (path: string) => void;
  item: {
    name: string;
    path: string; // Full path for Image source
    size: any; // File size in bytes
    downloadedDate: any;
  };
  index: number;
  mode: boolean;
}

const DownloadCard: React.FC<IProps> = React.memo(
  ({onDelete,onApply, item, index, mode}) => {
    const delay = index != null && index < 6 ? 200 * index : 300;

    const handleDelete = useCallback(() => {
      if (onDelete) onDelete(item.name);
    }, [onDelete]);
    const handleApply = useCallback(() => {
      if (onApply) onApply(item.path);
    }, [onApply]);
    return (
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: mode ? R.color.black15 : R.color.white2,
          },
        ]}
        entering={FadeInRight.delay(delay).duration(300).springify()}>
        <ImageComponent url={item?.path} containerStyle={styles.image} />
        <TouchableOpacity activeOpacity={0.9} style={styles.button}>
          <View>
            <Text
              colorTone="dark"
              string={item?.name}
              mode={mode}
              type="h6"
              numberOfLines={1}
            />
            <Text
              colorTone="light"
              string={'Size ' + formatFileSize(item?.size)}
              mode={mode}
              type="label"
              numberOfLines={1}
              textStyle={{
                marginVertical: R.unit.scale(4),
              }}
            />
            <Text
              colorTone="light"
              string={'Downloaded on ' + item?.downloadedDate}
              mode={mode}
              type="label"
              numberOfLines={1}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              component="outline"
              title="Delete"
              width={R.unit.scale(60)}
              style={{
                button: styles.outlineButton,
                text: {color: R.color.red, fontSize:R.unit.fontSize(0.60)},
              }}
              onApply={handleDelete}
            />
            <Button
              component="fill"
              title="Apply"
              width={R.unit.scale(60)}
              style={{
                button: styles.outlineButton,
                text: {fontSize:R.unit.fontSize(0.60)},
              }}
              onApply={handleApply}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

export default DownloadCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: R.color.white2,
    paddingVertical: R.unit.scale(10),
    marginBottom: R.unit.scale(2),
    paddingHorizontal: R.unit.scale(30),
  },
  image: {
    width: R.unit.scale(60),
    height: R.unit.scale(100),
    borderRadius: R.unit.scale(5),
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: R.unit.scale(10),
    height: '100%',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: R.unit.scale(20),
    columnGap: R.unit.scale(10),
  },
  outlineButton: {
    borderColor: R.color.red,
    height: R.unit.scale(25),
  },
});
