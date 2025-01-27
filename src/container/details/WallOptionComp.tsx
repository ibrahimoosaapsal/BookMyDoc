import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/common/Button';
import DividerWithChip from '../../components/common/DividerWithChip';
import R from '../../res/R';
import {WallApplyOption} from '../../utils/constant';

interface IProps {
  onApply?: (type: string) => void;
  onCancel?: () => void;
  mode: boolean;
}

const WallOptionComp: React.FC<IProps> = ({onApply, mode,onCancel}) => {
  return (
    <View>
      <Button
        title="Set as Lock screen wallpaper"
        component="transparent"
        onApply={() => onApply(WallApplyOption.lock)}
        style={{
          button: styles.button,
          text: {
            color: mode ? R.color.white : R.color.black,
            ...styles.text,
          },
        }}
      />
      <Button
        onApply={() => onApply(WallApplyOption.home)}
        title="Set as Home screen wallpaper"
        component="transparent"
        style={{
          button: styles.button,
          text: {
            color: mode ? R.color.white : R.color.black,
            ...styles.text,
          },
        }}
      />
      <Button
        onApply={() => onApply(WallApplyOption.both)}
        title="Set as both"
        component="transparent"
        style={{
          button: styles.button,
          text: {
            color: mode ? R.color.white : R.color.black,
            ...styles.text,
          },
        }}
      />
      <Button
        onApply={() => onApply(WallApplyOption.system)}
        title="Set as System defult"
        component="transparent"
        style={{
          button: {
            ...styles.button,
            paddingTop: R.unit.scale(20),
            paddingBottom: R.unit.scale(40),
          },
          text: {
            color: mode ? R.color.white : R.color.black,
            ...styles.text,
          },
        }}
      />
      <DividerWithChip mode={mode} />
      <Button
      onApply={onCancel}
        title="cancel"
        component="transparent"
        style={{
          button: styles.button,
          text: {
            color: mode ? R.color.white : R.color.black,
            ...styles.text,
          },
        }}
      />
    </View>
  );
};

export default WallOptionComp;
const styles = StyleSheet.create({
  button: {
    // backgroundColor:'red',
    paddingVertical: R.unit.scale(20),
  },
  text: {
    fontSize: R.unit.fontSize(1),
  },
});
