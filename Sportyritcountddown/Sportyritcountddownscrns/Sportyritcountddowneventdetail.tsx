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
  sportyritcountddownCountdownParts,
  sportyritcountddownFormatDateLabel,
  sportyritcountddownParseDateKey,
} from '../Sportyritcountddowndata/sportyritcountddowncountdown';
import type {SportyritcountddownEvent} from '../Sportyritcountddowndata/sportyritcountddowneventtypes';
import {
  sportyritcountddownLoadEvents,
  sportyritcountddownSaveEvents,
} from '../Sportyritcountddowndata/sportyritcountddowneventstorage';
import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';

type SportyritcountddownDetailNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddowneventdetail'
>;

type SportyritcountddownDetailRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddowneventdetail'
>;

const Sportyritcountddowneventdetail = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownDetailNav>();
  const sportyritcountddownRoute = useRoute<SportyritcountddownDetailRoute>();
  const sportyritcountddownInsets = useSafeAreaInsets();

  const sportyritcountddownEventId = sportyritcountddownRoute.params.eventId;
  const [sportyritcountddownEvent, setSportyritcountddownEvent] =
    useState<SportyritcountddownEvent | null>(null);

  const sportyritcountddownReload = useCallback(async () => {
    const sportyritcountddownAll = await sportyritcountddownLoadEvents();
    const sportyritcountddownFound = sportyritcountddownAll.find(
      e => e.id === sportyritcountddownEventId,
    );
    setSportyritcountddownEvent(sportyritcountddownFound ?? null);
  }, [sportyritcountddownEventId]);

  useFocusEffect(
    useCallback(() => {
      sportyritcountddownReload();
    }, [sportyritcountddownReload]),
  );

  const sportyritcountddownParts = useMemo(() => {
    if (!sportyritcountddownEvent) {
      return null;
    }
    const sportyritcountddownDt = sportyritcountddownParseDateKey(
      sportyritcountddownEvent.dateKey,
    );
    return sportyritcountddownCountdownParts(
      sportyritcountddownDt,
      sportyritcountddownEvent.mode,
    );
  }, [sportyritcountddownEvent]);

  const sportyritcountddownIsTo = sportyritcountddownEvent?.mode === 'to';

  const sportyritcountddownOnShare = useCallback(async () => {
    if (!sportyritcountddownEvent) {
      return;
    }
    try {
      await Share.share({
        message: `${
          sportyritcountddownEvent.title
        }\n${sportyritcountddownFormatDateLabel(
          sportyritcountddownEvent.dateKey,
        )}`,
        title: sportyritcountddownEvent.title,
      });
    } catch {
      /* ignore */
    }
  }, [sportyritcountddownEvent]);

  const sportyritcountddownOnDelete = useCallback(() => {
    Alert.alert(
      'Delete Event?',
      'This sport event will be removed from your timeline. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const sportyritcountddownAll =
              await sportyritcountddownLoadEvents();
            await sportyritcountddownSaveEvents(
              sportyritcountddownAll.filter(
                e => e.id !== sportyritcountddownEventId,
              ),
            );
            sportyritcountddownNavigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Sportyritcountddowntabs'}],
              }),
            );
          },
        },
      ],
    );
  }, [sportyritcountddownEventId, sportyritcountddownNavigation]);

  if (!sportyritcountddownEvent || !sportyritcountddownParts) {
    return (
      <View
        style={[
          styles.sportyritcountddownRoot,
          styles.sportyritcountddownCenter,
        ]}>
        <Text style={styles.sportyritcountddownMissing}>Event not found</Text>
        <Pressable onPress={() => sportyritcountddownNavigation.goBack()}>
          <Text style={styles.sportyritcountddownBackLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const sportyritcountddownHeroSource = sportyritcountddownEvent.imageUri
    ? {uri: sportyritcountddownEvent.imageUri}
    : require('../../assets/i/sportyritcountddownloadbg.png');

  return (
    <View style={styles.sportyritcountddownRoot}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: sportyritcountddownInsets.bottom + 84,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sportyritcountddownHeroWrap}>
          <ImageBackground
            resizeMode="cover"
            source={sportyritcountddownHeroSource}
            style={styles.sportyritcountddownHeroImg}>
            <LinearGradient
              colors={['#00000000', '#0D0620']}
              locations={[0.3, 1]}
              style={StyleSheet.absoluteFill}
            />
            <Pressable
              accessibilityRole="button"
              hitSlop={12}
              onPress={() => sportyritcountddownNavigation.goBack()}
              style={[
                styles.sportyritcountddownBackBtn,
                {top: sportyritcountddownInsets.top + 8},
              ]}>
              <Image source={require('../../assets/i/sportyritcocback.png')} />
              <Text style={styles.sportyritcountddownBackTxt}>Back</Text>
            </Pressable>
            <View style={styles.sportyritcountddownHeroTitleBox}>
              <Text style={styles.sportyritcountddownHeroTitle}>
                {sportyritcountddownEvent.title}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.sportyritcountddownBody}>
          <View style={styles.sportyritcountddownTimerCard}>
            <Text style={styles.sportyritcountddownTimerLbl}>
              {sportyritcountddownIsTo
                ? '⌛ DAYS UNTIL EVENT'
                : '⏱ DAYS SINCE EVENT'}
            </Text>
            <View style={styles.sportyritcountddownBigRow}>
              <View style={styles.sportyritcountddownBigCell}>
                <Text style={styles.sportyritcountddownBigNum}>
                  {sportyritcountddownParts.totalDays}
                </Text>
                <Text style={styles.sportyritcountddownBigHint}>Days</Text>
              </View>
              <View style={styles.sportyritcountddownBigCell}>
                <Text style={styles.sportyritcountddownBigNum}>
                  {sportyritcountddownParts.hours}
                </Text>
                <Text style={styles.sportyritcountddownBigHint}>Hours</Text>
              </View>
              <View style={styles.sportyritcountddownBigCell}>
                <Text style={styles.sportyritcountddownBigNum}>
                  {sportyritcountddownParts.minutes}
                </Text>
                <Text style={styles.sportyritcountddownBigHint}>Mins</Text>
              </View>
            </View>
            <View style={styles.sportyritcountddownSmallRow}>
              <View style={styles.sportyritcountddownSmallCell}>
                <Text style={styles.sportyritcountddownSmallNum}>
                  {sportyritcountddownParts.weeks}
                </Text>
                <Text style={styles.sportyritcountddownSmallLbl}>Weeks</Text>
              </View>
              <View style={styles.sportyritcountddownSmallCell}>
                <Text style={styles.sportyritcountddownSmallNum}>
                  {sportyritcountddownParts.months}
                </Text>
                <Text style={styles.sportyritcountddownSmallLbl}>Months</Text>
              </View>
            </View>
          </View>

          <View style={styles.sportyritcountddownInfoCard}>
            <Image source={require('../../assets/i/sportyritcoclnd.png')} />
            <View>
              <Text style={styles.sportyritcountddownInfoLbl}>Event Date</Text>
              <Text style={styles.sportyritcountddownInfoVal}>
                {sportyritcountddownFormatDateLabel(
                  sportyritcountddownEvent.dateKey,
                )}
              </Text>
            </View>
          </View>

          {sportyritcountddownEvent.description.trim().length > 0 ? (
            <View style={styles.sportyritcountddownAbout}>
              <Text style={styles.sportyritcountddownAboutLbl}>ABOUT</Text>
              <Text style={styles.sportyritcountddownAboutTxt}>
                {sportyritcountddownEvent.description}
              </Text>
            </View>
          ) : null}

          <View style={styles.sportyritcountddownRow2}>
            <Pressable
              accessibilityRole="button"
              onPress={sportyritcountddownOnShare}
              style={styles.sportyritcountddownHalf}>
              <Image source={require('../../assets/i/sportyritcocshr.png')} />
              <Text style={styles.sportyritcountddownShareLbl}>Share</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                sportyritcountddownNavigation.navigate(
                  'Sportyritcountddowneventform',
                  {eventId: sportyritcountddownEvent.id},
                )
              }
              style={styles.sportyritcountddownHalf}>
              <Image source={require('../../assets/i/sportyritcocbedt.png')} />
              <Text style={styles.sportyritcountddownEditLbl}>Edit</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              sportyritcountddownNavigation.navigate(
                'Sportyritcountddowntabs',
                {screen: 'Sportyritcountddowngreetn'},
              );
            }}
            style={styles.sportyritcountddownGreetOuter}>
            <LinearGradient
              colors={['#7B2FBE', '#F5B800']}
              end={{x: 1, y: 0.5}}
              start={{x: 0, y: 0.5}}
              style={styles.sportyritcountddownGreetGrad}>
              <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
              <Text style={styles.sportyritcountddownGreetTxt}>
                Generate Greeting
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={sportyritcountddownOnDelete}
            style={styles.sportyritcountddownDelete}>
            <Image source={require('../../assets/i/sportyritcocbdel.png')} />
            <Text style={styles.sportyritcountddownDeleteTxt}>
              Delete Event
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Sportyritcountddowneventdetail;

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownMissing: {
    color: '#f0e8ff',
    fontSize: 16,
    marginBottom: 12,
  },
  sportyritcountddownBackLink: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '600',
  },
  sportyritcountddownHeroWrap: {
    width: '100%',
    height: 280,
  },
  sportyritcountddownHeroImg: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sportyritcountddownBackBtn: {
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
  sportyritcountddownBackTxt: {
    color: '#f0e8ff',
    fontSize: 15,
    fontWeight: '600',
  },
  sportyritcountddownHeroTitleBox: {
    padding: 20,
    paddingBottom: 24,
    position: 'absolute',
    left: 5,
    bottom: 20,
  },
  sportyritcountddownHeroTitle: {
    color: '#f0e8ff',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  sportyritcountddownBody: {
    paddingHorizontal: 16,
    gap: 14,
    marginTop: -12,
  },
  sportyritcountddownTimerCard: {
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 20,
  },
  sportyritcountddownTimerLbl: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  sportyritcountddownBigRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  sportyritcountddownBigCell: {
    flex: 1,
    backgroundColor: '#231550',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,

    borderWidth: 1,
    borderColor: '#7B2FBE60',
  },
  sportyritcountddownBigNum: {
    color: '#a855f7',
    fontSize: 28,
    fontWeight: '900',
  },
  sportyritcountddownBigHint: {
    color: '#8b7baa',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  sportyritcountddownSmallRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  sportyritcountddownSmallCell: {
    minWidth: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#231550',
    borderRadius: 12,
    paddingVertical: 12,
  },
  sportyritcountddownSmallNum: {
    color: '#a855f7',
    fontSize: 20,
    fontWeight: '800',
  },
  sportyritcountddownSmallLbl: {
    color: '#8b7baa',
    fontSize: 13,
    fontWeight: '600',
  },
  sportyritcountddownInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 16,
  },
  sportyritcountddownCalEmoji: {
    fontSize: 28,
  },
  sportyritcountddownInfoLbl: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
  },
  sportyritcountddownInfoVal: {
    color: '#f0e8ff',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  sportyritcountddownAbout: {
    backgroundColor: '#1a0d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    padding: 16,
  },
  sportyritcountddownAboutLbl: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sportyritcountddownAboutTxt: {
    color: '#f0e8ff',
    fontSize: 15,
    lineHeight: 22,
  },
  sportyritcountddownRow2: {
    flexDirection: 'row',
    gap: 12,
  },
  sportyritcountddownHalf: {
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
  sportyritcountddownShareIco: {
    color: '#a855f7',
    fontSize: 18,
    fontWeight: '700',
  },
  sportyritcountddownShareLbl: {
    color: '#a855f7',
    fontSize: 15,
    fontWeight: '700',
  },
  sportyritcountddownEditIco: {
    color: '#f5b800',
    fontSize: 18,
    fontWeight: '700',
  },
  sportyritcountddownEditLbl: {
    color: '#f5b800',
    fontSize: 15,
    fontWeight: '700',
  },
  sportyritcountddownGreetOuter: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  sportyritcountddownGreetGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
  },
  sportyritcountddownGreetTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  sportyritcountddownDelete: {
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
  sportyritcountddownDeleteTxt: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
