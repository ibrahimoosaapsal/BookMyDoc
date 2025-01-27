import React from 'react';

// Import containers
import AddWallContainer from '../../../container/dashboard/addwall/addwall';
import BaseLayout from '../../../components/layout/BaseLayout';
import R from '../../../res/R';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Platform, SafeAreaView} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const AddWallContainerMemo = React.memo(AddWallContainer);

const AddWallScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <AddWallContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default AddWallScreen;
