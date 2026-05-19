import LinearGradient from 'react-native-linear-gradient';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {RootParamList} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';

import React, {useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

import Layout from '../SprttyConTdowNcomponents/SprttyConTdowNLayout';
import {gradients, spacing} from '../SprttyConTdowNthemes/SprttyConTdowNindex';

type WelcomeStep = {
  heroImage: number;
  featureEmoji: string;
  iconShadow: string;
  overline: string;
  title: string;
  body: string;
};

const WELCOME_STEPS: WelcomeStep[] = [
  {
    heroImage: require('../../assets/i/sportyritcountddowonbf.png'),
    featureEmoji: '📅',
    iconShadow: 'rgba(245, 184, 0, 0.38)',
    overline: 'Keep Important Dates Organized',
    title: 'Follow Your Sports Events',
    body: 'Add meaningful sports dates such as matches, tournaments, training goals, personal records, or achievements. See how much time is left before each event.',
  },
  {
    heroImage: require('../../assets/i/sportyritcountddowonbs.png'),
    featureEmoji: '🎉',
    iconShadow: 'rgba(168, 85, 247, 0.38)',
    overline: 'Create Personal Messages',
    title: 'Send Sports Greetings',
    body: 'Create personalized sport greetings for friends, teammates, athletes, or yourself. Save or share messages for personal records, milestones, special dates, and achievements.',
  },
  {
    heroImage: require('../../assets/i/sportyritcountddowonbt.png'),
    featureEmoji: '📘',
    iconShadow: 'rgba(34, 197, 94, 0.38)',
    overline: 'Explore Sports Content',
    title: 'Read, Learn, and Review',
    body: 'Discover short sport stories, open a daily fact, and answer simple sport questions in a calm knowledge section designed for light learning and focus.',
  },
];

type WelcomeNav = NativeStackNavigationProp<RootParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNav>();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const current = WELCOME_STEPS[step];

  const goMain = () => {
    navigation.replace('MainTabs');
  };

  const onPrimary = () => {
    if (step < WELCOME_STEPS.length - 1) {
      setStep(s => s + 1);
      return;
    }
    goMain();
  };

  return (
    <Layout bounces={false}>
      <View style={styles.screenFill}>
        <Pressable
          accessibilityRole="button"
          hitSlop={12}
          onPress={goMain}
          style={[styles.skipBtn, {top: insets.top + 12}]}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <View style={styles.heroWrapTall}>
          <Image
            accessibilityIgnoresInvertColors
            key={step}
            resizeMode="cover"
            source={current.heroImage}
            style={styles.heroImg}
          />
          <LinearGradient
            colors={['transparent', '#0d0620']}
            locations={[0, 1]}
            pointerEvents="none"
            style={styles.heroFade}
          />
        </View>

        <View style={styles.lowerPush}>
          <View style={styles.lower}>
            <View
              style={[
                styles.featureRing,
                {
                  shadowColor: current.iconShadow,
                  ...Platform.select({
                    ios: {
                      shadowOffset: {width: 0, height: 0},
                      shadowOpacity: 1,
                      shadowRadius: 10,
                    },
                    android: {elevation: 8},
                  }),
                },
              ]}>
              <Text style={styles.featureEmoji}>{current.featureEmoji}</Text>
            </View>

            <Text style={styles.overline}>
              {current.overline.toUpperCase()}
            </Text>
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.body}>{current.body}</Text>

            <View style={styles.dots}>
              {WELCOME_STEPS.map((_, idx) => {
                const active = idx === step;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.dot,
                      active ? styles.dotActive : styles.dotIdle,
                    ]}
                  />
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={onPrimary}
              style={styles.ctaOuter}>
              <LinearGradient
                colors={[...gradients.cta]}
                style={styles.ctaGradient}>
                <Text style={styles.ctaText}>
                  {step === WELCOME_STEPS.length - 1
                    ? 'Get Started 🚀'
                    : 'Next →'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screenFill: {
    flex: 1,

    paddingBottom: 50.8,
  },
  lowerPush: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  skipBtn: {
    position: 'absolute',

    right: 24.8,

    zIndex: 2,

    backgroundColor: '#231550',

    borderWidth: 1.8,

    borderColor: '#3d2380',

    borderRadius: 20.5,

    paddingHorizontal: 18.5,

    paddingVertical: 9.4,
  },
  skipText: {
    color: '#8b7baa',

    fontSize: 13.3,

    fontWeight: '600',

    letterSpacing: -0.08,
  },
  heroWrapTall: {
    width: '100%',

    overflow: 'hidden',

    height: 440.3,
  },
  heroImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',

    height: '100%',
  },
  heroFade: {
    position: 'absolute',

    left: 0,

    right: 0,

    bottom: 0,

    height: 120.4,
  },
  lower: {
    paddingHorizontal: spacing.welcomeHorizontal,

    paddingTop: 8.2,

    width: '100%',

    alignSelf: 'center',
  },
  featureRing: {
    width: 60.4,

    height: 60.3,

    borderRadius: 30.3,

    borderWidth: 2.7,

    borderColor: '#f5b800',

    backgroundColor: '#231550',

    alignItems: 'center',

    justifyContent: 'center',

    padding: 2.3,

    marginBottom: 20.6,
  },
  featureEmoji: {
    fontSize: 24.4,

    lineHeight: 36.3,
  },
  overline: {
    color: '#f5b800',

    fontSize: 12.3,

    fontWeight: '700',

    letterSpacing: 2.6,

    lineHeight: 18.7,

    marginBottom: 8.1,
  },
  title: {
    color: '#f0e8ff',

    fontSize: 26.4,

    fontWeight: '800',

    letterSpacing: 0.22,

    lineHeight: 31.2,

    marginBottom: 14.2,
  },
  body: {
    color: '#8b7baa',

    fontSize: 15.5,

    fontWeight: '400',

    letterSpacing: -0.23,

    lineHeight: 24.75,

    flexGrow: 1,
  },
  dots: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8.8,

    marginTop: 24.6,

    marginBottom: 20.3,
  },
  dot: {
    height: 4.5,

    borderRadius: 2.7,
  },
  dotActive: {
    width: 28.1,

    backgroundColor: '#f5b800',
  },
  dotIdle: {
    width: 8.5,

    backgroundColor: '#3d2380',
  },
  ctaOuter: {
    borderRadius: 16.3,

    overflow: 'hidden',

    marginBottom: 8.7,

    marginTop: 24.4,
  },
  ctaGradient: {
    height: 58.8,

    alignItems: 'center',

    justifyContent: 'center',

    width: '100%',
  },
  ctaText: {
    color: '#FFFFFF',

    fontSize: 16.4,

    fontWeight: '700',

    letterSpacing: -0.01,
  },
});
