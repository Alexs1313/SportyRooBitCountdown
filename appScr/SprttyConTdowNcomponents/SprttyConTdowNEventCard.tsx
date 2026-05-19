import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {Event} from '../SprttyConTdowNdata/SprttyConTdowNeventTypes';
import {colors, gradients} from '../SprttyConTdowNthemes/SprttyConTdowNindex';
import {formatDateLabel, getCountdownParts, parseDateKey} from '../SprttyConTdowNutils/SprttyConTdowNindex';

type EventCardProps = {
  event: Event;
  index: number;
  onPress: () => void;
  onLongPress?: () => void;
};

const EventCard = ({event, index, onPress, onLongPress}: EventCardProps) => {
  const goldAccent = index % 2 === 1;
  const primaryColor = goldAccent ? colors.goldDim : colors.accent;
  const dt = parseDateKey(event.dateKey);
  const parts = getCountdownParts(dt, event.mode);
  const source: ImageSourcePropType | undefined = event.imageUri
    ? {uri: event.imageUri}
    : undefined;
  const isTo = event.mode === 'to';
  const daysLabel = isTo ? 'days left' : 'days ago';

  return (
    <Pressable
      accessibilityHint={
        onLongPress
          ? 'Double tap to open. Long press for delete option.'
          : undefined
      }
      accessibilityRole="button"
      onLongPress={onLongPress}
      onPress={onPress}
      style={({pressed}) => [styles.cardOuter, pressed && styles.cardPressed]}>
      <ImageBackground
        imageStyle={styles.cardImageStyle}
        resizeMode="cover"
        source={
          source ?? require('../../assets/i/sportyritcountddownloadbg.png')
        }
        style={styles.cardBg}>
        <View style={styles.cardTint} />
        {goldAccent ? (
          <LinearGradient
            colors={[...gradients.cardAccent]}
            end={{x: 1, y: 0}}
            start={{x: 0, y: 0}}
            style={styles.accentBar}
          />
        ) : (
          <View style={[styles.accentBar, styles.accentBarPurple]} />
        )}
        <View style={styles.cardInner}>
          <View style={styles.topRow}>
            <View style={styles.titleCol}>
              <Text style={styles.title}>{event.title}</Text>
              <View style={styles.dateRow}>
                <Image
                  source={require('../../assets/i/sportyritcocallnd.png')}
                />
                <Text style={styles.date}>
                  {formatDateLabel(event.dateKey)}
                </Text>
              </View>
            </View>
            <View style={styles.daysCol}>
              <Text style={[styles.bigDays, {color: primaryColor}]}>
                {parts.totalDays}
              </Text>
              <Text style={styles.daysHint}>{daysLabel}</Text>
            </View>
          </View>
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipNum}>{parts.weeks}</Text>
              <Text style={styles.chipLbl}>{isTo ? 'weeks' : 'wks ago'}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipNum}>{parts.hours}</Text>
              <Text style={styles.chipLbl}>hours</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipNum}>{parts.months}</Text>
              <Text style={styles.chipLbl}>{isTo ? 'months' : 'mos ago'}</Text>
            </View>
          </View>
          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>
                {isTo ? '⏳ Countdown To' : '⏱ Count Since'}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20.6,

    overflow: 'hidden',

    borderWidth: 1.1,

    borderColor: '#3d2380',

    marginBottom: 14.5,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cardBg: {
    minHeight: 211.6,

    width: '100%',
  },
  cardImageStyle: {
    borderRadius: 20.7,
  },
  cardTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 13, 58, 0.82)',

    borderRadius: 20.8,
  },
  accentBar: {
    height: 6.8,

    width: '100%',
  },
  accentBarPurple: {
    backgroundColor: '#7b2fbe',
  },
  cardInner: {
    paddingHorizontal: 16.1,

    paddingTop: 16.3,

    paddingBottom: 14.2,

    flex: 1,
  },
  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'flex-start',
  },
  titleCol: {
    flex: 1,

    paddingRight: 12.8,

    maxWidth: '72%',
  },
  title: {
    color: '#f0e8ff',

    fontSize: 15.3,

    fontWeight: '700',

    lineHeight: 22.5,

    letterSpacing: -0.23,
  },
  dateRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 4.4,

    gap: 4.6,
  },
  cal: {
    fontSize: 11.8,
  },
  date: {
    color: '#8b7baa',

    fontSize: 12.7,

    fontWeight: '500',
  },
  daysCol: {
    alignItems: 'flex-end',

    minWidth: 64.5,
  },
  bigDays: {
    fontSize: 28.1,

    fontWeight: '900',

    lineHeight: 28.3,

    letterSpacing: 0.38,
  },
  daysHint: {
    marginTop: 2.8,

    color: '#8b7baa',

    fontSize: 11.7,

    fontWeight: '600',

    letterSpacing: 0.56,

    textTransform: 'uppercase',
  },
  chipsRow: {
    flexDirection: 'row',

    gap: 12.4,

    marginTop: 18.2,

    paddingTop: 13.7,

    borderTopWidth: 1.7,

    borderTopColor: '#231550',
  },
  chip: {
    flex: 1,

    backgroundColor: '#231550',

    borderRadius: 10.6,

    paddingTop: 6.6,

    paddingHorizontal: 10.1,

    paddingBottom: 8.5,

    alignItems: 'center',
  },
  chipNum: {
    color: '#f0e8ff',

    fontSize: 14.3,

    fontWeight: '700',

    letterSpacing: -0.15,
  },
  chipLbl: {
    marginTop: 2.5,

    color: '#8b7baa',

    fontSize: 10.3,

    fontWeight: '500',

    letterSpacing: 0.12,
  },
  badgeWrap: {
    marginTop: 14.3,
  },
  badge: {
    alignSelf: 'flex-start',

    backgroundColor: '#1a0650',

    borderWidth: 1.4,

    borderColor: '#3d1b9a',

    borderRadius: 20.8,

    paddingHorizontal: 11.7,

    paddingVertical: 4.3,
  },
  badgeTxt: {
    color: '#a855f7',

    fontSize: 10.6,

    fontWeight: '700',

    letterSpacing: 0.62,

    textTransform: 'uppercase',
  },
});
