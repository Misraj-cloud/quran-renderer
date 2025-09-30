import Word from '@/types/Word';
import classNames from 'classnames';
import { QuranPageDataType } from 'src/components/QuranReader/contexts/QuranPage/types';
import PageContainer from './PageContainer';
import styles from './ReadingView.module.scss';

type ReadingViewProps = {
  data: QuranPageDataType;
  resourceId: number | string; // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  theme?: {};
};

const ReadingView = ({ data, resourceId, onWordClick, onWordHover, theme }: ReadingViewProps) => {
  return (
    <>
      <div className={classNames(styles.container)}>
        <PageContainer
          pageNumber={resourceId as number}
          data={data}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
          theme={theme}
        />
      </div>
    </>
  );
};

export default ReadingView;
