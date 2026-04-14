import type { NarrationDifference } from '@/types/differences';
import type { Ayah, IVersesListDto } from '@/types/verses';

const createAyah = (number: number, pageNumber: number, lineNumber: number): Ayah => ({
  number,
  text: `Ayah ${number}`,
  surah: {
    number: 1,
    name: 'الفاتحة',
    englishName: 'Al-Fatihah',
    englishNameTranslation: 'The Opening',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
  },
  numberInSurah: number,
  juz: 1,
  manzil: 1,
  page: pageNumber,
  ruku: 1,
  hizbQuarter: 1,
  sajda: false,
  words: [
    {
      text: 'بسم',
      char_type_name: 'word',
      position: 1,
      line_number: lineNumber,
      line_number_qpc_uthmani: lineNumber,
      verse_key: `1:${number}`,
      location: `1:${number}:1`,
      page_number: pageNumber,
      verse: undefined as unknown as Ayah,
    },
    {
      text: 'الله',
      char_type_name: 'word',
      position: 2,
      line_number: lineNumber,
      line_number_qpc_uthmani: lineNumber,
      verse_key: `1:${number}`,
      location: `1:${number}:2`,
      page_number: pageNumber,
      verse: undefined as unknown as Ayah,
    },
  ],
});

export const sampleAyahs: Ayah[] = [createAyah(1, 1, 1), createAyah(2, 1, 2)];

sampleAyahs.forEach((ayah) => {
  ayah.words = ayah.words.map((word) => ({
    ...word,
    verse: ayah,
  }));
});

export const samplePageData: IVersesListDto = {
  code: 200,
  status: 'OK',
  data: {
    number: 1,
    topPageSurah: {
      number: 1,
      name: 'الفاتحة',
      englishName: 'Al-Fatihah',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    hizbNumbers: [1],
    ayahs: sampleAyahs,
    surahs: [
      {
        number: 1,
        name: 'الفاتحة',
        englishName: 'Al-Fatihah',
        englishNameTranslation: 'The Opening',
        revelationType: 'Meccan',
        numberOfAyahs: 7,
      },
    ],
    edition: {
      identifier: 'quran-hafs',
      language: 'ar',
      name: 'Hafs',
      englishName: 'Hafs',
      format: 'text',
      type: 'quran',
      direction: 'rtl',
    },
  },
};

export const sampleNarrationDifferences: NarrationDifference[] = [
  {
    narrator_name: 'Hafs',
    difference_text: 'sample',
    difference_content: 'sample-content',
    words: [
      {
        text: 'الله',
        location: '1:1:2',
      },
    ],
  },
];
