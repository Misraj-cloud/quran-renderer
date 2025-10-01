import React from 'react';
import MushafReader from 'src/components/MushafReader';
import { MushafPageProps } from './MushafPage.types';
import { useMushafContext } from './MushafPageProvider';

const MushafPage: React.FC<MushafPageProps> = ({ onWordClick, onWordHover }) => {
  const { data, pageNumber } = useMushafContext();

  if (!data) return null;

  return (
    <MushafReader
      data={data}
      pageNumber={String(pageNumber)}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default MushafPage;
