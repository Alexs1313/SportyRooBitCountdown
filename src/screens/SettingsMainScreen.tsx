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

import type {SettingsMainNav} from '../routes/rootParamList';
import {STORAGE_KEYS} from '../constants/storageKeys';
import {pushNotificationsEnabled} from '../data/notificationPrefs';
import Layout from '../components/Layout';

const SettingsMainScreen = () => {
  const navigation =
    useNavigation<SettingsMainNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = insets.bottom + 88;

  const [pushOn, setPushOn] =
    useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(
          STORAGE_KEYS.pushNotifications,
        );
        if (!active) {
          return;
        }
        setPushOn(raw === '1');
      } catch {
        console.log('error');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const onTogglePush = useCallback(
    (val: boolean) => {
      setPushOn(val);
      AsyncStorage.setItem(
        STORAGE_KEYS.pushNotifications,
        val ? '1' : '0',
      ).catch(() => {
        console.log('error');
      });
    },
    [],
  );

  const goAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  const goPlaceholder = useCallback(
    (title: string) => {
      navigation.navigate(
        'SettingsPlaceholder',
        {title: title},
      );
    },
    [navigation],
  );

  return (
    <Layout scrollable={false}>
      <View
        style={[
          styles.headerBlock,
          {paddingTop: insets.top + 8},
        ]}>
        <Text style={styles.eyebrow}>PREFERENCES</Text>
        <Text style={styles.screenTitle}>
          Settings <Text style={styles.gearEmoji}>⚙️</Text>
        </Text>
      </View>

      <View
        style={[
          styles.scrollContent,
          {paddingBottom: tabPadBottom},
        ]}>
        <Text style={styles.sectionLabel}>
          NOTIFICATIONS
        </Text>
        <View style={styles.card}>
          <View style={styles.notifRow}>
            <View style={styles.iconBox}>
              <Image source={require('../../assets/i/sportyritcosnotf.png')} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>
                Notifications
              </Text>
              <Text style={styles.rowSub}>
                Event reminders & updates
              </Text>
            </View>
            <Switch
              accessibilityLabel="notifications"
              ios_backgroundColor="#3d2380"
              onValueChange={onTogglePush}
              thumbColor={pushOn ? '#facc15' : '#9ca3af'}
              trackColor={{false: '#3d2380', true: '#7b2fbe'}}
              value={pushOn}
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>
          {Platform.OS === 'ios' ? 'ABOUT & SUPPORT' : 'ABOUT'}
        </Text>
        <View style={styles.card}>
          <SettingsRow
            bottomBorder
            iconBg="#3B82F620"
            iconImage={require('../../assets/i/sportyritcoscnab.png')}
            onPress={goAbout}
            subtitle={undefined}
            title="About Sporty Roo"
          />
          {Platform.OS === 'ios' && (
            <>
              {' '}
              <SettingsRow
                bottomBorder
                iconBg="#22C55E20"
                iconImage={require('../../assets/i/sportyritcoscnxtpr.png')}
                onPress={() =>
                  goPlaceholder('Privacy Policy')
                }
                subtitle="How we handle your data"
                title="Privacy Policy"
              />
              <SettingsRow
                bottomBorder
                iconBg="#F5B80020"
                iconImage={require('../../assets/i/sportyritcoscnxtra.png')}
                onPress={() => goPlaceholder('Rate the App')}
                subtitle="Love Sporty Roo? Tell us!"
                title="Rate the App"
              />
              <SettingsRow
                bottomBorder={false}
                iconBg="#A855F720"
                iconImage={require('../../assets/i/sportyritcoscnxtshr.png')}
                onPress={() =>
                  goPlaceholder('Share with Friends')
                }
                subtitle="Spread the sports love"
                title="Share with Friends"
              />
            </>
          )}
        </View>
      </View>
    </Layout>
  );
};

const SettingsRow = ({
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
      styles.linkRow,
      bottomBorder ? styles.linkRowBorder : null,
    ]}>
    <View
      style={[styles.iconBox, {backgroundColor: iconBg}]}>
      <Image source={iconImage} />
    </View>
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.rowSub}>{subtitle}</Text>
      ) : null}
    </View>
    <Image source={require('../../assets/i/sportyritcoscnxt.png')} />
  </Pressable>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  headerBlock: {
    backgroundColor: '#120826',
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  eyebrow: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 18,
  },
  screenTitle: {
    color: '#f0e8ff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.07,
    lineHeight: 36,
    marginTop: 4,
  },
  gearEmoji: {
    fontSize: 22,
  },
  scrollFill: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionLabel: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#231550',
    backgroundColor: '#15082e',
    marginBottom: 20,
    overflow: 'hidden',
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },
  linkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#231550',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A855F720',
  },
  iconEmoji: {
    fontSize: 20,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    color: '#f0e8ff',
    fontSize: 16,
    fontWeight: '600',
  },
  rowSub: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  chevron: {
    color: '#6b7280',
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 4,
  },
});

export default SettingsMainScreen;
