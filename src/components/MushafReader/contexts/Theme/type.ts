import React from 'react';

import type {
  MushafClassNames,
  MushafRenderers,
  MushafSlotProps,
  MushafStyles,
  MushafTheme,
} from '@/core/types';

export type ThemeState = {
  theme: MushafTheme;
  classNames: MushafClassNames;
  styles: MushafStyles;
  slotProps: MushafSlotProps;
  renderers: MushafRenderers;
  rootStyle: React.CSSProperties;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: MushafTheme;
  classNames?: MushafClassNames;
  styles?: MushafStyles;
  slotProps?: MushafSlotProps;
  renderers?: MushafRenderers;
};
