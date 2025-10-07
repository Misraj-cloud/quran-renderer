import {
  MushafPageProvider,
  MushafPageProviderProps,
} from './contexts/MushafPage/MushafPageProvider';
import { ThemeProvider } from './contexts/Theme/ThemeProvider';
import { ThemeProviderProps } from './contexts/Theme/type';

type MushafReaderProviderProps = MushafPageProviderProps & {
  themeProps?: ThemeProviderProps['themeProps'];
  styleOverride?: ThemeProviderProps['styleOverride'];
};

const MushafReaderProvider = ({
  children,
  themeProps,
  styleOverride,
  ...props
}: MushafReaderProviderProps) => {
  return (
    <ThemeProvider themeProps={themeProps} styleOverride={styleOverride}>
      <MushafPageProvider {...props}>{children}</MushafPageProvider>
    </ThemeProvider>
  );
};

export default MushafReaderProvider;
