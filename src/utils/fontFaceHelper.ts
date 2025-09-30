import { MushafLines, QuranFont } from '@/types/QuranReader';

/**
 * Dynamically generate the className of the combination between the font
 * name + size + mushafLines(when its Indopak) that will match the output of
 * generate-font-scales function inside {@see _utility.scss}.
 *
 * @param {QuranFont} quranFont
 * @param {number} fontScale
 * @param {MushafLines} mushafLines
 * @param {boolean} isFallbackFont
 * @returns {string}
 */
export const getFontClassName = (
  quranFont: QuranFont,
  fontScale: number,
  mushafLines: MushafLines,
  isFallbackFont = false,
): string => {
  if (quranFont === QuranFont.IndoPak) {
    return `${quranFont}_${mushafLines}-font-size-${fontScale}`;
  }
  return isFallbackFont
    ? `fallback_${quranFont}-font-size-${fontScale}`
    : `${quranFont}-font-size-${fontScale}`;
};
