export type SportyritcountddownGreetingStyle =
  | 'Motivational'
  | 'Friendly'
  | 'Humorous'
  | 'Formal'
  | 'Epic';

export type SportyritcountddownSavedGreeting = {
  id: string;
  recipient: string;
  event: string;
  style: SportyritcountddownGreetingStyle;
  body: string;
  savedAtMs: number;
};
