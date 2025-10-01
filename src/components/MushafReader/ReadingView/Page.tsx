import React, { useMemo } from 'react';

import classNames from 'classnames';

import groupLinesByVerses from './groupLinesByVerses';
import Line from './Line';
import styles from './Page.module.scss';

import Word from '@/types/Word';
import { Ayah } from 'src/types/verses';
import { useMushafContext } from '../contexts/MushafPage/MushafPageProvider';

type PageProps = {
  verses: Ayah[];
  pageNumber: number;
  pageIndex: number;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const Page = ({ verses, pageNumber, pageIndex, onWordClick, onWordHover }: PageProps) => {
  const { fontScale } = useMushafContext();
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
    >
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
  );
};

export default Page;
