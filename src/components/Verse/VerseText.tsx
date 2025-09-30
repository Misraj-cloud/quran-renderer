import classNames from 'classnames';
import React, { useMemo } from 'react';

import isCenterAlignedPage from './pageUtils';
import styles from './VerseText.module.scss';

import Word from '@/types/Word';
import { getFirstWordOfSurah } from '@/utils/verse';
import { FALLBACK_FONT, MushafLines } from 'src/types/QuranReader';
import { getFontClassName } from 'src/utils/fontFaceHelper';
import QuranWord from '../dls/QuranWord/QuranWord';
import { useQuranPage } from '../QuranReader/contexts/QuranPage/QuranPageProvider';

type VerseTextProps = {
  words: Word[];
  isReadingMode?: boolean;
  isHighlighted?: boolean;
  shouldShowH1ForSEO?: boolean;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  hoveredVerseKey?: string;
};

const VerseText = ({
  words,
  isReadingMode = false,
  isHighlighted,
  shouldShowH1ForSEO = false,
  onWordClick,
  onWordHover,
  hoveredVerseKey,
}: VerseTextProps) => {
  const { fontScale } = useQuranPage();
  const [firstWord] = words;
  const {
    line_number: lineNumber,
    page_number: pageNumber,
    location,
    verse_key: verseKey,
  } = firstWord;

  const centerAlignPage = useMemo(
    () => isCenterAlignedPage(pageNumber, lineNumber),
    [pageNumber, lineNumber],
  );
  const firstWordData = getFirstWordOfSurah(location);
  const isBigTextLayout = isReadingMode && fontScale > 3;

  const { chapterId } = firstWordData;

  const VerseTextContainer = shouldShowH1ForSEO ? 'h1' : 'div';
  const fontClassName = getFontClassName(FALLBACK_FONT, fontScale, MushafLines.FifteenLines, true);
  return (
    <>
      <VerseTextContainer
        data-verse-key={verseKey}
        data-page={pageNumber}
        data-chapter-id={chapterId}
        className={classNames(styles.verseTextContainer, {
          [styles.largeQuranTextLayoutContainer]: isBigTextLayout,
          [styles.highlighted]: isHighlighted,
          [styles[fontClassName]]: true,
          [styles.tafsirOrTranslationMode]: !isReadingMode,
        })}
      >
        <div
          translate="no"
          className={classNames(styles.verseText, {
            [styles.verseTextWrap]: !isReadingMode,
            [styles.largeQuranTextLayout]: isBigTextLayout,
            [styles.verseTextCenterAlign]: isReadingMode && centerAlignPage,
            [styles.verseTextSpaceBetween]: isReadingMode && !centerAlignPage,
          })}
        >
          {words?.map((word) => (
            <QuranWord
              key={word.location}
              word={word}
              shouldShowSecondaryHighlight={word.verse_key === hoveredVerseKey}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
          ))}
        </div>
      </VerseTextContainer>
    </>
  );
};

export default React.memo(VerseText);
