import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';

import RootNav from './SprttyConTdowNsrc/SprttyConTdowNroutes/SprttyConTdowNnav';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
      <Toast bottomOffset={96} />
    </>
  );
};

export default App;
