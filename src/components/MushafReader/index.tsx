/* eslint-disable react/no-multi-comp */

import classNames from 'classnames';

import styles from './MushafReader.module.scss';
import readingViewStyles from './ReadingView/ReadingView.module.scss';

import { MushafPageProps } from './contexts/MushafPage/MushafPage.types';
import { useMushafContext } from './contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from './contexts/Theme/ThemeProvider';
import Page from './ReadingView/Page';

const Mushaf = ({ onWordClick, onWordHover }: MushafPageProps) => {
  const { ayat, nextPageAyat, pageNumber } = useMushafContext();
  const { styleOverride } = useThemeContext();

  const { initialIsTwoPagesView } = useMushafContext();
  const currentPage = Number(pageNumber);

  return (
    <div
      className={classNames(readingViewStyles.container)}
      style={styleOverride?.ReadingView?.container}
    >
      {initialIsTwoPagesView && nextPageAyat ? (
        <div
          className={classNames(styles.twoPagesRow)}
          style={styleOverride?.MushafReader?.twoPagesRow}
        >
          <Page
            verses={ayat?.data.ayahs || []}
            key={`page-${currentPage}`}
            pageNumber={currentPage}
            pageIndex={currentPage}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
            pageStyleOverride={styleOverride?.firstPage}
          />
          <Page
            verses={nextPageAyat.data.ayahs || []}
            key={`page-${currentPage + 1}`}
            pageNumber={currentPage + 1}
            pageIndex={currentPage + 1}
            onWordClick={onWordClick}
            onWordHover={onWordHover}
            pageStyleOverride={styleOverride?.secondPage}
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
