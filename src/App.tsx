import React from 'react';
import { DataId, Mushaf, MushafReaderProvider } from './index';
import { narrationIdentifierFromReciterId } from './utils/narration-name';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => {
  const DATA_ID: DataId = 'quran-shoba';

  return (
    <MushafReaderProvider
      hasBorder={false}
      hostApiEnvironment="staging"
      pageNumber={305}
      dataId={DATA_ID}
      themeProps={{
        borderColor: 'blue',
        wordHighlightColor: '#D0F7E9',
      }}
      showNarrationDifferences={{
        sourceEditionIdentifier: narrationIdentifierFromReciterId(DATA_ID).replace(
          'mushaf',
          'quran',
        ),
        targetEditionIdentifier: 'quran-hafs',
      }}
      initialFontScale={3}
      initialIsTwoPagesView
      styleOverride={{
        MushafReader: {
          twoPagesRow: {
            gap: 0,
          },
        },
      }}
    >
      <MushafPageConsumer />
    </MushafReaderProvider>
  );
};

export default App;
