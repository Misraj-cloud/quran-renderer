import Mushaf from '@/components/MushafReader';
import MushafReaderProvider, {
  type MushafReaderProviderProps,
} from '@/components/MushafReader/Provider';
import type { MushafPageProps } from '@/components/MushafReader/contexts/MushafPage/MushafPage.types';
export type MushafReaderProps = MushafReaderProviderProps & MushafPageProps;

const MushafReader = ({
  onWordClick,
  onWordHover,
  theme,
  classNames,
  styles,
  slotProps,
  renderers,
  ...providerProps
}: MushafReaderProps) => (
  <MushafReaderProvider
    {...providerProps}
    theme={theme}
    classNames={classNames}
    styles={styles}
    slotProps={slotProps}
    renderers={renderers}
  >
    <Mushaf onWordClick={onWordClick} onWordHover={onWordHover} />
  </MushafReaderProvider>
);

export { MushafReader };
export { default as Mushaf } from '@/components/MushafReader';
export { default as MushafReaderProvider } from '@/components/MushafReader/Provider';
export { useMushafContext } from '@/components/MushafReader/contexts/MushafPage/MushafPageProvider';
export type { MushafPageProps } from '@/components/MushafReader/contexts/MushafPage/MushafPage.types';
export default MushafReader;
