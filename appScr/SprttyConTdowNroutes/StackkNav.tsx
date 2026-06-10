import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import Loader from '../SprttyConTdowNcomponents/SprttyConTdowNLoader';
import AboutScreen from '../SprttyConTdowNscreens/SprttyConTdowNAboutScreen';
import ChallengeQuizScreen from '../SprttyConTdowNscreens/SprttyConTdowNChallengeQuizScreen';
import ChallengeResultsScreen from '../SprttyConTdowNscreens/SprttyConTdowNChallengeResultsScreen';
import EventDetailScreen from '../SprttyConTdowNscreens/SprttyConTdowNEventDetailScreen';
import EventFormScreen from '../SprttyConTdowNscreens/SprttyConTdowNEventFormScreen';
import SettingsPlaceholderScreen from '../SprttyConTdowNscreens/SprttyConTdowNSettingsPlaceholderScreen';
import StoryDetailScreen from '../SprttyConTdowNscreens/SprttyConTdowNStoryDetailScreen';
import WelcomeScreen from '../SprttyConTdowNscreens/SprttyConTdowNWelcomeScreen';
import MainTabs from './SprttyConTdowNtabs';
import type {RootParamList} from './SprttyConTdowNrootParamList';

const Stack = createNativeStackNavigator<RootParamList>();

const StackkNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Loader} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="EventForm"
        component={EventFormScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
      <Stack.Screen name="ChallengeQuiz" component={ChallengeQuizScreen} />
      <Stack.Screen
        name="ChallengeResults"
        component={ChallengeResultsScreen}
      />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen
        name="SettingsPlaceholder"
        component={SettingsPlaceholderScreen}
      />
    </Stack.Navigator>
  );
};

export default StackkNav;
