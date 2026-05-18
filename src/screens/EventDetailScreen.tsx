import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  getCountdownParts,
  formatDateLabel,
  parseDateKey,
} from '../data/countdown';
import type {Event} from '../data/eventTypes';
import {loadEvents, saveEvents} from '../data/eventStorage';
import type {RootParamList} from '../routes/rootParamList';

type detailNav = NativeStackNavigationProp<RootParamList, 'EventDetail'>;

type detailRoute = RouteProp<RootParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const navigation = useNavigation<detailNav>();
  const route = useRoute<detailRoute>();
  const insets = useSafeAreaInsets();

  const eventId = route.params.eventId;
  const [event, setEvent] = useState<Event | null>(null);

  const reload = useCallback(async () => {
    const all = await loadEvents();
    const found = all.find(e => e.id === eventId);
    setEvent(found ?? null);
  }, [eventId]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const parts = useMemo(() => {
    if (!event) {
      return null;
    }
    const dt = parseDateKey(event.dateKey);
    return getCountdownParts(dt, event.mode);
  }, [event]);

  const isTo = event?.mode === 'to';

  const onShare = useCallback(async () => {
    if (!event) {
      return;
    }
    try {
      await Share.share({
        message: `${event.title}\n${formatDateLabel(event.dateKey)}`,
        title: event.title,
      });
    } catch {
      /* ignore */
    }
  }, [event]);

  const onDelete = useCallback(() => {
    Alert.alert(
      'Delete Event?',
      'This sport event will be removed from your timeline. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const all = await loadEvents();
            await saveEvents(all.filter(e => e.id !== eventId));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'MainTabs'}],
              }),
            );
          },
        },
      ],
    );
  }, [eventId, navigation]);

  if (!event || !parts) {
    return (
      <View style={[styles.root, styles.center]}>
        <Text style={styles.missing}>Event not found</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const heroSource = event.imageUri
    ? {uri: event.imageUri}
    : require('../../assets/i/sportyritcountddownloadbg.png');

  return (
    <View style={styles.root}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 84,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <ImageBackground
            resizeMode="cover"
            source={heroSource}
            style={styles.heroImg}>
            <LinearGradient
              colors={['#00000000', '#0D0620']}
              locations={[0.3, 1]}
              style={StyleSheet.absoluteFill}
            />
            <Pressable
              accessibilityRole="button"
              hitSlop={12}
              onPress={() => navigation.goBack()}
              style={[styles.backBtn, {top: insets.top + 8}]}>
              <Image source={require('../../assets/i/sportyritcocback.png')} />
              <Text style={styles.backTxt}>Back</Text>
            </Pressable>
            <View style={styles.heroTitleBox}>
              <Text style={styles.heroTitle}>{event.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <View style={styles.timerCard}>
            <Text style={styles.timerLbl}>
              {isTo ? '⌛ DAYS UNTIL EVENT' : '⏱ DAYS SINCE EVENT'}
            </Text>
            <View style={styles.bigRow}>
              <View style={styles.bigCell}>
                <Text style={styles.bigNum}>{parts.totalDays}</Text>
                <Text style={styles.bigHint}>Days</Text>
              </View>
              <View style={styles.bigCell}>
                <Text style={styles.bigNum}>{parts.hours}</Text>
                <Text style={styles.bigHint}>Hours</Text>
              </View>
              <View style={styles.bigCell}>
                <Text style={styles.bigNum}>{parts.minutes}</Text>
                <Text style={styles.bigHint}>Mins</Text>
              </View>
            </View>
            <View style={styles.smallRow}>
              <View style={styles.smallCell}>
                <Text style={styles.smallNum}>{parts.weeks}</Text>
                <Text style={styles.smallLbl}>Weeks</Text>
              </View>
              <View style={styles.smallCell}>
                <Text style={styles.smallNum}>{parts.months}</Text>
                <Text style={styles.smallLbl}>Months</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Image source={require('../../assets/i/sportyritcoclnd.png')} />
            <View>
              <Text style={styles.infoLbl}>Event Date</Text>
              <Text style={styles.infoVal}>
                {formatDateLabel(event.dateKey)}
              </Text>
            </View>
          </View>

          {event.description.trim().length > 0 ? (
            <View style={styles.about}>
              <Text style={styles.aboutLbl}>ABOUT</Text>
              <Text style={styles.aboutTxt}>{event.description}</Text>
            </View>
          ) : null}

          <View style={styles.row2}>
            <Pressable
              accessibilityRole="button"
              onPress={onShare}
              style={styles.half}>
              <Image source={require('../../assets/i/sportyritcocshr.png')} />
              <Text style={styles.shareLbl}>Share</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate('EventForm', {eventId: event.id})
              }
              style={styles.half}>
              <Image source={require('../../assets/i/sportyritcocbedt.png')} />
              <Text style={styles.editLbl}>Edit</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              navigation.navigate('MainTabs', {screen: 'Greetings'});
            }}
            style={styles.greetOuter}>
            <LinearGradient
              colors={['#7B2FBE', '#F5B800']}
              end={{x: 1, y: 0.5}}
              start={{x: 0, y: 0.5}}
              style={styles.greetGrad}>
              <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
              <Text style={styles.greetTxt}>Generate Greeting</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onDelete}
            style={styles.delete}>
            <Image source={require('../../assets/i/sportyritcocbdel.png')} />
            <Text style={styles.deleteTxt}>Delete Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  missing: {
    color: '#f0e8ff',
    fontSize: 16,
    marginBottom: 12,
  },
  backLink: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '600',
  },
  heroWrap: {
    width: '100%',
    height: 280,
  },
  heroImg: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    backgroundColor: '#1A0D3A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3d2380',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backTxt: {
    color: '#f0e8ff',
    fontSize: 15,
    fontWeight: '600',
  },
  heroTitleBox: {
    padding: 20,
    paddingBottom: 24,
    position: 'absolute',
    left: 5,
    bottom: 20,
  },
  heroTitle: {
    color: '#f0e8ff',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  body: {
    paddingHorizontal: 16,
    gap: 14,
    marginTop: -12,
  },
  timerCard: {
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 20,
  },
  timerLbl: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  bigRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  bigCell: {
    flex: 1,
    backgroundColor: '#231550',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,

    borderWidth: 1,
    borderColor: '#7B2FBE60',
  },
  bigNum: {
    color: '#a855f7',
    fontSize: 28,
    fontWeight: '900',
  },
  bigHint: {
    color: '#8b7baa',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  smallRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  smallCell: {
    minWidth: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#231550',
    borderRadius: 12,
    paddingVertical: 12,
  },
  smallNum: {
    color: '#a855f7',
    fontSize: 20,
    fontWeight: '800',
  },
  smallLbl: {
    color: '#8b7baa',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 16,
  },
  calEmoji: {
    fontSize: 28,
  },
  infoLbl: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
  },
  infoVal: {
    color: '#f0e8ff',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  about: {
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 16,
  },
  aboutLbl: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  aboutTxt: {
    color: '#f0e8ff',
    fontSize: 15,
    lineHeight: 22,
  },
  row2: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a0d3a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3d2380',
    paddingVertical: 14,
  },
  shareIco: {
    color: '#a855f7',
    fontSize: 18,
    fontWeight: '700',
  },
  shareLbl: {
    color: '#a855f7',
    fontSize: 15,
    fontWeight: '700',
  },
  editIco: {
    color: '#f5b800',
    fontSize: 18,
    fontWeight: '700',
  },
  editLbl: {
    color: '#f5b800',
    fontSize: 15,
    fontWeight: '700',
  },
  greetOuter: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  greetGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
  },
  greetTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  delete: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5A1520',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#1A0D3A',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  deleteTxt: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
