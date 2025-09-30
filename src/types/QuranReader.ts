export enum QuranReaderDataType {
  Page = 'page',
}

export enum QuranFont {
  MadaniV1 = 'code_v1',
  MadaniV2 = 'code_v2',
  Uthmani = 'text_uthmani',
  IndoPak = 'text_indopak',
  QPCHafs = 'qpc_uthmani_hafs',
  Tajweed = 'tajweed',
}
export const FALLBACK_FONT = QuranFont.QPCHafs;

export enum MushafLines {
  FifteenLines = '15_lines',
  SixteenLines = '16_lines',
}
