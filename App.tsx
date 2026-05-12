import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import Toast from 'react-native-toast-message';

import Sportyritcountddownnav from './Sportyritcountddown/Sportyritcountddownroutes/Sportyritcountddownnav.tsx';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Sportyritcountddownnav />
      </NavigationContainer>
      <Toast bottomOffset={96} />
    </>
  );
};

export default App;
