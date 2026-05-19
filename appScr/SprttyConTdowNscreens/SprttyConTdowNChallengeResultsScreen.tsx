import {QUIZ_SESSION_TOTAL} from '../SprttyConTdowNconstants/SprttyConTdowNquiz';
import {STORAGE_KEYS} from '../SprttyConTdowNconstants/SprttyConTdowNstorageKeys';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootParamList} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';
import Layout from '../SprttyConTdowNcomponents/SprttyConTdowNLayout';
import {gradients, screenStyles} from '../SprttyConTdowNthemes/SprttyConTdowNindex';
import {headerPaddingTop, tabBarPadding} from '../SprttyConTdowNutils/SprttyConTdowNindex';

type ChallengeResultsNav = NativeStackNavigationProp<
  RootParamList,
  'ChallengeResults'
>;

type ChallengeResultsRoute = RouteProp<RootParamList, 'ChallengeResults'>;

const ChallengeResultsScreen = () => {
  const navigation = useNavigation<ChallengeResultsNav>();
  const route = useRoute<ChallengeResultsRoute>();
  const insets = useSafeAreaInsets();

  const {score, outcomes} = route.params;

  const [best, setBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  const tabPadBottom = tabBarPadding(insets.bottom);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.quizBestScore);
        const prev = raw ? parseInt(raw, 10) : 0;
        if (!active) {
          return;
        }
        setBest(prev);
        if (score > prev) {
          setNewRecord(true);
          await AsyncStorage.setItem(STORAGE_KEYS.quizBestScore, String(score));
          setBest(score);
        }
      } catch {
        console.log('error');
      }
    })();
    return () => {
      active = false;
    };
  }, [score]);

  const counts = outcomes.reduce(
    (acc, o) => {
      if (o === 'correct') {
        acc.correct += 1;
      } else if (o === 'wrong') {
        acc.wrong += 1;
      } else {
        acc.timeout += 1;
      }
      return acc;
    },
    {correct: 0, wrong: 0, timeout: 0},
  );

  const medal = score >= 8 ? '🥇' : score >= 5 ? '🥈' : '🥉';

  const onPlayAgain = useCallback(() => {
    navigation.replace('ChallengeQuiz', {
      restart: Date.now(),
    });
  }, [navigation]);

  const onHome = useCallback(() => {
    navigation.navigate('MainTabs', {
      screen: 'ChallengeTab',
    });
  }, [navigation]);

  const progressWidth = `${Math.round(
    (score / QUIZ_SESSION_TOTAL) * 100,
  )}%` as DimensionValue;

  return (
    <Layout bounces={false}>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <View style={styles.headerTop}>
          <View style={styles.titleWrap}>
            <Text style={screenStyles.eyebrow}>QUIZ RESULTS</Text>
            <Text style={screenStyles.screenTitle}>Results 🏆</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.scroll,
          styles.scrollBodyTop,
          {paddingBottom: tabPadBottom},
        ]}>
        <Text style={styles.medalEmoji}>{medal}</Text>
        {newRecord ? (
          <Text style={styles.newRecord}>🎉 New Record!</Text>
        ) : null}

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>YOUR SCORE</Text>
          <Text style={styles.scoreBig}>{score}</Text>
          <Text style={styles.scoreSub}>
            out of {QUIZ_SESSION_TOTAL} questions
          </Text>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={['#facc15', '#7b2fbe']}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={[styles.barFill, {width: progressWidth}]}
            />
          </View>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>Question Review</Text>
          <View style={styles.grid}>
            {outcomes.map((o, i) => {
              const border =
                o === 'correct'
                  ? '#22C55E'
                  : o === 'wrong'
                  ? '#EF4444'
                  : '#7b2fbe';
              const cellBg =
                o === 'correct'
                  ? '#0D2010'
                  : o === 'wrong'
                  ? '#3A0D0D'
                  : '#2D1B69';
              const sym = o === 'correct' ? '✓' : o === 'wrong' ? '✗' : '⏱';
              return (
                <View
                  key={i}
                  style={[
                    styles.cell,
                    {
                      borderColor: border,
                      backgroundColor: cellBg,
                    },
                  ]}>
                  <Text style={styles.cellTxt}>{sym}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendSwatch, styles.legendSwatchGreen]} />
              <Text style={styles.legendText}>{counts.correct} correct</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSwatch, styles.legendSwatchRed]} />
              <Text style={styles.legendText}>{counts.wrong} wrong</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendSwatch, styles.legendSwatchPurple]} />
              <Text style={styles.legendText}>{counts.timeout} timeout</Text>
            </View>
          </View>
          {best > 0 ? (
            <Text style={styles.bestLine}>Best score: {best}</Text>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onPlayAgain}
          style={styles.primaryOuter}>
          <LinearGradient
            colors={[...gradients.cta]}
            style={styles.primaryGrad}>
            <Image source={require('../../assets/i/sportyritcosccrel.png')} />
            <Text style={styles.primaryTxt}>Play Again</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onHome}
          style={styles.secondary}>
          <Text style={styles.secondaryTxt}>Back to Menu</Text>
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
  headerTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    minHeight: 58.1,
  },
  titleWrap: {
    flex: 1,

    paddingRight: 12.5,
  },
  scrollFill: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20.4,
  },
  scrollBodyTop: {
    paddingTop: 16.6,
  },
  medalEmoji: {
    fontSize: 72.1,

    textAlign: 'center',

    marginBottom: 8.4,
  },
  newRecord: {
    color: '#F5B800',

    fontSize: 20.1,

    fontWeight: '800',

    textAlign: 'center',

    marginBottom: 22.3,
  },
  scoreCard: {
    borderRadius: 18.8,

    borderWidth: 2.7,

    borderColor: '#F5B800',

    backgroundColor: '#1a0d32',

    padding: 20.8,

    marginBottom: 16.6,
  },
  scoreLabel: {
    color: '#9ca3af',

    fontSize: 11.4,

    fontWeight: '700',

    letterSpacing: 1.7,

    marginBottom: 6.5,

    textAlign: 'center',
  },
  scoreBig: {
    color: '#F5B800',

    fontSize: 56.7,

    fontWeight: '900',

    lineHeight: 62.8,

    textAlign: 'center',
  },
  scoreSub: {
    color: '#c9bdd9',

    fontSize: 14.7,

    marginBottom: 19.8,

    textAlign: 'center',
  },
  barTrack: {
    height: 8.2,

    borderRadius: 5.7,

    backgroundColor: '#2a1f45',

    overflow: 'hidden',
  },
  barFill: {
    height: '100%',

    borderRadius: 5.6,
  },
  reviewCard: {
    borderRadius: 18.5,

    backgroundColor: '#1a0d32',

    padding: 16.1,

    marginBottom: 24.2,
  },
  reviewTitle: {
    color: '#f0e8ff',

    fontSize: 15.3,

    fontWeight: '700',

    marginBottom: 12.4,
  },
  grid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 8.4,

    marginBottom: 12.2,
  },
  cell: {
    width: 36.1,

    height: 36.1,

    borderRadius: 10.3,

    borderWidth: 2.6,

    alignItems: 'center',

    justifyContent: 'center',
  },
  cellTxt: {
    fontSize: 12.6,

    fontWeight: '500',

    color: '#e8e0ff',
  },
  legendRow: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'center',

    gap: 14.6,

    marginTop: 4.7,
  },
  legendItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8.6,
  },
  legendSwatch: {
    width: 10.7,

    height: 10.4,

    borderRadius: 3.3,
  },
  legendSwatchGreen: {
    backgroundColor: '#22C55E',
  },
  legendSwatchRed: {
    backgroundColor: '#EF4444',
  },
  legendSwatchPurple: {
    backgroundColor: '#5A4A7A',
  },
  legendText: {
    color: '#b8afc9',

    fontSize: 13.1,

    fontWeight: '600',
  },
  bestLine: {
    color: '#8b7baa',

    fontSize: 13.8,

    marginTop: 10.7,
  },
  primaryOuter: {
    borderRadius: 16.4,

    overflow: 'hidden',

    marginBottom: 12.8,
  },
  primaryGrad: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10.2,

    height: 50.2,
  },
  primaryIcon: {
    color: '#ffffff',

    fontSize: 18.2,

    fontWeight: '700',
  },
  primaryTxt: {
    color: '#ffffff',

    fontSize: 16.1,

    fontWeight: '700',
  },
  secondary: {
    alignItems: 'center',

    paddingVertical: 14.2,

    borderRadius: 16.1,

    backgroundColor: '#1A0D3A',

    borderWidth: 1.6,

    borderColor: '#3d2380',
  },
  secondaryTxt: {
    color: '#c9bdd9',

    fontSize: 16.7,

    fontWeight: '700',
  },
});

export default ChallengeResultsScreen;
