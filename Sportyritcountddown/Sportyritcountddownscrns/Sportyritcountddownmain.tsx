import {useFocusEffect, useNavigation} from '@react-navigation/native';

import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import SportyritcountddownEventcard from '../Sportyritcountddowncompnts/Sportyritcountddowneventcard.tsx';
import type {SportyritcountddownEvent} from '../Sportyritcountddowndata/sportyritcountddowneventtypes';
import {
  sportyritcountddownLoadEvents,
  sportyritcountddownSaveEvents,
} from '../Sportyritcountddowndata/sportyritcountddowneventstorage';
import {sportyritcountddownToastShowIfEnabled} from '../Sportyritcountddowndata/sportyritcountddownnotificationprefs';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout.tsx';
import type {SportyritcountddownEventsMainNav} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';

type SportyritcountddownFilterId = 'all' | 'to' | 'from';

type SportyritcountddownMainNav = SportyritcountddownEventsMainNav;

const Sportyritcountddownmain = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownMainNav>();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const [sportyritcountddownEvents, setSportyritcountddownEvents] = useState<
    SportyritcountddownEvent[]
  >([]);
  const [sportyritcountddownLoading, setSportyritcountddownLoading] =
    useState(true);
  const [sportyritcountddownFilter, setSportyritcountddownFilter] =
    useState<SportyritcountddownFilterId>('all');
  const [sportyritcountddownRefreshing, setSportyritcountddownRefreshing] =
    useState(false);

  const sportyritcountddownReload = useCallback(async () => {
    const sportyritcountddownRows = await sportyritcountddownLoadEvents();
    setSportyritcountddownEvents(sportyritcountddownRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let sportyritcountddownActive = true;
      setSportyritcountddownLoading(true);
      sportyritcountddownReload().finally(() => {
        if (sportyritcountddownActive) {
          setSportyritcountddownLoading(false);
        }
      });
      return () => {
        sportyritcountddownActive = false;
      };
    }, [sportyritcountddownReload]),
  );

  const sportyritcountddownFiltered = useMemo(() => {
    if (sportyritcountddownFilter === 'all') {
      return sportyritcountddownEvents;
    }
    if (sportyritcountddownFilter === 'to') {
      return sportyritcountddownEvents.filter(e => e.mode === 'to');
    }
    return sportyritcountddownEvents.filter(e => e.mode === 'from');
  }, [sportyritcountddownEvents, sportyritcountddownFilter]);

  const sportyritcountddownOnRefresh = useCallback(async () => {
    setSportyritcountddownRefreshing(true);
    await sportyritcountddownReload();
    setSportyritcountddownRefreshing(false);
  }, [sportyritcountddownReload]);

  const sportyritcountddownConfirmDelete = useCallback(
    (sportyritcountddownEventId: string, sportyritcountddownTitle: string) => {
      Alert.alert(
        'Delete Event?',
        'This sport event will be removed from your timeline. This action cannot be undone',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const sportyritcountddownAll =
                await sportyritcountddownLoadEvents();
              const sportyritcountddownNext = sportyritcountddownAll.filter(
                e => e.id !== sportyritcountddownEventId,
              );
              await sportyritcountddownSaveEvents(sportyritcountddownNext);
              setSportyritcountddownEvents(sportyritcountddownNext);
              await sportyritcountddownToastShowIfEnabled({
                type: 'success',
                text1: 'Event removed',
                text2: sportyritcountddownTitle,
              });
            },
          },
        ],
      );
    },
    [],
  );

  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const sportyritcountddownRenderFilters = () => (
    <View style={styles.sportyritcountddownFilterRow}>
      {(
        [
          ['all', 'All Events'],
          ['to', 'Countdown To'],
          ['from', 'Count Since'],
        ] as const
      ).map(([sportyritcountddownId, sportyritcountddownLbl]) => {
        const sportyritcountddownSel =
          sportyritcountddownFilter === sportyritcountddownId;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{selected: sportyritcountddownSel}}
            key={sportyritcountddownId}
            onPress={() => setSportyritcountddownFilter(sportyritcountddownId)}
            style={[
              styles.sportyritcountddownFilterBtn,
              sportyritcountddownSel
                ? styles.sportyritcountddownFilterBtnOn
                : styles.sportyritcountddownFilterBtnOff,
            ]}>
            <Text
              style={[
                styles.sportyritcountddownFilterTxt,
                sportyritcountddownSel && styles.sportyritcountddownFilterTxtOn,
              ]}
              numberOfLines={1}>
              {sportyritcountddownLbl}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const sportyritcountddownOpenAdd = () => {
    sportyritcountddownNavigation.navigate('Sportyritcountddowneventform', {});
  };

  const sportyritcountddownListPad = {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: sportyritcountddownTabPadBottom,
    flexGrow: 1,
  };

  if (sportyritcountddownLoading) {
    return (
      <Sportyritcountddownlayout>
        <View
          style={[
            styles.sportyritcountddownHeaderBlock,
            {paddingTop: sportyritcountddownInsets.top + 8},
          ]}>
          <View style={styles.sportyritcountddownHeaderTop}>
            <View>
              <Text style={styles.sportyritcountddownEyebrow}>MY EVENTS</Text>
              <Text style={styles.sportyritcountddownScreenTitle}>
                Sport Countdown
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={sportyritcountddownOpenAdd}
              style={styles.sportyritcountddownPlusOuter}>
              <LinearGradient
                colors={['#7B2FBE', '#F5B800']}
                end={{x: 1, y: 1}}
                start={{x: 0, y: 0}}
                style={styles.sportyritcountddownPlusGrad}>
                <Image
                  source={require('../../assets/i/sportyritcountdad.png')}
                />
              </LinearGradient>
            </Pressable>
          </View>
          {sportyritcountddownRenderFilters()}
        </View>
        <View style={styles.sportyritcountddownLoadingWrap}>
          <ActivityIndicator color="#a855f7" size="large" />
        </View>
      </Sportyritcountddownlayout>
    );
  }

  return (
    <Sportyritcountddownlayout>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <View style={styles.sportyritcountddownHeaderTop}>
          <View style={styles.sportyritcountddownTitleWrap}>
            <Text style={styles.sportyritcountddownEyebrow}>MY EVENTS</Text>
            <Text style={styles.sportyritcountddownScreenTitle}>
              Sport Countdown
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Add event"
            accessibilityRole="button"
            onPress={sportyritcountddownOpenAdd}
            style={styles.sportyritcountddownPlusOuter}>
            <LinearGradient
              colors={['#7B2FBE', '#F5B800']}
              end={{x: 1, y: 1}}
              start={{x: 0, y: 0}}
              style={styles.sportyritcountddownPlusGrad}>
              <Image source={require('../../assets/i/sportyritcountdad.png')} />
            </LinearGradient>
          </Pressable>
        </View>
        {sportyritcountddownRenderFilters()}
      </View>

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={
          sportyritcountddownFiltered.length === 0
            ? [sportyritcountddownListPad, styles.sportyritcountddownEmptyGrow]
            : sportyritcountddownListPad
        }
        data={sportyritcountddownFiltered}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          sportyritcountddownEvents.length > 0 &&
          sportyritcountddownFiltered.length === 0 ? (
            <View style={styles.sportyritcountddownFilterEmpty}>
              <Text style={styles.sportyritcountddownFilterEmptyTitle}>
                No events in this filter
              </Text>
              <Text style={styles.sportyritcountddownFilterEmptySub}>
                Try &quot;All Events&quot; or add a new countdown.
              </Text>
            </View>
          ) : sportyritcountddownEvents.length === 0 ? (
            <View style={styles.sportyritcountddownEmpty}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                source={require('../../assets/i/sportyritcountddmai.png')}
                style={styles.sportyritcountddownEmptyImg}
              />
              <Text style={styles.sportyritcountddownEmptyTitle}>
                No events yet
              </Text>
              <Text style={styles.sportyritcountddownEmptySub}>
                Add your first sports event to start the countdown!
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={sportyritcountddownOpenAdd}
                style={styles.sportyritcountddownEmptyCta}>
                <LinearGradient
                  colors={['#7B2FBE', '#F5B800']}
                  style={styles.sportyritcountddownEmptyCtaGrad}>
                  <Text style={styles.sportyritcountddownEmptyCtaTxt}>
                    + Add Event
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={sportyritcountddownRefreshing}
            onRefresh={sportyritcountddownOnRefresh}
            tintColor="#a855f7"
          />
        }
        renderItem={({item, index}) => (
          <SportyritcountddownEventcard
            event={item}
            index={index}
            onLongPress={() =>
              sportyritcountddownConfirmDelete(item.id, item.title)
            }
            onPress={() =>
              sportyritcountddownNavigation.navigate(
                'Sportyritcountddowneventdetail',
                {eventId: item.id},
              )
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Sportyritcountddownlayout>
  );
};

export default Sportyritcountddownmain;

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
    gap: 16,
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
  sportyritcountddownPlusOuter: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  sportyritcountddownPlusGrad: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownPlusTxt: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginTop: -2,
  },
  sportyritcountddownFilterRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sportyritcountddownFilterBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 34.5,
    borderWidth: 1,
  },
  sportyritcountddownFilterBtnOn: {
    backgroundColor: '#7b2fbe',
    borderColor: '#7b2fbe',
  },
  sportyritcountddownFilterBtnOff: {
    backgroundColor: '#1a0d3a',
    borderColor: '#3d2380',
  },
  sportyritcountddownFilterTxt: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.06,
    color: '#8b7baa',
    textAlign: 'center',
  },
  sportyritcountddownFilterTxtOn: {
    color: '#FFFFFF',
  },
  sportyritcountddownLoadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownEmptyGrow: {
    justifyContent: 'center',
  },
  sportyritcountddownEmpty: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sportyritcountddownEmptyImg: {
    marginBottom: 24,
  },
  sportyritcountddownEmptyTitle: {
    color: '#f0e8ff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.44,
    textAlign: 'center',
  },
  sportyritcountddownEmptySub: {
    marginTop: 8,
    color: '#8B7BAA',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.15,
    maxWidth: 250,
  },
  sportyritcountddownEmptyCta: {
    marginTop: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sportyritcountddownEmptyCtaGrad: {
    width: 140,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownEmptyCtaTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.23,
  },
  sportyritcountddownFilterEmpty: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  sportyritcountddownFilterEmptyTitle: {
    color: '#f0e8ff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  sportyritcountddownFilterEmptySub: {
    marginTop: 8,
    color: '#8b7baa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
});
