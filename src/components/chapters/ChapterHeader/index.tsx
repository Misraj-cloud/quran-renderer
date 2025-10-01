import React, { useRef } from 'react';

import styles from './ChapterHeader.module.scss';

import ChapterIconContainer, {
  ChapterIconsSize,
} from '@/components/chapters/ChapterIcon/ChapterIconContainer';
import Bismillah from 'src/components/dls/Bismillah/Bismillah';

interface Props {
  chapterId: string;
  pageNumber: number;
  translationName?: string;
  isTranslationSelected?: boolean;
}

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9'];

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
        <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Large} />
      </div>
      <div className={styles.bismillahContainer}>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && <Bismillah />}
      </div>
    </div>
  );
};

export default ChapterHeader;
