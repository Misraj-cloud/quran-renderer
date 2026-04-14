/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import readingViewStyles from './ReadingView/ReadingView.module.scss';

import { MushafPageProps } from './contexts/MushafPage/MushafPage.types';
import { useMushafContext } from './contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from './contexts/Theme/ThemeProvider';
import Page from './ReadingView/Page';

const Mushaf = ({ onWordClick, onWordHover }: MushafPageProps) => {
  const { ayat, nextPageAyat, pageNumber, isTwoPagesView } = useMushafContext();
  const { rootStyle, slotProps, classNames: slotClassNames, styles: slotStyles } =
    useThemeContext();

  const currentPage = Number(pageNumber);

  return (
    <div
      {...slotProps.root}
      className={classNames(
        'misraj-mushaf-root',
        readingViewStyles.container,
        slotClassNames.root,
        slotProps.root?.className,
      )}
      style={{
        ...rootStyle,
        ...slotStyles.root,
        ...slotProps.root?.style,
      }}
    >
      {isTwoPagesView && nextPageAyat ? (
        <div
          className={classNames(styles.twoPagesRow, slotClassNames.twoPageLayout)}
          style={{
            ...slotStyles.twoPageLayout,
          }}
        >
          <Page
            verses={ayat?.data.ayahs || []}
            key={`page-${currentPage}`}
            pageNumber={currentPage}
            pageIndex={currentPage}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
          />
          <Page
            verses={nextPageAyat.data.ayahs || []}
            key={`page-${currentPage + 1}`}
            pageNumber={currentPage + 1}
            pageIndex={currentPage + 1}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
          />
        </div>
      ) : (
        <Page
          verses={ayat?.data.ayahs || []}
          key={`page-${currentPage}`}
          pageNumber={currentPage}
          pageIndex={currentPage}
          onWordClick={onWordClick}
          onWordHover={onWordHover}
        />
      )}
    </div>
  );
};

export default Mushaf;
