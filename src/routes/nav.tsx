import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import Loader from '../components/Loader';
import AboutScreen from '../screens/AboutScreen';
import ChallengeQuizScreen from '../screens/ChallengeQuizScreen';
import ChallengeResultsScreen from '../screens/ChallengeResultsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventFormScreen from '../screens/EventFormScreen';
import SettingsPlaceholderScreen from '../screens/SettingsPlaceholderScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabs from './tabs';
import type {RootParamList} from './rootParamList';

const Stack = createNativeStackNavigator<RootParamList>();

const RootNav = () => {
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

export default RootNav;
