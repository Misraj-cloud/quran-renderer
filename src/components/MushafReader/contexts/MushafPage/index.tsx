import React, { useEffect } from 'react';
import MushafReader from 'src/components/MushafReader';
import { MushafPageProps } from './MushafPage.types';
import { useMushafContext } from './MushafPageProvider';
import 'src/styles/theme.scss';

const MushafPage: React.FC<MushafPageProps> = ({ onWordClick, onWordHover }) => {
  const { ayat: data, nextPageAyat, pageNumber } = useMushafContext();

  if (!data) return null;

  useEffect(() => {
    // Set global CSS variables (like SCSS vars but at runtime)
    document.documentElement.style.setProperty('--word-highlight-color', 'blue');
  }, []);

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
