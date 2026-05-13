import {useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownSettMainNav} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import {SPORTYRITCOUNTDOWN_PUSH_KEY} from '../Sportyritcountddowndata/sportyritcountddownnotificationprefs';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

const Sportyritcountddownsettmain = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownSettMainNav>();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const [sportyritcountddownPushOn, setSportyritcountddownPushOn] =
    useState(false);

  useEffect(() => {
    let sportyritcountddownActive = true;
    (async () => {
      try {
        const sportyritcountddownRaw = await AsyncStorage.getItem(
          SPORTYRITCOUNTDOWN_PUSH_KEY,
        );
        if (!sportyritcountddownActive) {
          return;
        }
        setSportyritcountddownPushOn(sportyritcountddownRaw === '1');
      } catch {
        console.log('error');
      }
    })();
    return () => {
      sportyritcountddownActive = false;
    };
  }, []);

  const sportyritcountddownOnTogglePush = useCallback(
    (sportyritcountddownVal: boolean) => {
      setSportyritcountddownPushOn(sportyritcountddownVal);
      AsyncStorage.setItem(
        SPORTYRITCOUNTDOWN_PUSH_KEY,
        sportyritcountddownVal ? '1' : '0',
      ).catch(() => {
        console.log('error');
      });
    },
    [],
  );

  const sportyritcountddownGoAbout = useCallback(() => {
    sportyritcountddownNavigation.navigate('Sportyritcountddownabout');
  }, [sportyritcountddownNavigation]);

  const sportyritcountddownGoPlaceholder = useCallback(
    (sportyritcountddownTitle: string) => {
      sportyritcountddownNavigation.navigate(
        'Sportyritcountddownsettplaceholder',
        {title: sportyritcountddownTitle},
      );
    },
    [sportyritcountddownNavigation],
  );

  return (
    <Sportyritcountddownlayout scrollable={false}>
      <View
        style={[
          styles.sportyritcountddownHeaderBlock,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <Text style={styles.sportyritcountddownEyebrow}>PREFERENCES</Text>
        <Text style={styles.sportyritcountddownScreenTitle}>
          Settings <Text style={styles.sportyritcountddownGearEmoji}>⚙️</Text>
        </Text>
      </View>

      <View
        style={[
          styles.sportyritcountddownScrollContent,
          {paddingBottom: sportyritcountddownTabPadBottom},
        ]}>
        <Text style={styles.sportyritcountddownSectionLabel}>
          NOTIFICATIONS
        </Text>
        <View style={styles.sportyritcountddownCard}>
          <View style={styles.sportyritcountddownNotifRow}>
            <View style={styles.sportyritcountddownIconBox}>
              <Image source={require('../../assets/i/sportyritcosnotf.png')} />
            </View>
            <View style={styles.sportyritcountddownRowText}>
              <Text style={styles.sportyritcountddownRowTitle}>
                Notifications
              </Text>
              <Text style={styles.sportyritcountddownRowSub}>
                Event reminders & updates
              </Text>
            </View>
            <Switch
              accessibilityLabel="notifications"
              ios_backgroundColor="#3d2380"
              onValueChange={sportyritcountddownOnTogglePush}
              thumbColor={sportyritcountddownPushOn ? '#facc15' : '#9ca3af'}
              trackColor={{false: '#3d2380', true: '#7b2fbe'}}
              value={sportyritcountddownPushOn}
            />
          </View>
        </View>

        <Text style={styles.sportyritcountddownSectionLabel}>
          {Platform.OS === 'ios' ? 'ABOUT & SUPPORT' : 'ABOUT'}
        </Text>
        <View style={styles.sportyritcountddownCard}>
          <SportyritcountddownsettRow
            bottomBorder
            iconBg="#3B82F620"
            iconImage={require('../../assets/i/sportyritcoscnab.png')}
            onPress={sportyritcountddownGoAbout}
            subtitle={undefined}
            title="About Sporty Roo"
          />
          {Platform.OS === 'ios' && (
            <>
              {' '}
              <SportyritcountddownsettRow
                bottomBorder
                iconBg="#22C55E20"
                iconImage={require('../../assets/i/sportyritcoscnxtpr.png')}
                onPress={() =>
                  sportyritcountddownGoPlaceholder('Privacy Policy')
                }
                subtitle="How we handle your data"
                title="Privacy Policy"
              />
              <SportyritcountddownsettRow
                bottomBorder
                iconBg="#F5B80020"
                iconImage={require('../../assets/i/sportyritcoscnxtra.png')}
                onPress={() => sportyritcountddownGoPlaceholder('Rate the App')}
                subtitle="Love Sporty Roo? Tell us!"
                title="Rate the App"
              />
              <SportyritcountddownsettRow
                bottomBorder={false}
                iconBg="#A855F720"
                iconImage={require('../../assets/i/sportyritcoscnxtshr.png')}
                onPress={() =>
                  sportyritcountddownGoPlaceholder('Share with Friends')
                }
                subtitle="Spread the sports love"
                title="Share with Friends"
              />
            </>
          )}
        </View>
      </View>
    </Sportyritcountddownlayout>
  );
};

const SportyritcountddownsettRow = ({
  bottomBorder,
  iconBg,
  iconImage,
  onPress,
  subtitle,
  title,
}: {
  bottomBorder: boolean;
  iconBg: string;
  iconImage: ImageSourcePropType;
  onPress: () => void;
  subtitle?: string;
  title: string;
}) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={[
      styles.sportyritcountddownLinkRow,
      bottomBorder ? styles.sportyritcountddownLinkRowBorder : null,
    ]}>
    <View
      style={[styles.sportyritcountddownIconBox, {backgroundColor: iconBg}]}>
      <Image source={iconImage} />
    </View>
    <View style={styles.sportyritcountddownRowText}>
      <Text style={styles.sportyritcountddownRowTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.sportyritcountddownRowSub}>{subtitle}</Text>
      ) : null}
    </View>
    <Image source={require('../../assets/i/sportyritcoscnxt.png')} />
  </Pressable>
);

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
  sportyritcountddownGearEmoji: {
    fontSize: 22,
  },
  sportyritcountddownScrollFill: {
    flex: 1,
  },
  sportyritcountddownScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sportyritcountddownSectionLabel: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 10,
    marginTop: 4,
  },
  sportyritcountddownCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#231550',
    backgroundColor: '#15082e',
    marginBottom: 20,
    overflow: 'hidden',
  },
  sportyritcountddownNotifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  sportyritcountddownLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },
  sportyritcountddownLinkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#231550',
  },
  sportyritcountddownIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A855F720',
  },
  sportyritcountddownIconEmoji: {
    fontSize: 20,
  },
  sportyritcountddownRowText: {
    flex: 1,
    minWidth: 0,
  },
  sportyritcountddownRowTitle: {
    color: '#f0e8ff',
    fontSize: 16,
    fontWeight: '600',
  },
  sportyritcountddownRowSub: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  sportyritcountddownChevron: {
    color: '#6b7280',
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 4,
  },
});

export default Sportyritcountddownsettmain;
