import { QuranReaderDataType } from '@/types/QuranReader';
import React from 'react';
import QuranReader from 'src/components/QuranReader';
import { QuranPageProps } from './QuranPage.types';
import { useQuranPage } from './QuranPageProvider';

const QuranPage: React.FC<QuranPageProps> = ({ onWordClick, onWordHover }) => {
  const { data, pageNumber } = useQuranPage();

  if (!data) return null;

  return (
    <QuranReader
      data={data}
      id={String(pageNumber)}
      quranReaderDataType={QuranReaderDataType.Page}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default QuranPage;
