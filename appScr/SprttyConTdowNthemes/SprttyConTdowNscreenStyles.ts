import {StyleSheet} from 'react-native';

import {colors} from './SprttyConTdowNcolors';
import {spacing} from './SprttyConTdowNspacing';

export const screenStyles = StyleSheet.create({
  headerBlock: {
    backgroundColor: colors.background,

    borderBottomWidth: 1.5,

    borderBottomColor: colors.border,

    paddingHorizontal: spacing.screenHorizontal,

    paddingBottom: spacing.headerBottom,
  },
  eyebrow: {
    color: colors.textMuted,

    fontSize: 12.2,

    fontWeight: '600',

    letterSpacing: 1.4,

    lineHeight: 18.6,
  },
  screenTitle: {
    color: colors.textPrimary,
    marginBottom: 10.6,
    fontSize: 24.4,

    fontWeight: '800',

    letterSpacing: 0.07,

    lineHeight: 36.4,

    marginTop: 4.6,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontal,

    paddingTop: spacing.sectionGap,
  },
  sectionLabel: {
    color: colors.textMuted,

    fontSize: 11.6,

    fontWeight: '700',

    letterSpacing: 1.1,

    marginBottom: 10.7,

    marginTop: 4.2,
  },
  card: {
    borderRadius: spacing.cardRadius,

    borderWidth: 1.6,

    borderColor: colors.surfaceAlt,

    backgroundColor: colors.surfaceCard,

    marginBottom: spacing.sectionGap,

    overflow: 'hidden',
  },
  rowTitle: {
    color: colors.textPrimary,

    fontSize: 16.2,

    fontWeight: '600',
  },
  rowSub: {
    color: colors.textSubtle,

    fontSize: 13.2,

    marginTop: 3.6,

    lineHeight: 18.3,
  },
  linkRow: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 16.5,

    paddingHorizontal: 14.3,

    gap: 12.1,
  },
  linkRowBorder: {
    borderBottomWidth: 1.3,

    borderBottomColor: colors.surfaceAlt,
  },
  iconBox: {
    width: 40.2,

    height: 40.1,

    borderRadius: 12.5,

    alignItems: 'center',

    justifyContent: 'center',
  },
});
