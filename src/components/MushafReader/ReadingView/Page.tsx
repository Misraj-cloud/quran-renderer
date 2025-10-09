import React, { useMemo } from 'react';

import classNames from 'classnames';

import Line from './Line';
import styles from './Page.module.scss';
import groupLinesByVerses from './groupLinesByVerses';

import Word from '@/types/Word';
import ChapterHeader from 'src/components/chapters/ChapterHeader';
import chapterHeaderStyles from 'src/components/chapters/ChapterHeader/ChapterHeader.module.scss';
import Bismillah from 'src/components/dls/Bismillah/Bismillah';
import { Ayah } from 'src/types/verses';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from '../contexts/Theme/ThemeProvider';
import PageNumber from './PageNumber';
import PageMetaDataContainer from './page-metadata/PageMetaDataContainer';
import { getJuzText } from './page-metadata/juz.constants';
import { StyleOverride } from '../contexts/Theme/type';

type PageProps = {
  verses: Ayah[];
  pageNumber: number;
  pageIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  pageStyleOverride?: StyleOverride['Page'];
};

const Page = ({
  verses,
  pageNumber,
  pageIndex,
  onWordClick,
  onWordHover,
  pageStyleOverride,
}: PageProps) => {
  const { fontScale, hasBorder } = useMushafContext();
  const { themeProps, styleOverride } = useThemeContext();
  const { borderColor } = themeProps;
  const lines = useMemo(
    () => (verses && verses.length ? groupLinesByVerses(verses) : {}),
    [verses],
  );

  const isBigTextLayout = fontScale > 3;
  const firstAyah = verses && verses.length ? verses[0] : undefined;

  const isFirstTwoPages = pageNumber === 1 || pageNumber === 2;

  return (
    <div
      id={`page-${pageNumber}`}
      className={classNames(styles.container, {
        [styles.mobileCenterText]: isBigTextLayout,
      })}
      style={{
        ...styleOverride?.Page?.container,
        ...pageStyleOverride?.container,
      }}
    >
      <div
        className={classNames({
          [styles.border]: hasBorder,
          [styles.blueBorder]: hasBorder && borderColor === 'blue',
          [styles.sepiaBorder]: hasBorder && borderColor === 'sepia',
        })}
        style={{
          position: 'relative',
          ...styleOverride?.Page?.border,
          ...pageStyleOverride?.border,
        }}
      >
        {hasBorder && (
          <>
            <PageMetaDataContainer
              borderColor={borderColor}
              className={classNames(styles.surah)}
              style={styleOverride?.Page?.surah}
            >
              {firstAyah?.surah?.name}
            </PageMetaDataContainer>
            <PageMetaDataContainer
              borderColor={borderColor}
              className={classNames(styles.juz)}
              style={styleOverride?.Page?.juz}
            >
              {getJuzText(firstAyah?.juz || 1)}
            </PageMetaDataContainer>
          </>
        )}
        <div
          className={classNames(styleOverride?.Page?.bottomBorder, {
            [styles.bottomBorder]: hasBorder && isFirstTwoPages,
            [styles.blueBottomBorder]: hasBorder && isFirstTwoPages && borderColor === 'blue',
            [styles.sepiaBottomBorder]: hasBorder && isFirstTwoPages && borderColor === 'sepia',
          })}
          style={{ width: '100%' }}
        >
          {isFirstTwoPages && <ChapterHeader chapterId={`${pageNumber}`} pageNumber={pageNumber} />}
          <div
            className={classNames(styleOverride?.Page?.firstTwoPagesBorder, {
              [styles.firstTwoPagesBorder]: hasBorder && isFirstTwoPages,
              [styles.blueFirstTwoPagesBorder]:
                hasBorder && isFirstTwoPages && borderColor === 'blue',
              [styles.sepiaFirstTwoPagesBorder]:
                hasBorder && isFirstTwoPages && borderColor === 'sepia',
            })}
          >
            {/* This behavior is explained in @ChapterHeader.tsx */}
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
        {hasBorder && <PageNumber borderColor={borderColor} value={pageNumber} />}
      </div>
    </div>
  );
};

export default Page;
