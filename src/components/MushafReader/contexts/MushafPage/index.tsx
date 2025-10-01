import { MushafReaderDataType } from 'src/types/MushafReader';
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
      id={String(pageNumber)}
      mushafReaderDataType={MushafReaderDataType.Page}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default MushafPage;
