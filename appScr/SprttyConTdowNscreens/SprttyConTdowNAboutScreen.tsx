import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RootParamList} from '../SprttyConTdowNroutes/SprttyConTdowNrootParamList';
import Layout from '../SprttyConTdowNcomponents/SprttyConTdowNLayout';

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
        <Text style={styles.pageTitle}>About RoaBitt Athletic Countdown</Text>
      </View>
      <View style={styles.headerRule} />

      <View style={[styles.scroll, {paddingBottom: tabPadBottom}]}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.body}>
            RoaBitt Athletic Countdown is your ultimate sports companion —
            helping you track the events that matter most, celebrate milestones
            with personalized greetings, discover inspiring sports stories, and
            test your sports knowledge with fun challenges.
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
            Built with passion for sports and technology. RoaBitt Athletic
            Countdown was designed to bring the excitement of athletic events to
            your fingertips every single day.
          </Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    gap: 4.1,

    backgroundColor: '#1A0D3A',

    paddingHorizontal: 14.6,

    paddingVertical: 10.4,

    borderRadius: 12.1,

    borderWidth: 1.1,

    borderColor: '#3D2380',

    marginBottom: 12.3,
  },
  backChevron: {
    color: '#ffffff',

    fontSize: 22.2,

    fontWeight: '700',

    marginTop: -2.5,
  },
  backTxt: {
    color: '#F0E8FF',

    fontSize: 14.5,

    fontWeight: '600',
  },
  pageTitle: {
    color: '#ffffff',

    fontSize: 22.3,

    fontWeight: '800',

    lineHeight: 28.3,
  },
  headerRule: {
    height: 1.2,

    backgroundColor: '#2D1B69',

    marginHorizontal: 0,
  },
  scroll: {
    paddingHorizontal: 20.7,

    paddingTop: 20.5,
  },
  card: {
    borderRadius: 16.2,

    borderWidth: 1.3,

    borderColor: '#3d2380',

    backgroundColor: '#1a0d32',

    padding: 16.8,

    marginBottom: 14.8,
  },
  cardTitle: {
    color: '#F5B800',

    fontSize: 14.7,

    fontWeight: '700',
    // Add margin bottom to the card title
    marginBottom: 10.5,
  },
  body: {
    color: '#C4B8E0',

    fontSize: 13.7,

    lineHeight: 23.3,
  },
  bullet: {
    color: '#C4B8E0',

    fontSize: 13.2,

    lineHeight: 24.4,

    marginBottom: 6.8,
  },
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  topBar: {
    paddingHorizontal: 18.4,

    paddingBottom: 12.6,
  },
});

export default AboutScreen;
