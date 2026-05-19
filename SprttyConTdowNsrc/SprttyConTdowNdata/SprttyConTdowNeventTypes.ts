export type EventMode = 'to' | 'from';

export type Event = {
  id: string;
  title: string;
  description: string;
  /** Local calendar date YYYY-MM-DD */
  dateKey: string;
  mode: EventMode;
  imageUri: string | null;
};
