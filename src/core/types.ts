import React from 'react';

import type Word from '@/types/Word';
import type { NarrationDifference } from '@/types/differences';
import type { Ayah, IVersesListDto } from '@/types/verses';
import type { BorderColor } from '@/types/border-color';

export type NarrationId =
  | 'quran-hafs'
  | 'quran-shoba'
  | 'quran-warsh'
  | 'quran-qunbul'
  | 'quran-qaloon'
  | 'quran-alsoosi'
  | 'quran-aldouri'
  | 'quran-albazzi';

export type ReciterId =
  | 'ar.muhammadabdulhakim.albazzi'
  | 'ar.sufi.aldouri'
  | 'ar.husary.aldouri'
  | 'ar.belalya.warsh'
  | 'ar.abdurrahmaansudais.hafs'
  | 'ar.hanirifai.hafs'
  | 'ar.minshawimujawwad.hafs'
  | 'ar.abdulbasitmurattal.hafs'
  | 'ar.husarymujawwad.hafs'
  | 'ar.sufi.alsoosi'
  | 'ar.aljazairi.warsh'
  | 'ar.parhizgar.hafs'
  | 'ar.abdulsamad.warsh'
  | 'ar.muhammadabdulkareem.warsh'
  | 'ar.husary.qaloon'
  | 'ar.sufi.shoba'
  | 'ar.alkouchi.warsh'
  | 'ar.alnaehy.qaloon'
  | 'ar.abdulhakimabdullatif.shoba'
  | 'ar.aldaghoush.warsh'
  | 'ar.qanyouh.qaloon'
  | 'ar.abusneineh.qaloon'
  | 'ar.husary.warsh'
  | 'ar.muhammadabdulhakim.qunbul'
  | 'ar.ibrahimakhdar.hafs'
  | 'ar.abdullahbasfar.hafs'
  | 'ar.shaatree.hafs'
  | 'ar.ahmedajamy.hafs'
  | 'ar.alafasy.hafs'
  | 'ar.husary.hafs'
  | 'ar.hudhaify.hafs'
  | 'ar.mahermuaiqly.hafs'
  | 'ar.minshawi.hafs'
  | 'ar.muhammadayyoub.hafs'
  | 'ar.muhammadjibreel.hafs'
  | 'ar.saoodshuraym.hafs'
  | 'ar.aymanswoaid.hafs'
  | 'ar.abdulsamad.hafs';

export type DataId = NarrationId | ReciterId;

export type MushafTheme = {
  borderColor?: BorderColor;
  wordHighlightColor?: string;
  chapterHeaderFontSize?: string;
  primaryFontColor?: string;
  fontSize?: string;
  spacingMega?: string;
};

export type MushafSlot =
  | 'root'
  | 'twoPageLayout'
  | 'page'
  | 'pageBorder'
  | 'pageMeta'
  | 'pageNumber'
  | 'line'
  | 'verseText'
  | 'word'
  | 'wordHighlighted'
  | 'chapterHeader'
  | 'chapterIcon';

export type MushafClassNames = Partial<Record<MushafSlot, string>>;
export type MushafStyles = Partial<Record<MushafSlot, React.CSSProperties>>;

export type MushafSlotProps = {
  root?: React.HTMLAttributes<HTMLDivElement>;
  page?: React.HTMLAttributes<HTMLDivElement>;
  line?: React.HTMLAttributes<HTMLDivElement>;
  word?: React.HTMLAttributes<HTMLDivElement>;
};

export type MushafNarrationDifferencesRequest = {
  sourceEditionIdentifier: string;
  targetEditionIdentifier: string;
};

export type MushafDataSource = {
  getPage: (args: {
    pageNumber: number;
    dataId: DataId;
    signal?: AbortSignal;
  }) => Promise<IVersesListDto | null>;
  getNarrationDifferences?: (args: {
    pageNumber: number;
    sourceEditionIdentifier: string;
    targetEditionIdentifier: string;
    signal?: AbortSignal;
  }) => Promise<NarrationDifference[] | null>;
};

export type MushafControllerState = {
  fontScale: number;
  selectedVerse: Ayah | null;
  ayat: IVersesListDto | null;
  nextPageAyat: IVersesListDto | null;
  narrationDifferences: NarrationDifference[] | null;
  error: Error | null;
  pageNumber: number;
  dataId: DataId;
  hasBorder: boolean;
  isTwoPagesView: boolean;
  isLoading: boolean;
};

export type MushafControllerActions = {
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  setSelectedVerse: React.Dispatch<React.SetStateAction<Ayah | null>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setFontScale: React.Dispatch<React.SetStateAction<number>>;
  setTwoPagesView: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => Promise<void>;
};

export type MushafReaderValue = MushafControllerState & MushafControllerActions;

export type MushafControllerOptions = {
  dataId: DataId;
  pageNumber?: number;
  defaultPageNumber?: number;
  onPageNumberChange?: (pageNumber: number) => void;
  fontScale?: number;
  defaultFontScale?: number;
  onFontScaleChange?: (fontScale: number) => void;
  selectedVerse?: Ayah | null;
  defaultSelectedVerse?: Ayah | null;
  onSelectedVerseChange?: (selectedVerse: Ayah | null) => void;
  twoPageView?: boolean;
  defaultTwoPageView?: boolean;
  onTwoPageViewChange?: (twoPageView: boolean) => void;
  hasBorder?: boolean;
  pageData?: IVersesListDto | null;
  nextPageData?: IVersesListDto | null;
  narrationDifferences?: NarrationDifference[] | null;
  dataSource?: MushafDataSource;
  narrationDifferencesRequest?: MushafNarrationDifferencesRequest | null;
};

export type MushafWordRenderContext = {
  word: Word;
  isSelected: boolean;
  isDifference: boolean;
  defaultNode: React.ReactNode;
};

export type MushafLineRenderContext = {
  lineKey: string;
  words: Word[];
  pageIndex: number;
  lineIndex: number;
  defaultNode: React.ReactNode;
};

export type MushafPageMetaRenderContext = {
  kind: 'surah' | 'juz';
  value: React.ReactNode;
  pageNumber: number;
  defaultNode: React.ReactNode;
};

export type MushafChapterHeaderRenderContext = {
  chapterId: string;
  pageNumber: number;
  firstAyahText?: string;
  defaultNode: React.ReactNode;
};

export type MushafRenderers = {
  renderWord?: (context: MushafWordRenderContext) => React.ReactNode;
  renderLine?: (context: MushafLineRenderContext) => React.ReactNode;
  renderPageMeta?: (context: MushafPageMetaRenderContext) => React.ReactNode;
  renderChapterHeader?: (context: MushafChapterHeaderRenderContext) => React.ReactNode;
};
