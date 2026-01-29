import { HOST_API } from 'src/config-global';
import type { IVersesListDto } from 'src/types/verses';
import { DataId } from '../MushafPage.types';
import { HostApiEnvironment } from '../MushafPageProvider';

const versesUrl = (
  pageNumber: number,
  identifier = 'quran-hafs',
  hostApiEnvironment: HostApiEnvironment,
) => {
  // Prefer URL for safety; avoids accidental double slashes
  const url = new URL(`v1/page/${Number(pageNumber)}/${identifier}`, HOST_API[hostApiEnvironment]);
  url.searchParams.set('words', 'true');
  return url.toString();
};

export async function fetchVerses(
  pageNumber: number,
  dataId: DataId,
  hostApiEnvironment: HostApiEnvironment,
  signal?: AbortSignal,
) {
  const identifier = typeof dataId === 'string' && dataId ? dataId : 'quran-hafs';
  const res = await fetch(versesUrl(pageNumber, identifier, hostApiEnvironment), {
    cache: 'default', // allow HTTP caching via ETag/Last-Modified
    signal,
  });
  if (!res.ok) {
    throw new Error(`Failed to load page ${pageNumber}: ${res.status} ${res.statusText}`);
  }
  const json: IVersesListDto = await res.json();
  return json;
}
