import { memo } from 'react';

import classNames from 'classnames';

import styles from './Line.module.scss';

import ChapterHeader from '@/components/chapters/ChapterHeader';
import VerseText from '@/components/Verse/VerseText';
import type Word from '@/types/Word';
import type { MushafLineRenderContext } from '@/core/types';
import { getWordDataByLocation } from '@/utils/verse';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from '../contexts/Theme/ThemeProvider';

type LineProps = {
  words: Word[];
  lineKey: string;
  isBigTextLayout: boolean;
  pageIndex: number;
  lineIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const Line = ({
  lineKey,
  words,
  isBigTextLayout,
  pageIndex,
  lineIndex,
  onWordClick,
  onWordHover,
}: LineProps) => {
  const { pageNumber } = useMushafContext();
  const { classNames: slotClassNames, styles: slotStyles, renderers, slotProps } = useThemeContext();

  const firstWordData = getWordDataByLocation(words[0].location);
  const shouldShowChapterHeader = firstWordData[1] === '1' && firstWordData[2] === '1';
  const isFirstTwoPages = pageNumber === 1 || pageNumber === 2;
  const isHighlighted = false;

  const defaultNode = (
    <div
      {...slotProps.line}
      id={lineKey}
      className={classNames(
        styles.container,
        slotClassNames.line,
        slotProps.line?.className,
        {
          [styles.mobileInline]: isBigTextLayout,
        },
      )}
      style={{
        ...slotStyles.line,
        ...slotProps.line?.style,
      }}
      role="button"
      tabIndex={0}
    >
      {shouldShowChapterHeader && !isFirstTwoPages && (
        renderers.renderChapterHeader ? renderers.renderChapterHeader({
          chapterId: firstWordData[0],
          pageNumber: words[0].page_number || 0,
          firstAyahText: words[0].verse?.text,
          defaultNode: (
            <ChapterHeader
              chapterId={firstWordData[0]}
              pageNumber={words[0].page_number || 0}
              firstAyahText={words[0].verse?.text}
            />
          ),
        }) : (
          <ChapterHeader
            chapterId={firstWordData[0]}
            pageNumber={words[0].page_number || 0}
            firstAyahText={words[0].verse?.text}
          />
        )
      )}
      <div
        className={classNames(styles.line, {
          [styles.fixedWidth]: true,
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

  if (!renderers.renderLine) {
    return defaultNode;
  }

  const renderContext: MushafLineRenderContext = {
    lineKey,
    words,
    pageIndex,
    lineIndex,
    defaultNode,
  };

  return renderers.renderLine(renderContext);
};

const areLinesEqual = (prevProps: LineProps, nextProps: LineProps): boolean =>
  prevProps.lineKey === nextProps.lineKey &&
  prevProps.isBigTextLayout === nextProps.isBigTextLayout;

export default memo(Line, areLinesEqual);
