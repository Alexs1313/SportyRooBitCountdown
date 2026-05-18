import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootParamList} from '../routes/rootParamList';

type settPlaceholderNav = NativeStackNavigationProp<
  RootParamList,
  'SettingsPlaceholder'
>;

type settPlaceholderRoute = RouteProp<
  RootParamList,
  'SettingsPlaceholder'
>;

const SettingsPlaceholderScreen = () => {
  const navigation =
    useNavigation<settPlaceholderNav>();
  const route =
    useRoute<settPlaceholderRoute>();

  const insets = useSafeAreaInsets();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.topBar,
          {paddingTop: insets.top + 8},
        ]}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.backBtn}>
          <Text style={styles.backChevron}>‹</Text>
          <Text style={styles.backTxt}>Back</Text>
        </Pressable>
        <Text style={styles.pageTitle}>
          {route.params.title}
        </Text>
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
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: '#4a2d6e',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6b4d9a',
    marginBottom: 12,
  },
  backChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  backTxt: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  headerRule: {
    height: 1,
    backgroundColor: '#2D1B69',
  },
  empty: {
    flex: 1,
  },
});

export default SettingsPlaceholderScreen;
