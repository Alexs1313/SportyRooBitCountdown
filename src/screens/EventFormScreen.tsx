import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {Event} from '../data/eventTypes';
import {loadEvents, saveEvents} from '../data/eventStorage';
import {toastShowIfEnabled} from '../data/notificationPrefs';
import type {RootParamList} from '../routes/rootParamList';
import {gradients} from '../themes';
import {
  dateKeyFromDate,
  formatDdMmYyyy,
  parseDateKey,
  tryParseDdMmYyyy,
} from '../utils';

type formNav = NativeStackNavigationProp<RootParamList, 'EventForm'>;

type formRoute = RouteProp<RootParamList, 'EventForm'>;

const EventFormScreen = () => {
  const navigation = useNavigation<formNav>();
  const route = useRoute<formRoute>();
  const insets = useSafeAreaInsets();

  const editId = route.params?.eventId ?? undefined;
  const isEdit = Boolean(editId);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dateKey, setDateKey] = useState(() => dateKeyFromDate(new Date()));
  const [mode, setMode] = useState<'to' | 'from'>('to');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [showIosDate, setShowIosDate] = useState(false);

  const [androidDateStr, setAndroidDateStr] = useState(() =>
    formatDdMmYyyy(dateKeyFromDate(new Date())),
  );

  const [dirty, setDirty] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const leaveAfterSaveRef = useRef(false);

  const dateObj = useMemo(() => parseDateKey(dateKey), [dateKey]);

  const markDirty = useCallback(() => {
    setDirty(true);
  }, []);

  const commitAndroidDate = useCallback(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const parsed = tryParseDdMmYyyy(androidDateStr);
    if (parsed === null) {
      Alert.alert('Invalid date', 'Use DD.MM.YYYY (for example 12.05.2026).');
      setAndroidDateStr(formatDdMmYyyy(dateKey));
      return;
    }
    if (parsed !== dateKey) {
      setDateKey(parsed);
      markDirty();
    }
  }, [androidDateStr, dateKey, markDirty]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    setAndroidDateStr(formatDdMmYyyy(dateKey));
  }, [dateKey]);

  useFocusEffect(
    useCallback(() => {
      let ok = true;
      (async () => {
        if (!editId) {
          if (ok) {
            setLoaded(true);
          }
          return;
        }
        const all = await loadEvents();
        const found = all.find(e => e.id === editId);
        if (!ok) {
          return;
        }
        if (!found) {
          Alert.alert('Missing event', 'This event could not be found.');
          navigation.goBack();
          return;
        }
        setTitle(found.title);
        setDesc(found.description);
        setDateKey(found.dateKey);
        setMode(found.mode);
        setImageUri(found.imageUri);
        setDirty(false);
        setLoaded(true);
      })();
      return () => {
        ok = false;
      };
    }, [editId, navigation]),
  );

  useEffect(() => {
    if (!editId) {
      setLoaded(true);
    }
  }, [editId]);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', evt => {
      if (leaveAfterSaveRef.current) {
        leaveAfterSaveRef.current = false;
        return;
      }
      if (!dirty) {
        return;
      }
      evt.preventDefault();
      Alert.alert(
        'Unsaved Changes',
        "You have changes that haven't been saved yet. If you leave now, your edits will be lost.",
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Leave',
            style: 'destructive',
            onPress: () => {
              navigation.dispatch(evt.data.action);
            },
          },
        ],
      );
    });
    return unsub;
  }, [navigation, dirty]);

  const pickImage = useCallback(async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (res.didCancel || res.errorCode) {
      return;
    }
    const uri = res.assets?.[0]?.uri ?? null;
    if (uri) {
      setImageUri(uri);
      markDirty();
    }
  }, [markDirty]);

  const onSave = useCallback(async () => {
    const trim = title.trim();
    if (!trim) {
      return;
    }

    let resolvedDateKey = dateKey;
    if (Platform.OS === 'android') {
      const parsed = tryParseDdMmYyyy(androidDateStr);
      if (parsed === null) {
        Alert.alert('Invalid date', 'Use DD.MM.YYYY (for example 12.05.2026).');
        return;
      }
      resolvedDateKey = parsed;
      if (parsed !== dateKey) {
        setDateKey(parsed);
      }
    }

    const all = await loadEvents();
    let next: Event[];
    if (isEdit && editId) {
      next = all.map(e =>
        e.id === editId
          ? {
              ...e,
              title: trim,
              description: desc.trim(),
              dateKey: resolvedDateKey,
              mode: mode,
              imageUri: imageUri,
            }
          : e,
      );
    } else {
      const created: Event = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: trim,
        description: desc.trim(),
        dateKey: resolvedDateKey,
        mode: mode,
        imageUri: imageUri,
      };
      next = [...all, created];
    }
    await saveEvents(next);
    leaveAfterSaveRef.current = true;
    setDirty(false);
    await toastShowIfEnabled({
      type: 'success',
      text1: isEdit ? 'Event updated' : 'Event added',
      text2: trim,
    });
    navigation.goBack();
  }, [
    title,
    desc,
    dateKey,
    androidDateStr,
    mode,
    imageUri,
    isEdit,
    editId,
    navigation,
  ]);

  const canSave = title.trim().length > 0 && loaded;

  const close = () => {
    navigation.goBack();
  };

  const primaryLabel = isEdit ? 'Save Changes' : 'Add Event ✓';

  return (
    <View style={[styles.root, {paddingBottom: insets.bottom}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={[styles.header, {paddingTop: insets.top + 8}]}>
          <Text style={styles.headerTitle}>
            {isEdit ? 'Edit Event' : 'New Event'}
          </Text>
          <Pressable
            accessibilityLabel="Close"
            accessibilityRole="button"
            hitSlop={10}
            onPress={close}
            style={styles.closeBtn}>
            <Image source={require('../../assets/i/sportyritcocls.png')} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Pressable
            accessibilityRole="button"
            onPress={pickImage}
            style={styles.photoBox}>
            {imageUri ? (
              <Image
                resizeMode="cover"
                source={{uri: imageUri}}
                style={styles.photoPreview}
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/i/sportyritcounimg.png')}
                />
                <Text style={styles.photoHint}>Tap to add photo</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.lbl}>EVENT NAME *</Text>
          <TextInput
            autoCorrect
            onChangeText={t => {
              setTitle(t);
              markDirty();
            }}
            placeholder="e.g. Champions League Final"
            placeholderTextColor="rgba(240,232,255,0.5)"
            style={styles.input}
            value={title}
          />

          <Text style={styles.lbl}>DESCRIPTION</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={t => {
              setDesc(t);
              markDirty();
            }}
            placeholder="Add a short note about this event..."
            placeholderTextColor="rgba(240,232,255,0.5)"
            style={[styles.input, styles.area]}
            textAlignVertical="top"
            value={desc}
          />

          <Text style={styles.lbl}>DATE</Text>
          {Platform.OS === 'android' ? (
            <>
              <TextInput
                accessibilityLabel="Event date"
                keyboardType="numbers-and-punctuation"
                onBlur={commitAndroidDate}
                onChangeText={setAndroidDateStr}
                placeholder="DD.MM.YYYY"
                placeholderTextColor="rgba(240,232,255,0.5)"
                style={styles.input}
                value={androidDateStr}
              />
              <Text style={styles.dateHint}>Enter date as DD.MM.YYYY</Text>
            </>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowIosDate(true)}
              style={styles.dateRow}>
              <Text style={styles.dateTxt}>{formatDdMmYyyy(dateKey)}</Text>
              <Image
                source={require('../../assets/i/sportyritcocallndar.png')}
              />
            </Pressable>
          )}

          {Platform.OS === 'ios' ? (
            <Modal animationType="fade" transparent visible={showIosDate}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowIosDate(false)}
                style={styles.modalBackdrop}>
                <Pressable
                  onPress={e => e.stopPropagation()}
                  style={styles.modalSheet}>
                  <View style={styles.modalPickerWrap}>
                    <DateTimePicker
                      display="inline"
                      mode="date"
                      themeVariant="dark"
                      value={dateObj}
                      onValueChange={(_, d) => {
                        setDateKey(dateKeyFromDate(d));
                        markDirty();
                      }}
                    />
                  </View>
                  <Pressable
                    onPress={() => setShowIosDate(false)}
                    style={styles.modalDone}>
                    <Text style={styles.modalDoneTxt}>Done</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
          ) : null}

          <Text style={styles.lblBelowDate}>COUNTDOWN TYPE</Text>
          <View style={styles.typeRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{selected: mode === 'to'}}
              onPress={() => {
                setMode('to');
                markDirty();
              }}
              style={[
                styles.typeCard,
                mode === 'to' ? styles.typeCardOn : styles.typeCardOff,
              ]}>
              <Text style={styles.typeTitle}>⏳ Count To</Text>
              <Text style={styles.typeSub}>Days until event</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{
                selected: mode === 'from',
              }}
              onPress={() => {
                setMode('from');
                markDirty();
              }}
              style={[
                styles.typeCard,
                mode === 'from' ? styles.typeCardOn : styles.typeCardOff,
              ]}>
              <Text style={styles.typeTitle}>⏱ Count From</Text>
              <Text style={styles.typeSub}>Days since event</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!canSave}
            onPress={onSave}
            style={[
              styles.submitOuter,
              !canSave && styles.submitOuterDisabled,
            ]}>
            {canSave ? (
              <LinearGradient
                colors={[...gradients.cta]}
                end={{x: 1, y: 0.5}}
                start={{x: 0, y: 0.5}}
                style={styles.submitGrad}>
                <Text style={styles.submitTxtOn}>{primaryLabel}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.submitDisabledInner}>
                <Text style={styles.submitTxtOff}>{primaryLabel}</Text>
              </View>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EventFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: '#0d0620',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 20,

    paddingBottom: 16,

    backgroundColor: '#1a0d3a',

    borderBottomWidth: 1,

    borderBottomColor: '#3d2380',
  },
  headerTitle: {
    color: '#f0e8ff',

    fontSize: 20,

    fontWeight: '800',

    letterSpacing: -0.45,
  },
  closeBtn: {
    width: 36,

    height: 36,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: '#3d2380',

    backgroundColor: '#231550',

    alignItems: 'center',

    justifyContent: 'center',
  },
  closeTxt: {
    color: '#f0e8ff',

    fontSize: 16,

    fontWeight: '600',
  },
  scroll: {
    paddingHorizontal: 18,

    paddingTop: 24,

    paddingBottom: 92,
  },
  photoBox: {
    borderWidth: 2,

    borderColor: '#3d2380',

    borderStyle: 'dashed',

    borderRadius: 16,

    minHeight: 127,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 20,

    backgroundColor: '#231550',
  },
  photoIcon: {
    fontSize: 32,

    marginBottom: 8,
  },
  photoHint: {
    color: '#8b7baa',

    fontSize: 14,

    fontWeight: '500',

    marginTop: 10,
  },
  photoPreview: {
    width: '100%',

    height: 140,

    borderRadius: 12,
  },
  lbl: {
    color: '#8b7baa',

    fontSize: 12,

    fontWeight: '600',

    letterSpacing: 1,

    marginBottom: 8,

    textTransform: 'uppercase',
  },
  lblBelowDate: {
    color: '#8b7baa',

    fontSize: 12,

    fontWeight: '600',

    letterSpacing: 1,

    marginBottom: 8,

    marginTop: 8,

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
  dateHint: {
    marginTop: -12,

    marginBottom: 18,

    color: '#8b7baa',

    fontSize: 11,

    fontWeight: '500',
  },
  area: {
    minHeight: 96,
  },
  dateRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    backgroundColor: '#231550',

    borderWidth: 1,

    borderColor: '#3d2380',

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingVertical: 14,

    marginBottom: 18,
  },
  dateTxt: {
    color: '#f0e8ff',

    fontSize: 15,
  },
  calIcon: {
    fontSize: 18,
  },
  typeRow: {
    flexDirection: 'row',

    gap: 8,

    marginBottom: 24,
  },
  typeCard: {
    flex: 1,

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingTop: 14,

    paddingBottom: 12,

    minHeight: 66,
  },
  typeCardOn: {
    backgroundColor: '#2d1b69',

    borderWidth: 2,

    borderColor: '#7b2fbe',
  },
  typeCardOff: {
    backgroundColor: '#231550',

    borderWidth: 2,

    borderColor: '#3d2380',
  },
  typeTitle: {
    color: '#f0e8ff',

    fontSize: 13,

    fontWeight: '700',

    marginBottom: 2,
  },
  typeSub: {
    color: '#8b7baa',

    fontSize: 11,

    fontWeight: '500',

    letterSpacing: 0.06,
  },
  submitOuter: {
    borderRadius: 16,

    overflow: 'hidden',

    marginTop: 8,
  },
  submitOuterDisabled: {
    opacity: 1,
  },
  submitGrad: {
    width: '100%',

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',
  },
  submitDisabledInner: {
    backgroundColor: '#2d1b69',

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',
  },
  submitTxtOn: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },
  submitTxtOff: {
    color: '#5a4a7a',

    fontSize: 16,

    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.6)',

    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#1a0d3a',

    paddingBottom: 24,

    borderTopLeftRadius: 16,

    borderTopRightRadius: 16,
  },
  modalPickerWrap: {
    width: '100%',

    alignItems: 'center',
  },
  modalDone: {
    alignItems: 'center',

    paddingVertical: 12,
  },
  modalDoneTxt: {
    color: '#a855f7',

    fontSize: 17,

    fontWeight: '700',
  },
});
