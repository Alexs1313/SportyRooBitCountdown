import type {DailyFact, Story} from './SprttyConTdowNstoriesTypes';

const bundle = require('./SprttyConTdowNstories.bundle.json') as {
  stories: Story[];
  facts: DailyFact[];
};

export const stories: Story[] = bundle.stories;

export const facts: DailyFact[] = bundle.facts;

export function getStoryById(id: string): Story | undefined {
  return stories.find(s => s.id === id);
}

export function snippet(body: string, max = 132): string {
  const t = body.replace(/\s+/g, ' ').trim();
  if (t.length <= max) {
    return t;
  }
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function factOfTheDay(
  factsList: DailyFact[] = facts,
  date = new Date(),
): DailyFact {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  const idx = dayOfYear % factsList.length;
  return factsList[idx]!;
}
