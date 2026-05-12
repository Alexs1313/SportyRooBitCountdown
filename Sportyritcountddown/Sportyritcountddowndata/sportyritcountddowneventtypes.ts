export type SportyritcountddownEventMode = 'to' | 'from';

export type SportyritcountddownEvent = {
  id: string;
  title: string;
  description: string;
  /** Local calendar date YYYY-MM-DD */
  dateKey: string;
  mode: SportyritcountddownEventMode;
  imageUri: string | null;
};
