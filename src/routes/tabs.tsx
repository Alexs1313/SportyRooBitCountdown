import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import GreetingsScreen from '../screens/GreetingsScreen';
import EventsScreen from '../screens/EventsScreen';
import ChallengeHomeScreen from '../screens/ChallengeHomeScreen';
import StoriesMainScreen from '../screens/StoriesMainScreen';
import SettingsMainScreen from '../screens/SettingsMainScreen';
import type {TabsParamList} from './rootParamList';

const Tab = createBottomTabNavigator<TabsParamList>();

const TabAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.button]}
      {...rest}>
      <Animated.View
        style={[
          styles.buttonInner,
          {transform: [{scale: scale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const TabIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.iconWrap}>
      <View style={styles.iconImageWrap}>
        {focused ? (
          <Image
            source={require('../../assets/i/sportyritcountddowind.png')}
            style={{position: 'absolute', top: -16, right: 6.6}}
          />
        ) : null}

        <View
          style={{
            width: 44,
            height: 32,
            backgroundColor: focused ? '#2D1060' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={source}
            style={{width: 22, height: 22}}
            tintColor={focused ? '#F5B800' : '#5A4A7A'}
          />
        </View>
      </View>
      <Text
        style={[
          styles.label,
          focused
            ? styles.labelFocused
            : styles.labelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const barBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#120826', '#120826']}
    style={StyleSheet.absoluteFill}
  />
);

const iconPlaces = ({focused}: {focused: boolean}) => (
  <TabIcon
    focused={focused}
    label="Events"
    source={require('../../assets/i/sportyritcountddowic1.png')}
  />
);

const iconSaved = ({focused}: {focused: boolean}) => (
  <TabIcon
    focused={focused}
    label="Greetings"
    source={require('../../assets/i/sportyritcountddowic2.png')}
  />
);

const iconMap = ({focused}: {focused: boolean}) => (
  <TabIcon
    focused={focused}
    label="Stories"
    source={require('../../assets/i/sportyritcountddowic3.png')}
  />
);

const iconBlog = ({focused}: {focused: boolean}) => (
  <TabIcon
    focused={focused}
    label="Challenge"
    source={require('../../assets/i/sportyritcountddowic4.png')}
  />
);

const iconQuiz = ({focused}: {focused: boolean}) => (
  <TabIcon
    focused={focused}
    label="Settings"
    source={require('../../assets/i/sportyritcountddowic5.png')}
  />
);

const button = (props: Record<string, unknown>) => (
  <TabAnimatedButton {...props} />
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.bar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: button,
        tabBarBackground: barBackground,
      }}>
      <Tab.Screen
        name="EventsTab"
        component={EventsScreen}
        options={{
          tabBarIcon: iconPlaces,
        }}
      />
      <Tab.Screen
        name="Greetings"
        component={GreetingsScreen}
        options={{
          tabBarIcon: iconSaved,
        }}
      />
      <Tab.Screen
        name="StoriesTab"
        component={StoriesMainScreen}
        options={{
          tabBarIcon: iconMap,
        }}
      />
      <Tab.Screen
        name="ChallengeTab"
        component={ChallengeHomeScreen}
        options={{
          tabBarIcon: iconBlog,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsMainScreen}
        options={{
          tabBarIcon: iconQuiz,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelFocused: {
    color: '#F5B800',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },

  iconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    elevation: 0,
    paddingTop: 10,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    borderColor: '#2D1B69',
    borderTopWidth: 1,
    borderTopColor: '#2D1B69',
    backgroundColor: 'transparent',
    height: 90,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  button: {
    flex: 1,
  },
  buttonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
  },

  iconSel: {
    position: 'absolute',
    top: -6,
  },
  iconSelFocused: {
    zIndex: -1,
  },

  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleFocused: {
    borderWidth: 1,
    borderColor: '#805CB4',
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  labelIdle: {
    color: '#5A4A7A',
  },
});

export default MainTabs;
