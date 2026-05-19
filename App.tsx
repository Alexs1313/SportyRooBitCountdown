import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';

import StackkNav from './appScr/SprttyConTdowNroutes/StackkNav';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StackkNav />
        <Toast bottomOffset={96} />
      </NavigationContainer>
    </>
  );
};

export default App;
