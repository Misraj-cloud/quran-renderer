import { createContext, useContext, useMemo } from 'react';

import type { MushafTheme } from '@/core/types';
import { borderColorsValue } from '@/types/border-color';
import { ThemeProviderProps, ThemeState } from './type';

const ThemeContext = createContext<ThemeState | undefined>(undefined);

const defaultTheme: MushafTheme = {
  borderColor: 'green',
  wordHighlightColor: '#3E9257',
  chapterHeaderFontSize: '2rem',
  primaryFontColor: 'black',
  spacingMega: '2rem',
};

const createRootStyle = (theme: MushafTheme) =>
  ({
    '--primary-font-color': theme.primaryFontColor ?? defaultTheme.primaryFontColor,
    '--word-highlight-color': theme.wordHighlightColor ?? defaultTheme.wordHighlightColor,
    '--chapter-header-font-size':
      theme.chapterHeaderFontSize ?? defaultTheme.chapterHeaderFontSize,
    '--font-size': theme.fontSize,
    '--spacing-mega': theme.spacingMega ?? defaultTheme.spacingMega,
    '--mushaf-border-color':
      borderColorsValue[theme.borderColor ?? defaultTheme.borderColor ?? 'green'],
  }) as React.CSSProperties;

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({
  children,
  theme,
  classNames = {},
  styles = {},
  slotProps = {},
  renderers = {},
}: ThemeProviderProps) => {
  const resolvedTheme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);

  const value = useMemo<ThemeState>(
    () => ({
      theme: resolvedTheme,
      classNames,
      styles,
      slotProps,
      renderers,
      rootStyle: createRootStyle(resolvedTheme),
    }),
    [classNames, renderers, resolvedTheme, slotProps, styles],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
