import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootParamList} from '../routes/rootParamList';
import Layout from '../components/Layout';

type AboutScreenNav = NativeStackNavigationProp<RootParamList, 'About'>;

const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNav>();
  const insets = useSafeAreaInsets();
  const tabPadBottom = insets.bottom + 88;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Layout bounces={false}>
      <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.backBtn}>
          <Image source={require('../../assets/i/sportyritcocback.png')} />
          <Text style={styles.backTxt}>Back</Text>
        </Pressable>
        <Text style={styles.pageTitle}>About RoaBitt Countdown Sporty</Text>
      </View>
      <View style={styles.headerRule} />

      <View style={[styles.scroll, {paddingBottom: tabPadBottom}]}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.body}>
            RoaBitt Countdown Sporty is your ultimate sports companion — helping
            you track the events that matter most, celebrate milestones with
            personalized greetings, discover inspiring sports stories, and test
            your sports knowledge with fun challenges.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          <Text style={styles.bullet}>
            • Countdown to or from any sports event
          </Text>
          <Text style={styles.bullet}>• Personalized greeting generator</Text>
          <Text style={styles.bullet}>
            • Curated sports stories & daily facts
          </Text>
          <Text style={styles.bullet}>• Sports knowledge challenge game</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Developer</Text>
          <Text style={styles.body}>
            Built with passion for sports and technology. Sporty Roo was
            designed to bring the excitement of athletic events to your
            fingertips every single day.
          </Text>
        </View>
      </View>
    </Layout>
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
    backgroundColor: '#1A0D3A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2380',
    marginBottom: 12,
  },
  backChevron: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  backTxt: {
    color: '#F0E8FF',
    fontSize: 14,
    fontWeight: '600',
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
    marginHorizontal: 0,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    backgroundColor: '#1a0d32',
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#F5B800',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  body: {
    color: '#C4B8E0',
    fontSize: 13,
    lineHeight: 23,
  },
  bullet: {
    color: '#C4B8E0',
    fontSize: 13,
    lineHeight: 24,
    marginBottom: 6,
  },
});

export default AboutScreen;
