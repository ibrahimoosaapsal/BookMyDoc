import React from 'react';

// Import containers
import SubCategoryContainer from '../../container/subcategory';
import BaseLayout from '../../components/layout/BaseLayout';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';
import R from '../../res/R';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const SubCategoryContainerMemo = React.memo(SubCategoryContainer);


const SubCategoryScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    
    <BaseLayout >
    <SafeAreaView style={{
          flex: 1,
          
        }}>
      <SubCategoryContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default SubCategoryScreen;
