import type { MushafClassNames, MushafRenderers, MushafSlotProps, MushafStyles, MushafTheme } from '@/core';
import {
  MushafPageProvider,
  type MushafPageProviderProps,
} from './contexts/MushafPage/MushafPageProvider';
import { ThemeProvider } from './contexts/Theme/ThemeProvider';

export type MushafReaderProviderProps = MushafPageProviderProps & {
  theme?: MushafTheme;
  classNames?: MushafClassNames;
  styles?: MushafStyles;
  slotProps?: MushafSlotProps;
  renderers?: MushafRenderers;
};

const MushafReaderProvider = ({
  children,
  theme,
  classNames,
  styles,
  slotProps,
  renderers,
  ...props
}: MushafReaderProviderProps) => (
  <ThemeProvider
    theme={theme}
    classNames={classNames}
    styles={styles}
    slotProps={slotProps}
    renderers={renderers}
  >
    <MushafPageProvider {...props}>{children}</MushafPageProvider>
  </ThemeProvider>
);

export default MushafReaderProvider;
