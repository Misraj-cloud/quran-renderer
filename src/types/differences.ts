export interface INarrationsDifferencesDto {
  code: number;
  status: string;
  data: NarrationDifference[];
}

export interface NarrationDifference {
  words: NarrationDifferenceWord[];
  narrator_name: string;
  difference_text: string;
  difference_content: string;
}

export interface NarrationDifferenceWord {
  text: string;
  location: string;
  audio?: NarrationDifferenceAudio;
}

export interface NarrationDifferenceAudio {
  url: string;
  reader_name: string;
  reader_description?: Record<string, string>;
  reader_image?: string;
}
