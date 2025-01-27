import React from 'react';

// Import containers
import WalllistContainer from '../../container/walllist';
import BaseLayout from '../../components/layout/BaseLayout';
import R from '../../res/R';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Platform, SafeAreaView} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const WalllistContainerMemo = React.memo(WalllistContainer);

const WalllistScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
          
        }}>
        <WalllistContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default WalllistScreen;
