import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Ayah } from '@/types/verses';
import type { MushafControllerOptions, MushafReaderValue, NarrationId } from './types';
import { useControllableState } from './useControllableState';

const DEFAULT_DATA_ID: NarrationId = 'quran-hafs';

export const useMushafController = ({
  dataId = DEFAULT_DATA_ID,
  pageNumber,
  defaultPageNumber = 1,
  onPageNumberChange,
  fontScale,
  defaultFontScale = 3,
  onFontScaleChange,
  selectedVerse,
  defaultSelectedVerse = null,
  onSelectedVerseChange,
  twoPageView,
  defaultTwoPageView = false,
  onTwoPageViewChange,
  hasBorder = true,
  pageData,
  nextPageData,
  narrationDifferences,
  dataSource,
  narrationDifferencesRequest = null,
}: MushafControllerOptions): MushafReaderValue => {
  const [resolvedPageNumber, setResolvedPageNumber] = useControllableState<number>({
    value: pageNumber,
    defaultValue: defaultPageNumber,
    onChange: onPageNumberChange,
  });
  const [resolvedFontScale, setResolvedFontScale] = useControllableState<number>({
    value: fontScale,
    defaultValue: defaultFontScale,
    onChange: onFontScaleChange,
  });
  const [resolvedSelectedVerse, setResolvedSelectedVerse] = useControllableState<Ayah | null>({
    value: selectedVerse,
    defaultValue: defaultSelectedVerse,
    onChange: onSelectedVerseChange,
  });
  const [resolvedTwoPageView, setResolvedTwoPageView] = useControllableState<boolean>({
    value: twoPageView,
    defaultValue: defaultTwoPageView,
    onChange: onTwoPageViewChange,
  });

  const [ayat, setAyat] = useState(pageData ?? null);
  const [nextPageAyat, setNextPageAyat] = useState(nextPageData ?? null);
  const [resolvedNarrationDifferences, setResolvedNarrationDifferences] = useState(
    narrationDifferences ?? null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (pageData !== undefined) {
      setAyat(pageData);
    }
  }, [pageData]);

  useEffect(() => {
    if (nextPageData !== undefined) {
      setNextPageAyat(nextPageData);
    }
  }, [nextPageData]);

  useEffect(() => {
    if (narrationDifferences !== undefined) {
      setResolvedNarrationDifferences(narrationDifferences);
    }
  }, [narrationDifferences]);

  const load = useCallback(async () => {
    if (!dataSource || pageData !== undefined) {
      setAyat(pageData ?? null);
      setNextPageAyat(nextPageData ?? null);
      setResolvedNarrationDifferences(narrationDifferences ?? null);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setIsLoading(true);

    try {
      const currentPagePromise = dataSource.getPage({
        pageNumber: resolvedPageNumber,
        dataId,
        signal: controller.signal,
      });
      const nextPagePromise = resolvedTwoPageView
        ? dataSource.getPage({
            pageNumber: resolvedPageNumber + 1,
            dataId,
            signal: controller.signal,
          })
        : Promise.resolve(null);
      const differencesPromise =
        narrationDifferencesRequest &&
        narrationDifferencesRequest.sourceEditionIdentifier !==
          narrationDifferencesRequest.targetEditionIdentifier &&
        dataSource.getNarrationDifferences
          ? Promise.all([
              dataSource.getNarrationDifferences({
                pageNumber: resolvedPageNumber,
                ...narrationDifferencesRequest,
                signal: controller.signal,
              }),
              resolvedTwoPageView
                ? dataSource.getNarrationDifferences({
                    pageNumber: resolvedPageNumber + 1,
                    ...narrationDifferencesRequest,
                    signal: controller.signal,
                  })
                : Promise.resolve(null),
            ])
          : Promise.resolve<[null, null]>([null, null]);

      const [currentPage, maybeNextPage, [currentDifferences, nextDifferences]] = await Promise.all([
        currentPagePromise,
        nextPagePromise,
        differencesPromise,
      ]);

      setAyat(currentPage);
      setNextPageAyat(maybeNextPage);
      setResolvedNarrationDifferences(
        [...(currentDifferences ?? []), ...(nextDifferences ?? [])].filter(Boolean),
      );
    } catch (unknownError) {
      if ((unknownError as Error)?.name === 'AbortError') return;

      setError(unknownError instanceof Error ? unknownError : new Error('Unknown error'));
      setAyat(null);
      setNextPageAyat(null);
      setResolvedNarrationDifferences(null);
    } finally {
      setIsLoading(false);
    }
  }, [
    dataId,
    dataSource,
    narrationDifferences,
    narrationDifferencesRequest,
    nextPageData,
    pageData,
    resolvedPageNumber,
    resolvedTwoPageView,
  ]);

  useEffect(() => {
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const increaseFontScale = useCallback(() => {
    setResolvedFontScale((previousValue) => (previousValue < 10 ? previousValue + 1 : previousValue));
  }, [setResolvedFontScale]);

  const decreaseFontScale = useCallback(() => {
    setResolvedFontScale((previousValue) => (previousValue > 3 ? previousValue - 1 : previousValue));
  }, [setResolvedFontScale]);

  return useMemo(
    () => ({
      fontScale: resolvedFontScale,
      selectedVerse: resolvedSelectedVerse,
      ayat,
      nextPageAyat,
      narrationDifferences: resolvedNarrationDifferences,
      error,
      pageNumber: resolvedPageNumber,
      dataId,
      hasBorder,
      isTwoPagesView: resolvedTwoPageView,
      isLoading,
      increaseFontScale,
      decreaseFontScale,
      setSelectedVerse: setResolvedSelectedVerse,
      setPageNumber: setResolvedPageNumber,
      setFontScale: setResolvedFontScale,
      setTwoPagesView: setResolvedTwoPageView,
      refresh: load,
    }),
    [
      ayat,
      dataId,
      decreaseFontScale,
      error,
      hasBorder,
      increaseFontScale,
      isLoading,
      load,
      nextPageAyat,
      narrationDifferences,
      resolvedFontScale,
      resolvedNarrationDifferences,
      resolvedPageNumber,
      resolvedSelectedVerse,
      resolvedTwoPageView,
      setResolvedFontScale,
      setResolvedPageNumber,
      setResolvedSelectedVerse,
      setResolvedTwoPageView,
    ],
  );
};

export default useMushafController;
