import classNames from 'classnames';
import React, { useMemo } from 'react';

import isCenterAlignedPage from './pageUtils';
import styles from './VerseText.module.scss';

import type Word from '@/types/Word';
import { buildNarrationDifferencesMap } from '@/core/shaping';
import { getFirstWordOfSurah } from '@/utils/verse';
import { FALLBACK_FONT, MushafLines } from 'src/types/MushafReader';
import { getFontClassName } from 'src/utils/fontFaceHelper';
import MushafWord from '../dls/MushafWord/MushafWord';
import { useMushafContext } from '../MushafReader/contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from '../MushafReader/contexts/Theme/ThemeProvider';

type VerseTextProps = {
  words: Word[];
  isHighlighted?: boolean;
  shouldShowH1ForSEO?: boolean;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const VerseText = ({
  words,
  isHighlighted,
  shouldShowH1ForSEO = false,
  onWordClick,
  onWordHover,
}: VerseTextProps) => {
  const { fontScale, selectedVerse, narrationDifferences } = useMushafContext();
  const { classNames: slotClassNames, styles: slotStyles, renderers } = useThemeContext();
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
  const isBigTextLayout = fontScale > 3;
  const { chapterId } = firstWordData;
  const VerseTextContainer = shouldShowH1ForSEO ? 'h1' : 'div';
  const fontClassName = getFontClassName(FALLBACK_FONT, fontScale, MushafLines.FifteenLines, true);
  const differencesMap = useMemo(
    () => buildNarrationDifferencesMap(narrationDifferences),
    [narrationDifferences],
  );

  return (
    <VerseTextContainer
      data-verse-key={verseKey}
      data-page={pageNumber}
      data-chapter-id={chapterId}
      className={classNames(
        styles.verseTextContainer,
        slotClassNames.verseText,
        {
          [styles.largeMushafTextLayoutContainer]: isBigTextLayout,
          [styles.highlighted]: isHighlighted,
          [styles[fontClassName]]: true,
        },
      )}
      style={{
        ...slotStyles.verseText,
      }}
    >
      <div
        translate="no"
        className={classNames(styles.verseText, {
          [styles.largeMushafTextLayout]: isBigTextLayout,
          [styles.verseTextCenterAlign]: centerAlignPage,
          [styles.verseTextSpaceBetween]: !centerAlignPage,
          [styles.verseTextWidth]: ![1, 2].includes(pageNumber),
          [styles.verseTextFirstTwoPagesWidth]: [1, 2].includes(pageNumber),
        })}
      >
        {words.map((word) => {
          const defaultNode = (
            <MushafWord
              key={word.location}
              word={word}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
          );

          return renderers.renderWord
            ? renderers.renderWord({
                word,
                isSelected: selectedVerse?.number === word.verse?.number,
                isDifference: Boolean(differencesMap?.has(word.location)),
                defaultNode,
              })
            : defaultNode;
        })}
      </div>
    </VerseTextContainer>
  );
};

export default React.memo(VerseText);
