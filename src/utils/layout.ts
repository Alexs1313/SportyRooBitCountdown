export const TAB_BAR_OFFSET = 88;
export const HEADER_TOP_OFFSET = 8;

export function tabBarPadding(bottomInset: number): number {
  return bottomInset + TAB_BAR_OFFSET;
}

export function headerPaddingTop(topInset: number): number {
  return topInset + HEADER_TOP_OFFSET;
}
