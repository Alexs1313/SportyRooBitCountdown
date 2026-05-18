import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback, useMemo} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootParamList} from '../routes/rootParamList';
import {getStoryById} from '../data/storiesData';
import Layout from '../components/Layout';
import {
  colors,
  storyAccentLabel,
  storyAccentTint,
} from '../themes';
import {headerPaddingTop} from '../utils';

type StrsDetailNav = NativeStackNavigationProp<
  RootParamList,
  'StoryDetail'
>;

type StrsDetailRoute = RouteProp<
  RootParamList,
  'StoryDetail'
>;

const StoryDetailScreen = () => {
  const navigation =
    useNavigation<StrsDetailNav>();
  const route =
    useRoute<StrsDetailRoute>();
  const insets = useSafeAreaInsets();

  const story = useMemo(
    () =>
      getStoryById(route.params.storyId),
    [route.params.storyId],
  );

  const paragraphs = useMemo(() => {
    if (!story) {
      return [];
    }
    return story.body
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(Boolean);
  }, [story]);

  const onShare = useCallback(async () => {
    if (!story) {
      return;
    }
    try {
      await Share.share({
        title: story.title,
        message: `${story.emoji} ${story.title}\n\n${story.body}`,
      });
    } catch {
      console.log('error');
    }
  }, [story]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!story) {
    return (
      <View
        style={[
          styles.missing,
          {paddingTop: insets.top + 16},
        ]}>
        <Text style={styles.missingText}>
          Story not found.
        </Text>
        <Pressable
          onPress={onBack}
          style={styles.navBtn}>
          <Text style={styles.navBtnText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const accent = story.accent;

  return (
    <Layout bounces={false}>
      <View
        style={[
          styles.headerBand,
          {paddingTop: headerPaddingTop(insets.top)},
          {backgroundColor: storyAccentTint[accent]},
        ]}>
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={styles.navBtn}>
            <Image source={require('../../assets/i/sportyritcocback.png')} />
            <Text style={styles.navBtnText}>Back</Text>
          </Pressable>
          <Pressable
            onPress={onShare}
            style={styles.navBtn}>
            <Image source={require('../../assets/i/sportyritcocshr.png')} />
            <Text
              style={[
                styles.navBtnText,
                {color: colors.accentBright},
              ]}>
              Share
            </Text>
          </Pressable>
        </View>

        <Text style={styles.heroEmoji}>
          {story.emoji}
        </Text>
        <View
          style={[
            styles.heroTag,
            {
              backgroundColor: storyAccentTint[accent],
            },
          ]}>
          <Text
            style={[
              styles.heroTagText,
              {
                color: storyAccentLabel[accent],
              },
            ]}>
            {story.tag.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.heroTitle}>
          {story.title}
        </Text>
      </View>

      <View
        style={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 24},
        ]}>
        {paragraphs.map((p, i) => (
          <Text
            key={i}
            style={[
              styles.para,
              i === 0 ? styles.paraFirst : null,
            ]}>
            {p}
          </Text>
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  missing: {
    flex: 1,
    backgroundColor: '#0d0620',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  missingText: {
    color: '#e8e0ff',
    fontSize: 16,
  },
  headerBand: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navBtn: {
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
  navChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginRight: -2,
    marginTop: -2,
  },
  shareIcon: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  navBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  heroEmoji: {
    fontSize: 40,
    marginBottom: 14,
    marginTop: 10,
  },
  heroTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 28,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  para: {
    fontSize: 15,
    lineHeight: 24,
    color: '#C4B8E0',
    marginBottom: 16,
  },
  paraFirst: {
    marginTop: 0,
  },
});

export default StoryDetailScreen;
