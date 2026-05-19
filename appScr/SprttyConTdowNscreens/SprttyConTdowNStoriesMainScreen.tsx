import Layout from '../SprttyConTdowNcomponents/SprttyConTdowNLayout';
import {screenStyles} from '../SprttyConTdowNthemes/SprttyConTdowNindex';

import {
  headerPaddingTop,
  tabBarPadding,
} from '../SprttyConTdowNutils/SprttyConTdowNindex';

import {useNavigation} from '@react-navigation/native';

import React, {useMemo} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {StoriesMainNav} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';
import type {Story} from '../SprttyConTdowNdata/SprttyConTdowNstoriesTypes';
import {
  factOfTheDay,
  snippet,
  stories,
} from '../SprttyConTdowNdata/SprttyConTdowNstoriesData';

const accentGradient: Record<Story['accent'], [string, string]> = {
  green: ['#22c55e', '#7b2fbe'],
  red: ['#ef4444', '#7b2fbe'],
  orange: ['#fb923c', '#7b2fbe'],
  blue: ['#38bdf8', '#7b2fbe'],
  purple: ['#c084fc', '#7b2fbe'],
  yellow: ['#facc15', '#7b2fbe'],
  teal: ['#2dd4bf', '#7b2fbe'],
};

const accentChipBg: Record<Story['accent'], string> = {
  green: '#22c55e20',
  red: '#ef444420',
  orange: '#fb923c20',
  blue: '#38bdf820',
  purple: '#c084fc20',
  yellow: '#facc1520',
  teal: '#2dd4bf20',
};

const accentChipText: Record<Story['accent'], string> = {
  green: '#22c55e',
  red: '#ef4444',
  orange: '#fb923c',
  blue: '#38bdf8',
  purple: '#c084fc',
  yellow: '#facc15',
  teal: '#2dd4bf',
};

const StoriesMainScreen = () => {
  const navigation = useNavigation<StoriesMainNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = tabBarPadding(insets.bottom);

  const fact = useMemo(() => factOfTheDay(), []);

  const onOpenStory = (storyId: string) => {
    navigation.navigate('StoryDetail', {
      storyId: storyId,
    });
  };

  const renderStory = ({item}: {item: Story}) => {
    const grad = accentGradient[item.accent];
    const chipBg = accentChipBg[item.accent];
    const snippetText = snippet(item.body);

    return (
      <Pressable onPress={() => onOpenStory(item.id)} style={styles.storyOuter}>
        <LinearGradient
          colors={grad}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.storyGradient}>
          <View style={styles.storyInner}>
            <View style={styles.storyTop}>
              <View
                style={[
                  styles.emojiBox,
                  {
                    backgroundColor: accentChipBg[item.accent],
                    borderColor: accentChipBg[item.accent],
                    borderWidth: 1.6,
                  },
                ]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
              <View style={styles.storyTextCol}>
                <View style={styles.metaRow}>
                  <View
                    style={[
                      styles.tagPill,
                      {
                        backgroundColor: chipBg,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.tagPillText,
                        {
                          color: accentChipText[item.accent],
                        },
                      ]}>
                      {item.tag.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.readRow}>
                    <Text style={styles.clock}>⏱ </Text>
                    {item.readMinutes} min read
                  </Text>
                </View>
                <Text style={styles.storyTitle}>{item.title}</Text>
                <Text style={styles.storySnippet} numberOfLines={3}>
                  {snippetText}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <Layout>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <View style={styles.headerTop}>
          <View style={styles.titleWrap}>
            <Text style={screenStyles.eyebrow}>DAILY SPORTS</Text>
            <Text style={screenStyles.screenTitle}>Stories & Facts 📖</Text>
          </View>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={stories}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={renderStory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {paddingBottom: tabPadBottom},
        ]}
        ListHeaderComponent={
          <>
            <View style={styles.factWrap}>
              <View style={styles.factCard}>
                <Image
                  source={require('../../assets/i/sportyritcoscornr.png')}
                  style={{position: 'absolute', top: 0, right: 0}}
                />
                <View style={styles.factBadge}>
                  <Text style={styles.factBadgeIcon}>⚡</Text>
                  <Text style={styles.factBadgeText}>FACT OF THE DAY</Text>
                </View>
                <Text style={styles.factBody}>
                  <Text style={styles.factEmojiLead}>{fact.emoji} </Text>
                  {fact.text}
                </Text>
                <View style={styles.factTag}>
                  <Text style={styles.factTagText}>{fact.tag}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionLabel}>FEATURED STORIES</Text>
          </>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  list: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    minHeight: 58.4,
  },
  titleWrap: {
    flex: 1,

    paddingRight: 12.7,
  },
  listContent: {
    paddingHorizontal: 18.2,

    paddingTop: 20.3,
  },
  factWrap: {
    marginBottom: 22.3,

    position: 'relative',
  },
  factBlob: {
    position: 'absolute',

    top: -8.4,

    right: -4.6,

    width: 96.8,

    height: 96.8,

    borderRadius: 48.1,

    backgroundColor: '#f5b800',

    opacity: 0.35,
  },
  factCard: {
    borderRadius: 24.2,

    borderWidth: 2.1,

    borderColor: '#f5b800',

    backgroundColor: '#1a0d32',

    padding: 16.2,

    overflow: 'hidden',
  },
  factBadge: {
    alignSelf: 'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    gap: 6.5,

    backgroundColor: '#f5b800',

    paddingHorizontal: 10.3,

    paddingVertical: 5.7,

    borderRadius: 999.1,

    marginBottom: 12.6,
  },
  factBadgeIcon: {
    fontSize: 13.8,
  },
  factBadgeText: {
    fontSize: 10.7,

    fontWeight: '900',

    letterSpacing: 0.8,

    color: '#0d0620',
  },
  factBody: {
    fontSize: 14.3,

    lineHeight: 22.5,

    color: '#F0E8FF',

    marginBottom: 14.3,

    width: '80%',
  },
  factEmojiLead: {
    fontSize: 16.3,
  },
  factTag: {
    alignSelf: 'flex-start',

    backgroundColor: '#2D1B69',

    paddingHorizontal: 12.6,

    paddingVertical: 5.5,

    borderRadius: 999.2,
  },
  factTagText: {
    fontSize: 12.2,

    fontWeight: '700',

    color: '#A855F7',
  },
  sectionLabel: {
    fontSize: 11.4,

    fontWeight: '700',

    letterSpacing: 1.2,

    color: '#8b7aad',

    marginBottom: 12.3,
  },
  storyOuter: {
    marginBottom: 14.4,
  },
  storyGradient: {
    borderRadius: 16.4,

    paddingTop: 2.4,
  },
  storyInner: {
    borderRadius: 15.4,

    backgroundColor: '#1a0d3a',

    overflow: 'hidden',
  },
  storyTop: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    padding: 14.1,

    gap: 12.1,
  },
  emojiBox: {
    width: 48.5,

    height: 48.4,

    borderRadius: 14.3,

    backgroundColor: '#2d1b69',

    alignItems: 'center',

    justifyContent: 'center',
  },
  emoji: {
    fontSize: 26.8,
  },
  storyTextCol: {
    flex: 1,

    minWidth: 0,
  },
  metaRow: {
    flexDirection: 'row',

    alignItems: 'center',

    flexWrap: 'wrap',

    gap: 8.2,

    marginBottom: 8.8,
  },
  tagPill: {
    paddingHorizontal: 10.6,

    paddingVertical: 4.1,

    borderRadius: 999.2,
  },
  tagPillText: {
    fontSize: 10.3,

    fontWeight: '900',

    letterSpacing: 0.6,
  },
  readRow: {
    fontSize: 12.8,

    fontWeight: '600',

    color: '#9ca3af',
  },
  clock: {
    fontSize: 12.7,
  },
  storyTitle: {
    fontSize: 16.1,

    fontWeight: '800',

    color: '#ffffff',

    marginBottom: 6.5,
  },
  storySnippet: {
    fontSize: 13.7,

    lineHeight: 19.6,

    color: '#b8afc9',
  },
});

export default StoriesMainScreen;
