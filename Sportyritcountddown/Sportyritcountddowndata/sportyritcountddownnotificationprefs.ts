import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const SPORTYRITCOUNTDOWN_PUSH_KEY =
  'sportyritcountddownPushNotifications_v1';

export async function sportyritcountddownPushNotificationsEnabled(): Promise<boolean> {
  try {
    const sportyritcountddownRaw = await AsyncStorage.getItem(
      SPORTYRITCOUNTDOWN_PUSH_KEY,
    );
    return sportyritcountddownRaw === '1';
  } catch {
    return false;
  }
}

export async function sportyritcountddownToastShowIfEnabled(
  sportyritcountddownOptions: Parameters<typeof Toast.show>[0],
): Promise<void> {
  if (await sportyritcountddownPushNotificationsEnabled()) {
    Toast.show(sportyritcountddownOptions);
  }
}
