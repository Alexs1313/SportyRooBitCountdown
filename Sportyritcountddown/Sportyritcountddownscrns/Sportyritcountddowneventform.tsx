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

import type {SportyritcountddownEvent} from '../Sportyritcountddowndata/sportyritcountddowneventtypes';
import {
  sportyritcountddownDateKeyFromDate,
  sportyritcountddownParseDateKey,
} from '../Sportyritcountddowndata/sportyritcountddowncountdown';
import {
  sportyritcountddownLoadEvents,
  sportyritcountddownSaveEvents,
} from '../Sportyritcountddowndata/sportyritcountddowneventstorage';
import {sportyritcountddownToastShowIfEnabled} from '../Sportyritcountddowndata/sportyritcountddownnotificationprefs';
import type {SportyritcountddownRootParamList} from '../Sportyritcountddownroutes/sportyritcountddownrootparamlist';

function sportyritcountddownFormatDdMmYyyy(dateKey: string): string {
  const d = sportyritcountddownParseDateKey(dateKey);
  const dd = `${d.getDate()}`.padStart(2, '0');
  const mm = `${d.getMonth() + 1}`.padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function sportyritcountddownTryParseDdMmYyyy(raw: string): string | null {
  const trimmed = raw.trim();
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(trimmed);
  if (!match) {
    return null;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const dt = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day
  ) {
    return null;
  }
  return sportyritcountddownDateKeyFromDate(dt);
}

type SportyritcountddownFormNav = NativeStackNavigationProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddowneventform'
>;

type SportyritcountddownFormRoute = RouteProp<
  SportyritcountddownRootParamList,
  'Sportyritcountddowneventform'
>;

const Sportyritcountddowneventform = () => {
  const sportyritcountddownNavigation =
    useNavigation<SportyritcountddownFormNav>();
  const sportyritcountddownRoute = useRoute<SportyritcountddownFormRoute>();
  const sportyritcountddownInsets = useSafeAreaInsets();

  const sportyritcountddownEditId =
    sportyritcountddownRoute.params?.eventId ?? undefined;
  const sportyritcountddownIsEdit = Boolean(sportyritcountddownEditId);

  const [sportyritcountddownTitle, setSportyritcountddownTitle] = useState('');
  const [sportyritcountddownDesc, setSportyritcountddownDesc] = useState('');
  const [sportyritcountddownDateKey, setSportyritcountddownDateKey] = useState(
    () => sportyritcountddownDateKeyFromDate(new Date()),
  );
  const [sportyritcountddownMode, setSportyritcountddownMode] = useState<
    'to' | 'from'
  >('to');
  const [sportyritcountddownImageUri, setSportyritcountddownImageUri] =
    useState<string | null>(null);

  const [sportyritcountddownShowIosDate, setSportyritcountddownShowIosDate] =
    useState(false);

  const [
    sportyritcountddownAndroidDateStr,
    setSportyritcountddownAndroidDateStr,
  ] = useState(() =>
    sportyritcountddownFormatDdMmYyyy(
      sportyritcountddownDateKeyFromDate(new Date()),
    ),
  );

  const [sportyritcountddownDirty, setSportyritcountddownDirty] =
    useState(false);
  const [sportyritcountddownLoaded, setSportyritcountddownLoaded] =
    useState(false);

  const sportyritcountddownLeaveAfterSaveRef = useRef(false);

  const sportyritcountddownDateObj = useMemo(
    () => sportyritcountddownParseDateKey(sportyritcountddownDateKey),
    [sportyritcountddownDateKey],
  );

  const sportyritcountddownMarkDirty = useCallback(() => {
    setSportyritcountddownDirty(true);
  }, []);

  const sportyritcountddownCommitAndroidDate = useCallback(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const sportyritcountddownParsed = sportyritcountddownTryParseDdMmYyyy(
      sportyritcountddownAndroidDateStr,
    );
    if (sportyritcountddownParsed === null) {
      Alert.alert('Invalid date', 'Use DD.MM.YYYY (for example 12.05.2026).');
      setSportyritcountddownAndroidDateStr(
        sportyritcountddownFormatDdMmYyyy(sportyritcountddownDateKey),
      );
      return;
    }
    if (sportyritcountddownParsed !== sportyritcountddownDateKey) {
      setSportyritcountddownDateKey(sportyritcountddownParsed);
      sportyritcountddownMarkDirty();
    }
  }, [
    sportyritcountddownAndroidDateStr,
    sportyritcountddownDateKey,
    sportyritcountddownMarkDirty,
  ]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    setSportyritcountddownAndroidDateStr(
      sportyritcountddownFormatDdMmYyyy(sportyritcountddownDateKey),
    );
  }, [sportyritcountddownDateKey]);

  useFocusEffect(
    useCallback(() => {
      let sportyritcountddownOk = true;
      (async () => {
        if (!sportyritcountddownEditId) {
          if (sportyritcountddownOk) {
            setSportyritcountddownLoaded(true);
          }
          return;
        }
        const sportyritcountddownAll = await sportyritcountddownLoadEvents();
        const sportyritcountddownFound = sportyritcountddownAll.find(
          e => e.id === sportyritcountddownEditId,
        );
        if (!sportyritcountddownOk) {
          return;
        }
        if (!sportyritcountddownFound) {
          Alert.alert('Missing event', 'This event could not be found.');
          sportyritcountddownNavigation.goBack();
          return;
        }
        setSportyritcountddownTitle(sportyritcountddownFound.title);
        setSportyritcountddownDesc(sportyritcountddownFound.description);
        setSportyritcountddownDateKey(sportyritcountddownFound.dateKey);
        setSportyritcountddownMode(sportyritcountddownFound.mode);
        setSportyritcountddownImageUri(sportyritcountddownFound.imageUri);
        setSportyritcountddownDirty(false);
        setSportyritcountddownLoaded(true);
      })();
      return () => {
        sportyritcountddownOk = false;
      };
    }, [sportyritcountddownEditId, sportyritcountddownNavigation]),
  );

  useEffect(() => {
    if (!sportyritcountddownEditId) {
      setSportyritcountddownLoaded(true);
    }
  }, [sportyritcountddownEditId]);

  useEffect(() => {
    const sportyritcountddownUnsub = sportyritcountddownNavigation.addListener(
      'beforeRemove',
      sportyritcountddownEvt => {
        if (sportyritcountddownLeaveAfterSaveRef.current) {
          sportyritcountddownLeaveAfterSaveRef.current = false;
          return;
        }
        if (!sportyritcountddownDirty) {
          return;
        }
        sportyritcountddownEvt.preventDefault();
        Alert.alert(
          'Unsaved Changes',
          "You have changes that haven't been saved yet. If you leave now, your edits will be lost.",
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                sportyritcountddownNavigation.dispatch(
                  sportyritcountddownEvt.data.action,
                );
              },
            },
          ],
        );
      },
    );
    return sportyritcountddownUnsub;
  }, [sportyritcountddownNavigation, sportyritcountddownDirty]);

  const sportyritcountddownPickImage = useCallback(async () => {
    const sportyritcountddownRes = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (sportyritcountddownRes.didCancel || sportyritcountddownRes.errorCode) {
      return;
    }
    const sportyritcountddownUri =
      sportyritcountddownRes.assets?.[0]?.uri ?? null;
    if (sportyritcountddownUri) {
      setSportyritcountddownImageUri(sportyritcountddownUri);
      sportyritcountddownMarkDirty();
    }
  }, [sportyritcountddownMarkDirty]);

  const sportyritcountddownOnSave = useCallback(async () => {
    const sportyritcountddownTrim = sportyritcountddownTitle.trim();
    if (!sportyritcountddownTrim) {
      return;
    }

    let sportyritcountddownResolvedDateKey = sportyritcountddownDateKey;
    if (Platform.OS === 'android') {
      const sportyritcountddownParsed = sportyritcountddownTryParseDdMmYyyy(
        sportyritcountddownAndroidDateStr,
      );
      if (sportyritcountddownParsed === null) {
        Alert.alert('Invalid date', 'Use DD.MM.YYYY (for example 12.05.2026).');
        return;
      }
      sportyritcountddownResolvedDateKey = sportyritcountddownParsed;
      if (sportyritcountddownParsed !== sportyritcountddownDateKey) {
        setSportyritcountddownDateKey(sportyritcountddownParsed);
      }
    }

    const sportyritcountddownAll = await sportyritcountddownLoadEvents();
    let sportyritcountddownNext: SportyritcountddownEvent[];
    if (sportyritcountddownIsEdit && sportyritcountddownEditId) {
      sportyritcountddownNext = sportyritcountddownAll.map(e =>
        e.id === sportyritcountddownEditId
          ? {
              ...e,
              title: sportyritcountddownTrim,
              description: sportyritcountddownDesc.trim(),
              dateKey: sportyritcountddownResolvedDateKey,
              mode: sportyritcountddownMode,
              imageUri: sportyritcountddownImageUri,
            }
          : e,
      );
    } else {
      const sportyritcountddownNew: SportyritcountddownEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: sportyritcountddownTrim,
        description: sportyritcountddownDesc.trim(),
        dateKey: sportyritcountddownResolvedDateKey,
        mode: sportyritcountddownMode,
        imageUri: sportyritcountddownImageUri,
      };
      sportyritcountddownNext = [
        ...sportyritcountddownAll,
        sportyritcountddownNew,
      ];
    }
    await sportyritcountddownSaveEvents(sportyritcountddownNext);
    sportyritcountddownLeaveAfterSaveRef.current = true;
    setSportyritcountddownDirty(false);
    await sportyritcountddownToastShowIfEnabled({
      type: 'success',
      text1: sportyritcountddownIsEdit ? 'Event updated' : 'Event added',
      text2: sportyritcountddownTrim,
    });
    sportyritcountddownNavigation.goBack();
  }, [
    sportyritcountddownTitle,
    sportyritcountddownDesc,
    sportyritcountddownDateKey,
    sportyritcountddownAndroidDateStr,
    sportyritcountddownMode,
    sportyritcountddownImageUri,
    sportyritcountddownIsEdit,
    sportyritcountddownEditId,
    sportyritcountddownNavigation,
  ]);

  const sportyritcountddownCanSave =
    sportyritcountddownTitle.trim().length > 0 && sportyritcountddownLoaded;

  const sportyritcountddownClose = () => {
    sportyritcountddownNavigation.goBack();
  };

  const sportyritcountddownPrimaryLabel = sportyritcountddownIsEdit
    ? 'Save Changes'
    : 'Add Event ✓';

  return (
    <View
      style={[
        styles.sportyritcountddownRoot,
        {paddingBottom: sportyritcountddownInsets.bottom},
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sportyritcountddownFlex}>
        <View
          style={[
            styles.sportyritcountddownHeader,
            {paddingTop: sportyritcountddownInsets.top + 8},
          ]}>
          <Text style={styles.sportyritcountddownHeaderTitle}>
            {sportyritcountddownIsEdit ? 'Edit Event' : 'New Event'}
          </Text>
          <Pressable
            accessibilityLabel="Close"
            accessibilityRole="button"
            hitSlop={10}
            onPress={sportyritcountddownClose}
            style={styles.sportyritcountddownCloseBtn}>
            <Image source={require('../../assets/i/sportyritcocls.png')} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.sportyritcountddownScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Pressable
            accessibilityRole="button"
            onPress={sportyritcountddownPickImage}
            style={styles.sportyritcountddownPhotoBox}>
            {sportyritcountddownImageUri ? (
              <Image
                resizeMode="cover"
                source={{uri: sportyritcountddownImageUri}}
                style={styles.sportyritcountddownPhotoPreview}
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/i/sportyritcounimg.png')}
                />
                <Text style={styles.sportyritcountddownPhotoHint}>
                  Tap to add photo
                </Text>
              </>
            )}
          </Pressable>

          <Text style={styles.sportyritcountddownLbl}>EVENT NAME *</Text>
          <TextInput
            autoCorrect
            onChangeText={t => {
              setSportyritcountddownTitle(t);
              sportyritcountddownMarkDirty();
            }}
            placeholder="e.g. Champions League Final"
            placeholderTextColor="rgba(240,232,255,0.5)"
            style={styles.sportyritcountddownInput}
            value={sportyritcountddownTitle}
          />

          <Text style={styles.sportyritcountddownLbl}>DESCRIPTION</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={t => {
              setSportyritcountddownDesc(t);
              sportyritcountddownMarkDirty();
            }}
            placeholder="Add a short note about this event..."
            placeholderTextColor="rgba(240,232,255,0.5)"
            style={[
              styles.sportyritcountddownInput,
              styles.sportyritcountddownArea,
            ]}
            textAlignVertical="top"
            value={sportyritcountddownDesc}
          />

          <Text style={styles.sportyritcountddownLbl}>DATE</Text>
          {Platform.OS === 'android' ? (
            <>
              <TextInput
                accessibilityLabel="Event date"
                keyboardType="numbers-and-punctuation"
                onBlur={sportyritcountddownCommitAndroidDate}
                onChangeText={setSportyritcountddownAndroidDateStr}
                placeholder="DD.MM.YYYY"
                placeholderTextColor="rgba(240,232,255,0.5)"
                style={styles.sportyritcountddownInput}
                value={sportyritcountddownAndroidDateStr}
              />
              <Text style={styles.sportyritcountddownDateHint}>
                Enter date as DD.MM.YYYY
              </Text>
            </>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => setSportyritcountddownShowIosDate(true)}
              style={styles.sportyritcountddownDateRow}>
              <Text style={styles.sportyritcountddownDateTxt}>
                {sportyritcountddownFormatDdMmYyyy(sportyritcountddownDateKey)}
              </Text>
              <Image
                source={require('../../assets/i/sportyritcocallndar.png')}
              />
            </Pressable>
          )}

          {Platform.OS === 'ios' ? (
            <Modal
              animationType="fade"
              transparent
              visible={sportyritcountddownShowIosDate}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSportyritcountddownShowIosDate(false)}
                style={styles.sportyritcountddownModalBackdrop}>
                <Pressable
                  onPress={e => e.stopPropagation()}
                  style={styles.sportyritcountddownModalSheet}>
                  <View style={styles.sportyritcountddownModalPickerWrap}>
                    <DateTimePicker
                      display="inline"
                      mode="date"
                      themeVariant="dark"
                      value={sportyritcountddownDateObj}
                      onChange={(_, d) => {
                        if (d) {
                          setSportyritcountddownDateKey(
                            sportyritcountddownDateKeyFromDate(d),
                          );
                          sportyritcountddownMarkDirty();
                        }
                      }}
                    />
                  </View>
                  <Pressable
                    onPress={() => setSportyritcountddownShowIosDate(false)}
                    style={styles.sportyritcountddownModalDone}>
                    <Text style={styles.sportyritcountddownModalDoneTxt}>
                      Done
                    </Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
          ) : null}

          <Text style={styles.sportyritcountddownLblBelowDate}>
            COUNTDOWN TYPE
          </Text>
          <View style={styles.sportyritcountddownTypeRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{selected: sportyritcountddownMode === 'to'}}
              onPress={() => {
                setSportyritcountddownMode('to');
                sportyritcountddownMarkDirty();
              }}
              style={[
                styles.sportyritcountddownTypeCard,
                sportyritcountddownMode === 'to'
                  ? styles.sportyritcountddownTypeCardOn
                  : styles.sportyritcountddownTypeCardOff,
              ]}>
              <Text style={styles.sportyritcountddownTypeTitle}>
                ⏳ Count To
              </Text>
              <Text style={styles.sportyritcountddownTypeSub}>
                Days until event
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{
                selected: sportyritcountddownMode === 'from',
              }}
              onPress={() => {
                setSportyritcountddownMode('from');
                sportyritcountddownMarkDirty();
              }}
              style={[
                styles.sportyritcountddownTypeCard,
                sportyritcountddownMode === 'from'
                  ? styles.sportyritcountddownTypeCardOn
                  : styles.sportyritcountddownTypeCardOff,
              ]}>
              <Text style={styles.sportyritcountddownTypeTitle}>
                ⏱ Count From
              </Text>
              <Text style={styles.sportyritcountddownTypeSub}>
                Days since event
              </Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!sportyritcountddownCanSave}
            onPress={sportyritcountddownOnSave}
            style={[
              styles.sportyritcountddownSubmitOuter,
              !sportyritcountddownCanSave &&
                styles.sportyritcountddownSubmitOuterDisabled,
            ]}>
            {sportyritcountddownCanSave ? (
              <LinearGradient
                colors={['#7B2FBE', '#F5B800']}
                end={{x: 1, y: 0.5}}
                start={{x: 0, y: 0.5}}
                style={styles.sportyritcountddownSubmitGrad}>
                <Text style={styles.sportyritcountddownSubmitTxtOn}>
                  {sportyritcountddownPrimaryLabel}
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.sportyritcountddownSubmitDisabledInner}>
                <Text style={styles.sportyritcountddownSubmitTxtOff}>
                  {sportyritcountddownPrimaryLabel}
                </Text>
              </View>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Sportyritcountddowneventform;

const styles = StyleSheet.create({
  sportyritcountddownRoot: {
    flex: 1,
    backgroundColor: '#0d0620',
  },
  sportyritcountddownFlex: {
    flex: 1,
  },
  sportyritcountddownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#1a0d3a',
    borderBottomWidth: 1,
    borderBottomColor: '#3d2380',
  },
  sportyritcountddownHeaderTitle: {
    color: '#f0e8ff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.45,
  },
  sportyritcountddownCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3d2380',
    backgroundColor: '#231550',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownCloseTxt: {
    color: '#f0e8ff',
    fontSize: 16,
    fontWeight: '600',
  },
  sportyritcountddownScroll: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 92,
  },
  sportyritcountddownPhotoBox: {
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
  sportyritcountddownPhotoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  sportyritcountddownPhotoHint: {
    color: '#8b7baa',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
  sportyritcountddownPhotoPreview: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  sportyritcountddownLbl: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sportyritcountddownLblBelowDate: {
    color: '#8b7baa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 8,
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
  sportyritcountddownDateHint: {
    marginTop: -12,
    marginBottom: 18,
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '500',
  },
  sportyritcountddownArea: {
    minHeight: 96,
  },
  sportyritcountddownDateRow: {
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
  sportyritcountddownDateTxt: {
    color: '#f0e8ff',
    fontSize: 15,
  },
  sportyritcountddownCalIcon: {
    fontSize: 18,
  },
  sportyritcountddownTypeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  sportyritcountddownTypeCard: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    minHeight: 66,
  },
  sportyritcountddownTypeCardOn: {
    backgroundColor: '#2d1b69',
    borderWidth: 2,
    borderColor: '#7b2fbe',
  },
  sportyritcountddownTypeCardOff: {
    backgroundColor: '#231550',
    borderWidth: 2,
    borderColor: '#3d2380',
  },
  sportyritcountddownTypeTitle: {
    color: '#f0e8ff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  sportyritcountddownTypeSub: {
    color: '#8b7baa',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.06,
  },
  sportyritcountddownSubmitOuter: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  sportyritcountddownSubmitOuterDisabled: {
    opacity: 1,
  },
  sportyritcountddownSubmitGrad: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownSubmitDisabledInner: {
    backgroundColor: '#2d1b69',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportyritcountddownSubmitTxtOn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sportyritcountddownSubmitTxtOff: {
    color: '#5a4a7a',
    fontSize: 16,
    fontWeight: '700',
  },
  sportyritcountddownModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sportyritcountddownModalSheet: {
    backgroundColor: '#1a0d3a',
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sportyritcountddownModalPickerWrap: {
    width: '100%',
    alignItems: 'center',
  },
  sportyritcountddownModalDone: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  sportyritcountddownModalDoneTxt: {
    color: '#a855f7',
    fontSize: 17,
    fontWeight: '700',
  },
});
