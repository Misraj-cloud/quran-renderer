import React from 'react';
import { Mushaf, MushafReaderProvider } from './index';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => (
  <MushafReaderProvider
    initialIsTwoPagesView
    initialFontScale={1}
    hasBorder
    pageNumber={221}
    dataId="ar.saoodshuraym.hafs"
    themeProps={{
      borderColor: 'blue',
    }}
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
