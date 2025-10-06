import React, { useMemo } from 'react';

import classNames from 'classnames';

import Line from './Line';
import styles from './Page.module.scss';
import groupLinesByVerses from './groupLinesByVerses';

import Word from '@/types/Word';
import ChapterHeader from 'src/components/chapters/ChapterHeader';
import Bismillah from 'src/components/dls/Bismillah/Bismillah';
import { Ayah } from 'src/types/verses';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
import PageNumber from './PageNumber';
import PageMetaDataContainer from './page-metadata/PageMetaDataContainer';
import { getJuzText } from './page-metadata/juz.constants';
import chapterHeaderStyles from 'src/components/chapters/ChapterHeader/ChapterHeader.module.scss';
import { BorderColor } from 'src/types/border-color';

type PageProps = {
  verses: Ayah[];
  pageNumber: number;
  pageIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  borderColor?: BorderColor;
};

const Page = ({
  verses,
  pageNumber,
  pageIndex,
  onWordClick,
  onWordHover,
  borderColor,
}: PageProps) => {
  const { fontScale, hasBorder } = useMushafContext();
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
        [styles.border]: hasBorder,
        [styles.blueBorder]: hasBorder && borderColor === 'blue',
        [styles.sepiaBorder]: hasBorder && borderColor === 'sepia',
      })}
      style={{ position: 'relative' }}
    >
      {hasBorder && (
        <>
          <PageMetaDataContainer borderColor={borderColor} className={styles.surah}>
            {firstAyah?.surah?.name}
          </PageMetaDataContainer>
          <PageMetaDataContainer borderColor={borderColor} className={styles.juz}>
            {getJuzText(firstAyah?.juz || 1)}
          </PageMetaDataContainer>
        </>
      )}
      <div
        className={classNames({
          [styles.bottomBorder]: hasBorder && isFirstTwoPages,
        })}
        style={{ width: '100%' }}
      >
        {isFirstTwoPages && (
          <ChapterHeader
            borderColor={borderColor}
            chapterId={`${pageNumber}`}
            pageNumber={pageNumber}
          />
        )}
        <div
          className={classNames({
            [styles.firstTwoPagesBorder]: hasBorder && isFirstTwoPages,
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
              borderColor={borderColor}
            />
          ))}
        </div>
      </div>
      {hasBorder && <PageNumber borderColor={borderColor} value={pageNumber} />}
    </div>
  );
};

export default Page;
