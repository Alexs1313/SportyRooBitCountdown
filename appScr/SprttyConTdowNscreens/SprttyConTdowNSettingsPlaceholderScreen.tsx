import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback} from 'react';

import type {RootParamList} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';

type SettPlaceholderNav = NativeStackNavigationProp<
  RootParamList,
  'SettingsPlaceholder'
>;

type SettPlaceholderRoute = RouteProp<RootParamList, 'SettingsPlaceholder'>;

const SettingsPlaceholderScreen = () => {
  const navigation = useNavigation<SettPlaceholderNav>();
  const route = useRoute<SettPlaceholderRoute>();

  const insets = useSafeAreaInsets();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.root}>
      <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.backBtn}>
          <Text style={styles.backChevron}>‹</Text>
          <Text style={styles.backTxt}>Back</Text>
        </Pressable>
        <Text style={styles.pageTitle}>{route.params.title}</Text>
      </View>
      <View style={styles.headerRule} />
      <View style={styles.empty} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  topBar: {
    paddingHorizontal: 18.5,

    paddingBottom: 12.7,
  },
  backBtn: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    gap: 4.7,

    backgroundColor: '#4a2d6e',

    paddingHorizontal: 14.7,

    paddingVertical: 10.3,

    borderRadius: 12.1,

    borderWidth: 1.2,

    borderColor: '#6b4d9a',

    marginBottom: 12.6,
  },
  backChevron: {
    color: '#ffffff',

    fontSize: 22.3,

    fontWeight: '700',

    marginTop: -2.5,
  },
  backTxt: {
    color: '#ffffff',

    fontSize: 14.3,

    fontWeight: '700',
  },
  pageTitle: {
    color: '#ffffff',

    fontSize: 22.2,

    fontWeight: '800',

    lineHeight: 28.5,
  },
  headerRule: {
    height: 1.8,

    backgroundColor: '#2D1B69',
  },
  empty: {
    flex: 1,
  },
});

export default SettingsPlaceholderScreen;
