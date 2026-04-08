import React from 'react';
import { DataId, Mushaf, MushafReaderProvider, useMushafContext } from './index';
import { narrationIdentifierFromReciterId } from './utils/narration-name';
import Word from './types/Word';

const MushafPageConsumer: React.FC = () => {
  const { setSelectedVerse } = useMushafContext();

  const handleWordClick = (word: Word) => {
    // select the verse the word belongs to
    setSelectedVerse(word.verse);
  };

  return <Mushaf onWordClick={handleWordClick} />;
};

const App: React.FC = () => {
  const DATA_ID: DataId = 'quran-hafs';

  return (
    <MushafReaderProvider
      hasBorder
      initialIsTwoPagesView
      hostApiEnvironment="staging"
      pageNumber={598}
      dataId={DATA_ID}
      themeProps={{
        borderColor: 'blue',
        wordHighlightColor: '#D0F7E9',
        fontSize: '14px',
      }}
      showNarrationDifferences={{
        sourceEditionIdentifier: narrationIdentifierFromReciterId(DATA_ID).replace(
          'mushaf',
          'quran',
        ),
        targetEditionIdentifier: 'quran-hafs',
      }}
      initialFontScale={3}
      styleOverride={{
        MushafReader: {
          twoPagesRow: {
            gap: 0,
          },
        },
        VerseText: {
          container: {
            width: 375,
          },
        },
      }}
    >
      <MushafPageConsumer />
    </MushafReaderProvider>
  );
};

export default App;
