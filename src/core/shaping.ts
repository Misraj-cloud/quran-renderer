import groupBy from 'lodash/groupBy';

import type Word from '@/types/Word';
import type { NarrationDifference } from '@/types/differences';
import type { Ayah } from '@/types/verses';
import { getVerseWords } from '@/utils/verse';

export const groupVersesByLines = (verses: Ayah[]): Record<string, Word[]> => {
  let words: Word[] = [];

  verses.forEach((verse) => {
    words = [...words, ...getVerseWords(verse, true)];
  });

  return groupBy(words, (word: Word) => `Page${word.page_number}-Line${word.line_number}`);
};

export type NarrationDifferenceInfo = {
  differenceText: string;
  differenceContent: string;
};

export const buildNarrationDifferencesMap = (
  narrationDifferences: NarrationDifference[] | null | undefined,
): Map<string, NarrationDifferenceInfo> | null => {
  if (!narrationDifferences?.length) return null;

  const map = new Map<string, NarrationDifferenceInfo>();
  narrationDifferences.forEach((difference) => {
    difference.words?.forEach((differenceWord) => {
      map.set(differenceWord.location, {
        differenceText: difference.difference_text,
        differenceContent: difference.difference_content,
      });
    });
  });

  return map;
};
