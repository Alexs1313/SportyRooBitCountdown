export type StoryAccent =
  | 'green'
  | 'red'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'yellow'
  | 'teal';

export type Story = {
  id: string;
  emoji: string;
  tag: string;
  title: string;
  body: string;
  readMinutes: number;
  accent: StoryAccent;
};

export type DailyFact = {
  emoji: string;
  tag: string;
  text: string;
};
