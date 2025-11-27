import React from 'react';
import { Mushaf, MushafReaderProvider } from './index';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => (
  <MushafReaderProvider
    initialIsTwoPagesView
    hasBorder
    pageNumber={222}
    dataId="ar.saoodshuraym.hafs"
    themeProps={{
      borderColor: 'blue',
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

export default App;
