import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const Sportyritcountddownloader = () => {
  const sportyritcountddownNavigation = useNavigation();

  const pshskylinetwrrshtmlloader = `  <!DOCTYPE html>
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
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .loader {
            display: block;
            --height-of-loader: 4px;
            --loader-color: #0071e2;
            width: 130px;
            height: var(--height-of-loader);
            border-radius: 30px;
            background-color: rgba(0, 0, 0, 0.2);
            position: relative;
          }

          .loader::before {
            content: "";
            position: absolute;
            background: var(--loader-color);
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            border-radius: 30px;
            animation: moving 1s ease-in-out infinite;
          }

          @keyframes moving {
            50% {
              width: 100%;
            }

            100% {
              width: 0;
              right: 0;
              left: unset;
            }
          }
        </style>
      </head>

      <body>
        <div class="loader"></div>
      </body>
    </html>`;

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
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            paddingBottom: 20,
          }}>
          <WebView
            source={{html: pshskylinetwrrshtmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 150, backgroundColor: 'transparent'}}
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
