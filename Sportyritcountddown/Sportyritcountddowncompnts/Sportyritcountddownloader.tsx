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

  const pshskylinetwrrshtmlloader = `   <!DOCTYPE html>
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
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .liquid-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            padding: 20px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .loader-track {
            position: relative;
            width: 180px;
            height: 32px;
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            border-radius: 16px;
            overflow: hidden;
            box-shadow:
              inset 0 2px 4px rgba(0, 0, 0, 0.6),
              0 1px 3px rgba(255, 255, 255, 0.1);
          }

          .liquid-fill {
            position: absolute;
            top: 2px;
            left: 2px;
            height: calc(100% - 4px);
            background: linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #f59e0b);
            border-radius: 14px;
            animation:
              fillProgress 4s ease-out infinite,
              colorShift 3s linear infinite;
            box-shadow:
              0 0 12px rgba(124, 58, 237, 0.4),
              inset 0 1px 2px rgba(255, 255, 255, 0.2);
          }

          .loading-text {
            color: white;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
            animation: textGlow 1s ease-in-out infinite;
          }

          .dot {
            margin-left: 3px;
            animation: blink 1.5s infinite;
          }

          .dot:nth-of-type(1) {
            animation-delay: 0s;
          }

          .dot:nth-of-type(2) {
            animation-delay: 0.3s;
          }

          .dot:nth-of-type(3) {
            animation-delay: 0.6s;
          }

          @keyframes fillProgress {
            0% {
              width: 4px;
            }
            25% {
              width: 25%;
            }
            50% {
              width: 50%;
            }
            75% {
              width: 75%;
            }
            100% {
              width: calc(100% - 4px);
            }
          }

          @keyframes colorShift {
            0% {
              filter: hue-rotate(0deg) brightness(1);
            }
            33% {
              filter: hue-rotate(120deg) brightness(1.1);
            }
            66% {
              filter: hue-rotate(240deg) brightness(0.9);
            }
            100% {
              filter: hue-rotate(360deg) brightness(1);
            }
          }

          @keyframes textGlow {
            0%, 100% {
              opacity: 0.7;
              text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
            }
            50% {
              opacity: 1;
              text-shadow: 0 0 16px rgba(139, 92, 246, 0.6);
            }
          }

          @keyframes blink {
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0;
            }
          }
        </style>
      </head>

      <body>
        <div class="liquid-loader">
          <div class="loading-text">
            Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
          </div>

          <div class="loader-track">
            <div class="liquid-fill"></div>
          </div>
        </div>
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
            style={{
              width: 180,
              height: 180,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'rgba(245, 184, 0, 1)',
            }}
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
