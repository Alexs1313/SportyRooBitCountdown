export type GreetingStyle =
  | 'Motivational'
  | 'Friendly'
  | 'Humorous'
  | 'Formal'
  | 'Epic';

export type SavedGreeting = {
  id: string;
  recipient: string;
  event: string;
  style: GreetingStyle;
  body: string;
  savedAtMs: number;
};
