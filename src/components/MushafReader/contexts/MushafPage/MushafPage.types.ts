import React from 'react';

import type Word from '@/types/Word';
export type { DataId } from '@/core/types';

export interface MushafPageProps {
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
}
