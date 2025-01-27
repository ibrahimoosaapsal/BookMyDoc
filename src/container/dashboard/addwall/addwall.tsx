import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useThemeStore} from '../../../store/reduxHooks';
import Header from '../../../components/Header';
import R from '../../../res/R';
import Text from '../../../components/common/heading';
import ImagePicker from '../../../components/ImagePicker';
import storage from '@react-native-firebase/storage';

import firestore from '@react-native-firebase/firestore';
import Button from '../../../components/common/Button';
import {getIstGMTTime} from '../../../utils/date.helper';
import Alert from '../../../components/common/Alert';
import CustomTextInput from '../../../components/common/CustomTextInput';
import ScrollableTabs from '../../../components/common/ScrollableTabs';
import {WallCategoryList} from '../../../utils/wall.category';
import {colorList} from '../../../utils/color.help';
import RNFS from 'react-native-fs'; // Importing react-native-fs

export interface Iprops {
  navigation: any;
}

const renderItem = (
  title: string,
  value: any,
  mode: boolean,
  isArray: boolean,
) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
      <Text type="label" string={`${title} : `} mode={mode} colorTone="light" />
      {isArray ? (
        <View
          style={{
            gap: 5,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {value?.map((item: any, index: number) => (
            <Text
              type="label"
              string={item?.name ? item?.name + ',' : '--'}
              mode={mode}
            />
          ))}
        </View>
      ) : (
        <Text type="label" string={value ? value : '--'} mode={mode} />
      )}
    </View>
  );
};

const AddWall: React.FC<Iprops> = ({navigation}) => {
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState({
    name: '',
    category: [],
    subcategory: [],
    colors: [],
  });
  const [selectImage, setSelectImage] = useState<{
    uri: string;
    fileSize: number;
    fileName: string;
  }>();
  const {theme} = useThemeStore();

  async function uploadWallpaper() {
    setIsVisible(false);
    const imageUri = selectImage?.uri as string;
    const fileName = selectImage?.fileName as string;
    try {
      if (!imageUri && !fileName && !loading) return;
      setLoading(true);

      // 1. Get the original image file size in MB
      const fileStats = await RNFS.stat(imageUri); // Get file stats
      const fileSizeInBytes = fileStats.size; // File size in bytes
      const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB

      // 2. Upload the high-resolution image
      const highResRef = storage().ref(`wallpapers/HighRes/${fileName}`);
      await highResRef.putFile(imageUri).then((snapshot: any) => {
        setProgress(20);
        let percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        ); // Update progress
        setProgress(percent);
      });
      const imageUrl = await highResRef.getDownloadURL();

      // 3. Create and store the wallpaper data including image size
      const id = firestore().collection('wallpapers').doc().id;
      const data = {
        id: id,
        name: state?.name, // e.g., "Beautiful Mountain Sunset"
        category: state?.category, // Reference to categories._id
        subcategory: state?.subcategory, // Reference to subcategories._id
        colors: state?.colors, // Array of color IDs, references colors._id
        imageUrl: imageUrl, // URL to the wallpaper image
        size: fileSizeInMB, // Store the original size in MB
        downloads: 0, // Count of downloads
        createdAt: getIstGMTTime(),
      };

      console.log('data', data);

      // 4. Save the wallpaper data including the size to Firestore
      await firestore()
        .collection('wallpapers')
        .doc(id)
        .set(data)
        .then(() => {
          console.log('Wallpaper uploaded successfully with size in MB!');
        })
        .catch((e: any) => {
          setLoading(false);
          console.log('Upload failed:', e);
        });

      setLoading(false);
      setProgress(0);
    } catch (error) {
      console.log('Upload failed:', error);
      setLoading(false);
    }
  }

  const handleTabPress = (selected: any) => {
    setState(prev => {
      return {...prev, category: selected};
    });
    // console.log('Selected Tabs:', selected);
  };
  const handleSubTabPress = (selected: any) => {
    setState(prev => {
      return {...prev, subcategory: selected};
    });
  };
  const handleColorTabPress = (selected: any) => {
    setState(prev => {
      return {...prev, colors: selected};
    });
  };
  console.log('Selected Sub Tabs:', state.colors);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header mode={theme.mode} navigation={navigation} title="Add Wallpaper" />
      {/* --------------------------------------------------- preview --------- */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.mode ? R.color.black19 : R.color.grayE,
          },
        ]}>
        <ImagePicker
          mode={theme.mode}
          onSetImage={setSelectImage}
          value=""
          imageStyle={styles.imageStyle}
          imageContainerStyle={styles.imageContainerStyle}
        />
        <View style={styles.containContainer}>
          {renderItem('Name', state?.name, theme.mode, false)}
          {renderItem('Category', state?.category, theme.mode, true)}
          {renderItem('Sub-Category', state?.subcategory, theme.mode, true)}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: R.unit.scale(5),
              flexWrap: 'wrap',
            }}>
            <Text
              type="label"
              string={`Colours : `}
              mode={theme.mode}
              colorTone="light"
            />

            {state?.colors?.map((item: any, index: number) => (
              <View
                key={item?.id}
                style={{
                  width: R.unit.scale(15),
                  height: R.unit.scale(15),
                  borderRadius: R.unit.scale(10),
                  backgroundColor: item ? item : R.color.black,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <CustomTextInput
        label="Wallpapaer name"
        type="outlined"
        required
        validationMode="text"
        value={state?.name}
        onChangeText={text => setState({...state, name: text})}
        animation={true} // Enable floating label animation
        containerStyle={{
          marginVertical: R.unit.scale(25),
          marginHorizontal: R.unit.scale(10),
        }}
        mode={theme.mode}
      />
      {/* --------------------------------------------------- category select */}
      <Text
        type="label"
        string={'Select Category'}
        mode={theme.mode}
        containerStyle={{
          marginHorizontal: R.unit.scale(10),
          marginBottom: R.unit.scale(10),
        }}
        colorTone="light"
      />
      <ScrollableTabs
        tabs={WallCategoryList}
        selectionType="multiple" // Change to "single" for single selection
        onTabPress={handleTabPress}
        onGetSubCategory={data => {
          setSubCategoryList(data ? data : []);
        }}
        mode={theme.mode}
      />
      {/* sub-category select */}
      <Text
        visible={subCategoryList?.length != 0}
        type="label"
        string={'Select Sub-Category'}
        mode={theme.mode}
        containerStyle={{
          marginHorizontal: R.unit.scale(10),
          marginBottom: R.unit.scale(10),
          marginTop: R.unit.scale(20),
        }}
        colorTone="light"
      />
      <ScrollableTabs
        tabs={subCategoryList}
        selectionType="multiple" // Change to "single" for single selection
        onTabPress={handleSubTabPress}
        mode={theme.mode}
      />
      {/* sub-category select */}
      <Text
        type="label"
        string={'Select colors'}
        mode={theme.mode}
        containerStyle={{
          marginHorizontal: R.unit.scale(10),
          marginBottom: R.unit.scale(10),
          marginTop: R.unit.scale(20),
        }}
        colorTone="light"
      />
      {/* color list */}
      <ScrollableTabs
        tabs={colorList}
        selectionType="multiple" // Change to "single" for single selection
        onTabPress={handleColorTabPress}
        mode={theme.mode}
      />
      {/* --------------------------------------------------- upload button ---------- */}
      <Button
        title="Submit"
        loading={loading}
        component="fill"
        percentage={progress}
        style={{
          button: {
            height: R.unit.scale(45),
            marginHorizontal: R.unit.scale(10),
            marginTop: R.unit.scale(45),
          },
        }}
        onApply={() => setIsVisible(true)}
      />
      <Alert
        title="Upload new wallpaper"
        message="Are you sure want to upload this wallpaper ?"
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        mode={theme.mode}
        onAction={uploadWallpaper}
        okText="Upload"
      />
    </ScrollView>
  );
};
export default AddWall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: R.color.gray2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    marginHorizontal: R.unit.scale(10),
    flexDirection: 'row',
    marginTop: R.unit.scale(10),
  },
  imageContainerStyle: {
    width: R.unit.scale(100),
    height: R.unit.scale(190),
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(5),
    borderColor: R.color.gray6,

    // backgroundColor:'red'
  },
  imageStyle: {
    width: R.unit.scale(100),
    height: R.unit.scale(190),
  },
  containContainer: {
    paddingHorizontal: R.unit.scale(10),
    gap: R.unit.scale(10),
    flex: 1,
  },
});
