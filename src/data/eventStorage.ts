import AsyncStorage from '@react-native-async-storage/async-storage';

import {STORAGE_KEYS} from '../constants/storageKeys';
import type {Event} from './eventTypes';

export async function loadEvents(): Promise<Event[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.events);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Event[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
}
