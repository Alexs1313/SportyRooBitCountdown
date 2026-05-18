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

import EventCard from '../components/EventCard';
import type {Event} from '../data/eventTypes';
import {loadEvents, saveEvents} from '../data/eventStorage';
import {toastShowIfEnabled} from '../data/notificationPrefs';
import Layout from '../components/Layout';
import type {EventsMainNav} from '../routes/rootParamList';
import {gradients, screenStyles} from '../themes';
import {headerPaddingTop, tabBarPadding} from '../utils';

type FilterId = 'all' | 'to' | 'from';

type EventsScreenNav = EventsMainNav;

const EventsScreen = () => {
  const navigation = useNavigation<EventsScreenNav>();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterId>('all');
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(async () => {
    const rows = await loadEvents();
    setEvents(rows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      reload().finally(() => {
        if (active) {
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, [reload]),
  );

  const filtered = useMemo(() => {
    if (filter === 'all') {
      return events;
    }
    if (filter === 'to') {
      return events.filter(e => e.mode === 'to');
    }
    return events.filter(e => e.mode === 'from');
  }, [events, filter]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }, [reload]);

  const confirmDelete = useCallback((eventId: string, title: string) => {
    Alert.alert(
      'Delete Event?',
      'This sport event will be removed from your timeline. This action cannot be undone',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const all = await loadEvents();
            const next = all.filter(e => e.id !== eventId);
            await saveEvents(next);
            setEvents(next);
            await toastShowIfEnabled({
              type: 'success',
              text1: 'Event removed',
              text2: title,
            });
          },
        },
      ],
    );
  }, []);

  const tabPadBottom = tabBarPadding(insets.bottom);

  const renderFilters = () => (
    <View style={styles.filterRow}>
      {(
        [
          ['all', 'All Events'],
          ['to', 'Countdown To'],
          ['from', 'Count Since'],
        ] as const
      ).map(([id, lbl]) => {
        const sel = filter === id;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{selected: sel}}
            key={id}
            onPress={() => setFilter(id)}
            style={[
              styles.filterBtn,
              sel ? styles.filterBtnOn : styles.filterBtnOff,
            ]}>
            <Text
              style={[styles.filterTxt, sel && styles.filterTxtOn]}
              numberOfLines={1}>
              {lbl}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const openAdd = () => {
    navigation.navigate('EventForm', {});
  };

  const listPad = {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: tabPadBottom,
    flexGrow: 1,
  };

  if (loading) {
    return (
      <Layout>
        <View
          style={[
            screenStyles.headerBlock,
            {paddingTop: headerPaddingTop(insets.top)},
          ]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={screenStyles.eyebrow}>MY EVENTS</Text>
              <Text style={screenStyles.screenTitle}>Sport Countdown</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={openAdd}
              style={styles.plusOuter}>
              <LinearGradient
                colors={[...gradients.cta]}
                end={{x: 1, y: 1}}
                start={{x: 0, y: 0}}
                style={styles.plusGrad}>
                <Image
                  source={require('../../assets/i/sportyritcountdad.png')}
                />
              </LinearGradient>
            </Pressable>
          </View>
          {renderFilters()}
        </View>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color="#a855f7" size="large" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <View style={styles.headerTop}>
          <View style={styles.titleWrap}>
            <Text style={screenStyles.eyebrow}>MY EVENTS</Text>
            <Text style={screenStyles.screenTitle}>Sport Countdown</Text>
          </View>
          <Pressable
            accessibilityLabel="Add event"
            accessibilityRole="button"
            onPress={openAdd}
            style={styles.plusOuter}>
            <LinearGradient
              colors={[...gradients.cta]}
              end={{x: 1, y: 1}}
              start={{x: 0, y: 0}}
              style={styles.plusGrad}>
              <Image source={require('../../assets/i/sportyritcountdad.png')} />
            </LinearGradient>
          </Pressable>
        </View>
        {renderFilters()}
      </View>

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={
          filtered.length === 0 ? [listPad, styles.emptyGrow] : listPad
        }
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          events.length > 0 && filtered.length === 0 ? (
            <View style={styles.filterEmpty}>
              <Text style={styles.filterEmptyTitle}>
                No events in this filter
              </Text>
              <Text style={styles.filterEmptySub}>
                Try &quot;All Events&quot; or add a new countdown.
              </Text>
            </View>
          ) : events.length === 0 ? (
            <View style={styles.empty}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                source={require('../../assets/i/sportyritcountddmai.png')}
                style={styles.emptyImg}
              />
              <Text style={styles.emptyTitle}>No events yet</Text>
              <Text style={styles.emptySub}>
                Add your first sports event to start the countdown!
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={openAdd}
                style={styles.emptyCta}>
                <LinearGradient
                  colors={[...gradients.cta]}
                  style={styles.emptyCtaGrad}>
                  <Text style={styles.emptyCtaTxt}>+ Add Event</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#a855f7"
          />
        }
        renderItem={({item, index}) => (
          <EventCard
            event={item}
            index={index}
            onLongPress={() => confirmDelete(item.id, item.title)}
            onPress={() =>
              navigation.navigate('EventDetail', {eventId: item.id})
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  headerTop: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    minHeight: 58,
  },
  titleWrap: {
    flex: 1,

    paddingRight: 12,
  },
  plusOuter: {
    borderRadius: 14,

    overflow: 'hidden',
  },
  plusGrad: {
    width: 44,

    height: 44,

    alignItems: 'center',

    justifyContent: 'center',
  },
  plusTxt: {
    color: '#FFFFFF',

    fontSize: 28,

    fontWeight: '600',

    marginTop: -2,
  },
  filterRow: {
    flexDirection: 'row',

    gap: 6,
  },
  filterBtn: {
    flex: 1,

    borderRadius: 10,

    paddingVertical: 8,

    paddingHorizontal: 6,

    alignItems: 'center',

    justifyContent: 'center',

    minHeight: 34.5,

    borderWidth: 1,
  },
  filterBtnOn: {
    backgroundColor: '#7b2fbe',

    borderColor: '#7b2fbe',
  },
  filterBtnOff: {
    backgroundColor: '#1a0d3a',

    borderColor: '#3d2380',
  },
  filterTxt: {
    fontSize: 11,

    fontWeight: '700',

    letterSpacing: 0.06,

    color: '#8b7baa',

    textAlign: 'center',
  },
  filterTxtOn: {
    color: '#FFFFFF',
  },
  loadingWrap: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },
  emptyGrow: {
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',

    paddingHorizontal: 16,
  },
  emptyImg: {
    marginBottom: 24,
  },
  emptyTitle: {
    color: '#f0e8ff',

    fontSize: 18,

    fontWeight: '700',

    letterSpacing: -0.44,

    textAlign: 'center',
  },
  emptySub: {
    marginTop: 8,

    color: '#8B7BAA',

    fontSize: 14,

    lineHeight: 21,

    textAlign: 'center',

    letterSpacing: -0.15,

    maxWidth: 250,
  },
  emptyCta: {
    marginTop: 28,

    borderRadius: 14,

    overflow: 'hidden',
  },
  emptyCtaGrad: {
    width: 140,

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',
  },
  emptyCtaTxt: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '700',

    letterSpacing: -0.23,
  },
  filterEmpty: {
    alignItems: 'center',

    paddingHorizontal: 24,

    paddingTop: 48,
  },
  filterEmptyTitle: {
    color: '#f0e8ff',

    fontSize: 18,

    fontWeight: '700',

    textAlign: 'center',
  },
  filterEmptySub: {
    marginTop: 8,

    color: '#8b7baa',

    fontSize: 14,

    textAlign: 'center',

    lineHeight: 21,
  },
});
