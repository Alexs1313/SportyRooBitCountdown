import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {QuizOutcome} from '../data/quizTypes';

export type TabsParamList = {
  EventsTab: undefined;
  Greetings: undefined;
  StoriesTab: undefined;
  ChallengeTab: undefined;
  SettingsTab: undefined;
};

export type RootParamList = {
  Splash: undefined;
  Welcome: undefined;
  MainTabs: NavigatorScreenParams<TabsParamList> | undefined;
  EventForm: {eventId?: string} | undefined;
  EventDetail: {eventId: string};
  StoryDetail: {storyId: string};
  ChallengeQuiz: {restart?: number} | undefined;
  ChallengeResults: {
    score: number;
    outcomes: QuizOutcome[];
  };
  About: undefined;
  SettingsPlaceholder: {title: string};
};

export type EventsMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'EventsTab'>,
  NativeStackNavigationProp<RootParamList>
>;

export type StoriesMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'StoriesTab'>,
  NativeStackNavigationProp<RootParamList>
>;

export type ChallengeHomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'ChallengeTab'>,
  NativeStackNavigationProp<RootParamList>
>;

export type SettingsMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'SettingsTab'>,
  NativeStackNavigationProp<RootParamList>
>;
