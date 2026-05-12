import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import Sportyritcountddowntabs from '../../Sportyritcountddowntabs.tsx';
import Sportyritcountddownabout from '../Sportyritcountddownscrns/Sportyritcountddownabout';
import Sportyritcountddownchallngquiz from '../Sportyritcountddownscrns/Sportyritcountddownchallngquiz';
import Sportyritcountddownchallngresults from '../Sportyritcountddownscrns/Sportyritcountddownchallngresults';
import Sportyritcountddowneventdetail from '../Sportyritcountddownscrns/Sportyritcountddowneventdetail';
import Sportyritcountddowneventform from '../Sportyritcountddownscrns/Sportyritcountddowneventform';
import Sportyritcountddownsettplaceholder from '../Sportyritcountddownscrns/Sportyritcountddownsettplaceholder';
import Sportyritcountddownstrsdetail from '../Sportyritcountddownscrns/Sportyritcountddownstrsdetail';
import Sportyritcountddownwlcm from '../Sportyritcountddownscrns/Sportyritcountddownwlcm.tsx';
import Sportyritcountddownloader from '../Sportyritcountddowncompnts/Sportyritcountddownloader.tsx';
import type {SportyritcountddownRootParamList} from './sportyritcountddownrootparamlist';

const Stack =
  createNativeStackNavigator<SportyritcountddownRootParamList>();

const Sportyritcountddownnav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sportyritcountddownloader"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Sportyritcountddownloader"
        component={Sportyritcountddownloader}
      />
      <Stack.Screen
        name="Sportyritcountddownwlcm"
        component={Sportyritcountddownwlcm}
      />
      <Stack.Screen
        name="Sportyritcountddowntabs"
        component={Sportyritcountddowntabs}
      />
      <Stack.Screen
        name="Sportyritcountddowneventform"
        component={Sportyritcountddowneventform}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Sportyritcountddowneventdetail"
        component={Sportyritcountddowneventdetail}
      />
      <Stack.Screen
        name="Sportyritcountddownstrsdetail"
        component={Sportyritcountddownstrsdetail}
      />
      <Stack.Screen
        name="Sportyritcountddownchallngquiz"
        component={Sportyritcountddownchallngquiz}
      />
      <Stack.Screen
        name="Sportyritcountddownchallngresults"
        component={Sportyritcountddownchallngresults}
      />
      <Stack.Screen
        name="Sportyritcountddownabout"
        component={Sportyritcountddownabout}
      />
      <Stack.Screen
        name="Sportyritcountddownsettplaceholder"
        component={Sportyritcountddownsettplaceholder}
      />
    </Stack.Navigator>
  );
};

export default Sportyritcountddownnav;
