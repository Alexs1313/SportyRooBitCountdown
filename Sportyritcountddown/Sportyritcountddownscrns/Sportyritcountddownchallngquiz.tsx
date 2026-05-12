import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {sportyritcountddownPickQuizBatch} from '../Sportyritcountddowndata/sportyritcountddownquizdata';
import type {SportyritcountddownQuizOutcome} from '../Sportyritcountddowndata/sportyritcountddownquiztypes';
import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const SPORTYRITCOUNTDOWN_SESSION_TOTAL = 10;
const SPORTYRITCOUNTDOWN_TIMER_SEC = 15;
const SPORTYRITCOUNTDOWN_LETTERS = ['A', 'B', 'C', 'D'] as const;

type SportyritcountddownChallngQuizNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownchallngquiz'
>;

type SportyritcountddownChallngQuizRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownchallngquiz'
>;

const Sportyritcountddownchallngquiz = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownChallngQuizNav>();
  const sportyritcountddownRoute =
    useRoute<SportyritcountddownChallngQuizRoute>();
  const sportyritcountddownRestartKey =
    sportyritcountddownRoute.params?.restart ?? 0;
  const sportyritcountddownInsets = useSafeAreaInsets();

  const [sportyritcountddownQuestions, setSportyritcountddownQuestions] =
    useState(() =>
      sportyritcountddownPickQuizBatch(SPORTYRITCOUNTDOWN_SESSION_TOTAL),
    );
  const [sportyritcountddownIndex, setSportyritcountddownIndex] = useState(0);
  const [sportyritcountddownScore, setSportyritcountddownScore] = useState(0);
  const [sportyritcountddownOutcomes, setSportyritcountddownOutcomes] =
    useState<SportyritcountddownQuizOutcome[]>([]);
  const [sportyritcountddownSeconds, setSportyritcountddownSeconds] = useState(
    SPORTYRITCOUNTDOWN_TIMER_SEC,
  );
  const [sportyritcountddownLocked, setSportyritcountddownLocked] =
    useState(false);
  const [sportyritcountddownPicked, setSportyritcountddownPicked] = useState<
    number | null
  >(null);

  const sportyritcountddownAdvanceTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const sportyritcountddownExpireHandledRef = useRef(false);
  const sportyritcountddownRoundRef = useRef(sportyritcountddownRestartKey);

  const sportyritcountddownClearAdvance = useCallback(() => {
    if (sportyritcountddownAdvanceTimerRef.current) {
      clearTimeout(sportyritcountddownAdvanceTimerRef.current);
      sportyritcountddownAdvanceTimerRef.current = null;
    }
  }, []);

  const sportyritcountddownGoResults = useCallback(
    (
      sportyritcountddownFinalScore: number,
      sportyritcountddownFinalOutcomes: SportyritcountddownQuizOutcome[],
    ) => {
      sportyritcountddownClearAdvance();
      sportyritcountddownNavigation.replace(
        'Sportyritcountddownchallngresults',
        {
          score: sportyritcountddownFinalScore,
          outcomes: sportyritcountddownFinalOutcomes,
        },
      );
    },
    [sportyritcountddownNavigation, sportyritcountddownClearAdvance],
  );

  const sportyritcountddownAdvance = useCallback(
    (
      sportyritcountddownNextOutcomes: SportyritcountddownQuizOutcome[],
      sportyritcountddownNextScore: number,
    ) => {
      const sportyritcountddownNextIdx = sportyritcountddownIndex + 1;
      if (sportyritcountddownNextIdx >= SPORTYRITCOUNTDOWN_SESSION_TOTAL) {
        sportyritcountddownGoResults(
          sportyritcountddownNextScore,
          sportyritcountddownNextOutcomes,
        );
        return;
      }
      setSportyritcountddownOutcomes(sportyritcountddownNextOutcomes);
      setSportyritcountddownScore(sportyritcountddownNextScore);
      setSportyritcountddownIndex(sportyritcountddownNextIdx);
      setSportyritcountddownSeconds(SPORTYRITCOUNTDOWN_TIMER_SEC);
      setSportyritcountddownLocked(false);
      setSportyritcountddownPicked(null);
      sportyritcountddownExpireHandledRef.current = false;
    },
    [sportyritcountddownIndex, sportyritcountddownGoResults],
  );

  const sportyritcountddownOnTimeout = useCallback(() => {
    setSportyritcountddownLocked(true);
    const sportyritcountddownNext = [
      ...sportyritcountddownOutcomes,
      'timeout' as const,
    ];
    sportyritcountddownAdvanceTimerRef.current = setTimeout(() => {
      sportyritcountddownAdvance(
        sportyritcountddownNext,
        sportyritcountddownScore,
      );
    }, 550);
  }, [
    sportyritcountddownOutcomes,
    sportyritcountddownScore,
    sportyritcountddownAdvance,
  ]);

  useFocusEffect(
    useCallback(() => {
      sportyritcountddownRoundRef.current = sportyritcountddownRestartKey;
      setSportyritcountddownQuestions(
        sportyritcountddownPickQuizBatch(SPORTYRITCOUNTDOWN_SESSION_TOTAL),
      );
      setSportyritcountddownIndex(0);
      setSportyritcountddownScore(0);
      setSportyritcountddownOutcomes([]);
      setSportyritcountddownSeconds(SPORTYRITCOUNTDOWN_TIMER_SEC);
      setSportyritcountddownLocked(false);
      setSportyritcountddownPicked(null);
      sportyritcountddownExpireHandledRef.current = false;
      return () => {
        sportyritcountddownClearAdvance();
      };
    }, [sportyritcountddownRestartKey, sportyritcountddownClearAdvance]),
  );

  useEffect(() => {
    if (sportyritcountddownLocked) {
      return;
    }
    if (sportyritcountddownSeconds > 0) {
      sportyritcountddownExpireHandledRef.current = false;
      const sportyritcountddownId = setTimeout(() => {
        setSportyritcountddownSeconds(s => s - 1);
      }, 1000);
      return () => clearTimeout(sportyritcountddownId);
    }
    if (!sportyritcountddownExpireHandledRef.current) {
      sportyritcountddownExpireHandledRef.current = true;
      sportyritcountddownOnTimeout();
    }
  }, [
    sportyritcountddownSeconds,
    sportyritcountddownLocked,
    sportyritcountddownOnTimeout,
  ]);

  const sportyritcountddownCurrent =
    sportyritcountddownQuestions[sportyritcountddownIndex];

  const sportyritcountddownOnPick = (sportyritcountddownOptionIdx: number) => {
    if (sportyritcountddownLocked || !sportyritcountddownCurrent) {
      return;
    }
    setSportyritcountddownLocked(true);
    setSportyritcountddownPicked(sportyritcountddownOptionIdx);
    const sportyritcountddownOk =
      sportyritcountddownOptionIdx === sportyritcountddownCurrent.correctIndex;
    const sportyritcountddownOutcome: SportyritcountddownQuizOutcome =
      sportyritcountddownOk ? 'correct' : 'wrong';
    const sportyritcountddownNextOutcomes = [
      ...sportyritcountddownOutcomes,
      sportyritcountddownOutcome,
    ];
    const sportyritcountddownNextScore = sportyritcountddownOk
      ? sportyritcountddownScore + 1
      : sportyritcountddownScore;
    sportyritcountddownAdvanceTimerRef.current = setTimeout(() => {
      sportyritcountddownAdvance(
        sportyritcountddownNextOutcomes,
        sportyritcountddownNextScore,
      );
    }, 650);
  };

  if (!sportyritcountddownCurrent) {
    return (
      <View style={styles.sportyritcountddownRoot}>
        <Text style={styles.sportyritcountddownLoading}>Loading…</Text>
      </View>
    );
  }

  const sportyritcountddownProgress =
    sportyritcountddownIndex / SPORTYRITCOUNTDOWN_SESSION_TOTAL;

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <View style={styles.sportyritcountddownHeaderRow}>
          <View>
            <Text style={styles.sportyritcountddownQMeta}>
              QUESTION {sportyritcountddownIndex + 1} /{' '}
              {SPORTYRITCOUNTDOWN_SESSION_TOTAL}
            </Text>
            <Text style={styles.sportyritcountddownScore}>
              Score: {sportyritcountddownScore}
            </Text>
          </View>

          <View style={styles.sportyritcountddownTimerRing}>
            <Text style={styles.sportyritcountddownTimerNum}>
              {sportyritcountddownSeconds}
            </Text>
          </View>

          <View style={styles.sportyritcountddownDots}>
            {Array.from({length: SPORTYRITCOUNTDOWN_SESSION_TOTAL}, (_, i) => {
              let sportyritcountddownDotBg = '#3d2f55';
              if (i < sportyritcountddownOutcomes.length) {
                const sportyritcountddownO = sportyritcountddownOutcomes[i];
                sportyritcountddownDotBg =
                  sportyritcountddownO === 'correct'
                    ? '#22c55e'
                    : sportyritcountddownO === 'wrong'
                    ? '#ef4444'
                    : '#7b2fbe';
              } else if (i === sportyritcountddownIndex) {
                sportyritcountddownDotBg = '#facc15';
              }
              return (
                <View
                  key={i}
                  style={[
                    styles.sportyritcountddownDot,
                    {backgroundColor: sportyritcountddownDotBg},
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.sportyritcountddownProgressTrack}>
          <View
            style={[
              styles.sportyritcountddownProgressFill,
              {width: `${Math.round(sportyritcountddownProgress * 100)}%`},
            ]}
          />
        </View>
      </View>

      <View style={styles.sportyritcountddownBody}>
        <View style={styles.sportyritcountddownCard}>
          <Text style={styles.sportyritcountddownCardEmoji}>
            {sportyritcountddownCurrent.emoji}
          </Text>
          <Text style={styles.sportyritcountddownPrompt}>
            {sportyritcountddownCurrent.prompt}
          </Text>
        </View>

        <View style={styles.sportyritcountddownOptions}>
          {sportyritcountddownCurrent.options.map(
            (sportyritcountddownLabel, i) => {
              const sportyritcountddownIsCorrect =
                i === sportyritcountddownCurrent.correctIndex;
              const sportyritcountddownShowResult = sportyritcountddownLocked;
              let sportyritcountddownBtnBorder = '#3D2380';
              let sportyritcountddownLetterBg = '#2a1f45';
              let sportyritcountddownLetterColor = '#9ca3af';
              let sportyritcountddownLabelColor = '#f0e8ff';

              if (sportyritcountddownShowResult) {
                if (sportyritcountddownIsCorrect) {
                  sportyritcountddownBtnBorder = '#2F756F';
                  sportyritcountddownLetterBg = '#101C19';
                  sportyritcountddownLetterColor = '#22c55e';
                  sportyritcountddownLabelColor = '#22c55e';
                } else if (sportyritcountddownPicked === i) {
                  sportyritcountddownBtnBorder = '#ef4444';
                  sportyritcountddownLetterBg = '#450a0a';
                  sportyritcountddownLetterColor = '#ef4444';
                  sportyritcountddownLabelColor = '#ef4444';
                }
              }

              return (
                <Pressable
                  key={i}
                  disabled={sportyritcountddownLocked}
                  onPress={() => sportyritcountddownOnPick(i)}
                  style={[
                    styles.sportyritcountddownOptionRow,
                    {borderColor: sportyritcountddownBtnBorder},
                  ]}>
                  <View
                    style={[
                      styles.sportyritcountddownLetterBox,
                      {backgroundColor: sportyritcountddownLetterBg},
                    ]}>
                    <Text
                      style={[
                        styles.sportyritcountddownLetter,
                        {color: sportyritcountddownLetterColor},
                      ]}>
                      {SPORTYRITCOUNTDOWN_LETTERS[i]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.sportyritcountddownOptionText,
                      {color: sportyritcountddownLabelColor},
                    ]}>
                    {sportyritcountddownLabel}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>
      </View>
    </Sportyritcountddownlayout>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownLoading: {
    color: '#e8e0ff',
    marginTop: 48,
    textAlign: 'center',
  },
  sportyritcountddownHeaderBlock: {
    backgroundColor: '#120826',
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sportyritcountddownHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sportyritcountddownQMeta: {
    color: '#8B7BAA',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  sportyritcountddownScore: {
    color: '#F5B800',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  sportyritcountddownTimerRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#7b2fbe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownTimerNum: {
    color: '#e9d5ff',
    fontSize: 18,
    fontWeight: '800',
  },
  sportyritcountddownDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 5,
    maxWidth: 110,
  },
  sportyritcountddownDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
  },
  sportyritcountddownProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2a1f45',
    marginTop: 12,
    overflow: 'hidden',
  },
  sportyritcountddownProgressFill: {
    height: '100%',
    backgroundColor: '#7b2fbe',
    borderRadius: 2,
  },
  sportyritcountddownBody: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  sportyritcountddownCard: {
    backgroundColor: '#1a0d3a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  sportyritcountddownCardEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  sportyritcountddownPrompt: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  sportyritcountddownOptions: {
    gap: 12,
  },
  sportyritcountddownOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1A0D3A',
    gap: 12,
  },
  sportyritcountddownLetterBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownLetter: {
    fontSize: 15,
    fontWeight: '800',
  },
  sportyritcountddownOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Sportyritcountddownchallngquiz;
