import React from 'react';
import { classnames, Mushaf, MushafReaderProvider } from './index';

const MushafPageConsumer: React.FC = () => <Mushaf />;

const App: React.FC = () => (
  <MushafReaderProvider
    initialIsTwoPagesView
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
