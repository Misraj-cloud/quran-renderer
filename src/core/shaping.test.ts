import { describe, expect, it } from 'vitest';

import { buildNarrationDifferencesMap, groupVersesByLines } from '@/core/shaping';
import { sampleAyahs, sampleNarrationDifferences } from '@/test/fixtures';

describe('core shaping', () => {
  it('groups verses into stable page-line buckets', () => {
    const lines = groupVersesByLines(sampleAyahs);

    expect(Object.keys(lines)).toEqual(['Page1-Line1', 'Page1-Line2']);
    expect(lines['Page1-Line1']).toHaveLength(2);
  });

  it('creates a quick narration-differences lookup map', () => {
    const map = buildNarrationDifferencesMap(sampleNarrationDifferences);

    expect(map?.get('1:1:2')).toEqual({
      differenceText: 'sample',
      differenceContent: 'sample-content',
    });
  });
});
