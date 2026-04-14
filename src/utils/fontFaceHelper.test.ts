import { describe, expect, it } from 'vitest';

import { MushafFont, MushafLines } from '@/types/MushafReader';

import { getFontClassName, getLineWidthClassName } from './fontFaceHelper';

describe('fontFaceHelper', () => {
  it('builds indopak font and line-width class names with mushaf lines', () => {
    expect(getFontClassName(MushafFont.IndoPak, 4, MushafLines.FifteenLines)).toBe(
      'text_indopak_15_lines-font-size-4',
    );
    expect(getLineWidthClassName(MushafFont.IndoPak, 4, MushafLines.FifteenLines)).toBe(
      'text_indopak_15_lines-line-width-4',
    );
  });

  it('builds fallback class names for non-indopak fonts', () => {
    expect(getFontClassName(MushafFont.QPCHafs, 3, MushafLines.FifteenLines, true)).toBe(
      'fallback_qpc_uthmani_hafs-font-size-3',
    );
    expect(getLineWidthClassName(MushafFont.QPCHafs, 3, MushafLines.FifteenLines, true)).toBe(
      'fallback_qpc_uthmani_hafs-line-width-3',
    );
  });
});
