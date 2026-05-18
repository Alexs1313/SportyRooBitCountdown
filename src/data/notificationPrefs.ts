import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {STORAGE_KEYS} from '../constants/storageKeys';

export async function pushNotificationsEnabled(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.pushNotifications);
    return raw === '1';
  } catch {
    return false;
  }
}

export async function toastShowIfEnabled(
  options: Parameters<typeof Toast.show>[0],
): Promise<void> {
  if (await pushNotificationsEnabled()) {
    Toast.show(options);
  }
}
