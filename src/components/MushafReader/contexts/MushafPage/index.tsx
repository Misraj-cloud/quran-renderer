import React, { useEffect } from 'react';
import MushafReader from 'src/components/MushafReader';
import { MushafPageProps } from './MushafPage.types';
import { useMushafContext } from './MushafPageProvider';
import 'src/styles/theme.scss';

const MushafPage: React.FC<MushafPageProps> = ({ onWordClick, onWordHover, styleOverride }) => {
  const { ayat: data, nextPageAyat, pageNumber } = useMushafContext();

  if (!data) return null;

  useEffect(() => {
    // Set global CSS variables (like SCSS vars but at runtime)
    styleOverride?.wordHighlightColor &&
      document.documentElement.style.setProperty(
        '--word-highlight-color',
        styleOverride?.wordHighlightColor,
      );
    styleOverride?.chapterHeaderFontSize &&
      document.documentElement.style.setProperty(
        '--chapter-header-font-size',
        styleOverride?.chapterHeaderFontSize,
      );
    styleOverride?.primaryFontColor &&
      document.documentElement.style.setProperty(
        '--primary-font-color',
        styleOverride?.primaryFontColor,
      );
  }, [styleOverride]);

  return (
    <MushafReader
      data={data}
      nextData={nextPageAyat ?? undefined}
      pageNumber={String(pageNumber)}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default MushafPage;
