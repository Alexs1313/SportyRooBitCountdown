import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';

type SportyritcountddownSettPlaceholderNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownsettplaceholder'
>;

type SportyritcountddownSettPlaceholderRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownsettplaceholder'
>;

const Sportyritcountddownsettplaceholder = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownSettPlaceholderNav>();
  const sportyritcountddownRoute =
    useRoute<SportyritcountddownSettPlaceholderRoute>();

  const sportyritcountddownInsets = useSafeAreaInsets();

  const sportyritcountddownOnBack = useCallback(() => {
    sportyritcountddownNavigation.goBack();
  }, [sportyritcountddownNavigation]);

  return (
    <View style={styles.sportyritcountddownRoot}>
      <View
        style={[
          styles.sportyritcountddownTopBar,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <Pressable
          accessibilityRole="button"
          onPress={sportyritcountddownOnBack}
          style={styles.sportyritcountddownBackBtn}>
          <Text style={styles.sportyritcountddownBackChevron}>‹</Text>
          <Text style={styles.sportyritcountddownBackTxt}>Back</Text>
        </Pressable>
        <Text style={styles.sportyritcountddownPageTitle}>
          {sportyritcountddownRoute.params.title}
        </Text>
      </View>
      <View style={styles.sportyritcountddownHeaderRule} />
      <View style={styles.sportyritcountddownEmpty} />
    </View>
  );
};

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownTopBar: {
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  sportyritcountddownBackBtn: {
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
  sportyritcountddownBackChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  sportyritcountddownBackTxt: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  sportyritcountddownPageTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  sportyritcountddownHeaderRule: {
    height: 1,
    backgroundColor: '#2D1B69',
  },
  sportyritcountddownEmpty: {
    flex: 1,
  },
});

export default Sportyritcountddownsettplaceholder;
