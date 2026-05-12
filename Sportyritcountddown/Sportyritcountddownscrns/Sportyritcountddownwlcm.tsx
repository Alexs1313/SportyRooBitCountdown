import {useNavigation} from '@react-navigation/native';

import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const HORIZONTAL_PAD = 32;

type SportyritcountddownwlcmStep = {
  heroImage: number;
  featureEmoji: string;
  iconShadow: string;
  overline: string;
  title: string;
  body: string;
};

const SPORTYRITCOUNTDDOWN_WLCM_STEPS: SportyritcountddownwlcmStep[] = [
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

const Sportyritcountddownwlcm = () => {
  const sportyritcountddownNavigation = useNavigation();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const [sportyritcountddownStep, setSportyritcountddownStep] = useState(0);

  const sportyritcountddownCurrent =
    SPORTYRITCOUNTDDOWN_WLCM_STEPS[sportyritcountddownStep];

  const sportyritcountddownGoMain = () => {
    sportyritcountddownNavigation.navigate('Sportyritcountddowntabs' as never);
  };

  const sportyritcountddownOnPrimary = () => {
    if (sportyritcountddownStep < SPORTYRITCOUNTDDOWN_WLCM_STEPS.length - 1) {
      setSportyritcountddownStep(s => s + 1);
      return;
    }
    sportyritcountddownGoMain();
  };

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View style={styles.sportyritcountddownScreenFill}>
        <Pressable
          accessibilityRole="button"
          hitSlop={12}
          onPress={sportyritcountddownGoMain}
          style={[
            styles.sportyritcountddownSkipBtn,
            {top: sportyritcountddownInsets.top + 12},
          ]}>
          <Text style={styles.sportyritcountddownSkipText}>Skip</Text>
        </Pressable>

        <View style={styles.sportyritcountddownHeroWrapTall}>
          <Image
            accessibilityIgnoresInvertColors
            key={sportyritcountddownStep}
            resizeMode="cover"
            source={sportyritcountddownCurrent.heroImage}
            style={styles.sportyritcountddownHeroImg}
          />
          <LinearGradient
            colors={['transparent', '#0d0620']}
            locations={[0, 1]}
            pointerEvents="none"
            style={styles.sportyritcountddownHeroFade}
          />
        </View>

        <View style={styles.sportyritcountddownLowerPush}>
          <View style={styles.sportyritcountddownLower}>
            <View
              style={[
                styles.sportyritcountddownFeatureRing,
                {
                  shadowColor: sportyritcountddownCurrent.iconShadow,
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
              <Text style={styles.sportyritcountddownFeatureEmoji}>
                {sportyritcountddownCurrent.featureEmoji}
              </Text>
            </View>

            <Text style={styles.sportyritcountddownOverline}>
              {sportyritcountddownCurrent.overline.toUpperCase()}
            </Text>
            <Text style={styles.sportyritcountddownTitle}>
              {sportyritcountddownCurrent.title}
            </Text>
            <Text style={styles.sportyritcountddownBody}>
              {sportyritcountddownCurrent.body}
            </Text>

            <View style={styles.sportyritcountddownDots}>
              {SPORTYRITCOUNTDDOWN_WLCM_STEPS.map(
                (_, sportyritcountddownIdx) => {
                  const sportyritcountddownActive =
                    sportyritcountddownIdx === sportyritcountddownStep;
                  return (
                    <View
                      key={sportyritcountddownIdx}
                      style={[
                        styles.sportyritcountddownDot,
                        sportyritcountddownActive
                          ? styles.sportyritcountddownDotActive
                          : styles.sportyritcountddownDotIdle,
                      ]}
                    />
                  );
                },
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={sportyritcountddownOnPrimary}
              style={styles.sportyritcountddownCtaOuter}>
              <LinearGradient
                colors={['#7B2FBE', '#F5B800']}
                style={styles.sportyritcountddownCtaGradient}>
                <Text style={styles.sportyritcountddownCtaText}>
                  {sportyritcountddownStep ===
                  SPORTYRITCOUNTDDOWN_WLCM_STEPS.length - 1
                    ? 'Get Started 🚀'
                    : 'Next →'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Sportyritcountddownlayout>
  );
};

export default Sportyritcountddownwlcm;

const styles = StyleSheet.create({
  sportyritcountddownScreenFill: {
    flex: 1,
    paddingBottom: 50,
  },
  sportyritcountddownLowerPush: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sportyritcountddownSkipBtn: {
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
  sportyritcountddownSkipText: {
    color: '#8b7baa',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
  },
  sportyritcountddownHeroWrapTall: {
    width: '100%',
    overflow: 'hidden',
    height: 440,
  },
  sportyritcountddownHeroImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  sportyritcountddownHeroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },
  sportyritcountddownLower: {
    paddingHorizontal: HORIZONTAL_PAD,
    paddingTop: 8,
    width: '100%',
    alignSelf: 'center',
  },
  sportyritcountddownFeatureRing: {
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
  sportyritcountddownFeatureEmoji: {
    fontSize: 24,
    lineHeight: 36,
  },
  sportyritcountddownOverline: {
    color: '#f5b800',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 18,
    marginBottom: 8,
  },
  sportyritcountddownTitle: {
    color: '#f0e8ff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.22,
    lineHeight: 31.2,
    marginBottom: 14,
  },
  sportyritcountddownBody: {
    color: '#8b7baa',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.23,
    lineHeight: 24.75,

    flexGrow: 1,
  },
  sportyritcountddownDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 20,
  },
  sportyritcountddownDot: {
    height: 4,
    borderRadius: 2,
  },
  sportyritcountddownDotActive: {
    width: 28,
    backgroundColor: '#f5b800',
  },
  sportyritcountddownDotIdle: {
    width: 8,
    backgroundColor: '#3d2380',
  },
  sportyritcountddownCtaOuter: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 24,
  },
  sportyritcountddownCtaGradient: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sportyritcountddownCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.01,
  },
});
