import { afterEach, describe, expect, it, vi } from 'vitest';

import { createQuranhubDataSource } from '@/adapters/quranhub';
import { sampleNarrationDifferences, samplePageData } from '@/test/fixtures';

describe('createQuranhubDataSource', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads page data with the expected endpoint shape', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => samplePageData,
    });

    vi.stubGlobal('fetch', fetchMock);

    const dataSource = createQuranhubDataSource();
    const payload = await dataSource.getPage({
      pageNumber: 1,
      dataId: 'quran-hafs',
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toContain('/v1/page/1/quran-hafs?words=true');
    expect(payload?.data.ayahs).toHaveLength(2);
  });

  it('loads narration differences through the adapter contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        code: 200,
        status: 'OK',
        data: sampleNarrationDifferences,
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const dataSource = createQuranhubDataSource();
    const payload = await dataSource.getNarrationDifferences?.({
      pageNumber: 1,
      sourceEditionIdentifier: 'quran-warsh',
      targetEditionIdentifier: 'quran-hafs',
    });

    expect(fetchMock.mock.calls[0][0]).toContain('v1/narrations-differences/');
    expect(payload).toEqual(sampleNarrationDifferences);
  });
});
