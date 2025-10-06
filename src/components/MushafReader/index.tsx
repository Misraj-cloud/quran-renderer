/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import readingViewStyles from './ReadingView/ReadingView.module.scss';

import Word from '@/types/Word';
import React, { useEffect } from 'react';
import { useMushafContext } from './contexts/MushafPage/MushafPageProvider';
import Page from './ReadingView/Page';

export type MushafProps = {
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;

  styleOverride?: {
    borderColor?: 'blue' | 'green' | 'sepia';
    wordHighlightColor?: string;
    chapterHeaderFontSize?: string;
    primaryFontColor?: string;
  };
};

const Mushaf = ({ onWordClick, onWordHover, styleOverride }: MushafProps) => {
  const { ayat, nextPageAyat, pageNumber } = useMushafContext();

  if (!ayat) return <></>;

  useEffect(() => {
    // Set global CSS variables (like SCSS vars but at runtime)
    styleOverride?.wordHighlightColor &&
      document.documentElement.style.setProperty(
        '--word-highlight-color',
        styleOverride?.wordHighlightColor,
      );
    styleOverride?.chapterHeaderFontSize &&
      document.documentElement.style.setProperty(
        '--chapter-header-font-size',
        styleOverride?.chapterHeaderFontSize,
      );
    styleOverride?.primaryFontColor &&
      document.documentElement.style.setProperty(
        '--primary-font-color',
        styleOverride?.primaryFontColor,
      );
  }, [styleOverride]);

  const { isTwoPagesView } = useMushafContext();
  const currentPage = Number(pageNumber);
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(readingViewStyles.container)}>
        {isTwoPagesView && nextPageAyat ? (
          <div className={styles.twoPagesRow}>
            <Page
              borderColor={styleOverride?.borderColor}
              verses={nextPageAyat.data.ayahs || []}
              key={`page-${currentPage + 1}`}
              pageNumber={currentPage + 1}
              pageIndex={currentPage + 1}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
            <Page
              borderColor={styleOverride?.borderColor}
              verses={ayat.data.ayahs}
              key={`page-${currentPage}`}
              pageNumber={currentPage}
              pageIndex={currentPage}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
          </div>
        ) : (
          <Page
            borderColor={styleOverride?.borderColor}
            verses={ayat.data.ayahs}
            key={`page-${currentPage}`}
            pageNumber={currentPage}
            pageIndex={currentPage}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
          />
        )}
      </div>
    </div>
  );
};

export default Mushaf;
