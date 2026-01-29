import { HOST_API } from 'src/config-global';
import type { INarrationsDifferencesDto } from 'src/types/differences';
import { HostApiEnvironment } from '../MushafPageProvider';

type DifferencesPathBuilder = (
  page: number,
  sourceEditionIdentifier: string,
  marginEditionIdentifier: string,
) => string;

const defaultDifferencesPath: DifferencesPathBuilder = (
  pageNumber,
  sourceEditionIdentifier,
  marginEditionIdentifier,
) =>
  `v1/narrations-differences/?pageNumber=${pageNumber}&sourceNarrationEditionIdentifier=${sourceEditionIdentifier}&targetNarrationsEditionsIdentifiers=${marginEditionIdentifier}`;

const differencesUrl = (
  pageNumber: number,
  sourceEditionIdentifier: string,
  marginEditionIdentifier: string,
  hostApiEnvironment: HostApiEnvironment,
) => {
  const path = defaultDifferencesPath(pageNumber, sourceEditionIdentifier, marginEditionIdentifier);
  return new URL(path, HOST_API[hostApiEnvironment]).toString();
};

export const fetchNarrationDifferences = async (
  pageNumber: number,
  sourceEditionIdentifier: string,
  marginEditionIdentifier: string,
  hostApiEnvironment: HostApiEnvironment,
  signal?: AbortSignal,
) => {
  const res = await fetch(
    differencesUrl(
      pageNumber,
      sourceEditionIdentifier,
      marginEditionIdentifier,
      hostApiEnvironment,
    ),
    {
      cache: 'default',
      signal,
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to load narration differences for page ${pageNumber}: ${res.status} ${res.statusText}`,
    );
  }

  const json: INarrationsDifferencesDto = await res.json();
  return json;
};
