/* eslint-disable react/no-multi-comp */
import React from 'react';

import Word from '@/types/Word';
import { MushafPageDataType } from './contexts/MushafPage/types';
import ReadingView from './ReadingView';

interface Props {
  data: MushafPageDataType;
  resourceId: number | string;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
}

const MushafReaderView: React.FC<Props> = ({ data, resourceId, onWordClick, onWordHover }) => {
  return (
    <ReadingView
      data={data}
      resourceId={resourceId}
      onWordClick={onWordClick}
      onWordHover={onWordHover}
    />
  );
};

export default MushafReaderView;
