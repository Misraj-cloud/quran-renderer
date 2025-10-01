import { MushafLines, MushafFont } from 'src/types/MushafReader';

/**
 * Dynamically generate the className of the combination between the font
 * name + size + mushafLines(when its Indopak) that will match the output of
 * generate-font-scales function inside {@see _utility.scss}.
 *
 * @param {MushafFont} mushafFont
 * @param {number} fontScale
 * @param {MushafLines} mushafLines
 * @param {boolean} isFallbackFont
 * @returns {string}
 */
export const getFontClassName = (
  mushafFont: MushafFont,
  fontScale: number,
  mushafLines: MushafLines,
  isFallbackFont = false,
): string => {
  if (mushafFont === MushafFont.IndoPak) {
    return `${mushafFont}_${mushafLines}-font-size-${fontScale}`;
  }
  return isFallbackFont
    ? `fallback_${mushafFont}-font-size-${fontScale}`
    : `${mushafFont}-font-size-${fontScale}`;
};
