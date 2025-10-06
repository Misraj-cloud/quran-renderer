import { memo } from 'react';

import classNames from 'classnames';

import styles from './Line.module.scss';

import ChapterHeader from '@/components/chapters/ChapterHeader';
import VerseText from '@/components/Verse/VerseText';
import Word from '@/types/Word';
import { getWordDataByLocation } from '@/utils/verse';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
import { BorderColor } from 'src/types/border-color';

type LineProps = {
  words: Word[];
  lineKey: string;
  isBigTextLayout: boolean;
  pageIndex: number;
  lineIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  borderColor?: BorderColor;
};

const Line = ({
  lineKey,
  words,
  isBigTextLayout,
  pageIndex,
  lineIndex,
  onWordClick,
  onWordHover,
  borderColor,
}: LineProps) => {
  const { pageNumber } = useMushafContext();
  const firstWordData = getWordDataByLocation(words[0].location);
  const shouldShowChapterHeader = firstWordData[1] === '1' && firstWordData[2] === '1';

  const isFirstTwoPages = pageNumber === 1 || pageNumber === 2;

  const isHighlighted = false;

  return (
    <div
      id={lineKey}
      className={classNames(styles.container, {
        [styles.highlighted]: isHighlighted,
        [styles.mobileInline]: isBigTextLayout,
      })}
      role="button"
      tabIndex={0}
    >
      {/*
       Chapter header is rendered here if the page is not from the first two page
          this is because specific border should be rendered for the first two pages,
          and chapter header should be rendered out of this border, so it should be 
          rendered in a way different from this
      */}
      {shouldShowChapterHeader && !isFirstTwoPages && (
        <ChapterHeader
          borderColor={borderColor}
          chapterId={firstWordData[0]}
          pageNumber={words[0].page_number || 0}
        />
      )}
      <div
        className={classNames(styles.line, {
          [styles.mobileInline]: isBigTextLayout,
        })}
      >
        <VerseText
          words={words}
          isHighlighted={isHighlighted}
          shouldShowH1ForSEO={pageIndex === 0 && lineIndex === 0}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
        />
      </div>
    </div>
  );
};

/**
 * Since we are passing words and it's an array
 * even if the same words are passed, their reference will change
 * on fetching a new page and since Memo only does shallow comparison,
 * we need to use custom comparing logic:
 *
 *  1. Check if the line keys are the same.
 *  2. Check if the number of words are the same.
 *  3. Check if isBigTextLayout values are the same.
 *  4. Check if the font changed.
 *
 * If the above conditions are met, it's safe to assume that the result
 * of both renders are the same.
 *
 * @param {LineProps} prevProps
 * @param {LineProps} nextProps
 * @returns {boolean}
 */
const areLinesEqual = (prevProps: LineProps, nextProps: LineProps): boolean =>
  prevProps.lineKey === nextProps.lineKey &&
  prevProps.isBigTextLayout === nextProps.isBigTextLayout;

export default memo(Line, areLinesEqual);
