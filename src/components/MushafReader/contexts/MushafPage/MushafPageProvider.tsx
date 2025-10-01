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
import type { DataId } from './MushafPage.types';
import type { MushafPageDataType } from './types';
import { fetchVerses } from './helpers/fetch-verses';

/** ---------- Types ---------- */
type MushafPageState = {
  // state
  fontScale: number;
  selectedVerse: Ayah | null;
  currentSurah: Surah | null;
  data: MushafPageDataType | null;
  error: Error | null;
  loading: boolean;
  pageNumber: number;
  dataId: DataId;
  hasBorder: boolean;
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
};

/** ---------- Helpers ---------- */

/** ---------- Contexts (split: state & actions) ---------- */
const MushafPageStateContext = createContext<MushafPageState | undefined>(undefined);
const MushafPageActionsContext = createContext<MushafPageActions | undefined>(undefined);

export const MushafPageProvider: React.FC<MushafPageProviderProps> = ({
  children,
  dataId,
  pageNumber,
  initialFontScale = 3,
  hasBorder = true,
}) => {
  const [fontScale, _setFontScale] = useState<number>(initialFontScale);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Ayah | null>(null);
  const [data, setData] = useState<MushafPageDataType | null>(null);
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
      const ayahs = (resp?.data?.ayahs ?? []) as MushafPageDataType;

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

  const state = useMemo<MushafPageState>(
    () => ({
      fontScale,
      selectedVerse,
      currentSurah,
      data,
      error,
      loading,
      pageNumber,
      dataId,
      hasBorder,
    }),
    [fontScale, selectedVerse, currentSurah, data, error, loading, pageNumber, dataId, hasBorder],
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
