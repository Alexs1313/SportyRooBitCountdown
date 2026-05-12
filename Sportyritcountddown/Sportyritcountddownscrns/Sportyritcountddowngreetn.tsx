import {useFocusEffect} from '@react-navigation/native';

import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {
  SportyritcountddownGreetingStyle,
  SportyritcountddownSavedGreeting,
} from '../Sportyritcountddowndata/sportyritcountddowngreetingtypes';
import {sportyritcountddownPickRandomGreeting} from '../Sportyritcountddowndata/sportyritcountddowngreetingtemplates';
import {
  sportyritcountddownLoadSavedGreetings,
  sportyritcountddownSaveSavedGreetings,
} from '../Sportyritcountddowndata/sportyritcountddowngreetingstorage';
import {sportyritcountddownToastShowIfEnabled} from '../Sportyritcountddowndata/sportyritcountddownnotificationprefs';

const sportyritcountddownGreetingStyleOrder: SportyritcountddownGreetingStyle[] =
  ['Motivational', 'Friendly', 'Humorous', 'Formal', 'Epic'];

function sportyritcountddownSavedDateLabel(sportyritcountddownMs: number) {
  const sportyritcountddownD = new Date(sportyritcountddownMs);
  const sportyritcountddownMonth = sportyritcountddownD.toLocaleDateString(
    undefined,
    {month: 'short'},
  );
  const sportyritcountddownDay = sportyritcountddownD.getDate();
  return `Saved ${sportyritcountddownMonth} ${sportyritcountddownDay}`;
}

type SportyritcountddownGreetTab = 'generate' | 'saved';

const Sportyritcountddowngreetn = () => {
  const sportyritcountddownInsets = useSafeAreaInsets();
  const sportyritcountddownTabPadBottom = sportyritcountddownInsets.bottom + 88;

  const [sportyritcountddownTab, setSportyritcountddownTab] =
    useState<SportyritcountddownGreetTab>('generate');
  const [sportyritcountddownRecipient, setSportyritcountddownRecipient] =
    useState('');
  const [sportyritcountddownEvent, setSportyritcountddownEvent] = useState('');
  const [sportyritcountddownStyle, setSportyritcountddownStyle] =
    useState<SportyritcountddownGreetingStyle>('Motivational');
  const [sportyritcountddownGenerated, setSportyritcountddownGenerated] =
    useState<string | null>(null);
  const [sportyritcountddownGenerating, setSportyritcountddownGenerating] =
    useState(false);
  const [sportyritcountddownJustSaved, setSportyritcountddownJustSaved] =
    useState(false);
  const [sportyritcountddownSaved, setSportyritcountddownSaved] = useState<
    SportyritcountddownSavedGreeting[]
  >([]);

  const sportyritcountddownReloadSaved = useCallback(async () => {
    const sportyritcountddownRows =
      await sportyritcountddownLoadSavedGreetings();
    sportyritcountddownRows.sort((a, b) => b.savedAtMs - a.savedAtMs);
    setSportyritcountddownSaved(sportyritcountddownRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      sportyritcountddownReloadSaved();
    }, [sportyritcountddownReloadSaved]),
  );

  const sportyritcountddownCanGenerate =
    sportyritcountddownRecipient.trim().length > 0 &&
    sportyritcountddownEvent.trim().length > 0;

  const sportyritcountddownOnGenerate = useCallback(() => {
    if (!sportyritcountddownCanGenerate) {
      return;
    }
    setSportyritcountddownGenerating(true);
    setSportyritcountddownJustSaved(false);
    setSportyritcountddownGenerated(null);
    const sportyritcountddownR = sportyritcountddownRecipient.trim();
    const sportyritcountddownE = sportyritcountddownEvent.trim();
    const sportyritcountddownSt = sportyritcountddownStyle;
    setTimeout(() => {
      const sportyritcountddownBody = sportyritcountddownPickRandomGreeting(
        sportyritcountddownSt,
        sportyritcountddownR,
        sportyritcountddownE,
      );
      setSportyritcountddownGenerated(sportyritcountddownBody);
      setSportyritcountddownGenerating(false);
    }, 780);
  }, [
    sportyritcountddownCanGenerate,
    sportyritcountddownRecipient,
    sportyritcountddownEvent,
    sportyritcountddownStyle,
  ]);

  const sportyritcountddownOnShareBody = useCallback(
    async (sportyritcountddownBody: string) => {
      try {
        await Share.share({
          message: sportyritcountddownBody,
          title: 'Sport Greeting',
        });
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const sportyritcountddownOnSaveCurrent = useCallback(async () => {
    if (!sportyritcountddownGenerated) {
      return;
    }
    const sportyritcountddownNew: SportyritcountddownSavedGreeting = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      recipient: sportyritcountddownRecipient.trim(),
      event: sportyritcountddownEvent.trim(),
      style: sportyritcountddownStyle,
      body: sportyritcountddownGenerated,
      savedAtMs: Date.now(),
    };
    const sportyritcountddownPrev =
      await sportyritcountddownLoadSavedGreetings();
    const sportyritcountddownNext = [
      sportyritcountddownNew,
      ...sportyritcountddownPrev,
    ];
    sportyritcountddownNext.sort((a, b) => b.savedAtMs - a.savedAtMs);
    await sportyritcountddownSaveSavedGreetings(sportyritcountddownNext);
    setSportyritcountddownSaved(sportyritcountddownNext);
    setSportyritcountddownJustSaved(true);
    await sportyritcountddownToastShowIfEnabled({
      type: 'success',
      text1: 'Sport Greetings ✨',
      text2: 'Saved successfully',
    });
  }, [
    sportyritcountddownGenerated,
    sportyritcountddownRecipient,
    sportyritcountddownEvent,
    sportyritcountddownStyle,
  ]);

  const sportyritcountddownConfirmDelete = useCallback(
    (
      sportyritcountddownId: string,
      sportyritcountddownRecipientName: string,
    ) => {
      Alert.alert(
        'Delete greeting?',
        `Remove the greeting for ${sportyritcountddownRecipientName}?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const sportyritcountddownPrev =
                await sportyritcountddownLoadSavedGreetings();
              const sportyritcountddownNext = sportyritcountddownPrev.filter(
                g => g.id !== sportyritcountddownId,
              );
              await sportyritcountddownSaveSavedGreetings(
                sportyritcountddownNext,
              );
              setSportyritcountddownSaved(sportyritcountddownNext);
              await sportyritcountddownToastShowIfEnabled({
                type: 'success',
                text1: 'Greeting removed',
                text2: sportyritcountddownRecipientName,
              });
            },
          },
        ],
      );
    },
    [],
  );

  const sportyritcountddownRenderTabs = () => (
    <View style={styles.sportyritcountddownTabRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          selected: sportyritcountddownTab === 'generate',
        }}
        onPress={() => setSportyritcountddownTab('generate')}
        style={[
          styles.sportyritcountddownTabBtn,
          sportyritcountddownTab === 'generate'
            ? styles.sportyritcountddownTabBtnOn
            : styles.sportyritcountddownTabBtnOff,
        ]}>
        <Text
          style={[
            styles.sportyritcountddownTabTxt,
            sportyritcountddownTab === 'generate' &&
              styles.sportyritcountddownTabTxtOn,
          ]}
          numberOfLines={1}>
          ✍️ Generate
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          selected: sportyritcountddownTab === 'saved',
        }}
        onPress={() => setSportyritcountddownTab('saved')}
        style={[
          styles.sportyritcountddownTabBtn,
          sportyritcountddownTab === 'saved'
            ? styles.sportyritcountddownTabBtnOn
            : styles.sportyritcountddownTabBtnOff,
        ]}>
        <Text
          style={[
            styles.sportyritcountddownTabTxt,
            sportyritcountddownTab === 'saved' &&
              styles.sportyritcountddownTabTxtOn,
          ]}
          numberOfLines={1}>
          📚 Saved ({sportyritcountddownSaved.length})
        </Text>
      </Pressable>
    </View>
  );

  const sportyritcountddownRenderGenerate = () => (
    <>
      <Text style={styles.sportyritcountddownLbl}>RECIPIENT NAME</Text>
      <TextInput
        autoCorrect
        onChangeText={setSportyritcountddownRecipient}
        placeholder="Enter name..."
        placeholderTextColor="rgba(240,232,255,0.5)"
        style={styles.sportyritcountddownInput}
        value={sportyritcountddownRecipient}
      />

      <Text style={styles.sportyritcountddownLbl}>EVENT</Text>
      <TextInput
        autoCorrect
        onChangeText={setSportyritcountddownEvent}
        placeholder="e.g. Olympic Games 2028"
        placeholderTextColor="rgba(240,232,255,0.5)"
        style={styles.sportyritcountddownInput}
        value={sportyritcountddownEvent}
      />

      <Text style={styles.sportyritcountddownLbl}>GREETING STYLE</Text>
      <View style={styles.sportyritcountddownChipWrap}>
        {sportyritcountddownGreetingStyleOrder.map(sportyritcountddownS => {
          const sportyritcountddownSel =
            sportyritcountddownStyle === sportyritcountddownS;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{selected: sportyritcountddownSel}}
              key={sportyritcountddownS}
              onPress={() => setSportyritcountddownStyle(sportyritcountddownS)}
              style={[
                styles.sportyritcountddownChip,
                sportyritcountddownSel
                  ? styles.sportyritcountddownChipOn
                  : styles.sportyritcountddownChipOff,
              ]}>
              <Text
                style={[
                  styles.sportyritcountddownChipTxt,
                  sportyritcountddownSel && styles.sportyritcountddownChipTxtOn,
                ]}
                numberOfLines={1}>
                {sportyritcountddownS}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={
          !sportyritcountddownCanGenerate || sportyritcountddownGenerating
        }
        onPress={sportyritcountddownOnGenerate}
        style={[
          styles.sportyritcountddownGenOuter,
          (!sportyritcountddownCanGenerate || sportyritcountddownGenerating) &&
            styles.sportyritcountddownGenOuterDisabled,
        ]}>
        {sportyritcountddownCanGenerate && !sportyritcountddownGenerating ? (
          <LinearGradient
            colors={['#7B2FBE', '#F5B800']}
            end={{x: 1, y: 0.5}}
            start={{x: 0, y: 0.5}}
            style={styles.sportyritcountddownGenGrad}>
            <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
            <Text style={styles.sportyritcountddownGenTxt}>
              Generate Greeting
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.sportyritcountddownGenDisabledInner}>
            <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
            <Text style={styles.sportyritcountddownGenTxtOff}>
              Generate Greeting
            </Text>
          </View>
        )}
      </Pressable>

      {sportyritcountddownGenerating ? (
        <View style={styles.sportyritcountddownLoadingRow}>
          <Text style={styles.sportyritcountddownLoadingIcon}>⚡</Text>
          <Text style={styles.sportyritcountddownLoadingTxt}>
            Crafting your perfect greeting...
          </Text>
        </View>
      ) : null}

      {sportyritcountddownGenerated ? (
        <View style={styles.sportyritcountddownResultCard}>
          <View style={styles.sportyritcountddownResultHead}>
            <Text style={styles.sportyritcountddownResultTitle}>
              ✨ YOUR GREETING
            </Text>
            <View style={styles.sportyritcountddownResultBadge}>
              <Text style={styles.sportyritcountddownResultBadgeTxt}>
                {sportyritcountddownStyle}
              </Text>
            </View>
          </View>
          <View style={styles.sportyritcountddownResultBody}>
            <Text style={styles.sportyritcountddownResultBodyTxt}>
              {sportyritcountddownGenerated}
            </Text>
          </View>
          <View style={styles.sportyritcountddownResultActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                sportyritcountddownOnShareBody(sportyritcountddownGenerated)
              }
              style={styles.sportyritcountddownResultHalf}>
              <Image source={require('../../assets/i/sportyritcocshr.png')} />
              <Text style={styles.sportyritcountddownResultShareLbl}>
                Share
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={sportyritcountddownJustSaved}
              onPress={sportyritcountddownOnSaveCurrent}
              style={[
                styles.sportyritcountddownResultHalf,
                sportyritcountddownJustSaved &&
                  styles.sportyritcountddownResultHalfSaved,
              ]}>
              <Image
                source={
                  sportyritcountddownJustSaved
                    ? require('../../assets/i/sportyritcosaved.png')
                    : require('../../assets/i/sportyritcosave.png')
                }
              />
              <Text
                style={[
                  styles.sportyritcountddownSaveLbl,
                  sportyritcountddownJustSaved &&
                    styles.sportyritcountddownSaveLblOn,
                ]}>
                {sportyritcountddownJustSaved ? 'Saved!' : 'Save'}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </>
  );

  const sportyritcountddownRenderSaved = () => {
    if (sportyritcountddownSaved.length === 0) {
      return (
        <View style={styles.sportyritcountddownEmpty}>
          <Text style={styles.sportyritcountddownEmptyIcon}>📭</Text>
          <Text style={styles.sportyritcountddownEmptyTitle}>
            No saved greetings
          </Text>
          <Text style={styles.sportyritcountddownEmptySub}>
            Generate and save greetings to access them here
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setSportyritcountddownTab('generate')}
            style={styles.sportyritcountddownEmptyCta}>
            <LinearGradient
              colors={['#7B2FBE', '#F5B800']}
              end={{x: 1, y: 0.5}}
              start={{x: 0, y: 0.5}}
              style={styles.sportyritcountddownEmptyCtaGrad}>
              <Text style={styles.sportyritcountddownEmptyCtaTxt}>
                Generate First Greeting
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.sportyritcountddownSavedList}>
        {sportyritcountddownSaved.map(sportyritcountddownItem => (
          <View
            key={sportyritcountddownItem.id}
            style={styles.sportyritcountddownSavedCard}>
            <View style={styles.sportyritcountddownSavedCardTop}>
              <View style={styles.sportyritcountddownSavedCardMeta}>
                <Text style={styles.sportyritcountddownSavedTo}>
                  To: {sportyritcountddownItem.recipient}
                </Text>
                <Text style={styles.sportyritcountddownSavedSub}>
                  {sportyritcountddownItem.event} ·{' '}
                  {sportyritcountddownItem.style}
                </Text>
              </View>
              <View style={styles.sportyritcountddownSavedIcons}>
                <Pressable
                  accessibilityLabel="Share"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() =>
                    sportyritcountddownOnShareBody(sportyritcountddownItem.body)
                  }
                  style={styles.sportyritcountddownIconBtn}>
                  <Image
                    source={require('../../assets/i/sportyritcocshr.png')}
                  />
                </Pressable>
                <Pressable
                  accessibilityLabel="Delete"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() =>
                    sportyritcountddownConfirmDelete(
                      sportyritcountddownItem.id,
                      sportyritcountddownItem.recipient,
                    )
                  }
                  style={styles.sportyritcountddownIconBtn}>
                  <Image
                    source={require('../../assets/i/sportyritcocbdel.png')}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.sportyritcountddownSavedBody}>
              <Text style={styles.sportyritcountddownSavedBodyTxt}>
                {sportyritcountddownItem.body}
              </Text>
            </View>
            <Text style={styles.sportyritcountddownSavedFooter}>
              {sportyritcountddownSavedDateLabel(
                sportyritcountddownItem.savedAtMs,
              )}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.sportyritcountddownRoot}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sportyritcountddownFlex}>
        <ScrollView
          contentContainerStyle={[
            styles.sportyritcountddownScroll,
            {paddingBottom: sportyritcountddownTabPadBottom},
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.sportyritcountddownHeaderBlock,
              {paddingTop: sportyritcountddownInsets.top + 8},
            ]}>
            <Text style={styles.sportyritcountddownEyebrow}>PERSONALIZED</Text>
            <Text style={styles.sportyritcountddownScreenTitle}>
              Sport Greetings ✨
            </Text>
            {sportyritcountddownRenderTabs()}
          </View>

          <View style={styles.sportyritcountddownBody}>
            {sportyritcountddownTab === 'generate'
              ? sportyritcountddownRenderGenerate()
              : sportyritcountddownRenderSaved()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Sportyritcountddowngreetn;

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownFlex: {
    flex: 1,
  },
  sportyritcountddownScroll: {
    flexGrow: 1,
  },
  sportyritcountddownHeaderBlock: {
    backgroundColor: '#120826',
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  sportyritcountddownEyebrow: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  sportyritcountddownScreenTitle: {
    color: '#f0e8ff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.07,
    marginBottom: 10,
  },
  sportyritcountddownTabRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sportyritcountddownTabBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderWidth: 1,
  },
  sportyritcountddownTabBtnOn: {
    backgroundColor: '#7b2fbe',
    borderColor: '#7b2fbe',
  },
  sportyritcountddownTabBtnOff: {
    backgroundColor: '#1a0d3a',
    borderColor: '#3d2380',
  },
  sportyritcountddownTabTxt: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.06,
    color: '#8B7BAA',
    textAlign: 'center',
  },
  sportyritcountddownTabTxtOn: {
    color: '#FFFFFF',
  },
  sportyritcountddownBody: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  sportyritcountddownLbl: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sportyritcountddownInput: {
    backgroundColor: '#231550',
    borderWidth: 1,
    borderColor: '#3d2380',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#f0e8ff',
    fontSize: 15,
    marginBottom: 18,
  },
  sportyritcountddownChipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  sportyritcountddownChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: '100%',
  },
  sportyritcountddownChipOn: {
    backgroundColor: '#7b2fbe',
    borderColor: '#7b2fbe',
  },
  sportyritcountddownChipOff: {
    backgroundColor: '#1a0d3a',
    borderColor: '#3d2380',
  },
  sportyritcountddownChipTxt: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '700',
  },
  sportyritcountddownChipTxtOn: {
    color: '#f0e8ff',
  },
  sportyritcountddownGenOuter: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sportyritcountddownGenOuterDisabled: {
    opacity: 1,
  },
  sportyritcountddownGenGrad: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  sportyritcountddownGenDisabledInner: {
    backgroundColor: '#2d1b69',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  sportyritcountddownGenTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sportyritcountddownGenTxtOff: {
    color: '#5a4a7a',
    fontSize: 16,
    fontWeight: '700',
  },
  sportyritcountddownLoadingRow: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
    marginTop: 30,
  },
  sportyritcountddownLoadingIcon: {
    fontSize: 48,
  },
  sportyritcountddownLoadingTxt: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: '600',
  },
  sportyritcountddownResultCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7b2fbe',
    backgroundColor: '#1a0d3a',
    padding: 20,
    marginBottom: 16,
  },
  sportyritcountddownResultHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  sportyritcountddownResultTitle: {
    color: '#f5b800',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    flex: 1,
  },
  sportyritcountddownResultBadge: {
    backgroundColor: '#231550',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3d2380',
  },
  sportyritcountddownResultBadgeTxt: {
    color: '#c4b5fd',
    fontSize: 11,
    fontWeight: '700',
  },
  sportyritcountddownResultBody: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  sportyritcountddownResultBodyTxt: {
    color: '#f0e8ff',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  sportyritcountddownResultActions: {
    flexDirection: 'row',
    gap: 10,
  },
  sportyritcountddownResultHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2380',
    backgroundColor: '#231550',
  },
  sportyritcountddownResultHalfSaved: {
    borderColor: '#15803d',
    backgroundColor: '#14532d',
  },
  sportyritcountddownResultShareLbl: {
    color: '#f0e8ff',
    fontSize: 14,
    fontWeight: '700',
  },
  sportyritcountddownSaveLbl: {
    color: '#f5b800',
    fontSize: 14,
    fontWeight: '700',
  },
  sportyritcountddownSaveLblOn: {
    color: '#86efac',
  },
  sportyritcountddownEmpty: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 62,
    paddingBottom: 24,
  },
  sportyritcountddownEmptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  sportyritcountddownEmptyTitle: {
    color: '#f0e8ff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  sportyritcountddownEmptySub: {
    marginTop: 8,
    color: '#8b7baa',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 280,
  },
  sportyritcountddownEmptyCta: {
    marginTop: 24,
    borderRadius: 14,
    overflow: 'hidden',
    width: '77%',
  },
  sportyritcountddownEmptyCtaGrad: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownEmptyCtaTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  sportyritcountddownSavedList: {
    gap: 14,
    paddingBottom: 8,
  },
  sportyritcountddownSavedCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3d2380',
    backgroundColor: '#1A0D3A',
    padding: 14,
  },
  sportyritcountddownSavedCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  sportyritcountddownSavedCardMeta: {
    flex: 1,
  },
  sportyritcountddownSavedTo: {
    color: '#f0e8ff',
    fontSize: 15,
    fontWeight: '700',
  },
  sportyritcountddownSavedSub: {
    marginTop: 4,
    color: '#8B7BAA',
    fontSize: 12,
    fontWeight: '400',
  },
  sportyritcountddownSavedIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  sportyritcountddownIconBtn: {
    width: 36,
    height: 28,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3d2380',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#231550',
  },
  sportyritcountddownSavedBody: {
    backgroundColor: '#231550',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  sportyritcountddownSavedBodyTxt: {
    color: '#f0e8ff',
    fontSize: 14,
    lineHeight: 22,
  },
  sportyritcountddownSavedFooter: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '600',
  },
});
