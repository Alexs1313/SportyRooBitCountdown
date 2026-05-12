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

import type {SportyritcountddownEvent} from '../Sportyritcountddowndata/sportyritcountddowneventtypes';
import {
  sportyritcountddownCountdownParts,
  sportyritcountddownFormatDateLabel,
  sportyritcountddownParseDateKey,
} from '../Sportyritcountddowndata/sportyritcountddowncountdown';

type SportyritcountddownEventCardProps = {
  event: SportyritcountddownEvent;
  index: number;
  onPress: () => void;
  onLongPress?: () => void;
};

const SportyritcountddownEventcard = ({
  event,
  index,
  onPress,
  onLongPress,
}: SportyritcountddownEventCardProps) => {
  const sportyritcountddownGoldAccent = index % 2 === 1;
  const sportyritcountddownPrimaryColor = sportyritcountddownGoldAccent
    ? '#f5b800'
    : '#7b2fbe';
  const sportyritcountddownDt = sportyritcountddownParseDateKey(event.dateKey);
  const sportyritcountddownParts = sportyritcountddownCountdownParts(
    sportyritcountddownDt,
    event.mode,
  );
  const sportyritcountddownSource: ImageSourcePropType | undefined =
    event.imageUri ? {uri: event.imageUri} : undefined;
  const sportyritcountddownIsTo = event.mode === 'to';
  const sportyritcountddownDaysLabel = sportyritcountddownIsTo
    ? 'days left'
    : 'days ago';

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
      style={({pressed}) => [
        styles.sportyritcountddownCardOuter,
        pressed && styles.sportyritcountddownCardPressed,
      ]}>
      <ImageBackground
        imageStyle={styles.sportyritcountddownCardImageStyle}
        resizeMode="cover"
        source={
          sportyritcountddownSource ??
          require('../../assets/i/sportyritcountddownloadbg.png')
        }
        style={styles.sportyritcountddownCardBg}>
        <View style={styles.sportyritcountddownCardTint} />
        {sportyritcountddownGoldAccent ? (
          <LinearGradient
            colors={['#f5b800', '#7b2fbe']}
            end={{x: 1, y: 0}}
            start={{x: 0, y: 0}}
            style={styles.sportyritcountddownAccentBar}
          />
        ) : (
          <View
            style={[
              styles.sportyritcountddownAccentBar,
              styles.sportyritcountddownAccentBarPurple,
            ]}
          />
        )}
        <View style={styles.sportyritcountddownCardInner}>
          <View style={styles.sportyritcountddownTopRow}>
            <View style={styles.sportyritcountddownTitleCol}>
              <Text style={styles.sportyritcountddownTitle}>{event.title}</Text>
              <View style={styles.sportyritcountddownDateRow}>
                <Image
                  source={require('../../assets/i/sportyritcocallnd.png')}
                />
                <Text style={styles.sportyritcountddownDate}>
                  {sportyritcountddownFormatDateLabel(event.dateKey)}
                </Text>
              </View>
            </View>
            <View style={styles.sportyritcountddownDaysCol}>
              <Text
                style={[
                  styles.sportyritcountddownBigDays,
                  {color: sportyritcountddownPrimaryColor},
                ]}>
                {sportyritcountddownParts.totalDays}
              </Text>
              <Text style={styles.sportyritcountddownDaysHint}>
                {sportyritcountddownDaysLabel}
              </Text>
            </View>
          </View>
          <View style={styles.sportyritcountddownChipsRow}>
            <View style={styles.sportyritcountddownChip}>
              <Text style={styles.sportyritcountddownChipNum}>
                {sportyritcountddownParts.weeks}
              </Text>
              <Text style={styles.sportyritcountddownChipLbl}>
                {sportyritcountddownIsTo ? 'weeks' : 'wks ago'}
              </Text>
            </View>
            <View style={styles.sportyritcountddownChip}>
              <Text style={styles.sportyritcountddownChipNum}>
                {sportyritcountddownParts.hours}
              </Text>
              <Text style={styles.sportyritcountddownChipLbl}>hours</Text>
            </View>
            <View style={styles.sportyritcountddownChip}>
              <Text style={styles.sportyritcountddownChipNum}>
                {sportyritcountddownParts.months}
              </Text>
              <Text style={styles.sportyritcountddownChipLbl}>
                {sportyritcountddownIsTo ? 'months' : 'mos ago'}
              </Text>
            </View>
          </View>
          <View style={styles.sportyritcountddownBadgeWrap}>
            <View style={styles.sportyritcountddownBadge}>
              <Text style={styles.sportyritcountddownBadgeTxt}>
                {sportyritcountddownIsTo ? '⏳ Countdown To' : '⏱ Count Since'}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default SportyritcountddownEventcard;

const styles = StyleSheet.create({
  sportyritcountddownCardOuter: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3d2380',
    marginBottom: 14,
  },
  sportyritcountddownCardPressed: {
    opacity: 0.92,
  },
  sportyritcountddownCardBg: {
    minHeight: 211,
    width: '100%',
  },
  sportyritcountddownCardImageStyle: {
    borderRadius: 20,
  },
  sportyritcountddownCardTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 13, 58, 0.82)',
    borderRadius: 20,
  },
  sportyritcountddownAccentBar: {
    height: 6,
    width: '100%',
  },
  sportyritcountddownAccentBarPurple: {
    backgroundColor: '#7b2fbe',
  },
  sportyritcountddownCardInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flex: 1,
  },
  sportyritcountddownTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sportyritcountddownTitleCol: {
    flex: 1,
    paddingRight: 12,
    maxWidth: '72%',
  },
  sportyritcountddownTitle: {
    color: '#f0e8ff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
    letterSpacing: -0.23,
  },
  sportyritcountddownDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  sportyritcountddownCal: {
    fontSize: 11,
  },
  sportyritcountddownDate: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '500',
  },
  sportyritcountddownDaysCol: {
    alignItems: 'flex-end',
    minWidth: 64,
  },
  sportyritcountddownBigDays: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 28,
    letterSpacing: 0.38,
  },
  sportyritcountddownDaysHint: {
    marginTop: 2,
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.56,
    textTransform: 'uppercase',
  },
  sportyritcountddownChipsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#231550',
  },
  sportyritcountddownChip: {
    flex: 1,
    backgroundColor: '#231550',
    borderRadius: 10,
    paddingTop: 6,
    paddingHorizontal: 10,
    paddingBottom: 8,
    alignItems: 'center',
  },
  sportyritcountddownChipNum: {
    color: '#f0e8ff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.15,
  },
  sportyritcountddownChipLbl: {
    marginTop: 2,
    color: '#8b7baa',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.12,
  },
  sportyritcountddownBadgeWrap: {
    marginTop: 14,
  },
  sportyritcountddownBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a0650',
    borderWidth: 1,
    borderColor: '#3d1b9a',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  sportyritcountddownBadgeTxt: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.62,
    textTransform: 'uppercase',
  },
});
