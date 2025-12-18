import React from 'react';
import { DataId, Mushaf, MushafReaderProvider } from './index';
import { narrationIdentifierFromReciterId } from './utils/narration-name';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => {
  const DATA_ID: DataId = 'ar.sufi.shoba';

  return (
    <MushafReaderProvider
      hasBorder
      pageNumber={106}
      dataId={DATA_ID}
      themeProps={{
        borderColor: 'blue',
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
      }}
    >
      <MushafPageConsumer />
    </MushafReaderProvider>
  );
};

export default App;
