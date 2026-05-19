import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const Loader = () => {
  const navigation = useNavigation();

  const htmlloader = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }

    .loader-wrapper {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dots-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    .dot {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      border-radius: 10px;
      background-color: #b3d4fc;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .dot:last-child {
      margin-right: 0;
    }

    .dot:nth-child(1) {
      animation-delay: -0.3s;
    }

    .dot:nth-child(2) {
      animation-delay: -0.1s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.1s;
    }

    @keyframes pulse {
      0% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
      }

      50% {
        transform: scale(1.2);
        background-color: #6793fb;
        box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
      }

      100% {
        transform: scale(0.8);
        background-color: #b3d4fc;
        box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
      }
    }
  </style>
</head>
<body>
  <div class="loader-wrapper">
    <section class="dots-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </section>
  </div>
</body>
</html>
`;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome' as never);
    }, 6004);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/i/sportyritcountddownloadbg.png')}
      style={styles.imageBg}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/i/icon.png')}
              style={{
                width: 150.6,
                height: 150.4,
                borderRadius: 42.1,
                borderWidth: 1.2,
                borderColor: 'rgba(245, 184, 0, 1)',
              }}
            />
          ) : (
            <Image
              source={require('../../assets/i/sportyritcountddownloalogo.png')}
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 11.1,
            alignSelf: 'center',
            paddingBottom: 20.7,
          }}>
          <WebView
            source={{html: htmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{
              width: 260.2,
              height: 150.2,
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Loader;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,

    backgroundColor: '#0A1810',
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoWrap: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },
  bottomWrap: {
    justifyContent: 'flex-end',

    alignItems: 'center',

    paddingBottom: 40.8,
  },
  bottomText: {
    color: '#FFFFFF',

    fontSize: 12.8,

    fontFamily: 'DmSans-Regular',

    marginTop: 11.5,

    textAlign: 'center',
  },
  webviewDock: {
    alignItems: 'center',

    flex: 1,

    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,

    paddingBottom: 20.3,
  },
});
