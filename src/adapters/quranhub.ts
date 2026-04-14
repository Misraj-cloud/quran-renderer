import { HOST_API } from '@/config-global';
import type { INarrationsDifferencesDto } from '@/types/differences';
import type { IVersesListDto } from '@/types/verses';
import type { MushafDataSource } from '@/core/types';

export type QuranhubEnvironment = 'production' | 'staging';

export type QuranhubDataSourceOptions = {
  baseUrl?: string;
  environment?: QuranhubEnvironment;
  fetchImplementation?: typeof fetch;
};

const resolveBaseUrl = (options?: QuranhubDataSourceOptions): string =>
  options?.baseUrl ?? HOST_API[options?.environment ?? 'production'];

export const createQuranhubDataSource = (
  options?: QuranhubDataSourceOptions,
): MushafDataSource => {
  const baseUrl = resolveBaseUrl(options);
  const fetchImplementation = options?.fetchImplementation ?? fetch;

  return {
    async getPage({ pageNumber, dataId, signal }) {
      const url = new URL(`v1/page/${Number(pageNumber)}/${dataId}`, baseUrl);
      url.searchParams.set('words', 'true');

      const response = await fetchImplementation(url.toString(), {
        cache: 'default',
        signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to load page ${pageNumber}: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as IVersesListDto;
    },
    async getNarrationDifferences({
      pageNumber,
      sourceEditionIdentifier,
      targetEditionIdentifier,
      signal,
    }) {
      const url = new URL('v1/narrations-differences/', baseUrl);
      url.searchParams.set('pageNumber', String(pageNumber));
      url.searchParams.set('sourceNarrationEditionIdentifier', sourceEditionIdentifier);
      url.searchParams.set('targetNarrationsEditionsIdentifiers', targetEditionIdentifier);

      const response = await fetchImplementation(url.toString(), {
        cache: 'default',
        signal,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load narration differences for page ${pageNumber}: ${response.status} ${response.statusText}`,
        );
      }

      const payload = (await response.json()) as INarrationsDifferencesDto;
      return payload.data;
    },
  };
};

export default createQuranhubDataSource;
