import { createContext, useContext, useEffect } from 'react';
import { borderColorsValue } from 'src/types/border-color';
import { ThemeProviderProps, ThemeState } from './type';

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({
  children,
  themeProps = {},
  styleOverride = {},
}: ThemeProviderProps) => {
  useEffect(() => {
    if (themeProps.borderColor) {
      document.documentElement.style.setProperty(
        '--word-highlight-color',
        borderColorsValue[themeProps.borderColor],
      );
    }
    if (themeProps.wordHighlightColor) {
      document.documentElement.style.setProperty(
        '--word-highlight-color',
        themeProps.wordHighlightColor,
      );
    }
    if (themeProps.chapterHeaderFontSize) {
      document.documentElement.style.setProperty(
        '--chapter-header-font-size',
        themeProps.chapterHeaderFontSize,
      );
    }
    if (themeProps.primaryFontColor) {
      document.documentElement.style.setProperty(
        '--primary-font-color',
        themeProps.primaryFontColor,
      );
    }
  }, [themeProps]);

  const value = {
    themeProps,
    styleOverride,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
