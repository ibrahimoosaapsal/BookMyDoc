import React, { useEffect } from 'react';

//import containers
import SplashContainer from '../../container/splash';
import BaseLayout from '../../components/layout/BaseLayout';
import R from '../../res/R';

const SplashScreen = (props: any) => {
 
  return (
    
    <BaseLayout statusBarColor={R.color.primary}
    translucent
    >
      <SplashContainer navigation={props.navigation} route={props.route} />
    </BaseLayout>
  );
};

export default SplashScreen;
