export type SportyritcountddownQuizOutcome =
  | 'correct'
  | 'wrong'
  | 'timeout';

export type SportyritcountddownQuizQuestion = {
  id: string;
  emoji: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};
