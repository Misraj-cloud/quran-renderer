import React, { useRef } from 'react';

import styles from './ChapterHeader.module.scss';

import ChapterIconContainer from '@/components/chapters/ChapterIcon/ChapterIconContainer';
import Bismillah from 'src/components/dls/Bismillah/Bismillah';

interface Props {
  chapterId: string;
  pageNumber: number;
  translationName?: string;
  isTranslationSelected?: boolean;
}

// In surah al baqarah, basmalah should be rendered in side the border and the chapter header should be rendered outside it
// so, basmalah will not be rendered here, it will be rendered in @Page.tsx
const CHAPTERS_WITHOUT_BISMILLAH = ['1', '2', '9'];

const ChapterHeader: React.FC<Props> = ({ chapterId, pageNumber }) => {
  const headerRef = useRef(null);

  return (
    <div
      ref={headerRef}
      data-verse-key={`${chapterId}:1`}
      data-page={pageNumber}
      data-chapter-id={chapterId}
    >
      <div className={styles.header}>
        <ChapterIconContainer chapterId={chapterId} />
      </div>
      <div className={styles.bismillahContainer}>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && <Bismillah />}
      </div>
    </div>
  );
};

export default ChapterHeader;
