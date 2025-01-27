import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import R from '../../res/R';
import Text from './heading';

interface Tab {
  id: string;
  name: string;
  colorCode?: string;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  selectionType: 'single' | 'multiple';
  onTabPress: (selectedTabs: string[]) => void;
  onGetSubCategory?: (subCat: any) => void;
  selectedTab?: string; // For single selection
  mode: boolean; // Color mode
}

const {width: screenWidth} = Dimensions.get('window');

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  selectionType,
  onTabPress,
  onGetSubCategory,
  selectedTab,
  mode,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedTabs, setSelectedTabs] = useState<any[]>(
    selectedTab ? [selectedTab] : [],
  );
  const tabWidths = useRef<number[]>([]); // Store each tab's width

  const handleTabPress = (tab: any, index: number) => {
    // Calculate the total width of all tabs, including padding and margin
    const totalTabsWidth_ = tabWidths.current.reduce(
      (total, width) => total + width,
      0,
    );
    const totalTabsWidth = totalTabsWidth_ + tabs.length * 6; // 6 is the total horizontal margin (3 on each side for each tab)

    // Determine the target scroll position
    let targetScrollX = tabWidths.current
      .slice(0, index)
      .reduce((total, width) => total + width, 0);

    // Centering the selected tab
    const selectedTabWidth = tabWidths.current[index];
    const scrollOffset = screenWidth / 2 - selectedTabWidth / 2;
    targetScrollX -= scrollOffset;

    // Ensure we don't scroll out of bounds
    if (targetScrollX < 0) {
      targetScrollX = 0;
    } else if (targetScrollX > totalTabsWidth - screenWidth) {
      targetScrollX = totalTabsWidth - screenWidth;
    }

    scrollViewRef.current?.scrollTo({x: targetScrollX, animated: true});
    let id: string = tab?.id;
    let updatedSelectedTabs;
    if (selectionType === 'single') {
      updatedSelectedTabs = [tab.id];
    } else {
      if (tab?.colorCode) id = tab?.colorCode;
      // Toggle selection for multiple selection
      updatedSelectedTabs = isActive(id)
        ? selectedTabs.filter(item => item !== id) // Deselect if already selected
        : [...selectedTabs, id]; // Add if not selected
    }

    setSelectedTabs(updatedSelectedTabs);
    onTabPress(updatedSelectedTabs); // Notify parent of selected tabs
    if (isActive(id) && onGetSubCategory) return onGetSubCategory();
    if (!isActive(id) && tab?.subCategory && onGetSubCategory)
      return onGetSubCategory(tab?.subCategory);
    if (!isActive(id) && onGetSubCategory) onGetSubCategory();
  };

  // Measure tab widths after they are rendered
  const measureTabWidth = (index: number, width: number) => {
    const tabMargin = 4; // 3 on each side
    tabWidths.current[index] = width + tabMargin; // Store width for the specific tab with margin
  };
  const isActive = (id: string) => {
    return selectedTabs?.some((ids: any) => ids === id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={tab.id}
            onPress={() => handleTabPress(tab, index)}
            onLayout={event =>
              measureTabWidth(index, event.nativeEvent.layout.width)
            } // Measure width on layout
            style={[
              styles.tab,
              {
                backgroundColor: mode ? R.color.gray3 : R.color.grayE,
              },
              isActive(tab?.colorCode?tab?.colorCode:tab?.id) && {
                backgroundColor: tab?.colorCode
                  ? tab?.colorCode
                  : R.color.pink3,
              },
            ]}>
            <Text string={tab.name} type="p" mode={isActive(tab?.id) || mode} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: R.unit.scale(31),
  },
  scrollContainer: {
    marginHorizontal: R.unit.scale(5),
  },
  tab: {
    paddingVertical: R.unit.scale(5),
    paddingHorizontal: R.unit.scale(20),
    borderRadius: R.unit.scale(10),
    marginHorizontal: R.unit.scale(3), // Adjusted margin
  },
  activeTab: {
    backgroundColor: R.color.pink3,
  },
  activeTabText: {
    color: R.color.white,
  },
});

export default ScrollableTabs;
