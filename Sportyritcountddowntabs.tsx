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

import Sportyritcountddowngreetn from './Sportyritcountddown/Sportyritcountddownscrns/Sportyritcountddowngreetn';
import Sportyritcountddownmain from './Sportyritcountddown/Sportyritcountddownscrns/Sportyritcountddownmain';
import Sportyritcountddownchallnghome from './Sportyritcountddown/Sportyritcountddownscrns/Sportyritcountddownchallnghome';
import Sportyritcountddownstrsmain from './Sportyritcountddown/Sportyritcountddownscrns/Sportyritcountddownstrsmain';
import Sportyritcountddownsettmain from './Sportyritcountddown/Sportyritcountddownscrns/Sportyritcountddownsettmain';
import type {SportyritcountddownTabsParamList} from './Sportyritcountddown/Sportyritcountddownroutes/sportyritcountddownrootparamlist';

const Tab = createBottomTabNavigator<SportyritcountddownTabsParamList>();

const GrnmdlccanadguiidAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const sportyritcountddownScale = useRef(new Animated.Value(1)).current;

  const sportyritcountddownHandlePressIn = () => {
    Animated.spring(sportyritcountddownScale, {
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

  const sportyritcountddownHandlePressOut = () => {
    Animated.spring(sportyritcountddownScale, {
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
      onPressIn={sportyritcountddownHandlePressIn}
      onPressOut={sportyritcountddownHandlePressOut}
      style={[style as ViewStyle, styles.sportyritcountddownButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.sportyritcountddownButtonInner,
          {transform: [{scale: sportyritcountddownScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const GrnmdlccanadguiidIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.sportyritcountddownIconWrap}>
      <View style={styles.sportyritcountddownIconImageWrap}>
        {focused ? (
          <Image
            source={require('./assets/i/sportyritcountddowind.png')}
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
          styles.sportyritcountddownLabel,
          focused
            ? styles.sportyritcountddownLabelFocused
            : styles.sportyritcountddownLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const sportyritcountddownBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#120826', '#120826']}
    style={StyleSheet.absoluteFill}
  />
);

const sportyritcountddownIconPlaces = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Events"
    source={require('./assets/i/sportyritcountddowic1.png')}
  />
);

const sportyritcountddownIconSaved = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Greetings"
    source={require('./assets/i/sportyritcountddowic2.png')}
  />
);

const sportyritcountddownIconMap = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Stories"
    source={require('./assets/i/sportyritcountddowic3.png')}
  />
);

const sportyritcountddownIconBlog = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Challenge"
    source={require('./assets/i/sportyritcountddowic4.png')}
  />
);

const sportyritcountddownIconQuiz = ({focused}: {focused: boolean}) => (
  <GrnmdlccanadguiidIcon
    focused={focused}
    label="Settings"
    source={require('./assets/i/sportyritcountddowic5.png')}
  />
);

const sportyritcountddownButton = (props: Record<string, unknown>) => (
  <GrnmdlccanadguiidAnimatedButton {...props} />
);

const Sportyritcountddowntabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.sportyritcountddownBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: sportyritcountddownButton,
        tabBarBackground: sportyritcountddownBarBackground,
      }}>
      <Tab.Screen
        name="Sportyritcountddowneventstab"
        component={Sportyritcountddownmain}
        options={{
          tabBarIcon: sportyritcountddownIconPlaces,
        }}
      />
      <Tab.Screen
        name="Sportyritcountddowngreetn"
        component={Sportyritcountddowngreetn}
        options={{
          tabBarIcon: sportyritcountddownIconSaved,
        }}
      />
      <Tab.Screen
        name="Sportyritcountddownstrstab"
        component={Sportyritcountddownstrsmain}
        options={{
          tabBarIcon: sportyritcountddownIconMap,
        }}
      />
      <Tab.Screen
        name="Sportyritcountddownchallngtab"
        component={Sportyritcountddownchallnghome}
        options={{
          tabBarIcon: sportyritcountddownIconBlog,
        }}
      />
      <Tab.Screen
        name="Sportyritcountddownsetttab"
        component={Sportyritcountddownsettmain}
        options={{
          tabBarIcon: sportyritcountddownIconQuiz,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownLabelFocused: {
    color: '#F5B800',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },

  sportyritcountddownIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownBar: {
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

  sportyritcountddownButton: {
    flex: 1,
  },
  sportyritcountddownButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sportyritcountddownIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
  },

  sportyritcountddownIconSel: {
    position: 'absolute',
    top: -6,
  },
  sportyritcountddownIconSelFocused: {
    zIndex: -1,
  },

  sportyritcountddownIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownIconCircleFocused: {
    borderWidth: 1,
    borderColor: '#805CB4',
  },
  sportyritcountddownLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  sportyritcountddownLabelIdle: {
    color: '#5A4A7A',
  },
});

export default Sportyritcountddowntabs;
