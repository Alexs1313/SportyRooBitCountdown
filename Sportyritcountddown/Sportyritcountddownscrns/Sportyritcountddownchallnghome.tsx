import {useNavigation} from '@react-navigation/native';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownChallngHomeNav} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const Sportyritcountddownchallnghome = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownChallngHomeNav>();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const sportyritcountddownOnStart = () => {
    sportyritcountddownNavigation.navigate('Sportyritcountddownchallngquiz', {
      restart: Date.now(),
    });
  };

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <Text style={styles.sportyritcountddownEyebrow}>SPORTS QUIZ</Text>
        <Text style={styles.sportyritcountddownScreenTitle}>Challenge ⚡</Text>
      </View>

      <View
        style={[
          styles.sportyritcountddownScrollContent,
          {paddingBottom: sportyritcountddownTabPadBottom},
        ]}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={require('../../assets/i/sportyritcoscchal.png')}
          style={styles.sportyritcountddownHero}
        />
        <Text style={styles.sportyritcountddownHeadline}>
          Sporty Roo Challenges You!
        </Text>
        <Text style={styles.sportyritcountddownBody}>
          Answer sport questions, build your score, and sharpen your game
          knowledge
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={sportyritcountddownOnStart}
          style={styles.sportyritcountddownCtaOuter}>
          <LinearGradient
            colors={['#7B2FBE', '#F5B800']}
            style={styles.sportyritcountddownCtaGrad}>
            <Text style={styles.sportyritcountddownCtaIcon}>⚡</Text>
            <Text style={styles.sportyritcountddownCtaText}>
              Start Challenge!
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Sportyritcountddownlayout>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownHeaderBlock: {
    backgroundColor: '#120826',
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sportyritcountddownEyebrow: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 18,
  },
  sportyritcountddownScreenTitle: {
    color: '#f0e8ff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.07,
    lineHeight: 36,
    marginTop: 4,
  },
  sportyritcountddownScrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    alignItems: 'center',
  },
  sportyritcountddownHero: {
    marginBottom: 18,
  },
  sportyritcountddownHeadline: {
    color: '#facc15',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  sportyritcountddownBody: {
    color: '#c9bdd9',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 28,
    maxWidth: 340,
  },
  sportyritcountddownCtaOuter: {
    width: '96%',
    borderRadius: 18,
    overflow: 'hidden',
  },
  sportyritcountddownCtaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 61,
  },
  sportyritcountddownCtaIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  sportyritcountddownCtaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Sportyritcountddownchallnghome;
