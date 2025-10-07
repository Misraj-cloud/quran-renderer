import Word from '@/types/Word';
import React from 'react';

type NarrationId =
  | 'quran-hafs'
  | 'quran-shoba'
  | 'quran-warsh'
  | 'quran-qunbul'
  | 'quran-qaloon'
  | 'quran-alsoosi'
  | 'quran-aldouri'
  | 'quran-albazzi';

type ReciterId =
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

export interface MushafPageProps {
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
}
