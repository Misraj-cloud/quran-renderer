/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import MushafReaderView from './MushafReaderView';

import { MushafReaderDataType } from 'src/types/MushafReader';
import Word from '@/types/Word';
import { MushafPageDataType } from './contexts/MushafPage/types';

type MushafReaderProps = {
  data: MushafPageDataType;
  id: number | string; // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  mushafReaderDataType?: MushafReaderDataType;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const MushafReader = ({ data, id, onWordClick, onWordHover }: MushafReaderProps) => {
  return (
    <>
      <div className={classNames(styles.container)}>
        <MushafReaderView
          data={data}
          resourceId={id}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
        />
      </div>
    </>
  );
};

export default MushafReader;

// Documentation for this component:
// ContextMenu is the one shown at the top of the page, containing surah name, juz' number ... etc
