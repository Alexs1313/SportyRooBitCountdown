import AsyncStorage from '@react-native-async-storage/async-storage';

import type {SportyritcountddownEvent} from './sportyritcountddowneventtypes';

const SPORTYRITCOUNTDDOWN_EVENTS_KEY = '@sportyritcountddown_events_v1';

export async function sportyritcountddownLoadEvents(): Promise<
  SportyritcountddownEvent[]
> {
  try {
    const raw = await AsyncStorage.getItem(SPORTYRITCOUNTDDOWN_EVENTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SportyritcountddownEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function sportyritcountddownSaveEvents(
  events: SportyritcountddownEvent[],
): Promise<void> {
  await AsyncStorage.setItem(
    SPORTYRITCOUNTDDOWN_EVENTS_KEY,
    JSON.stringify(events),
  );
}
