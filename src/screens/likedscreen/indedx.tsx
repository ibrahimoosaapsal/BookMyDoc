import React from 'react';

// Import containers
import LikedContainer from '../../container/liked';
import BaseLayout from '../../components/layout/BaseLayout';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const LikedContainerMemo = React.memo(LikedContainer);

const LikedScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <LikedContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default LikedScreen;
