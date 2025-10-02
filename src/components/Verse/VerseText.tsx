import classNames from 'classnames';
import React, { useMemo } from 'react';

import isCenterAlignedPage from './pageUtils';
import styles from './VerseText.module.scss';

import Word from '@/types/Word';
import { getFirstWordOfSurah } from '@/utils/verse';
import { FALLBACK_FONT, MushafLines } from 'src/types/MushafReader';
import { getFontClassName } from 'src/utils/fontFaceHelper';
import MushafWord from '../dls/MushafWord/MushafWord';
import { useMushafContext } from '../MushafReader/contexts/MushafPage/MushafPageProvider';

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
  const { fontScale } = useMushafContext();
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
          [styles.largeMushafTextLayoutContainer]: isBigTextLayout,
          [styles.highlighted]: isHighlighted,
          [styles[fontClassName]]: true,
        })}
      >
        <div
          translate="no"
          className={classNames(styles.verseText, {
            [styles.largeMushafTextLayout]: isBigTextLayout,
            [styles.verseTextCenterAlign]: isReadingMode && centerAlignPage,
            [styles.verseTextSpaceBetween]: isReadingMode && !centerAlignPage,
          })}
        >
          {words?.map((word) => (
            <MushafWord
              key={word.location}
              word={word}
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
