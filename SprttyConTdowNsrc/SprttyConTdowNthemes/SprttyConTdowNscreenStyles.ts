import {StyleSheet} from 'react-native';

import {colors} from './SprttyConTdowNcolors';
import {spacing} from './SprttyConTdowNspacing';

export const screenStyles = StyleSheet.create({
  headerBlock: {
    backgroundColor: colors.background,

    borderBottomWidth: 1,

    borderBottomColor: colors.border,

    paddingHorizontal: spacing.screenHorizontal,

    paddingBottom: spacing.headerBottom,
  },
  eyebrow: {
    color: colors.textMuted,

    fontSize: 12,

    fontWeight: '600',

    letterSpacing: 1,

    lineHeight: 18,
  },
  screenTitle: {
    color: colors.textPrimary,
    marginBottom: 10,
    fontSize: 24,

    fontWeight: '800',

    letterSpacing: 0.07,

    lineHeight: 36,

    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontal,

    paddingTop: spacing.sectionGap,
  },
  sectionLabel: {
    color: colors.textMuted,

    fontSize: 11,

    fontWeight: '700',

    letterSpacing: 1.1,

    marginBottom: 10,

    marginTop: 4,
  },
  card: {
    borderRadius: spacing.cardRadius,

    borderWidth: 1,

    borderColor: colors.surfaceAlt,

    backgroundColor: colors.surfaceCard,

    marginBottom: spacing.sectionGap,

    overflow: 'hidden',
  },
  rowTitle: {
    color: colors.textPrimary,

    fontSize: 16,

    fontWeight: '600',
  },
  rowSub: {
    color: colors.textSubtle,

    fontSize: 13,

    marginTop: 3,

    lineHeight: 18,
  },
  linkRow: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 16,

    paddingHorizontal: 14,

    gap: 12,
  },
  linkRowBorder: {
    borderBottomWidth: 1,

    borderBottomColor: colors.surfaceAlt,
  },
  iconBox: {
    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },
});
