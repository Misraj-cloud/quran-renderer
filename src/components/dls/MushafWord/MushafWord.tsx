/* eslint-disable max-lines */
import { memo, useCallback } from 'react';

import classNames from 'classnames';

import styles from './MushafWord.module.scss';

import Word from '@/types/Word';
import { makeWordLocation } from '@/utils/verse';
import { useMushafContext } from 'src/components/MushafReader/contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from 'src/components/MushafReader/contexts/Theme/ThemeProvider';
import { narrationIdentifierFromReciterId } from 'src/utils/narration-name';

const DATA_ATTRIBUTE_WORD_LOCATION = 'data-word-location';

type MushafWordProps = {
  word: Word;
  onWordClick?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
  onWordHover?: (word: Word, event: React.MouseEvent<HTMLElement>) => void;
};

const MushafWord = ({ word, onWordClick, onWordHover }: MushafWordProps) => {
  const { selectedVerse, dataId } = useMushafContext();
  const { styleOverride } = useThemeContext();
  const wordLocation = makeWordLocation(word.verse_key, word.position);
  const wordText = <span className={styles.UthmanicHafs}>{word.text}</span>;

  const shouldBeHighLighted = selectedVerse?.numberInSurah === word.verse.numberInSurah;

  const narrationId = narrationIdentifierFromReciterId(dataId);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onWordClick) {
        onWordClick(word, event);
      }
    },
    [onWordClick, word],
  );

  const onMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onWordHover) {
        onWordHover(word, event);
      }
    },
    [onWordHover, word],
  );

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      {...{
        [DATA_ATTRIBUTE_WORD_LOCATION]: wordLocation,
      }}
      className={classNames(styles.container, styles[narrationId], {
        [styles.highlightOnHover]: true,
        [styles.colored]: !shouldBeHighLighted,
        [styles.highlighted]: shouldBeHighLighted,
      })}
      style={{
        ...styleOverride?.MushafWord?.highlightOnHover,
        ...styleOverride?.MushafWord?.colored,
        ...styleOverride?.MushafWord?.highlighted,
      }}
    >
      {wordText}
    </div>
  );
};

export default memo(MushafWord);
