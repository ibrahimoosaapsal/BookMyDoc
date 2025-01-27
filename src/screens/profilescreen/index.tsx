import React from 'react';

// Import containers
import ProfileContainer from '../../container/profile';
import BaseLayout from '../../components/layout/BaseLayout';
import R from '../../res/R';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Platform, SafeAreaView} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
const ProfileContainerMemo = React.memo(ProfileContainer);

const ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    
    <BaseLayout>
      <SafeAreaView
        style={{
          flex: 1,
          
        }}>
        <ProfileContainerMemo navigation={navigation} route={route} />
      </SafeAreaView>
    </BaseLayout>
  );
};

export default ProfileScreen;
