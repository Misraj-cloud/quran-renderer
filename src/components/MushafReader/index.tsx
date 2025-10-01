/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import readingViewStyles from './ReadingView/ReadingView.module.scss';

import Word from '@/types/Word';
import React from 'react';
import { MushafPageDataType } from './contexts/MushafPage/types';
import Page from './ReadingView/Page';

type MushafReaderProps = {
  data: MushafPageDataType;
  pageNumber: number | string; // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const MushafReader = ({ data, pageNumber, onWordClick, onWordHover }: MushafReaderProps) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(readingViewStyles.container)}>
        <Page
          verses={data}
          key={`page-${pageNumber}`}
          pageNumber={Number(pageNumber)}
          pageIndex={+pageNumber}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
        />
      </div>
    </div>
  );
};

export default MushafReader;
