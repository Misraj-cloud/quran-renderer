import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Ayah, Surah } from 'src/types/verses';
import type { DataId } from './QuranPage.types';
import type { QuranPageDataType } from './types';
import { fetchVerses } from './helpers/fetch-verses';

/** ---------- Types ---------- */
type QuranPageState = {
  // state
  fontScale: number;
  selectedVerse: Ayah | null;
  currentSurah: Surah | null;
  data: QuranPageDataType | null;
  error: Error | null;
  loading: boolean;
  pageNumber: number;
  dataId: DataId;
};

type QuranPageActions = {
  // actions
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  setSelectedVerse: React.Dispatch<React.SetStateAction<Ayah | null>>;
  setCurrentSurah: React.Dispatch<React.SetStateAction<Surah | null>>;
  refresh: () => void;
};

type QuranPageProviderProps = {
  children: React.ReactNode;
  dataId: DataId;
  pageNumber: number;
  initialFontScale?: number;
};

/** ---------- Helpers ---------- */

/** ---------- Contexts (split: state & actions) ---------- */
const QuranPageStateContext = createContext<QuranPageState | undefined>(undefined);
const QuranPageActionsContext = createContext<QuranPageActions | undefined>(undefined);

export const QuranPageProvider: React.FC<QuranPageProviderProps> = ({
  children,
  dataId,
  pageNumber,
  initialFontScale = 3,
}) => {
  const [fontScale, _setFontScale] = useState<number>(initialFontScale);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Ayah | null>(null);
  const [data, setData] = useState<QuranPageDataType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;

    setLoading(true);
    setError(null);

    try {
      const resp = await fetchVerses(pageNumber, dataId, ctl.signal);

      // Defensive guards
      const surah = resp?.data?.surahs?.[0] ?? null;
      const ayahs = (resp?.data?.ayahs ?? []) as QuranPageDataType;

      setCurrentSurah(surah);
      setData(ayahs);
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return; // ignore cancelled
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, dataId]);

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

  const state = useMemo<QuranPageState>(
    () => ({
      fontScale,
      selectedVerse,
      currentSurah,
      data,
      error,
      loading,
      pageNumber,
      dataId,
    }),
    [fontScale, selectedVerse, currentSurah, data, error, loading, pageNumber, dataId],
  );

  const actions = useMemo<QuranPageActions>(
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
    <QuranPageStateContext.Provider value={state}>
      <QuranPageActionsContext.Provider value={actions}>
        {children}
      </QuranPageActionsContext.Provider>
    </QuranPageStateContext.Provider>
  );
};

/** ---------- Hooks ---------- */
const useQuranPageState = () => {
  const ctx = useContext(QuranPageStateContext);
  if (!ctx) throw new Error('useQuranPageState must be used within a QuranPageProvider');
  return ctx;
};

const useQuranPageActions = () => {
  const ctx = useContext(QuranPageActionsContext);
  if (!ctx) throw new Error('useQuranPageActions must be used within a QuranPageProvider');
  return ctx;
};

/** Convenience: keep a compat hook name if you prefer */
export const useQuranPage = () => {
  const state = useQuranPageState();
  const actions = useQuranPageActions();
  return { ...state, ...actions };
};
