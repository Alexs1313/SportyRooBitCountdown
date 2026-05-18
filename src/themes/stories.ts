import type {StoryAccent} from '../data/storiesTypes';

import {colors} from './colors';

export const storyAccentTint: Record<StoryAccent, string> = {
  green: `${colors.success}20`,
  red: `${colors.danger}20`,
  orange: '#fb923c20',
  blue: '#38bdf820',
  purple: `${colors.accentBright}20`,
  yellow: `${colors.switchThumbOn}20`,
  teal: '#2dd4bf20',
};

export const storyAccentLabel: Record<StoryAccent, string> = {
  green: colors.success,
  red: colors.danger,
  orange: '#fb923c',
  blue: '#38bdf8',
  purple: colors.accentBright,
  yellow: colors.switchThumbOn,
  teal: '#2dd4bf',
};
