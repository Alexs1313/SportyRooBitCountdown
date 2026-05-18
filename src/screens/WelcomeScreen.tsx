import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {RootParamList} from '../routes/rootParamList';

import React, {useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../components/Layout';
import {gradients, spacing} from '../themes';

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
    overline: 'Never Miss a Big Moment',
    title: 'Track Your Sports Events',
    body: 'Add your most important sports dates — matches, championships, personal records. Watch the countdown tick down to the action!',
  },
  {
    heroImage: require('../../assets/i/sportyritcountddowonbs.png'),
    featureEmoji: '🎉',
    iconShadow: 'rgba(168, 85, 247, 0.38)',
    overline: 'Share the Excitement',
    title: 'Celebrate Every Milestone',
    body: 'Generate personalized sports greetings for your friends and teammates. Celebrate victories, anniversaries, and achievements together.',
  },
  {
    heroImage: require('../../assets/i/sportyritcountddowonbt.png'),
    featureEmoji: '⚡',
    iconShadow: 'rgba(34, 197, 94, 0.38)',
    overline: 'Test Your Sports Knowledge',
    title: 'Rise to the Challenge',
    body: 'Discover fascinating sports stories, learn the fact of the day, and challenge yourself with exciting sports knowledge quizzes.',
  },
];

type WelcomeNav = NativeStackNavigationProp<RootParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNav>();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const current =
    WELCOME_STEPS[step];

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
          style={[
            styles.skipBtn,
            {top: insets.top + 12},
          ]}>
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
              <Text style={styles.featureEmoji}>
                {current.featureEmoji}
              </Text>
            </View>

            <Text style={styles.overline}>
              {current.overline.toUpperCase()}
            </Text>
            <Text style={styles.title}>
              {current.title}
            </Text>
            <Text style={styles.body}>
              {current.body}
            </Text>

            <View style={styles.dots}>
              {WELCOME_STEPS.map(
                (_, idx) => {
                  const active =
                    idx === step;
                  return (
                    <View
                      key={idx}
                      style={[
                        styles.dot,
                        active
                          ? styles.dotActive
                          : styles.dotIdle,
                      ]}
                    />
                  );
                },
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={onPrimary}
              style={styles.ctaOuter}>
              <LinearGradient
                colors={[...gradients.cta]}
                style={styles.ctaGradient}>
                <Text style={styles.ctaText}>
                  {step ===
                  WELCOME_STEPS.length - 1
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
    paddingBottom: 50,
  },
  lowerPush: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  skipBtn: {
    position: 'absolute',
    right: 24,
    zIndex: 2,
    backgroundColor: '#231550',
    borderWidth: 1,
    borderColor: '#3d2380',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  skipText: {
    color: '#8b7baa',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
  },
  heroWrapTall: {
    width: '100%',
    overflow: 'hidden',
    height: 440,
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
    height: 120,
  },
  lower: {
    paddingHorizontal: spacing.welcomeHorizontal,
    paddingTop: 8,
    width: '100%',
    alignSelf: 'center',
  },
  featureRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#f5b800',
    backgroundColor: '#231550',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    marginBottom: 20,
  },
  featureEmoji: {
    fontSize: 24,
    lineHeight: 36,
  },
  overline: {
    color: '#f5b800',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 18,
    marginBottom: 8,
  },
  title: {
    color: '#f0e8ff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.22,
    lineHeight: 31.2,
    marginBottom: 14,
  },
  body: {
    color: '#8b7baa',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.23,
    lineHeight: 24.75,

    flexGrow: 1,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 20,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#f5b800',
  },
  dotIdle: {
    width: 8,
    backgroundColor: '#3d2380',
  },
  ctaOuter: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 24,
  },
  ctaGradient: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.01,
  },
});
