import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import type { Ayah, Surah } from 'src/types/verses';
import type { DataId } from './MushafPage.types';
import type { MushafPageDataType } from './types';
import { fetchVerses } from './helpers/fetch-verses';

/** ---------- Types ---------- */
type MushafPageState = {
  // state
  fontScale: number;
  selectedVerse: Ayah | null;
  currentSurah: Surah | null;
  ayat: MushafPageDataType | null;
  nextPageAyat: MushafPageDataType | null;
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
  setCurrentSurah: React.Dispatch<React.SetStateAction<Surah | null>>;
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
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Ayah | null>(null);
  const [ayat, setAyat] = useState<MushafPageDataType | null>(null);
  const [nextPageAyat, setNextPageAyat] = useState<MushafPageDataType | null>(null);
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

      // Defensive guards for current page
      const surah = resp?.data?.surahs?.[0] ?? null;
      const ayahs = (resp?.data?.ayahs ?? []) as MushafPageDataType;

      setCurrentSurah(surah);
      setAyat(ayahs);

      // Next page data (when applicable)
      const nextAyahs = (respNext?.data?.ayahs ?? null) as MushafPageDataType | null;
      setNextPageAyat(nextAyahs);
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
      currentSurah,
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
      currentSurah,
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
      setCurrentSurah,
      refresh: load,
    }),
    [increaseFontScale, decreaseFontScale, setSelectedVerse, setCurrentSurah, load],
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

/** Convenience: keep a compat hook name if you prefer */
export const useMushafContext = () => {
  const state = useMushafPageState();
  const actions = useMushafPageActions();
  return { ...state, ...actions };
};
