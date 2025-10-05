export interface IVersesListDto {
  code: number;
  status: string;
  data: Data;
}

interface Data {
  number: number;
  topPageSurah: TopPageSurah;
  hizbNumbers: number[];
  ayahs: Ayah[];
  surahs: Surah2[];
  edition: Edition;
}

interface TopPageSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  words: Word[];
  audio?: string;
  audioSecondary?: string[];
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Word {
  text: string;
  char_type_name: string;
  position: number;
  line_number: number;
  verse_key: string;
  location: string;
  page_number: number;
  verse: Ayah;
}

interface Surah2 {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}
