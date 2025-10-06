import useMediaQuery from '@/hooks/use-media-query';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Ayah, IVersesListDto } from 'src/types/verses';
import type { DataId } from './MushafPage.types';
import { fetchVerses } from './helpers/fetch-verses';

/** ---------- Types ---------- */
type MushafPageState = {
  // state
  fontScale: number;
  selectedVerse: Ayah | null;
  ayat: IVersesListDto | null;
  nextPageAyat: IVersesListDto | null;
  error: Error | null;
  loading: boolean;
  pageNumber: number;
  dataId: DataId;
  hasBorder: boolean;
  isTwoPagesView: boolean;
};

type MushafPageActions = {
  // actions
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  setSelectedVerse: React.Dispatch<React.SetStateAction<Ayah | null>>;
  refresh: () => void;
};

type MushafPageProviderProps = {
  children: React.ReactNode;
  dataId: DataId;
  pageNumber: number;
  initialFontScale?: number;
  hasBorder?: boolean;
  initialIsTwoPagesView?: boolean;
};

/** ---------- Helpers ---------- */

/** ---------- Contexts (split: state & actions) ---------- */
const MushafPageStateContext = createContext<MushafPageState | undefined>(undefined);
const MushafPageActionsContext = createContext<MushafPageActions | undefined>(undefined);

export const MushafPageProvider = ({
  children,
  dataId,
  pageNumber,
  initialFontScale = 3,
  hasBorder = true,
  initialIsTwoPagesView = false,
}: MushafPageProviderProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [fontScale, _setFontScale] = useState<number>(initialFontScale);
  const [selectedVerse, setSelectedVerse] = useState<Ayah | null>(null);
  const [ayat, setAyat] = useState<IVersesListDto | null>(null);
  const [nextPageAyat, setNextPageAyat] = useState<IVersesListDto | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  const isTwoPagesView = isDesktop && initialIsTwoPagesView;

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;

    setLoading(true);
    setError(null);

    try {
      const currPagePromise = fetchVerses(pageNumber, dataId, ctl.signal);
      const nextPagePromise = isTwoPagesView
        ? fetchVerses(pageNumber + 1, dataId, ctl.signal)
        : Promise.resolve(undefined);

      const resp = await currPagePromise;
      let respNext: any | undefined;
      if (isTwoPagesView) {
        try {
          respNext = await nextPagePromise;
        } catch {
          respNext = undefined;
        }
      }

      setAyat(resp);

      // Next page data (when applicable)
      setNextPageAyat(respNext);
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return; // ignore cancelled
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setAyat(null);
      setNextPageAyat(null);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, dataId, isTwoPagesView]);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  const increaseFontScale = useCallback(() => {
    _setFontScale((prev) => (prev < 10 ? prev + 1 : prev));
  }, []);

  const decreaseFontScale = useCallback(() => {
    _setFontScale((prev) => (prev > 3 ? prev - 1 : prev));
  }, []);

  const state = useMemo<MushafPageState>(
    () => ({
      fontScale,
      selectedVerse,
      ayat,
      nextPageAyat,
      error,
      loading,
      pageNumber,
      dataId,
      hasBorder,
      isTwoPagesView,
    }),
    [
      fontScale,
      selectedVerse,
      ayat,
      nextPageAyat,
      error,
      loading,
      pageNumber,
      dataId,
      hasBorder,
      isTwoPagesView,
    ],
  );

  const actions = useMemo<MushafPageActions>(
    () => ({
      increaseFontScale,
      decreaseFontScale,
      setSelectedVerse,
      refresh: load,
    }),
    [increaseFontScale, decreaseFontScale, setSelectedVerse, load],
  );

  return (
    <MushafPageStateContext.Provider value={state}>
      <MushafPageActionsContext.Provider value={actions}>
        {children}
      </MushafPageActionsContext.Provider>
    </MushafPageStateContext.Provider>
  );
};

/** ---------- Hooks ---------- */
const useMushafPageState = () => {
  const ctx = useContext(MushafPageStateContext);
  if (!ctx) throw new Error('useMushafPageState must be used within a MushafPageProvider');
  return ctx;
};

const useMushafPageActions = () => {
  const ctx = useContext(MushafPageActionsContext);
  if (!ctx) throw new Error('useMushafPageActions must be used within a MushafPageProvider');
  return ctx;
};

export type MushafContextStateTypes = MushafPageState & MushafPageActions;

/** Convenience: keep a compat hook name if you prefer */
export const useMushafContext = (): MushafContextStateTypes => {
  const state = useMushafPageState();
  const actions = useMushafPageActions();
  return { ...state, ...actions };
};
