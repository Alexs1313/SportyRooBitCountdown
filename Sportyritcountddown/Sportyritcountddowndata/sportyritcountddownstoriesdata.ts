import type {
  SportyritcountddownDailyFact,
  SportyritcountddownStory,
} from './sportyritcountddownstoriestypes';

const bundle = require('./sportyritcountddownstories.bundle.json') as {
  stories: SportyritcountddownStory[];
  facts: SportyritcountddownDailyFact[];
};

export const sportyritcountddownStories: SportyritcountddownStory[] =
  bundle.stories;

export const sportyritcountddownFacts: SportyritcountddownDailyFact[] =
  bundle.facts;

export function sportyritcountddownGetStoryById(
  sportyritcountddownId: string,
): SportyritcountddownStory | undefined {
  return sportyritcountddownStories.find(
    s => s.id === sportyritcountddownId,
  );
}

export function sportyritcountddownSnippet(
  sportyritcountddownBody: string,
  sportyritcountddownMax = 132,
): string {
  const sportyritcountddownT = sportyritcountddownBody
    .replace(/\s+/g, ' ')
    .trim();
  if (sportyritcountddownT.length <= sportyritcountddownMax) {
    return sportyritcountddownT;
  }
  return `${sportyritcountddownT
    .slice(0, sportyritcountddownMax - 1)
    .trimEnd()}…`;
}

export function sportyritcountddownFactOfTheDay(
  sportyritcountddownFactsList: SportyritcountddownDailyFact[] =
    sportyritcountddownFacts,
  sportyritcountddownDate = new Date(),
): SportyritcountddownDailyFact {
  const sportyritcountddownStart = new Date(
    sportyritcountddownDate.getFullYear(),
    0,
    0,
  );
  const sportyritcountddownDiff =
    sportyritcountddownDate.getTime() - sportyritcountddownStart.getTime();
  const sportyritcountddownDayOfYear = Math.floor(
    sportyritcountddownDiff / 86400000,
  );
  const sportyritcountddownIdx =
    sportyritcountddownDayOfYear % sportyritcountddownFactsList.length;
  return sportyritcountddownFactsList[sportyritcountddownIdx]!;
}
