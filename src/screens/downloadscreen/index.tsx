import React from 'react';

// Import containers
import DownloadContainer from '../../container/download';
import BaseLayout from '../../components/layout/BaseLayout';
import R from '../../res/R';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Platform, SafeAreaView} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const DownloadContainerMemo = React.memo(DownloadContainer);

const DownloadScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
          
        }}>
        <DownloadContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default DownloadScreen;
