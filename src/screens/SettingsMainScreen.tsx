import {useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
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
import Layout from '../components/Layout';
import {colors, screenStyles} from '../themes';
import {headerPaddingTop, tabBarPadding} from '../utils';

const SettingsMainScreen = () => {
  const navigation = useNavigation<SettingsMainNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = tabBarPadding(insets.bottom);

  const [pushOn, setPushOn] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.pushNotifications);
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

  const onTogglePush = useCallback((val: boolean) => {
    setPushOn(val);
    AsyncStorage.setItem(STORAGE_KEYS.pushNotifications, val ? '1' : '0').catch(
      () => {
        console.log('error');
      },
    );
  }, []);

  const goAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  return (
    <Layout scrollable={false}>
      <View
        style={[
          screenStyles.headerBlock,
          {paddingTop: headerPaddingTop(insets.top)},
        ]}>
        <Text style={screenStyles.eyebrow}>PREFERENCES</Text>
        <Text style={screenStyles.screenTitle}>
          Settings <Text style={styles.gearEmoji}>⚙️</Text>
        </Text>
      </View>

      <View style={[screenStyles.scrollContent, {paddingBottom: tabPadBottom}]}>
        <Text style={screenStyles.sectionLabel}>NOTIFICATIONS</Text>
        <View style={screenStyles.card}>
          <View style={styles.notifRow}>
            <View style={screenStyles.iconBox}>
              <Image source={require('../../assets/i/sportyritcosnotf.png')} />
            </View>
            <View style={styles.rowText}>
              <Text style={screenStyles.rowTitle}>Notifications</Text>
              <Text style={screenStyles.rowSub}>Event reminders & updates</Text>
            </View>
            <Switch
              accessibilityLabel="notifications"
              ios_backgroundColor={colors.switchTrackOff}
              onValueChange={onTogglePush}
              thumbColor={pushOn ? colors.switchThumbOn : colors.switchThumbOff}
              trackColor={{
                false: colors.switchTrackOff,
                true: colors.switchTrackOn,
              }}
              value={pushOn}
            />
          </View>
        </View>

        <Text style={screenStyles.sectionLabel}>
          {Platform.OS === 'ios' ? 'ABOUT & SUPPORT' : 'ABOUT'}
        </Text>
        <View style={screenStyles.card}>
          <SettingsRow
            bottomBorder
            iconBg="#3B82F620"
            iconImage={require('../../assets/i/sportyritcoscnab.png')}
            onPress={goAbout}
            subtitle={undefined}
            title="About App"
          />
          {Platform.OS === 'ios' && (
            <>
              <SettingsRow
                bottomBorder
                iconBg="#22C55E20"
                iconImage={require('../../assets/i/sportyritcoscnxtpr.png')}
                onPress={() =>
                  Linking.openURL(
                    'https://www.termsfeed.com/live/34e7abfe-fbf0-456d-a8b1-939e0155f69e',
                  )
                }
                subtitle="How we handle your data"
                title="Privacy Policy"
              />
              <SettingsRow
                bottomBorder
                iconBg="#F5B80020"
                iconImage={require('../../assets/i/sportyritcoscnxtra.png')}
                onPress={() =>
                  Linking.openURL(
                    'https://apps.apple.com/us/app/roabitt-countdown-sporty/id6770435037',
                  )
                }
                subtitle="Love App? Tell us!"
                title="Rate the App"
              />
              <SettingsRow
                bottomBorder={false}
                iconBg="#A855F720"
                iconImage={require('../../assets/i/sportyritcoscnxtshr.png')}
                onPress={() =>
                  Linking.openURL(
                    'https://apps.apple.com/us/app/roabitt-countdown-sporty/id6770435037',
                  )
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
      screenStyles.linkRow,
      bottomBorder ? screenStyles.linkRowBorder : null,
    ]}>
    <View style={[screenStyles.iconBox, {backgroundColor: iconBg}]}>
      <Image source={iconImage} />
    </View>
    <View style={styles.rowText}>
      <Text style={screenStyles.rowTitle}>{title}</Text>
      {subtitle ? <Text style={screenStyles.rowSub}>{subtitle}</Text> : null}
    </View>
    <Image source={require('../../assets/i/sportyritcoscnxt.png')} />
  </Pressable>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  gearEmoji: {
    fontSize: 22,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  rowText: {
    flex: 1,
    minWidth: 0,
  },
  chevron: {
    color: '#6b7280',
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 4,
  },
});

export default SettingsMainScreen;
