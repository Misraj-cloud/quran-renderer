/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import readingViewStyles from './ReadingView/ReadingView.module.scss';

import Word from '@/types/Word';
import React from 'react';
import { MushafPageDataType } from './contexts/MushafPage/types';
import Page from './ReadingView/Page';
import { useMushafContext } from './contexts/MushafPage/MushafPageProvider';

type MushafReaderProps = {
  data: MushafPageDataType;
  pageNumber: number | string; // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  nextData?: MushafPageDataType;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const MushafReader = ({
  data,
  nextData,
  pageNumber,
  onWordClick,
  onWordHover,
}: MushafReaderProps) => {
  const { isTwoPagesView } = useMushafContext();
  const currentPage = Number(pageNumber);
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(readingViewStyles.container)}>
        {isTwoPagesView && nextData ? (
          <div className={styles.twoPagesRow}>
            <Page
              verses={data}
              key={`page-${currentPage}`}
              pageNumber={currentPage}
              pageIndex={currentPage}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
            <Page
              verses={nextData}
              key={`page-${currentPage + 1}`}
              pageNumber={currentPage + 1}
              pageIndex={currentPage + 1}
              onWordClick={onWordClick}
              onWordHover={onWordHover}
            />
          </div>
        ) : (
          <Page
            verses={data}
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

export default MushafReader;
