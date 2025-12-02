import React from 'react';
import { Mushaf, MushafReaderProvider } from './index';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => (
  <MushafReaderProvider
    hasBorder
    pageNumber={106}
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
      Page: {
        pageNumber: {
          display: 'none',
        },
      },
    }}
  >
    <MushafPageConsumer />
  </MushafReaderProvider>
);

export default App;
