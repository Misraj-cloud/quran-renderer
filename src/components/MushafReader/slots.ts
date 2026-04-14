import type { CSSProperties } from 'react';

import classNames from 'classnames';

import type { MushafSlot } from '@/core/types';
import { useThemeContext } from './contexts/Theme/ThemeProvider';

export const useSlotClassName = (slot: MushafSlot, defaultClassName?: string) => {
  const { classNames: slotClassNames } = useThemeContext();
  return classNames(defaultClassName, slotClassNames[slot]);
};

export const useSlotStyle = (slot: MushafSlot, fallbackStyle?: CSSProperties) => {
  const { styles } = useThemeContext();
  return {
    ...fallbackStyle,
    ...styles[slot],
  } as CSSProperties;
};

export const mergeSlotStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => Object.assign({}, ...styles.filter(Boolean));
