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

import type {GreetingStyle, SavedGreeting} from '../data/greetingTypes';
import {pickRandomGreeting} from '../data/greetingTemplates';
import {loadSavedGreetings, saveSavedGreetings} from '../data/greetingStorage';
import {toastShowIfEnabled} from '../data/notificationPrefs';
import Layout from '../components/Layout';
import {screenStyles} from '../themes';
import {formatSavedDateLabel, headerPaddingTop, tabBarPadding} from '../utils';

const greetingStyleOrder: GreetingStyle[] = [
  'Motivational',
  'Friendly',
  'Humorous',
  'Formal',
  'Epic',
];

type greetTab = 'generate' | 'saved';

const GreetingsScreen = () => {
  const insets = useSafeAreaInsets();
  const tabPadBottom = tabBarPadding(insets.bottom);

  const [tab, setTab] = useState<greetTab>('generate');
  const [recipient, setRecipient] = useState('');
  const [event, setEvent] = useState('');
  const [style, setStyle] = useState<GreetingStyle>('Motivational');
  const [generated, setGenerated] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [saved, setSaved] = useState<SavedGreeting[]>([]);

  const reloadSaved = useCallback(async () => {
    const rows = await loadSavedGreetings();
    rows.sort((a, b) => b.savedAtMs - a.savedAtMs);
    setSaved(rows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadSaved();
    }, [reloadSaved]),
  );

  const canGenerate = recipient.trim().length > 0 && event.trim().length > 0;

  const onGenerate = useCallback(() => {
    if (!canGenerate) {
      return;
    }
    setGenerating(true);
    setJustSaved(false);
    setGenerated(null);
    const r = recipient.trim();
    const e = event.trim();
    const st = style;
    setTimeout(() => {
      const body = pickRandomGreeting(st, r, e);
      setGenerated(body);
      setGenerating(false);
    }, 780);
  }, [canGenerate, recipient, event, style]);

  const onShareBody = useCallback(async (body: string) => {
    try {
      await Share.share({
        message: body,
        title: 'Sport Greeting',
      });
    } catch {
      /* ignore */
    }
  }, []);

  const onSaveCurrent = useCallback(async () => {
    if (!generated) {
      return;
    }
    const created: SavedGreeting = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      recipient: recipient.trim(),
      event: event.trim(),
      style: style,
      body: generated,
      savedAtMs: Date.now(),
    };
    const prev = await loadSavedGreetings();
    const next = [created, ...prev];
    next.sort((a, b) => b.savedAtMs - a.savedAtMs);
    await saveSavedGreetings(next);
    setSaved(next);
    setJustSaved(true);
    await toastShowIfEnabled({
      type: 'success',
      text1: 'Sport Greetings ✨',
      text2: 'Saved successfully',
    });
  }, [generated, recipient, event, style]);

  const confirmDelete = useCallback((id: string, recipientName: string) => {
    Alert.alert(
      'Delete greeting?',
      `Remove the greeting for ${recipientName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const prev = await loadSavedGreetings();
            const next = prev.filter(g => g.id !== id);
            await saveSavedGreetings(next);
            setSaved(next);
            await toastShowIfEnabled({
              type: 'success',
              text1: 'Greeting removed',
              text2: recipientName,
            });
          },
        },
      ],
    );
  }, []);

  const renderTabs = () => (
    <View style={styles.tabRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          selected: tab === 'generate',
        }}
        onPress={() => setTab('generate')}
        style={[
          styles.tabBtn,
          tab === 'generate' ? styles.tabBtnOn : styles.tabBtnOff,
        ]}>
        <Text
          style={[styles.tabTxt, tab === 'generate' && styles.tabTxtOn]}
          numberOfLines={1}>
          ✍️ Generate
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          selected: tab === 'saved',
        }}
        onPress={() => setTab('saved')}
        style={[
          styles.tabBtn,
          tab === 'saved' ? styles.tabBtnOn : styles.tabBtnOff,
        ]}>
        <Text
          style={[styles.tabTxt, tab === 'saved' && styles.tabTxtOn]}
          numberOfLines={1}>
          📚 Saved ({saved.length})
        </Text>
      </Pressable>
    </View>
  );

  const renderGenerate = () => (
    <>
      <Text style={styles.lbl}>RECIPIENT NAME</Text>
      <TextInput
        autoCorrect
        onChangeText={setRecipient}
        placeholder="Enter name..."
        placeholderTextColor="rgba(240,232,255,0.5)"
        style={styles.input}
        value={recipient}
      />

      <Text style={styles.lbl}>EVENT</Text>
      <TextInput
        autoCorrect
        onChangeText={setEvent}
        placeholder="e.g. Olympic Games 2028"
        placeholderTextColor="rgba(240,232,255,0.5)"
        style={styles.input}
        value={event}
      />

      <Text style={styles.lbl}>GREETING STYLE</Text>
      <View style={styles.chipWrap}>
        {greetingStyleOrder.map(s => {
          const sel = style === s;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{selected: sel}}
              key={s}
              onPress={() => setStyle(s)}
              style={[styles.chip, sel ? styles.chipOn : styles.chipOff]}>
              <Text
                style={[styles.chipTxt, sel && styles.chipTxtOn]}
                numberOfLines={1}>
                {s}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!canGenerate || generating}
        onPress={onGenerate}
        style={[
          styles.genOuter,
          (!canGenerate || generating) && styles.genOuterDisabled,
        ]}>
        {canGenerate && !generating ? (
          <LinearGradient
            colors={['#7B2FBE', '#F5B800']}
            end={{x: 1, y: 0.5}}
            start={{x: 0, y: 0.5}}
            style={styles.genGrad}>
            <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
            <Text style={styles.genTxt}>Generate Greeting</Text>
          </LinearGradient>
        ) : (
          <View style={styles.genDisabledInner}>
            <Image source={require('../../assets/i/sportyritcocbstrs.png')} />
            <Text style={styles.genTxtOff}>Generate Greeting</Text>
          </View>
        )}
      </Pressable>

      {generating ? (
        <View style={styles.loadingRow}>
          <Text style={styles.loadingIcon}>⚡</Text>
          <Text style={styles.loadingTxt}>
            Crafting your perfect greeting...
          </Text>
        </View>
      ) : null}

      {generated ? (
        <View style={styles.resultCard}>
          <View style={styles.resultHead}>
            <Text style={styles.resultTitle}>✨ YOUR GREETING</Text>
            <View style={styles.resultBadge}>
              <Text style={styles.resultBadgeTxt}>{style}</Text>
            </View>
          </View>
          <View style={styles.resultBody}>
            <Text style={styles.resultBodyTxt}>{generated}</Text>
          </View>
          <View style={styles.resultActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => onShareBody(generated)}
              style={styles.resultHalf}>
              <Image source={require('../../assets/i/sportyritcocshr.png')} />
              <Text style={styles.resultShareLbl}>Share</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={justSaved}
              onPress={onSaveCurrent}
              style={[styles.resultHalf, justSaved && styles.resultHalfSaved]}>
              <Image
                source={
                  justSaved
                    ? require('../../assets/i/sportyritcosaved.png')
                    : require('../../assets/i/sportyritcosave.png')
                }
              />
              <Text style={[styles.saveLbl, justSaved && styles.saveLblOn]}>
                {justSaved ? 'Saved!' : 'Save'}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </>
  );

  const renderSaved = () => {
    if (saved.length === 0) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No saved greetings</Text>
          <Text style={styles.emptySub}>
            Generate and save greetings to access them here
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setTab('generate')}
            style={styles.emptyCta}>
            <LinearGradient
              colors={['#7B2FBE', '#F5B800']}
              end={{x: 1, y: 0.5}}
              start={{x: 0, y: 0.5}}
              style={styles.emptyCtaGrad}>
              <Text style={styles.emptyCtaTxt}>Generate First Greeting</Text>
            </LinearGradient>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.savedList}>
        {saved.map(item => (
          <View key={item.id} style={styles.savedCard}>
            <View style={styles.savedCardTop}>
              <View style={styles.savedCardMeta}>
                <Text style={styles.savedTo}>To: {item.recipient}</Text>
                <Text style={styles.savedSub}>
                  {item.event} · {item.style}
                </Text>
              </View>
              <View style={styles.savedIcons}>
                <Pressable
                  accessibilityLabel="Share"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => onShareBody(item.body)}
                  style={styles.iconBtn}>
                  <Image
                    source={require('../../assets/i/sportyritcocshr.png')}
                  />
                </Pressable>
                <Pressable
                  accessibilityLabel="Delete"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => confirmDelete(item.id, item.recipient)}
                  style={styles.iconBtn}>
                  <Image
                    source={require('../../assets/i/sportyritcocbdel.png')}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.savedBody}>
              <Text style={styles.savedBodyTxt}>{item.body}</Text>
            </View>
            <Text style={styles.savedFooter}>
              {formatSavedDateLabel(item.savedAtMs)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={[styles.scroll, {paddingBottom: tabPadBottom}]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              screenStyles.headerBlock,
              {paddingTop: headerPaddingTop(insets.top)},
            ]}>
            <Text style={screenStyles.eyebrow}>PERSONALIZED</Text>
            <Text style={screenStyles.screenTitle}>Sport Greetings ✨</Text>
            {renderTabs()}
          </View>

          <View style={styles.body}>
            {tab === 'generate' ? renderGenerate() : renderSaved()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default GreetingsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  tabRow: {
    flexDirection: 'row',

    gap: 6,
  },
  tabBtn: {
    flex: 1,

    borderRadius: 10,

    paddingVertical: 10,

    paddingHorizontal: 8,

    alignItems: 'center',

    justifyContent: 'center',

    minHeight: 40,

    borderWidth: 1,
  },
  tabBtnOn: {
    backgroundColor: '#7b2fbe',

    borderColor: '#7b2fbe',
  },
  tabBtnOff: {
    backgroundColor: '#1a0d3a',

    borderColor: '#3d2380',
  },
  tabTxt: {
    fontSize: 13,

    fontWeight: '700',

    letterSpacing: 0.06,

    color: '#8B7BAA',

    textAlign: 'center',
  },
  tabTxtOn: {
    color: '#FFFFFF',
  },
  body: {
    paddingHorizontal: 18,

    paddingTop: 20,
  },
  lbl: {
    color: '#8b7baa',

    fontSize: 12,

    fontWeight: '600',

    letterSpacing: 1,

    marginBottom: 8,

    textTransform: 'uppercase',
  },
  input: {
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
  chipWrap: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 8,

    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 20,

    borderWidth: 1,

    maxWidth: '100%',
  },
  chipOn: {
    backgroundColor: '#7b2fbe',

    borderColor: '#7b2fbe',
  },
  chipOff: {
    backgroundColor: '#1a0d3a',

    borderColor: '#3d2380',
  },
  chipTxt: {
    color: '#8b7baa',

    fontSize: 12,

    fontWeight: '700',
  },
  chipTxtOn: {
    color: '#f0e8ff',
  },
  genOuter: {
    borderRadius: 16,

    overflow: 'hidden',

    marginBottom: 16,
  },
  genOuterDisabled: {
    opacity: 1,
  },
  genGrad: {
    height: 50,

    flexDirection: 'row',

    justifyContent: 'center',

    gap: 8,

    alignItems: 'center',
  },
  genDisabledInner: {
    backgroundColor: '#2d1b69',

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',

    flexDirection: 'row',

    gap: 8,
  },
  genTxt: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',

    letterSpacing: -0.2,
  },
  genTxtOff: {
    color: '#5a4a7a',

    fontSize: 16,

    fontWeight: '700',
  },
  loadingRow: {
    alignItems: 'center',

    justifyContent: 'center',

    gap: 8,

    marginBottom: 16,

    marginTop: 30,
  },
  loadingIcon: {
    fontSize: 48,
  },
  loadingTxt: {
    color: '#a855f7',

    fontSize: 14,

    fontWeight: '600',
  },
  resultCard: {
    borderRadius: 16,

    borderWidth: 1,

    borderColor: '#7b2fbe',

    backgroundColor: '#1a0d3a',

    padding: 20,

    marginBottom: 16,
  },
  resultHead: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 12,

    gap: 8,
  },
  resultTitle: {
    color: '#f5b800',

    fontSize: 13,

    fontWeight: '800',

    letterSpacing: 0.5,

    flex: 1,
  },
  resultBadge: {
    backgroundColor: '#231550',

    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 8,

    borderWidth: 1,

    borderColor: '#3d2380',
  },
  resultBadgeTxt: {
    color: '#c4b5fd',

    fontSize: 11,

    fontWeight: '700',
  },
  resultBody: {
    borderRadius: 12,

    padding: 12,

    marginBottom: 14,
  },
  resultBodyTxt: {
    color: '#f0e8ff',

    fontSize: 14,

    lineHeight: 22,

    fontWeight: '500',
  },
  resultActions: {
    flexDirection: 'row',

    gap: 10,
  },
  resultHalf: {
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
  resultHalfSaved: {
    borderColor: '#15803d',

    backgroundColor: '#14532d',
  },
  resultShareLbl: {
    color: '#f0e8ff',

    fontSize: 14,

    fontWeight: '700',
  },
  saveLbl: {
    color: '#f5b800',

    fontSize: 14,

    fontWeight: '700',
  },
  saveLblOn: {
    color: '#86efac',
  },
  empty: {
    alignItems: 'center',

    paddingHorizontal: 16,

    paddingTop: 62,

    paddingBottom: 24,
  },
  emptyIcon: {
    fontSize: 56,

    marginBottom: 16,
  },
  emptyTitle: {
    color: '#f0e8ff',

    fontSize: 18,

    fontWeight: '700',

    textAlign: 'center',
  },
  emptySub: {
    marginTop: 8,

    color: '#8b7baa',

    fontSize: 14,

    lineHeight: 21,

    textAlign: 'center',

    maxWidth: 280,
  },
  emptyCta: {
    marginTop: 24,

    borderRadius: 14,

    overflow: 'hidden',

    width: '77%',
  },
  emptyCtaGrad: {
    height: 50,

    alignItems: 'center',

    justifyContent: 'center',
  },
  emptyCtaTxt: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '700',
  },
  savedList: {
    gap: 14,

    paddingBottom: 8,
  },
  savedCard: {
    borderRadius: 16,

    borderWidth: 1,

    borderColor: '#3d2380',

    backgroundColor: '#1A0D3A',

    padding: 14,
  },
  savedCardTop: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'flex-start',

    marginBottom: 10,

    gap: 8,
  },
  savedCardMeta: {
    flex: 1,
  },
  savedTo: {
    color: '#f0e8ff',

    fontSize: 15,

    fontWeight: '700',
  },
  savedSub: {
    marginTop: 4,

    color: '#8B7BAA',

    fontSize: 12,

    fontWeight: '400',
  },
  savedIcons: {
    flexDirection: 'row',

    gap: 6,

    alignItems: 'center',
  },
  iconBtn: {
    width: 36,

    height: 28,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: '#3d2380',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#231550',
  },
  savedBody: {
    backgroundColor: '#231550',

    borderRadius: 12,

    padding: 12,

    marginBottom: 10,
  },
  savedBodyTxt: {
    color: '#f0e8ff',

    fontSize: 14,

    lineHeight: 22,
  },
  savedFooter: {
    color: '#8b7baa',

    fontSize: 11,

    fontWeight: '600',
  },
});
