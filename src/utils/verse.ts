import { Ayah } from 'src/types/verses';
import Word from 'src/types/Word';

/**
 * Split the word's location and get the surahNumber, verseNumber and wordNumber.
 *
 * @param {string} wordLocation the word location {surahNumber}:{verseNumber}:{wordNumber}
 * @returns {[string, string, string]}
 */
export const getWordDataByLocation = (wordLocation: string): [string, string, string] => {
  const locationSplits = wordLocation.split(':');
  return [locationSplits[0], locationSplits[1], locationSplits[2]];
};

/**
 * Extract the data related to a word. The first is the chapter Id,
 * the second is whether the word is the first word of the first verse
 * of the Surah. To do that we will have to split the word location
 * which comes in the following format: {surahNumber}:{verseNumber}:{wordNumber}.
 * For this to be true, the combination of {verseNumber}:{wordNumber} has to be
 * 1:1.
 *
 * @param {string} wordLocation whose format is {surahNumber}:{verseNumber}:{wordNumber} e.g. "112:1:1"
 * @returns {{ chapterId: string; isFirstWordOfSurah: boolean }}
 */
export const getFirstWordOfSurah = (
  wordLocation: string,
): { chapterId: string; isFirstWordOfSurah: boolean } => {
  const locationSplits = getWordDataByLocation(wordLocation);
  return {
    chapterId: locationSplits[0],
    isFirstWordOfSurah: locationSplits[1] === '1' && locationSplits[2] === '1',
  };
};

/**
 * Get the words of each verse. This can be used to extend
 * the BE response of each word to add custom fields.
 *
 * @param {Verse} verse
 * @param {boolean} isReadingView
 * @returns {Word[]}
 */
export const getVerseWords = (verse: Ayah, isReadingView = false): Word[] => {
  const words: Word[] = [];
  verse.words.forEach((word) => {
    const wordVerse = { ...verse };
    words.push({
      ...word,
      ...(isReadingView && { verse: wordVerse }),
    });
  });
  return words;
};

/**
 * make wordLocation from verseKey and wordPosition, example "1:1:2"
 *
 * @param {string} verseKey
 * @param {string} wordPosition
 * @returns {string} wordLocation
 */
export const makeWordLocation = (verseKey: string, wordPosition: number): string =>
  `${verseKey}:${wordPosition}`;
