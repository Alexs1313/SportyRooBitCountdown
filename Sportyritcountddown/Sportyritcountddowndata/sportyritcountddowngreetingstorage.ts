import AsyncStorage from '@react-native-async-storage/async-storage';

import type {SportyritcountddownSavedGreeting} from './sportyritcountddowngreetingtypes';

const SPORTYRITCOUNTDDOWN_GREETINGS_KEY =
  '@sportyritcountddown_saved_greetings_v1';

export async function sportyritcountddownLoadSavedGreetings(): Promise<
  SportyritcountddownSavedGreeting[]
> {
  try {
    const raw = await AsyncStorage.getItem(SPORTYRITCOUNTDDOWN_GREETINGS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SportyritcountddownSavedGreeting[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function sportyritcountddownSaveSavedGreetings(
  rows: SportyritcountddownSavedGreeting[],
): Promise<void> {
  await AsyncStorage.setItem(
    SPORTYRITCOUNTDDOWN_GREETINGS_KEY,
    JSON.stringify(rows),
  );
}
