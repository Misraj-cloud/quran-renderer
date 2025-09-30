/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './QuranReader.module.scss';
import QuranReaderView from './QuranReaderView';

import { QuranReaderDataType } from '@/types/QuranReader';
import Word from '@/types/Word';
import { QuranPageDataType } from './contexts/QuranPage/types';

type QuranReaderProps = {
  data: QuranPageDataType;
  id: number | string; // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  quranReaderDataType?: QuranReaderDataType;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const QuranReader = ({ data, id, onWordClick, onWordHover }: QuranReaderProps) => {
  return (
    <>
      <div className={classNames(styles.container)}>
        <QuranReaderView
          data={data}
          resourceId={id}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
        />
      </div>
    </>
  );
};

export default QuranReader;

// Documentation for this component:
// ContextMenu is the one shown at the top of the page, containing surah name, juz' number ... etc
