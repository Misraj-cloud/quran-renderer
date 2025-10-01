import React, { useMemo } from 'react';

import classNames from 'classnames';

import groupLinesByVerses from './groupLinesByVerses';
import Line from './Line';
import styles from './Page.module.scss';

import Word from '@/types/Word';
import { Ayah } from 'src/types/verses';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';
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

const Page = ({ verses, pageNumber, pageIndex, onWordClick, onWordHover }: PageProps) => {
  const { fontScale, currentSurah, data } = useMushafContext();
  const lines = useMemo(
    () => (verses && verses.length ? groupLinesByVerses(verses) : {}),
    [verses],
  );
  const isBigTextLayout = fontScale > 3;

  return (
    <div
      id={`page-${pageNumber}`}
      className={classNames(styles.container, {
        [styles.mobileCenterText]: isBigTextLayout,
      })}
      style={{ position: 'relative' }}
    >
      <PageMetaDataContainer className={styles.surah}>{currentSurah?.name}</PageMetaDataContainer>
      <PageMetaDataContainer className={styles.juz}>
        {getJuzText(data?.[0].juz || 1)}
      </PageMetaDataContainer>
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
      <PageNumber />
    </div>
  );
};

export default Page;
