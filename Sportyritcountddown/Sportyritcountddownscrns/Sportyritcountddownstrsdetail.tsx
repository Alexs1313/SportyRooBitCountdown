import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback, useMemo} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import type {SportyritcountddownStoryAccent} from '../Sportyritcountddowndata/sportyritcountddownstoriestypes';
import {sportyritcountddownGetStoryById} from '../Sportyritcountddowndata/sportyritcountddownstoriesdata';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

type SportyritcountddownStrsDetailNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownstrsdetail'
>;

type SportyritcountddownStrsDetailRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownstrsdetail'
>;

const sportyritcountddownAccentTint: Record<
  SportyritcountddownStoryAccent,
  string
> = {
  green: '#22c55e20',
  red: '#ef444420',
  orange: '#fb923c20',
  blue: '#38bdf820',
  purple: '#c084fc20',
  yellow: '#facc1520',
  teal: '#2dd4bf20',
};

const sportyritcountddownAccentLabel: Record<
  SportyritcountddownStoryAccent,
  string
> = {
  green: '#22c55e',
  red: '#ef4444',
  orange: '#fb923c',
  blue: '#38bdf8',
  purple: '#c084fc',
  yellow: '#facc15',
  teal: '#2dd4bf',
};

const Sportyritcountddownstrsdetail = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownStrsDetailNav>();
  const sportyritcountddownRoute =
    useRoute<SportyritcountddownStrsDetailRoute>();
  const sportyritcountddownInsets = useSafeAreaInsets();

  const sportyritcountddownStory = useMemo(
    () =>
      sportyritcountddownGetStoryById(sportyritcountddownRoute.params.storyId),
    [sportyritcountddownRoute.params.storyId],
  );

  const sportyritcountddownParagraphs = useMemo(() => {
    if (!sportyritcountddownStory) {
      return [];
    }
    return sportyritcountddownStory.body
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(Boolean);
  }, [sportyritcountddownStory]);

  const sportyritcountddownOnShare = useCallback(async () => {
    if (!sportyritcountddownStory) {
      return;
    }
    try {
      await Share.share({
        title: sportyritcountddownStory.title,
        message: `${sportyritcountddownStory.emoji} ${sportyritcountddownStory.title}\n\n${sportyritcountddownStory.body}`,
      });
    } catch {
      console.log('error');
    }
  }, [sportyritcountddownStory]);

  const sportyritcountddownOnBack = useCallback(() => {
    sportyritcountddownNavigation.goBack();
  }, [sportyritcountddownNavigation]);

  if (!sportyritcountddownStory) {
    return (
      <View
        style={[
          styles.sportyritcountddownMissing,
          {paddingTop: sportyritcountddownInsets.top + 16},
        ]}>
        <Text style={styles.sportyritcountddownMissingText}>
          Story not found.
        </Text>
        <Pressable
          onPress={sportyritcountddownOnBack}
          style={styles.sportyritcountddownNavBtn}>
          <Text style={styles.sportyritcountddownNavBtnText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const sportyritcountddownAccent = sportyritcountddownStory.accent;

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View
        style={[
          styles.sportyritcountddownHeaderBand,
          {paddingTop: sportyritcountddownInsets.top + 8},
          {
            backgroundColor:
              sportyritcountddownAccentTint[sportyritcountddownAccent],
          },
        ]}>
        <View style={styles.sportyritcountddownTopBar}>
          <Pressable
            onPress={sportyritcountddownOnBack}
            style={styles.sportyritcountddownNavBtn}>
            <Image source={require('../../assets/i/sportyritcocback.png')} />
            <Text style={styles.sportyritcountddownNavBtnText}>Back</Text>
          </Pressable>
          <Pressable
            onPress={sportyritcountddownOnShare}
            style={styles.sportyritcountddownNavBtn}>
            <Image source={require('../../assets/i/sportyritcocshr.png')} />
            <Text
              style={[
                styles.sportyritcountddownNavBtnText,
                {color: '#A855F7'},
              ]}>
              Share
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sportyritcountddownHeroEmoji}>
          {sportyritcountddownStory.emoji}
        </Text>
        <View
          style={[
            styles.sportyritcountddownHeroTag,
            {
              backgroundColor:
                sportyritcountddownAccentTint[sportyritcountddownAccent],
            },
          ]}>
          <Text
            style={[
              styles.sportyritcountddownHeroTagText,
              {
                color:
                  sportyritcountddownAccentLabel[sportyritcountddownAccent],
              },
            ]}>
            {sportyritcountddownStory.tag.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.sportyritcountddownHeroTitle}>
          {sportyritcountddownStory.title}
        </Text>
      </View>

      <View
        style={[
          styles.sportyritcountddownScrollContent,
          {paddingBottom: sportyritcountddownInsets.bottom + 24},
        ]}>
        {sportyritcountddownParagraphs.map((sportyritcountddownP, i) => (
          <Text
            key={i}
            style={[
              styles.sportyritcountddownPara,
              i === 0 ? styles.sportyritcountddownParaFirst : null,
            ]}>
            {sportyritcountddownP}
          </Text>
        ))}
      </View>
    </Sportyritcountddownlayout>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownMissing: {
    flex: 1,
    backgroundColor: '#0d0620',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  sportyritcountddownMissingText: {
    color: '#e8e0ff',
    fontSize: 16,
  },
  sportyritcountddownHeaderBand: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  sportyritcountddownTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sportyritcountddownNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#1A0D3A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,

    borderWidth: 1,
    borderColor: '#2D1B69',
  },
  sportyritcountddownNavChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginRight: -2,
    marginTop: -2,
  },
  sportyritcountddownShareIcon: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  sportyritcountddownNavBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  sportyritcountddownHeroEmoji: {
    fontSize: 40,
    marginBottom: 14,
    marginTop: 10,
  },
  sportyritcountddownHeroTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  sportyritcountddownHeroTagText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  sportyritcountddownHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 28,
  },
  sportyritcountddownScroll: {
    flex: 1,
  },
  sportyritcountddownScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sportyritcountddownPara: {
    fontSize: 15,
    lineHeight: 24,
    color: '#C4B8E0',
    marginBottom: 16,
  },
  sportyritcountddownParaFirst: {
    marginTop: 0,
  },
});

export default Sportyritcountddownstrsdetail;
