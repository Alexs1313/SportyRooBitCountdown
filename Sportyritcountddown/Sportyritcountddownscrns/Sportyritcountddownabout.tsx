import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import React, {useCallback} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';
import Sportyritcountddownlayout from '../Sportyritcountddowncompnts/Sportyritcountddownlayout';

type SportyritcountddownAboutNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddownabout'
>;

const Sportyritcountddownabout = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownAboutNav>();
  const sportyritcountddownInsets = useSafeAreaInsets();
  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const sportyritcountddownOnBack = useCallback(() => {
    sportyritcountddownNavigation.goBack();
  }, [sportyritcountddownNavigation]);

  return (
    <Sportyritcountddownlayout bounces={false}>
      <View
        style={[
          styles.sportyritcountddownTopBar,
          {paddingTop: sportyritcountddownInsets.top + 8},
        ]}>
        <Pressable
          accessibilityRole="button"
          onPress={sportyritcountddownOnBack}
          style={styles.sportyritcountddownBackBtn}>
          <Image source={require('../../assets/i/sportyritcocback.png')} />
          <Text style={styles.sportyritcountddownBackTxt}>Back</Text>
        </Pressable>
        <Text style={styles.sportyritcountddownPageTitle}>
          About Sporty Roo
        </Text>
      </View>
      <View style={styles.sportyritcountddownHeaderRule} />

      <View
        style={[
          styles.sportyritcountddownScroll,
          {paddingBottom: sportyritcountddownTabPadBottom},
        ]}>
        <View style={styles.sportyritcountddownCard}>
          <Text style={styles.sportyritcountddownCardTitle}>Our Mission</Text>
          <Text style={styles.sportyritcountddownBody}>
            Sporty Roo is your ultimate sports companion — helping you track the
            events that matter most, celebrate milestones with personalized
            greetings, discover inspiring sports stories, and test your sports
            knowledge with fun challenges.
          </Text>
        </View>

        <View style={styles.sportyritcountddownCard}>
          <Text style={styles.sportyritcountddownCardTitle}>Features</Text>
          <Text style={styles.sportyritcountddownBullet}>
            • Countdown to or from any sports event
          </Text>
          <Text style={styles.sportyritcountddownBullet}>
            • Personalized greeting generator
          </Text>
          <Text style={styles.sportyritcountddownBullet}>
            • Curated sports stories & daily facts
          </Text>
          <Text style={styles.sportyritcountddownBullet}>
            • Sports knowledge challenge game
          </Text>
        </View>

        <View style={styles.sportyritcountddownCard}>
          <Text style={styles.sportyritcountddownCardTitle}>Developer</Text>
          <Text style={styles.sportyritcountddownBody}>
            Built with passion for sports and technology. Sporty Roo was
            designed to bring the excitement of athletic events to your
            fingertips every single day.
          </Text>
        </View>
      </View>
    </Sportyritcountddownlayout>
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
    backgroundColor: '#1A0D3A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2380',
    marginBottom: 12,
  },
  sportyritcountddownBackChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  sportyritcountddownBackTxt: {
    color: '#F0E8FF',
    fontSize: 14,
    fontWeight: '600',
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
    marginHorizontal: 0,
  },
  sportyritcountddownScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sportyritcountddownCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    backgroundColor: '#1a0d32',
    padding: 16,
    marginBottom: 14,
  },
  sportyritcountddownCardTitle: {
    color: '#F5B800',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  sportyritcountddownBody: {
    color: '#C4B8E0',
    fontSize: 13,
    lineHeight: 23,
  },
  sportyritcountddownBullet: {
    color: '#C4B8E0',
    fontSize: 13,
    lineHeight: 24,
    marginBottom: 6,
  },
});

export default Sportyritcountddownabout;
