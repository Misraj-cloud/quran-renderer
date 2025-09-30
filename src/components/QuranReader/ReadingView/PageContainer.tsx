import React, { JSX, useMemo } from 'react';

import Page from './Page';

import { Word } from '@/types/Word';
import { QuranPageDataType } from 'src/components/QuranReader/contexts/QuranPage/types';
import { Ayah } from 'src/types/verses';

type Props = {
  pageNumber: number;
  data: QuranPageDataType;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  theme?: {};
};

/**
 * Get the verses returned from the initialData of the first page.
 * This function will filter out all the words that don't
 * belong to the first page in-case we have some verses
 * that contain words that don't belong to the first page
 * (applies to 16-line Indopak Mushaf e.g. /ur/haji/25 or /ur/2/211-216)
 *
 * @param {number} pageNumber
 * @param {Verse[]} initialVerses
 * @returns {Verse[]}
 */
const getInitialVerses = (pageNumber: number, initialVerses: Ayah[]): Ayah[] =>
  initialVerses.map((verse) => ({
    ...verse,
    words: verse.words.filter((word) => word.page_number === pageNumber),
  }));

/**
 * A component that will fetch the verses of the current mushaf page
 * and will render a skeleton while it's loading.
 *
 * @param {Props} param0
 * @returns {JSX.Element}
 */
const PageContainer: React.FC<Props> = ({
  pageNumber,
  data: initialData,
  onWordClick,
  onWordHover,
}: Props): JSX.Element => {
  const initialVerses = useMemo(
    () => (pageNumber === 0 ? getInitialVerses(pageNumber, initialData) : initialData),
    [initialData, pageNumber, pageNumber],
  );

  return (
    <Page
      verses={initialVerses}
      key={`page-${pageNumber}`}
      pageNumber={Number(pageNumber)}
      pageIndex={pageNumber}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default PageContainer;
