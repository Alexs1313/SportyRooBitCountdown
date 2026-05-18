import AsyncStorage from '@react-native-async-storage/async-storage';

import {STORAGE_KEYS} from '../constants/storageKeys';
import type {SavedGreeting} from './greetingTypes';

export async function loadSavedGreetings(): Promise<SavedGreeting[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.greetings);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SavedGreeting[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSavedGreetings(rows: SavedGreeting[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.greetings, JSON.stringify(rows));
}
