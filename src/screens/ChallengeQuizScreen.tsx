import {QUIZ_LETTERS, QUIZ_SESSION_TOTAL, QUIZ_TIMER_SEC} from '../constants/quiz';
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

import {pickQuizBatch} from '../data/quizData';
import type {QuizOutcome} from '../data/quizTypes';
import type {RootParamList} from '../routes/rootParamList';
import Layout from '../components/Layout';
import {screenStyles} from '../themes';
import {headerPaddingTop} from '../utils';

type ChallengeQuizNav = NativeStackNavigationProp<
  RootParamList,
  'ChallengeQuiz'
>;

type ChallengeQuizRoute = RouteProp<
  RootParamList,
  'ChallengeQuiz'
>;

const ChallengeQuizScreen = () => {
  const navigation =
    useNavigation<ChallengeQuizNav>();
  const route =
    useRoute<ChallengeQuizRoute>();
  const restartKey =
    route.params?.restart ?? 0;
  const insets = useSafeAreaInsets();

  const [questions, setQuestions] =
    useState(() =>
      pickQuizBatch(QUIZ_SESSION_TOTAL),
    );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [outcomes, setOutcomes] =
    useState<QuizOutcome[]>([]);
  const [seconds, setSeconds] = useState(
    QUIZ_TIMER_SEC,
  );
  const [locked, setLocked] =
    useState(false);
  const [picked, setPicked] = useState<
    number | null
  >(null);

  const advanceTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const expireHandledRef = useRef(false);
  const roundRef = useRef(restartKey);

  const clearAdvance = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const goResults = useCallback(
    (
      finalScore: number,
      finalOutcomes: QuizOutcome[],
    ) => {
      clearAdvance();
      navigation.replace(
        'ChallengeResults',
        {
          score: finalScore,
          outcomes: finalOutcomes,
        },
      );
    },
    [navigation, clearAdvance],
  );

  const advance = useCallback(
    (
      nextOutcomes: QuizOutcome[],
      nextScore: number,
    ) => {
      const nextIdx = index + 1;
      if (nextIdx >= QUIZ_SESSION_TOTAL) {
        goResults(
          nextScore,
          nextOutcomes,
        );
        return;
      }
      setOutcomes(nextOutcomes);
      setScore(nextScore);
      setIndex(nextIdx);
      setSeconds(QUIZ_TIMER_SEC);
      setLocked(false);
      setPicked(null);
      expireHandledRef.current = false;
    },
    [index, goResults],
  );

  const onTimeout = useCallback(() => {
    setLocked(true);
    const next = [
      ...outcomes,
      'timeout' as const,
    ];
    advanceTimerRef.current = setTimeout(() => {
      advance(
        next,
        score,
      );
    }, 550);
  }, [
    outcomes,
    score,
    advance,
  ]);

  useFocusEffect(
    useCallback(() => {
      roundRef.current = restartKey;
      setQuestions(
        pickQuizBatch(QUIZ_SESSION_TOTAL),
      );
      setIndex(0);
      setScore(0);
      setOutcomes([]);
      setSeconds(QUIZ_TIMER_SEC);
      setLocked(false);
      setPicked(null);
      expireHandledRef.current = false;
      return () => {
        clearAdvance();
      };
    }, [restartKey, clearAdvance]),
  );

  useEffect(() => {
    if (locked) {
      return;
    }
    if (seconds > 0) {
      expireHandledRef.current = false;
      const id = setTimeout(() => {
        setSeconds(s => s - 1);
      }, 1000);
      return () => clearTimeout(id);
    }
    if (!expireHandledRef.current) {
      expireHandledRef.current = true;
      onTimeout();
    }
  }, [
    seconds,
    locked,
    onTimeout,
  ]);

  const current =
    questions[index];

  const onPick = (optionIdx: number) => {
    if (locked || !current) {
      return;
    }
    setLocked(true);
    setPicked(optionIdx);
    const ok =
      optionIdx === current.correctIndex;
    const outcome: QuizOutcome =
      ok ? 'correct' : 'wrong';
    const nextOutcomes = [
      ...outcomes,
      outcome,
    ];
    const nextScore = ok
      ? score + 1
      : score;
    advanceTimerRef.current = setTimeout(() => {
      advance(
        nextOutcomes,
        nextScore,
      );
    }, 650);
  };

  if (!current) {
    return (
      <View style={styles.root}>
        <Text style={styles.loading}>Loading…</Text>
      </View>
    );
  }

  const progress =
    index / QUIZ_SESSION_TOTAL;

  return (
    <Layout bounces={false}>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.qMeta}>
              QUESTION {index + 1} /{' '}
              {QUIZ_SESSION_TOTAL}
            </Text>
            <Text style={styles.score}>
              Score: {score}
            </Text>
          </View>

          <View style={styles.timerRing}>
            <Text style={styles.timerNum}>
              {seconds}
            </Text>
          </View>

          <View style={styles.dots}>
            {Array.from({length: QUIZ_SESSION_TOTAL}, (_, i) => {
              let dotBg = '#3d2f55';
              if (i < outcomes.length) {
                const o = outcomes[i];
                dotBg =
                  o === 'correct'
                    ? '#22c55e'
                    : o === 'wrong'
                    ? '#ef4444'
                    : '#7b2fbe';
              } else if (i === index) {
                dotBg = '#facc15';
              }
              return (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    {backgroundColor: dotBg},
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {width: `${Math.round(progress * 100)}%`},
            ]}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>
            {current.emoji}
          </Text>
          <Text style={styles.prompt}>
            {current.prompt}
          </Text>
        </View>

        <View style={styles.options}>
          {current.options.map(
            (label, i) => {
              const isCorrect =
                i === current.correctIndex;
              const showResult = locked;
              let btnBorder = '#3D2380';
              let letterBg = '#2a1f45';
              let letterColor = '#9ca3af';
              let labelColor = '#f0e8ff';

              if (showResult) {
                if (isCorrect) {
                  btnBorder = '#2F756F';
                  letterBg = '#101C19';
                  letterColor = '#22c55e';
                  labelColor = '#22c55e';
                } else if (picked === i) {
                  btnBorder = '#ef4444';
                  letterBg = '#450a0a';
                  letterColor = '#ef4444';
                  labelColor = '#ef4444';
                }
              }

              return (
                <Pressable
                  key={i}
                  disabled={locked}
                  onPress={() => onPick(i)}
                  style={[
                    styles.optionRow,
                    {borderColor: btnBorder},
                  ]}>
                  <View
                    style={[
                      styles.letterBox,
                      {backgroundColor: letterBg},
                    ]}>
                    <Text
                      style={[
                        styles.letter,
                        {color: letterColor},
                      ]}>
                      {QUIZ_LETTERS[i]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      {color: labelColor},
                    ]}>
                    {label}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  loading: {
    color: '#e8e0ff',
    marginTop: 48,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  qMeta: {
    color: '#8B7BAA',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  score: {
    color: '#F5B800',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  timerRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#7b2fbe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerNum: {
    color: '#e9d5ff',
    fontSize: 18,
    fontWeight: '800',
  },
  dots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 5,
    maxWidth: 110,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2a1f45',
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7b2fbe',
    borderRadius: 2,
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  card: {
    backgroundColor: '#1a0d3a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  prompt: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  options: {
    gap: 12,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1A0D3A',
    gap: 12,
  },
  letterBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 15,
    fontWeight: '800',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ChallengeQuizScreen;
