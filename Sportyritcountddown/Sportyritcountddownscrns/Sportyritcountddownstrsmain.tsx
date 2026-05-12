import {useNavigation} from '@react-navigation/native';

import React, {useMemo} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownStrsMainNav} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import type {SportyritcountddownStory} from '../Sportyritcountddowndata/sportyritcountddownstoriestypes';
import {
  sportyritcountddownFactOfTheDay,
  sportyritcountddownSnippet,
  sportyritcountddownStories,
} from '../Sportyritcountddowndata/sportyritcountddownstoriesdata';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const sportyritcountddownAccentGradient: Record<
  SportyritcountddownStory['accent'],
  [string, string]
> = {
  green: ['#22c55e', '#7b2fbe'],
  red: ['#ef4444', '#7b2fbe'],
  orange: ['#fb923c', '#7b2fbe'],
  blue: ['#38bdf8', '#7b2fbe'],
  purple: ['#c084fc', '#7b2fbe'],
  yellow: ['#facc15', '#7b2fbe'],
  teal: ['#2dd4bf', '#7b2fbe'],
};

const sportyritcountddownAccentChipBg: Record<
  SportyritcountddownStory['accent'],
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

const sportyritcountddownAccentChipText: Record<
  SportyritcountddownStory['accent'],
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

const Sportyritcountddownstrsmain = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownStrsMainNav>();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const sportyritcountddownFact = useMemo(
    () => sportyritcountddownFactOfTheDay(),
    [],
  );

  const sportyritcountddownOnOpenStory = (
    sportyritcountddownStoryId: string,
  ) => {
    sportyritcountddownNavigation.navigate('Sportyritcountddownstrsdetail', {
      storyId: sportyritcountddownStoryId,
    });
  };

  const sportyritcountddownRenderStory = ({
    item,
  }: {
    item: SportyritcountddownStory;
  }) => {
    const sportyritcountddownGrad =
      sportyritcountddownAccentGradient[item.accent];
    const sportyritcountddownChipBg =
      sportyritcountddownAccentChipBg[item.accent];
    const sportyritcountddownSnippetText = sportyritcountddownSnippet(
      item.body,
    );

    return (
      <Pressable
        onPress={() => sportyritcountddownOnOpenStory(item.id)}
        style={styles.sportyritcountddownStoryOuter}>
        <LinearGradient
          colors={sportyritcountddownGrad}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.sportyritcountddownStoryGradient}>
          <View style={styles.sportyritcountddownStoryInner}>
            <View style={styles.sportyritcountddownStoryTop}>
              <View
                style={[
                  styles.sportyritcountddownEmojiBox,
                  {
                    backgroundColor:
                      sportyritcountddownAccentChipBg[item.accent],
                    borderColor: sportyritcountddownAccentChipBg[item.accent],
                    borderWidth: 1,
                  },
                ]}>
                <Text style={styles.sportyritcountddownEmoji}>
                  {item.emoji}
                </Text>
              </View>
              <View style={styles.sportyritcountddownStoryTextCol}>
                <View style={styles.sportyritcountddownMetaRow}>
                  <View
                    style={[
                      styles.sportyritcountddownTagPill,
                      {
                        backgroundColor: sportyritcountddownChipBg,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.sportyritcountddownTagPillText,
                        {
                          color: sportyritcountddownAccentChipText[item.accent],
                        },
                      ]}>
                      {item.tag.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.sportyritcountddownReadRow}>
                    <Text style={styles.sportyritcountddownClock}>⏱ </Text>
                    {item.readMinutes} min read
                  </Text>
                </View>
                <Text style={styles.sportyritcountddownStoryTitle}>
                  {item.title}
                </Text>
                <Text
                  style={styles.sportyritcountddownStorySnippet}
                  numberOfLines={3}>
                  {sportyritcountddownSnippetText}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <Sportyritcountddownlayout>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <View style={styles.sportyritcountddownHeaderTop}>
          <View style={styles.sportyritcountddownTitleWrap}>
            <Text style={styles.sportyritcountddownEyebrow}>DAILY SPORTS</Text>
            <Text style={styles.sportyritcountddownScreenTitle}>
              Stories & Facts 📖
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        style={styles.sportyritcountddownList}
        data={sportyritcountddownStories}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={sportyritcountddownRenderStory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.sportyritcountddownListContent,
          {paddingBottom: sportyritcountddownTabPadBottom},
        ]}
        ListHeaderComponent={
          <>
            <View style={styles.sportyritcountddownFactWrap}>
              <View style={styles.sportyritcountddownFactCard}>
                <Image
                  source={require('../../assets/i/sportyritcoscornr.png')}
                  style={{position: 'absolute', top: 0, right: 0}}
                />
                <View style={styles.sportyritcountddownFactBadge}>
                  <Text style={styles.sportyritcountddownFactBadgeIcon}>
                    ⚡
                  </Text>
                  <Text style={styles.sportyritcountddownFactBadgeText}>
                    FACT OF THE DAY
                  </Text>
                </View>
                <Text style={styles.sportyritcountddownFactBody}>
                  <Text style={styles.sportyritcountddownFactEmojiLead}>
                    {sportyritcountddownFact.emoji}{' '}
                  </Text>
                  {sportyritcountddownFact.text}
                </Text>
                <View style={styles.sportyritcountddownFactTag}>
                  <Text style={styles.sportyritcountddownFactTagText}>
                    {sportyritcountddownFact.tag}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.sportyritcountddownSectionLabel}>
              FEATURED STORIES
            </Text>
          </>
        }
      />
    </Sportyritcountddownlayout>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownList: {
    flex: 1,
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
  sportyritcountddownListContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  sportyritcountddownScreenTitle: {
    color: '#f0e8ff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.07,
    lineHeight: 36,
    marginTop: 4,
  },
  sportyritcountddownFactWrap: {
    marginBottom: 22,
    position: 'relative',
  },
  sportyritcountddownFactBlob: {
    position: 'absolute',
    top: -8,
    right: -4,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f5b800',
    opacity: 0.35,
  },
  sportyritcountddownFactCard: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#f5b800',
    backgroundColor: '#1a0d32',
    padding: 16,
    overflow: 'hidden',
  },
  sportyritcountddownFactBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f5b800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  sportyritcountddownFactBadgeIcon: {
    fontSize: 13,
  },
  sportyritcountddownFactBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#0d0620',
  },
  sportyritcountddownFactBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#F0E8FF',
    marginBottom: 14,
    width: '80%',
  },
  sportyritcountddownFactEmojiLead: {
    fontSize: 16,
  },
  sportyritcountddownFactTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#2D1B69',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  sportyritcountddownFactTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A855F7',
  },
  sportyritcountddownSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#8b7aad',
    marginBottom: 12,
  },
  sportyritcountddownStoryOuter: {
    marginBottom: 14,
  },
  sportyritcountddownStoryGradient: {
    borderRadius: 16,
    paddingTop: 2,
  },
  sportyritcountddownStoryInner: {
    borderRadius: 15,
    backgroundColor: '#1a0d3a',
    overflow: 'hidden',
  },
  sportyritcountddownStoryTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 12,
  },
  sportyritcountddownEmojiBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2d1b69',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownEmoji: {
    fontSize: 26,
  },
  sportyritcountddownStoryTextCol: {
    flex: 1,
    minWidth: 0,
  },
  sportyritcountddownMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  sportyritcountddownTagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  sportyritcountddownTagPillText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  sportyritcountddownReadRow: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
  },
  sportyritcountddownClock: {
    fontSize: 12,
  },
  sportyritcountddownStoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  sportyritcountddownStorySnippet: {
    fontSize: 13,
    lineHeight: 19,
    color: '#b8afc9',
  },
});

export default Sportyritcountddownstrsmain;
