import React from 'react';

// Import containers
import DetailsContainer from '../../container/details';
import BaseLayout from '../../components/layout/BaseLayout';
import R from '../../res/R';
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const DetailsContainerMemo = React.memo(DetailsContainer);

const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout
   
    >
      <DetailsContainerMemo navigation={navigation} route={route} />
    </BaseLayout>
  );
};

export default DetailsScreen;
