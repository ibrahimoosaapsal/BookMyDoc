import React from 'react';

// Import containers
import HomeContainer from '../../container/home';
import BaseLayout from '../../components/layout/BaseLayout';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const HomeContainerMemo = React.memo(HomeContainer);

const HomeScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <HomeContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default HomeScreen;
