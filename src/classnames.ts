const ChapterIconContainer = ['iconContainer'] as const;

const MushafWord = [
  'colored',
  'filled',
  'highlightOnHover',
  'highlighted',
  'differenceHighlight',
] as const;

const ReadingView = ['container'] as const;

const Page = [
  'container',
  'border',
  'blueBorder',
  'sepiaBorder',
  'bottomBorder',
  'blueBottomBorder',
  'sepiaBottomBorder',
  'mobileCenterText',
  'firstTwoPagesBorder',
  'blueFirstTwoPagesBorder',
  'sepiaFirstTwoPagesBorder',
  'pageNumberContainer',
  'pageNumber',
  'surah',
  'juz',
] as const;

const MushafReader = ['twoPagesRow'] as const;

const VerseText = ['highlighted', 'container'] as const;

export const mushafSlots = [
  'root',
  'twoPageLayout',
  'page',
  'pageBorder',
  'pageMeta',
  'pageNumber',
  'line',
  'verseText',
  'word',
  'wordHighlighted',
  'chapterHeader',
  'chapterIcon',
] as const;

const classnames = {
  ChapterIconContainer,
  MushafWord,
  ReadingView,
  VerseText,
  MushafReader,
  Page,
  firstPage: Page,
  secondPage: Page,
};

export default classnames;
