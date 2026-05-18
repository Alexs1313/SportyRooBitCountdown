import {useNavigation} from '@react-navigation/native';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {ChallengeHomeNav} from '../routes/rootParamList';
import Layout from '../components/Layout';

const ChallengeHomeScreen = () => {
  const navigation =
    useNavigation<ChallengeHomeNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = insets.bottom + 88;

  const onStart = () => {
    navigation.navigate('ChallengeQuiz', {
      restart: Date.now(),
    });
  };

  return (
    <Layout bounces={false}>
      <View
        style={[
          styles.headerBlock,
          {paddingTop: insets.top + 8},
        ]}>
        <Text style={styles.eyebrow}>SPORTS QUIZ</Text>
        <Text style={styles.screenTitle}>Challenge ⚡</Text>
      </View>

      <View
        style={[
          styles.scrollContent,
          {paddingBottom: tabPadBottom},
        ]}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={require('../../assets/i/sportyritcoscchal.png')}
          style={styles.hero}
        />
        <Text style={styles.headline}>
          Sporty Roo Challenges You!
        </Text>
        <Text style={styles.body}>
          Answer sport questions, build your score, and sharpen your game
          knowledge
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={styles.ctaOuter}>
          <LinearGradient
            colors={['#7B2FBE', '#F5B800']}
            style={styles.ctaGrad}>
            <Text style={styles.ctaIcon}>⚡</Text>
            <Text style={styles.ctaText}>
              Start Challenge!
            </Text>
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
  headerBlock: {
    backgroundColor: '#120826',
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  eyebrow: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 18,
  },
  screenTitle: {
    color: '#f0e8ff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.07,
    lineHeight: 36,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    alignItems: 'center',
  },
  hero: {
    marginBottom: 18,
  },
  headline: {
    color: '#facc15',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    color: '#c9bdd9',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 28,
    maxWidth: 340,
  },
  ctaOuter: {
    width: '96%',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 30,
  },
  ctaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 61,
  },
  ctaIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default ChallengeHomeScreen;
