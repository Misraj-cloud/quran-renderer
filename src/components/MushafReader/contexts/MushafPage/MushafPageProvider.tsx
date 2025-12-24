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
import { fetchNarrationDifferences } from './helpers/fetch-differences';
import { NarrationDifference } from 'src/types/differences';
import type { DataId } from './MushafPage.types';
import { fetchVerses } from './helpers/fetch-verses';
import { ThemeProviderProps } from '../Theme/type';

type NarrationDifferences = NarrationDifference[];

/** ---------- Types ---------- */
type MushafPageState = {
  // state
  fontScale: number;
  selectedVerse: Ayah | null;
  ayat: IVersesListDto | null;
  nextPageAyat: IVersesListDto | null;
  narrationDifferences: NarrationDifferences | null;
  error: Error | null;
  pageNumber: number;
  dataId: DataId;
  hasBorder: boolean;
  initialIsTwoPagesView: boolean;
};

type MushafPageActions = {
  // actions
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  setSelectedVerse: React.Dispatch<React.SetStateAction<Ayah | null>>;
  refresh: () => void;
};

export type MushafPageProviderProps = {
  children: React.ReactNode;
  dataId: DataId;
  pageNumber: number;
  initialFontScale?: number;
  hasBorder?: boolean;
  initialIsTwoPagesView?: boolean;
  themeProps?: ThemeProviderProps['themeProps'];
  styleOverride?: ThemeProviderProps['styleOverride'];
  showNarrationDifferences?: {
    sourceEditionIdentifier: string;
    targetEditionIdentifier: string;
  } | null;
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
  showNarrationDifferences = null,
}: MushafPageProviderProps) => {
  const [fontScale, _setFontScale] = useState<number>(initialFontScale);
  const [selectedVerse, setSelectedVerse] = useState<Ayah | null>(null);
  const [ayat, setAyat] = useState<IVersesListDto | null>(null);
  const [nextPageAyat, setNextPageAyat] = useState<IVersesListDto | null>(null);
  const [narrationDifferences, setNarrationDifferences] = useState<NarrationDifferences | null>(
    null,
  );

  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const differencesAbortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;

    setError(null);
    setNarrationDifferences(null);

    try {
      const currPagePromise = fetchVerses(pageNumber, dataId, ctl.signal);
      const nextPagePromise = initialIsTwoPagesView
        ? fetchVerses(pageNumber + 1, dataId, ctl.signal)
        : Promise.resolve(undefined);

      const resp = await currPagePromise;
      let respNext: any | undefined;
      if (initialIsTwoPagesView) {
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
    }
  }, [pageNumber, dataId, initialIsTwoPagesView]);

  const loadDifferences = useCallback(async () => {
    if (
      !showNarrationDifferences ||
      showNarrationDifferences.sourceEditionIdentifier ===
        showNarrationDifferences.targetEditionIdentifier
    ) {
      setNarrationDifferences(null);
      return;
    }

    differencesAbortRef.current?.abort();
    const ctl = new AbortController();
    differencesAbortRef.current = ctl;

    try {
      const [resp, respNext] = await Promise.all([
        fetchNarrationDifferences(
          pageNumber,
          showNarrationDifferences.sourceEditionIdentifier,
          showNarrationDifferences.targetEditionIdentifier,
          ctl.signal,
        ),
        initialIsTwoPagesView &&
          fetchNarrationDifferences(
            pageNumber + 1,
            showNarrationDifferences.sourceEditionIdentifier,
            showNarrationDifferences.targetEditionIdentifier,
            ctl.signal,
          ),
      ]);

      console.log('response', resp);

      setNarrationDifferences([...resp.data, ...(respNext && respNext.data ? respNext.data : [])]);
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return;
      setNarrationDifferences(null);
    }
  }, [pageNumber, showNarrationDifferences]);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  useEffect(() => {
    loadDifferences();
    return () => differencesAbortRef.current?.abort();
  }, [loadDifferences]);

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
      narrationDifferences,
      error,
      pageNumber,
      dataId,
      hasBorder,
      initialIsTwoPagesView,
    }),
    [
      fontScale,
      selectedVerse,
      ayat,
      nextPageAyat,
      narrationDifferences,
      error,
      pageNumber,
      dataId,
      hasBorder,
      initialIsTwoPagesView,
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
