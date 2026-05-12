export type SportyritcountddownStoryAccent =
  | 'green'
  | 'red'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'yellow'
  | 'teal';

export type SportyritcountddownStory = {
  id: string;
  emoji: string;
  tag: string;
  title: string;
  body: string;
  readMinutes: number;
  accent: SportyritcountddownStoryAccent;
};

export type SportyritcountddownDailyFact = {
  emoji: string;
  tag: string;
  text: string;
};
