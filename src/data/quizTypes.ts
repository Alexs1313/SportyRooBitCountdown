export type QuizOutcome =
  | 'correct'
  | 'wrong'
  | 'timeout';

export type QuizQuestion = {
  id: string;
  emoji: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};
