import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {SportyritcountddownQuizOutcome} from '../Sportyritcountddowndata/sportyritcountddownquiztypes';

export type SportyritcountddownTabsParamList = {
  Sportyritcountddowneventstab: undefined;
  Sportyritcountddowngreetn: undefined;
  Sportyritcountddownstrstab: undefined;
  Sportyritcountddownchallngtab: undefined;
  Sportyritcountddownsetttab: undefined;
};

export type SportyritcountddownRootParamList = {
  Sportyritcountddownloader: undefined;
  Sportyritcountddownwlcm: undefined;
  Sportyritcountddowntabs:
    | NavigatorScreenParams<SportyritcountddownTabsParamList>
    | undefined;
  Sportyritcountddowneventform: {eventId?: string} | undefined;
  Sportyritcountddowneventdetail: {eventId: string};
  Sportyritcountddownstrsdetail: {storyId: string};
  Sportyritcountddownchallngquiz: {restart?: number} | undefined;
  Sportyritcountddownchallngresults: {
    score: number;
    outcomes: SportyritcountddownQuizOutcome[];
  };
  Sportyritcountddownabout: undefined;
  Sportyritcountddownsettplaceholder: {title: string};
};

export type SportyritcountddownEventsMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<
    SportyritcountddownTabsParamList,
    'Sportyritcountddowneventstab'
  >,
  NativeStackNavigationProp<SportyritcountddownRootParamList>
>;

export type SportyritcountddownStrsMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<
    SportyritcountddownTabsParamList,
    'Sportyritcountddownstrstab'
  >,
  NativeStackNavigationProp<SportyritcountddownRootParamList>
>;

export type SportyritcountddownChallngHomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<
    SportyritcountddownTabsParamList,
    'Sportyritcountddownchallngtab'
  >,
  NativeStackNavigationProp<SportyritcountddownRootParamList>
>;

export type SportyritcountddownSettMainNav = CompositeNavigationProp<
  BottomTabNavigationProp<
    SportyritcountddownTabsParamList,
    'Sportyritcountddownsetttab'
  >,
  NativeStackNavigationProp<SportyritcountddownRootParamList>
>;
