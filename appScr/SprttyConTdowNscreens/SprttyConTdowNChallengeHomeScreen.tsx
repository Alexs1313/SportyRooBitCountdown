import {useNavigation} from '@react-navigation/native';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {ChallengeHomeNav} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';
import Layout from '../SprttyConTdowNcomponents/SprttyConTdowNLayout';
import {
  gradients,
  screenStyles,
  spacing,
} from '../SprttyConTdowNthemes/SprttyConTdowNindex';
import {
  headerPaddingTop,
  tabBarPadding,
} from '../SprttyConTdowNutils/SprttyConTdowNindex';

const ChallengeHomeScreen = () => {
  const navigation = useNavigation<ChallengeHomeNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = tabBarPadding(insets.bottom);

  const onStart = () => {
    navigation.navigate('ChallengeQuiz', {
      restart: Date.now(),
    });
  };

  return (
    <Layout bounces={false}>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <Text style={screenStyles.eyebrow}>SPORTS QUIZ</Text>
        <Text style={screenStyles.screenTitle}>Challenge ⚡</Text>
      </View>

      <View style={[styles.scrollContent, {paddingBottom: tabPadBottom}]}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={require('../../assets/i/sportyritcoscchal.png')}
          style={styles.hero}
        />
        <Text style={styles.headline}>Test Your Sports Knowledge</Text>
        <Text style={styles.body}>
          Answer sport questions, build your score, and sharpen your game
          knowledge
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={styles.ctaOuter}>
          <LinearGradient colors={[...gradients.cta]} style={styles.ctaGrad}>
            <Text style={styles.ctaIcon}>⚡</Text>
            <Text style={styles.ctaText}>Start Challenge!</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontalWide,

    paddingTop: 12.4,

    alignItems: 'center',
  },
  hero: {
    marginBottom: 18.8,
  },
  headline: {
    color: '#facc15',

    fontSize: 22.2,

    fontWeight: '800',

    textAlign: 'center',

    marginBottom: 12.7,
  },
  body: {
    color: '#c9bdd9',
    fontSize: 15.8,
    lineHeight: 22.8,
    textAlign: 'center',
    marginBottom: 28.4,
    maxWidth: 340.6,
  },
  ctaOuter: {
    width: '96%',
    borderRadius: 18.5,
    overflow: 'hidden',
    marginBottom: 30.3,
  },
  ctaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10.2,
    height: 61.4,
  },
  ctaIcon: {
    fontSize: 20.3,
    color: '#ffffff',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18.7,
    fontWeight: '800',
  },
});

export default ChallengeHomeScreen;
