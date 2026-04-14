import { memo, useCallback, useMemo } from 'react';

import classNames from 'classnames';

import styles from './MushafWord.module.scss';

import type Word from '@/types/Word';
import { buildNarrationDifferencesMap } from '@/core/shaping';
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
  const { selectedVerse, dataId, narrationDifferences } = useMushafContext();
  const { classNames: slotClassNames, styles: slotStyles, slotProps } =
    useThemeContext();
  const wordLocation = makeWordLocation(word.verse_key, word.position);
  const wordText = <span className={styles.UthmanicHafs}>{word.text}</span>;

  const shouldBeHighLighted = selectedVerse?.number === word.verse?.number;

  const differencesMap = useMemo(
    () => buildNarrationDifferencesMap(narrationDifferences),
    [narrationDifferences],
  );

  const narrationId = narrationIdentifierFromReciterId(dataId);
  const differenceInfo = differencesMap?.get(wordLocation);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onWordClick?.(word, event);
    },
    [onWordClick, word],
  );

  const onMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onWordHover?.(word, event);
    },
    [onWordHover, word],
  );

  return (
    <div
      {...slotProps.word}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      {...{
        [DATA_ATTRIBUTE_WORD_LOCATION]: wordLocation,
      }}
      className={classNames(
        styles.container,
        styles[narrationId],
        slotClassNames.word,
        shouldBeHighLighted && slotClassNames.wordHighlighted,
        slotProps.word?.className,
        {
          [styles.highlightOnHover]: true,
          [styles.colored]: !shouldBeHighLighted,
          [styles.highlighted]: shouldBeHighLighted,
          [styles.differenceHighlight]: !!differenceInfo,
        },
      )}
      style={{
        ...slotStyles.word,
        ...(shouldBeHighLighted ? slotStyles.wordHighlighted : undefined),
        ...slotProps.word?.style,
      }}
    >
      {wordText}
    </div>
  );
};

export default memo(MushafWord);
