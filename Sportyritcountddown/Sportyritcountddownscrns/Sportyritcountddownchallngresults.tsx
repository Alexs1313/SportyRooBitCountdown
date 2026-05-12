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

import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const SPORTYRITCOUNTDOWN_QUIZ_BEST_KEY = 'sportyritcountddownquizbestscore_v1';
const SPORTYRITCOUNTDOWN_SESSION_TOTAL = 10;

type SportyritcountddownChallngResultsNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownchallngresults'
>;

type SportyritcountddownChallngResultsRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownchallngresults'
>;

const Sportyritcountddownchallngresults = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownChallngResultsNav>();
  const sportyritcountddownRoute =
    useRoute<SportyritcountddownChallngResultsRoute>();
  const sportyritcountddownInsets = useSafeAreaInsets();

  const {score, outcomes} = sportyritcountddownRoute.params;

  const [sportyritcountddownBest, setSportyritcountddownBest] = useState(0);
  const [sportyritcountddownNewRecord, setSportyritcountddownNewRecord] =
    useState(false);

  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  useEffect(() => {
    let sportyritcountddownActive = true;
    (async () => {
      try {
        const sportyritcountddownRaw = await AsyncStorage.getItem(
          SPORTYRITCOUNTDOWN_QUIZ_BEST_KEY,
        );
        const sportyritcountddownPrev = sportyritcountddownRaw
          ? parseInt(sportyritcountddownRaw, 10)
          : 0;
        if (!sportyritcountddownActive) {
          return;
        }
        setSportyritcountddownBest(sportyritcountddownPrev);
        if (score > sportyritcountddownPrev) {
          setSportyritcountddownNewRecord(true);
          await AsyncStorage.setItem(
            SPORTYRITCOUNTDOWN_QUIZ_BEST_KEY,
            String(score),
          );
          setSportyritcountddownBest(score);
        }
      } catch {
        console.log('error');
      }
    })();
    return () => {
      sportyritcountddownActive = false;
    };
  }, [score]);

  const sportyritcountddownCounts = outcomes.reduce(
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

  const sportyritcountddownMedal = score >= 8 ? '🥇' : score >= 5 ? '🥈' : '🥉';

  const sportyritcountddownOnPlayAgain = useCallback(() => {
    sportyritcountddownNavigation.replace('Sportyritcountddownchallngquiz', {
      restart: Date.now(),
    });
  }, [sportyritcountddownNavigation]);

  const sportyritcountddownOnHome = useCallback(() => {
    sportyritcountddownNavigation.navigate('Sportyritcountddowntabs', {
      screen: 'Sportyritcountddownchallngtab',
    });
  }, [sportyritcountddownNavigation]);

  const sportyritcountddownProgressWidth = `${Math.round(
    (score / SPORTYRITCOUNTDOWN_SESSION_TOTAL) * 100,
  )}%` as DimensionValue;

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <View style={styles.sportyritcountddownHeaderTop}>
          <View style={styles.sportyritcountddownTitleWrap}>
            <Text style={styles.sportyritcountddownEyebrow}>QUIZ RESULTS</Text>
            <Text style={styles.sportyritcountddownScreenTitle}>
              Results 🏆
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.sportyritcountddownScroll,
          styles.sportyritcountddownScrollBodyTop,
          {paddingBottom: sportyritcountddownTabPadBottom},
        ]}>
        <Text style={styles.sportyritcountddownMedalEmoji}>
          {sportyritcountddownMedal}
        </Text>
        {sportyritcountddownNewRecord ? (
          <Text style={styles.sportyritcountddownNewRecord}>
            🎉 New Record!
          </Text>
        ) : null}

        <View style={styles.sportyritcountddownScoreCard}>
          <Text style={styles.sportyritcountddownScoreLabel}>YOUR SCORE</Text>
          <Text style={styles.sportyritcountddownScoreBig}>{score}</Text>
          <Text style={styles.sportyritcountddownScoreSub}>
            out of {SPORTYRITCOUNTDOWN_SESSION_TOTAL} questions
          </Text>
          <View style={styles.sportyritcountddownBarTrack}>
            <LinearGradient
              colors={['#facc15', '#7b2fbe']}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={[
                styles.sportyritcountddownBarFill,
                {width: sportyritcountddownProgressWidth},
              ]}
            />
          </View>
        </View>

        <View style={styles.sportyritcountddownReviewCard}>
          <Text style={styles.sportyritcountddownReviewTitle}>
            Question Review
          </Text>
          <View style={styles.sportyritcountddownGrid}>
            {outcomes.map((sportyritcountddownO, i) => {
              const sportyritcountddownBorder =
                sportyritcountddownO === 'correct'
                  ? '#22C55E'
                  : sportyritcountddownO === 'wrong'
                  ? '#EF4444'
                  : '#7b2fbe';
              const sportyritcountddownCellBg =
                sportyritcountddownO === 'correct'
                  ? '#0D2010'
                  : sportyritcountddownO === 'wrong'
                  ? '#3A0D0D'
                  : '#2D1B69';
              const sportyritcountddownSym =
                sportyritcountddownO === 'correct'
                  ? '✓'
                  : sportyritcountddownO === 'wrong'
                  ? '✗'
                  : '⏱';
              return (
                <View
                  key={i}
                  style={[
                    styles.sportyritcountddownCell,
                    {
                      borderColor: sportyritcountddownBorder,
                      backgroundColor: sportyritcountddownCellBg,
                    },
                  ]}>
                  <Text style={styles.sportyritcountddownCellTxt}>
                    {sportyritcountddownSym}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.sportyritcountddownLegendRow}>
            <View style={styles.sportyritcountddownLegendItem}>
              <View
                style={[
                  styles.sportyritcountddownLegendSwatch,
                  styles.sportyritcountddownLegendSwatchGreen,
                ]}
              />
              <Text style={styles.sportyritcountddownLegendText}>
                {sportyritcountddownCounts.correct} correct
              </Text>
            </View>
            <View style={styles.sportyritcountddownLegendItem}>
              <View
                style={[
                  styles.sportyritcountddownLegendSwatch,
                  styles.sportyritcountddownLegendSwatchRed,
                ]}
              />
              <Text style={styles.sportyritcountddownLegendText}>
                {sportyritcountddownCounts.wrong} wrong
              </Text>
            </View>
            <View style={styles.sportyritcountddownLegendItem}>
              <View
                style={[
                  styles.sportyritcountddownLegendSwatch,
                  styles.sportyritcountddownLegendSwatchPurple,
                ]}
              />
              <Text style={styles.sportyritcountddownLegendText}>
                {sportyritcountddownCounts.timeout} timeout
              </Text>
            </View>
          </View>
          {sportyritcountddownBest > 0 ? (
            <Text style={styles.sportyritcountddownBestLine}>
              Best score: {sportyritcountddownBest}
            </Text>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={sportyritcountddownOnPlayAgain}
          style={styles.sportyritcountddownPrimaryOuter}>
          <LinearGradient
            colors={['#7B2FBE', '#F5B800']}
            style={styles.sportyritcountddownPrimaryGrad}>
            <Image source={require('../../assets/i/sportyritcosccrel.png')} />
            <Text style={styles.sportyritcountddownPrimaryTxt}>Play Again</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={sportyritcountddownOnHome}
          style={styles.sportyritcountddownSecondary}>
          <Text style={styles.sportyritcountddownSecondaryTxt}>
            Back to Menu
          </Text>
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
  sportyritcountddownHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 58,
  },
  sportyritcountddownTitleWrap: {
    flex: 1,
    paddingRight: 12,
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
  sportyritcountddownScrollFill: {
    flex: 1,
  },
  sportyritcountddownScroll: {
    paddingHorizontal: 20,
  },
  sportyritcountddownScrollBodyTop: {
    paddingTop: 16,
  },
  sportyritcountddownMedalEmoji: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: 8,
  },
  sportyritcountddownNewRecord: {
    color: '#F5B800',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 22,
  },
  sportyritcountddownScoreCard: {
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#F5B800',
    backgroundColor: '#1a0d32',
    padding: 20,
    marginBottom: 16,
  },
  sportyritcountddownScoreLabel: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
    textAlign: 'center',
  },
  sportyritcountddownScoreBig: {
    color: '#F5B800',
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 62,
    textAlign: 'center',
  },
  sportyritcountddownScoreSub: {
    color: '#c9bdd9',
    fontSize: 14,
    marginBottom: 19,
    textAlign: 'center',
  },
  sportyritcountddownBarTrack: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#2a1f45',
    overflow: 'hidden',
  },
  sportyritcountddownBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  sportyritcountddownReviewCard: {
    borderRadius: 18,
    backgroundColor: '#1a0d32',
    padding: 16,
    marginBottom: 24,
  },
  sportyritcountddownReviewTitle: {
    color: '#f0e8ff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  sportyritcountddownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  sportyritcountddownCell: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownCellTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: '#e8e0ff',
  },
  sportyritcountddownLegendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 14,
    marginTop: 4,
  },
  sportyritcountddownLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sportyritcountddownLegendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  sportyritcountddownLegendSwatchGreen: {
    backgroundColor: '#22C55E',
  },
  sportyritcountddownLegendSwatchRed: {
    backgroundColor: '#EF4444',
  },
  sportyritcountddownLegendSwatchPurple: {
    backgroundColor: '#5A4A7A',
  },
  sportyritcountddownLegendText: {
    color: '#b8afc9',
    fontSize: 13,
    fontWeight: '600',
  },
  sportyritcountddownBestLine: {
    color: '#8b7baa',
    fontSize: 13,
    marginTop: 10,
  },
  sportyritcountddownPrimaryOuter: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sportyritcountddownPrimaryGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 50,
  },
  sportyritcountddownPrimaryIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  sportyritcountddownPrimaryTxt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  sportyritcountddownSecondary: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#1A0D3A',
    borderWidth: 1,
    borderColor: '#3d2380',
  },
  sportyritcountddownSecondaryTxt: {
    color: '#c9bdd9',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Sportyritcountddownchallngresults;
