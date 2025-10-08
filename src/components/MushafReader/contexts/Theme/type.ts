import React from 'react';
import classnames from 'src/classnames';
import { BorderColor } from 'src/types/border-color';

type ThemeProps = {
  borderColor?: BorderColor;
  wordHighlightColor?: string;
  chapterHeaderFontSize?: string;
  primaryFontColor?: string;
};

// helpers (optional but tidy)
type ClassnameGroups = typeof classnames;
type GroupName = keyof ClassnameGroups;
type GroupKey<K extends GroupName> = ClassnameGroups[K][number];

// new StyleOverride
export type StyleOverride = {
  [K in GroupName]?: Partial<Record<GroupKey<K>, React.CSSProperties>>;
};

export type ThemeState = {
  themeProps: ThemeProps;
  styleOverride: StyleOverride;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  themeProps?: ThemeProps;
  styleOverride?: StyleOverride;
};
