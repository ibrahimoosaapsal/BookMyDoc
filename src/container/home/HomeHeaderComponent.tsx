import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler'; // Ensure you import from gesture-handler if needed
import Text from '../../components/common/heading'; // Adjust import according to your structure
import R from '../../res/R';

interface HeaderComponentProps {
  theme: {
    mode: boolean; // true for dark mode, false for light mode
  };
  items: Array<any>; // Adjust type based on your items structure
  colors: Array<any>; // Adjust type based on your colors structure
  renderHorizontalItem: any; // Adjust type based on your item
  renderColorCircle: any; // Adjust type based on your color circle
}

const HomeHeaderComponent: React.FC<HeaderComponentProps> = React.memo(
  ({
    theme,
    items = [],
    colors = [],
    renderHorizontalItem,
    renderColorCircle,
  }) => {
    return (
      <>
        {/* First Section: Horizontal FlatList */}
        <View style={styles.section}>
          <Text
            mode={theme.mode}
            string={'Best of the month'}
            containerStyle={styles.label}
            type="p2"
            colorTone="light"
          />
          <FlatList
            data={items.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHorizontalItem}
          />
        </View>

        {/* Second Section: Horizontal FlatList for Color Filters */}
        <View style={styles.section}>
          <Text
            mode={theme.mode}
            string={'The color tone'}
            containerStyle={{
              ...styles.label,
              marginTop: R.unit.scale(15),
            }}
            type="p2"
            colorTone="light"
          />
          <FlatList
            data={colors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderColorCircle}
          />
        </View>

        {/* Third Section: Vertical FlatList for Categories */}
        <Text
          mode={theme.mode}
          string={'Categories'}
          containerStyle={{...styles.label, marginTop: R.unit.scale(15)}}
          type="p2"
          colorTone="light"
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 20, // Adjust based on your layout preferences
  },
  label: {
    marginLeft: R.unit.scale(15),
    marginBottom: R.unit.scale(10),
  },
});

export default HomeHeaderComponent;
