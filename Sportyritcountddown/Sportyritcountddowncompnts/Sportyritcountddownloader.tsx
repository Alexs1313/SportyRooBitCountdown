import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

const Sportyritcountddownloader = () => {
  const sportyritcountddownNavigation = useNavigation();

  useEffect(() => {
    const sportyritcountddownTimer = setTimeout(() => {
      sportyritcountddownNavigation.navigate(
        'Sportyritcountddownwlcm' as never,
      );
    }, 6000);

    return () => {
      clearTimeout(sportyritcountddownTimer);
    };
  }, [sportyritcountddownNavigation]);

  return (
    <ImageBackground
      source={require('../../assets/i/sportyritcountddownloadbg.png')}
      style={styles.sportyritcountddownimageBg}>
      <ScrollView
        contentContainerStyle={styles.sportyritcountddownscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sportyritcountddownLogoWrap}>
          <Image
            source={require('../../assets/i/sportyritcountddownloalogo.png')}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Sportyritcountddownloader;

const styles = StyleSheet.create({
  sportyritcountddownimageBg: {
    flex: 1,
    backgroundColor: '#0A1810',
  },
  sportyritcountddownscrollContent: {
    flexGrow: 1,
  },
  sportyritcountddownLogoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sportyritcountddownbottomWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  sportyritcountddownbottomText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'DmSans-Regular',
    marginTop: 11,
    textAlign: 'center',
  },
  sportyritcountddownwebviewDock: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
});
