import React, { useMemo } from 'react';

import classNames from 'classnames';

import Line from './Line';
import styles from './Page.module.scss';

import type Word from '@/types/Word';
import type { MushafPageMetaRenderContext } from '@/core/types';
import { groupVersesByLines } from '@/core/shaping';
import ChapterHeader from 'src/components/chapters/ChapterHeader';
import chapterHeaderStyles from 'src/components/chapters/ChapterHeader/ChapterHeader.module.scss';
import Bismillah from 'src/components/dls/Bismillah/Bismillah';
import { Ayah } from 'src/types/verses';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from '../contexts/Theme/ThemeProvider';
import PageNumber from './PageNumber';
import PageMetaDataContainer from './page-metadata/PageMetaDataContainer';
import { getJuzText } from './page-metadata/juz.constants';

type PageProps = {
  verses: Ayah[];
  pageNumber: number;
  pageIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const Page = ({
  verses,
  pageNumber,
  pageIndex,
  onWordClick,
  onWordHover,
}: PageProps) => {
  const { fontScale, hasBorder } = useMushafContext();
  const { theme, classNames: slotClassNames, styles: slotStyles, renderers, slotProps } =
    useThemeContext();
  const { borderColor } = theme;
  const lines = useMemo(() => (verses.length ? groupVersesByLines(verses) : {}), [verses]);

  const isBigTextLayout = fontScale > 3;
  const firstAyah = verses.length ? verses[0] : undefined;
  const isFirstTwoPages = pageNumber === 1 || pageNumber === 2;

  const renderMeta = (kind: 'surah' | 'juz', value: React.ReactNode, className: string, style?: React.CSSProperties) => {
    const defaultNode = (
      <PageMetaDataContainer borderColor={borderColor} className={className} style={style}>
        {value}
      </PageMetaDataContainer>
    );

    const context: MushafPageMetaRenderContext = {
      kind,
      value,
      pageNumber,
      defaultNode,
    };

    return renderers.renderPageMeta ? renderers.renderPageMeta(context) : defaultNode;
  };

  const chapterHeaderNode = isFirstTwoPages ? (
    <ChapterHeader
      chapterId={`${pageNumber}`}
      pageNumber={pageNumber}
      firstAyahText={firstAyah?.text}
    />
  ) : null;

  const renderedChapterHeader =
    chapterHeaderNode && renderers.renderChapterHeader
      ? renderers.renderChapterHeader({
          chapterId: `${pageNumber}`,
          pageNumber,
          firstAyahText: firstAyah?.text,
          defaultNode: chapterHeaderNode,
        })
      : chapterHeaderNode;

  const pageContent = (
    <div style={{ width: '100%' }}>
      {renderedChapterHeader}
      <div
        className={classNames({
          [styles.firstTwoPagesBorder]: hasBorder && isFirstTwoPages,
          [styles.blueFirstTwoPagesBorder]: hasBorder && isFirstTwoPages && borderColor === 'blue',
          [styles.sepiaFirstTwoPagesBorder]: hasBorder && isFirstTwoPages && borderColor === 'sepia',
        })}
      >
        {pageNumber === 2 && (
          <div className={chapterHeaderStyles.bismillahContainer}>
            <Bismillah />
          </div>
        )}
        {Object.keys(lines).map((key, lineIndex) => (
          <Line
            pageIndex={pageIndex}
            lineIndex={lineIndex}
            lineKey={key}
            words={lines[key]}
            key={key}
            isBigTextLayout={isBigTextLayout}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      {...slotProps.page}
      id={`page-${pageNumber}`}
      className={classNames(
        styles.container,
        slotClassNames.page,
        slotProps.page?.className,
        {
          [styles.mobileCenterText]: isBigTextLayout,
        },
      )}
      style={{
        ...slotStyles.page,
        ...slotProps.page?.style,
      }}
    >
      {hasBorder ? (
        <div
          className={classNames(slotClassNames.pageBorder, {
            [styles.border]: hasBorder,
            [styles.blueBorder]: hasBorder && borderColor === 'blue',
            [styles.sepiaBorder]: hasBorder && borderColor === 'sepia',
          })}
          style={{
            position: 'relative',
            ...slotStyles.pageBorder,
          }}
        >
          {renderMeta(
            'surah',
            firstAyah?.surah?.name,
            classNames(styles.surah, slotClassNames.pageMeta),
            {
              ...slotStyles.pageMeta,
            },
          )}
          {renderMeta(
            'juz',
            getJuzText(firstAyah?.juz || 1),
            classNames(styles.juz, slotClassNames.pageMeta),
            {
              ...slotStyles.pageMeta,
            },
          )}
          {pageContent}
          <PageNumber borderColor={borderColor} value={pageNumber} />
        </div>
      ) : (
        pageContent
      )}
    </div>
  );
};

export default Page;
