import {colors} from './SprttyConTdowNcolors';

export const gradients = {
  screenBackground: [
    colors.backgroundDeep,
    colors.backgroundDeep,
    colors.backgroundDeep,
  ] as const,
  layout: ['rgb(81, 6, 143)', 'rgb(20, 4, 33)', 'rgb(4, 1, 12)'] as const,
  cta: [colors.accent, colors.gold] as const,
  cardAccent: [colors.goldDim, colors.accent] as const,
  tabBar: [colors.background, colors.background] as const,
  heroFade: ['#00000000', colors.backgroundDeep] as const,
} as const;
